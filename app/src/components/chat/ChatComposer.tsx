import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import toast from 'react-hot-toast'
import { Send, Loader2, Mic, MicOff } from 'lucide-react'
import { useVoiceInput } from '../../hooks/use-voice-input'

interface ChatComposerProps {
    onSend: (content: string) => void
    disabled: boolean
    isPending: boolean
    placeholder?: string
    /** 'page' = fixed bottom bar (default); 'inline' = relative, borderless wrapper */
    variant?: 'page' | 'inline'
}

function joinWithSpace(base: string, addition: string): string {
    if (!base.trim()) return addition
    if (!addition.trim()) return base
    return `${base} ${addition}`
}

export function ChatComposer({
    onSend,
    disabled,
    isPending,
    placeholder = 'Ask about your notes...',
    variant = 'page',
}: ChatComposerProps) {
    const [value, setValue] = useState('')
    const baseValueRef = useRef('')

    const handleTranscript = useCallback((text: string) => {
        setValue(joinWithSpace(baseValueRef.current, text))
    }, [])

    const { isListening, isSupported: isMicSupported, error: voiceError, start, stop } = useVoiceInput(handleTranscript)

    useEffect(() => {
        if (voiceError) {
            toast.error(voiceError, { duration: 3000 })
        }
    }, [voiceError])

    const handleMicClick = useCallback(() => {
        if (isListening) {
            void stop()
            return
        }

        baseValueRef.current = value
        void start()
    }, [isListening, start, stop, value])

    const handleSend = useCallback(() => {
        const trimmed = value.trim()
        if (!trimmed || disabled || isPending) return
        if (isListening) void stop()
        onSend(trimmed)
        setValue('')
    }, [value, disabled, isPending, onSend, isListening, stop])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
            }
        },
        [handleSend],
    )

    const wrapperClass =
        variant === 'page'
            ? 'fixed bottom-16 left-0 right-0 z-30 border-t border-slate-700/50 bg-slate-950/95 p-4 lg:left-[280px]'
            : 'border-t border-slate-700/50 bg-slate-900/80 p-3'

    return (
        <div className={wrapperClass}>
            <div className="flex gap-3 items-end max-w-3xl mx-auto">
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    rows={1}
                    disabled={disabled || isPending}
                    className="flex-1 resize-none bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/60 min-h-[48px] max-h-32 disabled:opacity-50"
                />
                {isMicSupported && (
                    <button
                        type="button"
                        onClick={handleMicClick}
                        disabled={disabled || isPending}
                        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                        className={`relative flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border transition-colors disabled:opacity-40 ${
                            isListening
                                ? 'bg-red-500/10 border-red-500/40 text-red-400'
                                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                        }`}
                    >
                        {isListening && (
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        )}
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={disabled || isPending || !value.trim()}
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 transition-colors shadow-lg shadow-violet-600/25"
                >
                    {isPending ? (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : (
                        <Send className="w-5 h-5 text-white" />
                    )}
                </button>
            </div>
        </div>
    )
}
