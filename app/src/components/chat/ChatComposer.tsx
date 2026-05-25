import { useState, useCallback, type KeyboardEvent } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface ChatComposerProps {
    onSend: (content: string) => void
    disabled: boolean
    isPending: boolean
    placeholder?: string
    /** 'page' = fixed bottom bar (default); 'inline' = relative, borderless wrapper */
    variant?: 'page' | 'inline'
}

export function ChatComposer({
    onSend,
    disabled,
    isPending,
    placeholder = 'Ask about your notes...',
    variant = 'page',
}: ChatComposerProps) {
    const [value, setValue] = useState('')

    const handleSend = useCallback(() => {
        const trimmed = value.trim()
        if (!trimmed || disabled || isPending) return
        onSend(trimmed)
        setValue('')
    }, [value, disabled, isPending, onSend])

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
