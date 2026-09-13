import workletSource from './pcm-worklet-processor.ts?raw'

const WORKLET_NAME = 'pcm-capture-processor'

// OpenAI's Realtime API rejects an input sample rate above 24kHz, but browsers typically
// default an AudioContext to the audio device's native rate (commonly 44.1kHz or 48kHz).
// Requesting this rate explicitly makes the browser resample internally instead.
const TARGET_SAMPLE_RATE_HZ = 24000

export class AudioCapture {
    private audioContext: AudioContext | null = null
    private stream: MediaStream | null = null
    private sourceNode: MediaStreamAudioSourceNode | null = null
    private workletNode: AudioWorkletNode | null = null
    private workletBlobUrl: string | null = null

    async start(onFrame: (frame: ArrayBuffer) => void): Promise<{ sampleRateHz: number }> {
        this.stream = await navigator.mediaDevices.getUserMedia({
            audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
        })

        this.audioContext = new AudioContext({ sampleRate: TARGET_SAMPLE_RATE_HZ })

        // Loaded from a Blob URL (rather than a bundler-emitted static asset URL) since
        // AudioWorklet module loading is notoriously inconsistent across bundler asset pipelines.
        const blob = new Blob([workletSource], { type: 'application/javascript' })
        this.workletBlobUrl = URL.createObjectURL(blob)
        await this.audioContext.audioWorklet.addModule(this.workletBlobUrl)

        this.sourceNode = new MediaStreamAudioSourceNode(this.audioContext, { mediaStream: this.stream })
        this.workletNode = new AudioWorkletNode(this.audioContext, WORKLET_NAME)

        this.workletNode.port.onmessage = (event: MessageEvent<ArrayBuffer>) => {
            onFrame(event.data)
        }

        this.sourceNode.connect(this.workletNode)

        return { sampleRateHz: this.audioContext.sampleRate }
    }

    setMuted(muted: boolean): void {
        this.stream?.getAudioTracks().forEach((track) => {
            track.enabled = !muted
        })
    }

    stop(): void {
        this.workletNode?.disconnect()
        this.sourceNode?.disconnect()
        this.stream?.getTracks().forEach((track) => track.stop())
        void this.audioContext?.close()

        if (this.workletBlobUrl) {
            URL.revokeObjectURL(this.workletBlobUrl)
        }

        this.workletNode = null
        this.sourceNode = null
        this.stream = null
        this.audioContext = null
        this.workletBlobUrl = null
    }
}
