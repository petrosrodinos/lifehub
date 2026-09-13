import { environments } from '../../../config/environments'
import { getAuthStoreState } from '../../../store/auth-store'
import type { VoiceClientMessage, VoiceServerMessage } from './interfaces/voice-protocol.interface'

interface VoiceSocketHandlers {
    onAudio: (data: ArrayBuffer) => void
    onServerMessage: (message: VoiceServerMessage) => void
    onClose: () => void
    onError: (message: string) => void
}

function buildWsUrl(): string {
    const wsBase = environments.API_URL.replace(/^http/, 'ws').replace(/\/$/, '')
    const token = getAuthStoreState().access_token ?? ''
    return `${wsBase}/voice?token=${encodeURIComponent(token)}`
}

export class VoiceSocket {
    private ws: WebSocket | null = null

    connect(conversationUuid: string | null, sampleRateHz: number, handlers: VoiceSocketHandlers): void {
        const ws = new WebSocket(buildWsUrl())
        ws.binaryType = 'arraybuffer'

        ws.onopen = () => {
            const startMessage: VoiceClientMessage = { type: 'start', conversationUuid, sampleRateHz }
            ws.send(JSON.stringify(startMessage))
        }

        ws.onmessage = (event) => {
            if (typeof event.data === 'string') {
                handlers.onServerMessage(JSON.parse(event.data) as VoiceServerMessage)
            } else {
                handlers.onAudio(event.data as ArrayBuffer)
            }
        }

        ws.onclose = () => handlers.onClose()
        ws.onerror = () => handlers.onError('Voice connection error')

        this.ws = ws
    }

    sendAudio(frame: ArrayBuffer): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(frame)
        }
    }

    sendControl(message: VoiceClientMessage): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message))
        }
    }

    close(): void {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.sendControl({ type: 'end' })
        }
        this.ws?.close()
        this.ws = null
    }
}
