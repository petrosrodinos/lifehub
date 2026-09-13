import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AudioLines, Mic, MicOff, PhoneOff } from 'lucide-react'
import { useRealtimeVoiceSession } from '../../../features/assistant/voice/use-realtime-voice-session'

interface VoiceModeOverlayProps {
    isOpen: boolean
    conversationUuid: string | null
    onClose: () => void
    onTurnPersisted: (conversationUuid: string) => void
}

const STATE_LABELS: Record<string, string> = {
    idle: 'Ready',
    connecting: 'Connecting…',
    listening: 'Listening…',
    thinking: 'Thinking…',
    speaking: 'Speaking…',
}

export function VoiceModeOverlay({ isOpen, conversationUuid, onClose, onTurnPersisted }: VoiceModeOverlayProps) {
    const { state, captions, isMuted, error, start, end, toggleMute } = useRealtimeVoiceSession({ onTurnPersisted })

    useEffect(() => {
        if (!isOpen) {
            return undefined
        }

        document.body.style.overflow = 'hidden'
        void start(conversationUuid)

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleKeyDown)
            end()
        }
        // Intentionally only re-running when the overlay opens/closes, not on every
        // start/end/conversationUuid identity change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    if (!isOpen) {
        return null
    }

    const handleEndCall = () => {
        end()
        onClose()
    }

    const stateLabel = state === 'error' ? (error ?? 'Something went wrong') : STATE_LABELS[state]

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col bg-slate-950">
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
                <div
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                        state === 'speaking'
                            ? 'bg-violet-600/30 scale-110'
                            : state === 'listening'
                              ? 'bg-emerald-600/20'
                              : 'bg-slate-800/60'
                    }`}
                >
                    <AudioLines className={`w-14 h-14 ${state === 'error' ? 'text-red-400' : 'text-violet-300'}`} />
                </div>

                <p className="text-slate-300 text-sm">{stateLabel}</p>

                <div className="w-full max-w-md max-h-48 overflow-y-auto space-y-2 text-center">
                    {captions.map((caption, index) => (
                        <p
                            key={index}
                            className={`text-sm ${caption.role === 'assistant' ? 'text-white font-medium' : 'text-slate-500'}`}
                        >
                            {caption.text}
                        </p>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-6 pb-12">
                <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                        isMuted ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                >
                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>

                <button
                    type="button"
                    onClick={handleEndCall}
                    aria-label="End voice mode"
                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-colors shadow-lg shadow-red-600/25"
                >
                    <PhoneOff className="w-7 h-7" />
                </button>
            </div>
        </div>,
        document.body,
    )
}
