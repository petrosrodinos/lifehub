// Must match the output format the backend's RealtimeSession is configured with
// (see api/src/modules/voice/voice-session.service.ts).
const OUTPUT_SAMPLE_RATE_HZ = 24000

export class AudioPlayer {
    private readonly audioContext: AudioContext
    private nextStartTime = 0
    private activeSources: AudioBufferSourceNode[] = []

    constructor() {
        this.audioContext = new AudioContext({ sampleRate: OUTPUT_SAMPLE_RATE_HZ })
    }

    enqueue(pcm: ArrayBuffer): void {
        const int16 = new Int16Array(pcm)
        const float32 = new Float32Array(int16.length)

        for (let i = 0; i < int16.length; i++) {
            float32[i] = int16[i] / 0x8000
        }

        const audioBuffer = this.audioContext.createBuffer(1, float32.length, OUTPUT_SAMPLE_RATE_HZ)
        audioBuffer.copyToChannel(float32, 0)

        const source = this.audioContext.createBufferSource()
        source.buffer = audioBuffer
        source.connect(this.audioContext.destination)

        const startTime = Math.max(this.nextStartTime, this.audioContext.currentTime)
        source.start(startTime)
        this.nextStartTime = startTime + audioBuffer.duration

        this.activeSources.push(source)
        source.onended = () => {
            this.activeSources = this.activeSources.filter((activeSource) => activeSource !== source)
        }
    }

    interrupt(): void {
        this.activeSources.forEach((source) => {
            try {
                source.stop()
            } catch {
                // already stopped
            }
        })
        this.activeSources = []
        this.nextStartTime = this.audioContext.currentTime
    }

    close(): void {
        this.interrupt()
        void this.audioContext.close()
    }
}
