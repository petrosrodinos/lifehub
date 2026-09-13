import type { ChatMessage } from '../../interfaces/chat.interface'

export type VoiceClientMessage =
    | { type: 'start'; conversationUuid: string | null; sampleRateHz: number }
    | { type: 'mute'; muted: boolean }
    | { type: 'interrupt' }
    | { type: 'end' }

export type VoiceServerState = 'connecting' | 'listening' | 'thinking' | 'speaking'

export type VoiceServerMessage =
    | { type: 'conversation'; conversationUuid: string }
    | { type: 'state'; value: VoiceServerState }
    | { type: 'caption'; role: 'user' | 'assistant'; text: string; final: boolean }
    | { type: 'turn_persisted'; userMessage: ChatMessage; assistantMessage: ChatMessage }
    | { type: 'error'; code: string; message: string }
    | { type: 'ended' }
