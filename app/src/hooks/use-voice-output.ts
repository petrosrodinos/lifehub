import { useCallback } from 'react'
import { Capacitor } from '@capacitor/core'
import { TextToSpeech } from '@capacitor-community/text-to-speech'
import { useVoiceOutputStore } from '../store/voice-output-store'

type UseVoiceOutputReturn = {
    speakingId: string | null
    isSupported: boolean
    speak: (text: string, id: string) => Promise<void>
    stop: () => Promise<void>
}

function isWebSpeechSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function useVoiceOutput(): UseVoiceOutputReturn {
    const speakingId = useVoiceOutputStore((state) => state.speakingId)
    const setSpeakingId = useVoiceOutputStore((state) => state.setSpeakingId)
    const isNative = Capacitor.isNativePlatform()
    const isSupported = isNative || isWebSpeechSynthesisSupported()

    const stop = useCallback(async (): Promise<void> => {
        if (isNative) {
            try {
                await TextToSpeech.stop()
            } catch {
                // Ignore — engine may already be idle.
            }
        } else {
            window.speechSynthesis?.cancel()
        }

        setSpeakingId(null)
    }, [isNative, setSpeakingId])

    const speak = useCallback(
        async (text: string, id: string): Promise<void> => {
            if (useVoiceOutputStore.getState().speakingId) {
                await stop()
            }

            const trimmed = text.trim()

            if (!trimmed) {
                return
            }

            setSpeakingId(id)

            if (isNative) {
                try {
                    await TextToSpeech.speak({
                        text: trimmed,
                        lang: 'en-US',
                        category: 'playback',
                    })
                } catch {
                    // Ignore playback failures — nothing actionable for the user here.
                } finally {
                    if (useVoiceOutputStore.getState().speakingId === id) {
                        setSpeakingId(null)
                    }
                }
            } else {
                const utterance = new SpeechSynthesisUtterance(trimmed)
                utterance.lang = 'en-US'

                const clearIfCurrent = () => {
                    if (useVoiceOutputStore.getState().speakingId === id) {
                        setSpeakingId(null)
                    }
                }

                utterance.onend = clearIfCurrent
                utterance.onerror = clearIfCurrent

                window.speechSynthesis.speak(utterance)
            }
        },
        [isNative, setSpeakingId, stop],
    )

    return { speakingId, isSupported, speak, stop }
}
