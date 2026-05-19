import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Check, Pencil, X } from 'lucide-react'

interface ChatTitleEditorProps {
    title: string
    onSave: (title: string) => void
    disabled?: boolean
    isPending?: boolean
    placeholder?: string
}

export function ChatTitleEditor({
    title,
    onSave,
    disabled = false,
    isPending = false,
    placeholder = 'Chat title',
}: ChatTitleEditorProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState(title)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!isEditing) {
            setDraft(title)
        }
    }, [title, isEditing])

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
            inputRef.current?.select()
        }
    }, [isEditing])

    const handleStartEdit = useCallback(() => {
        if (disabled || isPending) return
        setDraft(title)
        setIsEditing(true)
    }, [disabled, isPending, title])

    const handleCancel = useCallback(() => {
        setDraft(title)
        setIsEditing(false)
    }, [title])

    const handleSave = useCallback(() => {
        const trimmed = draft.trim()
        if (!trimmed || trimmed === title) {
            handleCancel()
            return
        }
        onSave(trimmed)
        setIsEditing(false)
    }, [draft, title, onSave, handleCancel])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                handleSave()
            }
            if (e.key === 'Escape') {
                e.preventDefault()
                handleCancel()
            }
        },
        [handleSave, handleCancel],
    )

    if (isEditing) {
        return (
            <div className="flex items-center gap-2 min-w-0 flex-1">
                <input
                    ref={inputRef}
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    disabled={isPending}
                    maxLength={200}
                    placeholder={placeholder}
                    className="flex-1 min-w-0 bg-slate-800/80 border border-violet-500/50 rounded-lg px-3 py-1.5 text-lg font-bold text-white focus:outline-none focus:border-violet-400 disabled:opacity-50"
                />
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleSave}
                    disabled={isPending || !draft.trim()}
                    className="p-1.5 rounded-lg text-violet-400 hover:bg-violet-500/10 disabled:opacity-40"
                >
                    <Check className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleCancel}
                    disabled={isPending}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800/60 disabled:opacity-40"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 min-w-0 flex-1 group">
            <h1 className="text-lg font-bold text-white truncate">{title}</h1>
            {!disabled && (
                <button
                    type="button"
                    onClick={handleStartEdit}
                    disabled={isPending}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-violet-400 hover:bg-slate-800/60 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 transition-all disabled:opacity-40 shrink-0"
                    aria-label="Rename chat"
                >
                    <Pencil className="w-4 h-4" />
                </button>
            )}
        </div>
    )
}
