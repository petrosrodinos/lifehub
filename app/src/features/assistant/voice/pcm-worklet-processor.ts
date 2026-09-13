/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck -- runs in the AudioWorkletGlobalScope, which isn't part of the DOM lib
// used by the rest of the app's tsconfig (no AudioWorkletProcessor/registerProcessor globals).

class PcmCaptureProcessor extends AudioWorkletProcessor {
    process(inputs) {
        const input = inputs[0]
        const channel = input && input[0]

        if (channel && channel.length > 0) {
            const int16 = new Int16Array(channel.length)

            for (let i = 0; i < channel.length; i++) {
                const sample = Math.max(-1, Math.min(1, channel[i]))
                int16[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff
            }

            this.port.postMessage(int16.buffer, [int16.buffer])
        }

        return true
    }
}

registerProcessor('pcm-capture-processor', PcmCaptureProcessor)
