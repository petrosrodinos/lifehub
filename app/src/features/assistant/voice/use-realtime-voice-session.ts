import { useCallback, useRef, useState } from 'react'
import { AudioCapture } from './audio-capture'
import { AudioPlayer } from './audio-player'
import { VoiceSocket } from './voice-socket'
import type { VoiceServerMessage, VoiceServerState } from './interfaces/voice-protocol.interface'

export type VoiceSessionState = 'idle' | 'connecting' | VoiceServerState | 'error'

export interface VoiceCaption {
    role: 'user' | 'assistant'
    text: string
    final: boolean
}

interface UseRealtimeVoiceSessionOptions {
    onTurnPersisted?: (conversationUuid: string) => void
}

export function useRealtimeVoiceSession({ onTurnPersisted }: UseRealtimeVoiceSessionOptions = {}) {
    const [state, setState] = useState<VoiceSessionState>('idle')
    const [captions, setCaptions] = useState<VoiceCaption[]>([])
    const [isMuted, setIsMuted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const captureRef = useRef<AudioCapture | null>(null)
    const playerRef = useRef<AudioPlayer | null>(null)
    const socketRef = useRef<VoiceSocket | null>(null)
    const conversationUuidRef = useRef<string | null>(null)

    const handleServerMessage = useCallback(
        (message: VoiceServerMessage) => {
            switch (message.type) {
                case 'conversation':
                    conversationUuidRef.current = message.conversationUuid
                    break
                case 'state':
                    setState(message.value)
                    break
                case 'caption':
                    setCaptions((prev) => {
                        for (let i = prev.length - 1; i >= 0; i--) {
                            if (prev[i].role === message.role) {
                                if (!prev[i].final) {
                                    const next = [...prev]
                                    next[i] = { role: message.role, text: message.text, final: message.final }
                                    return next
                                }
                                break
                            }
                        }
                        return [...prev, { role: message.role, text: message.text, final: message.final }]
                    })
                    break
                case 'turn_persisted':
                    if (conversationUuidRef.current) {
                        onTurnPersisted?.(conversationUuidRef.current)
                    }
                    break
                case 'error':
                    setError(message.message)
                    setState('error')
                    break
                case 'ended':
                    break
            }
        },
        [onTurnPersisted],
    )

    const start = useCallback(
        async (conversationUuid: string | null) => {
            setState('connecting')
            setError(null)
            setCaptions([])
            conversationUuidRef.current = conversationUuid

            try {
                const capture = new AudioCapture()
                captureRef.current = capture

                const socket = new VoiceSocket()
                socketRef.current = socket

                const player = new AudioPlayer()
                playerRef.current = player

                const { sampleRateHz } = await capture.start((frame) => {
                    socketRef.current?.sendAudio(frame)
                })

                socket.connect(conversationUuid, sampleRateHz, {
                    onAudio: (data) => playerRef.current?.enqueue(data),
                    onServerMessage: handleServerMessage,
                    onClose: () => setState((current) => (current === 'error' ? current : 'idle')),
                    onError: (message) => {
                        setError(message)
                        setState('error')
                    },
                })
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to start voice mode')
                setState('error')
            }
        },
        [handleServerMessage],
    )

    const end = useCallback(() => {
        socketRef.current?.close()
        captureRef.current?.stop()
        playerRef.current?.close()
        socketRef.current = null
        captureRef.current = null
        playerRef.current = null
        setState('idle')
    }, [])

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => {
            const next = !prev
            captureRef.current?.setMuted(next)
            return next
        })
    }, [])

    return { state, captions, isMuted, error, start, end, toggleMute }
}
