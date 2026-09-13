import { useCallback, useEffect, useRef, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import type { PluginListenerHandle } from '@capacitor/core'
import { SpeechRecognition as NativeSpeechRecognition } from '@capacitor-community/speech-recognition'

type UseVoiceInputReturn = {
    isListening: boolean
    isSupported: boolean
    error: string | null
    start: () => Promise<void>
    stop: () => Promise<void>
}

function getWebSpeechRecognitionCtor(): { new (): SpeechRecognition } | null {
    if (typeof SpeechRecognition !== 'undefined') return SpeechRecognition
    if (typeof webkitSpeechRecognition !== 'undefined') return webkitSpeechRecognition
    return null
}

function isWebSpeechSupported(): boolean {
    return typeof window !== 'undefined' && getWebSpeechRecognitionCtor() !== null
}

function isCancellationMessage(message: string): boolean {
    const normalized = message.toLowerCase()
    return normalized.includes('cancel') || normalized.includes('denied') || normalized.includes('not-allowed') || normalized.includes('aborted')
}

export function useVoiceInput(onTranscript: (text: string, isFinal: boolean) => void): UseVoiceInputReturn {
    const [isListening, setIsListening] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const isNative = Capacitor.isNativePlatform()
    const [isSupported] = useState(() => isNative || isWebSpeechSupported())

    const onTranscriptRef = useRef(onTranscript)

    useEffect(() => {
        onTranscriptRef.current = onTranscript
    }, [onTranscript])

    const partialListenerRef = useRef<PluginListenerHandle | null>(null)
    const webRecognitionRef = useRef<SpeechRecognition | null>(null)

    const stopNative = useCallback(async (): Promise<void> => {
        try {
            await NativeSpeechRecognition.stop()
        } catch {
            // Ignore — recognition may already be stopped.
        }
    }, [])

    const startNative = useCallback(async (): Promise<void> => {
        try {
            const { available } = await NativeSpeechRecognition.available()

            if (!available) {
                setError('Speech recognition is not available on this device')
                return
            }

            const permission = await NativeSpeechRecognition.requestPermissions()

            if (permission.speechRecognition !== 'granted') {
                setIsListening(false)
                return
            }

            setError(null)
            setIsListening(true)

            partialListenerRef.current = await NativeSpeechRecognition.addListener('partialResults', (data) => {
                onTranscriptRef.current(data.matches?.[0] ?? '', false)
            })

            NativeSpeechRecognition.start({
                language: 'en-US',
                partialResults: true,
                popup: false,
            })
                .then((result) => {
                    const finalText = result.matches?.[0]

                    if (finalText) {
                        onTranscriptRef.current(finalText, true)
                    }
                })
                .catch((err: unknown) => {
                    const message = err instanceof Error ? err.message : String(err)

                    if (!isCancellationMessage(message)) {
                        setError(message)
                    }
                })
                .finally(() => {
                    setIsListening(false)
                    partialListenerRef.current?.remove()
                    partialListenerRef.current = null
                })
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to start voice input'
            setIsListening(false)

            if (!isCancellationMessage(message)) {
                setError(message)
            }
        }
    }, [])

    const startWeb = useCallback((): void => {
        const SpeechRecognitionCtor = getWebSpeechRecognitionCtor()

        if (!SpeechRecognitionCtor) {
            setError('Speech recognition is not supported in this browser')
            return
        }

        const recognition = new SpeechRecognitionCtor()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onresult = (event) => {
            let combined = ''
            let lastIsFinal = false

            for (let i = 0; i < event.results.length; i++) {
                const result = event.results[i]
                combined += result[0]?.transcript ?? ''
                lastIsFinal = result.isFinal
            }

            onTranscriptRef.current(combined.trim(), lastIsFinal)
        }

        recognition.onerror = (event) => {
            if (isCancellationMessage(event.error)) {
                setIsListening(false)
                return
            }

            setError(event.error)
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        webRecognitionRef.current = recognition
        setError(null)
        setIsListening(true)
        recognition.start()
    }, [])

    const start = useCallback(async (): Promise<void> => {
        if (isNative) {
            await startNative()
        } else {
            startWeb()
        }
    }, [isNative, startNative, startWeb])

    const stop = useCallback(async (): Promise<void> => {
        if (isNative) {
            await stopNative()
        } else {
            webRecognitionRef.current?.stop()
        }
    }, [isNative, stopNative])

    useEffect(() => {
        return () => {
            if (isNative) {
                partialListenerRef.current?.remove()
                void NativeSpeechRecognition.stop().catch(() => {})
            } else {
                webRecognitionRef.current?.stop()
            }
        }
    }, [isNative])

    return {
        isListening,
        isSupported,
        error,
        start,
        stop,
    }
}
