import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { MessageSquare, Pencil, Trash2 } from 'lucide-react'
import type { ChatConversation } from '../../../features/assistant/interfaces/chat.interface'

interface SidebarConversationItemProps {
    conversation: ChatConversation
    isSelected: boolean
    isRenaming: boolean
    onSelect: () => void
    onDelete: () => void
    onRename: (title: string) => void
}

export function SidebarConversationItem({
    conversation,
    isSelected,
    isRenaming,
    onSelect,
    onDelete,
    onRename,
}: SidebarConversationItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState(conversation.title)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!isEditing) {
            setDraft(conversation.title)
        }
    }, [conversation.title, isEditing])

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
            inputRef.current?.select()
        }
    }, [isEditing])

    const handleStartRename = useCallback(
        (e: { stopPropagation: () => void }) => {
            e.stopPropagation()
            setDraft(conversation.title)
            setIsEditing(true)
        },
        [conversation.title],
    )

    const handleCancel = useCallback(() => {
        setDraft(conversation.title)
        setIsEditing(false)
    }, [conversation.title])

    const handleSave = useCallback(() => {
        const trimmed = draft.trim()
        if (!trimmed || trimmed === conversation.title) {
            handleCancel()
            return
        }
        onRename(trimmed)
        setIsEditing(false)
    }, [draft, conversation.title, onRename, handleCancel])

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

    return (
        <div
            className={`group flex items-center gap-1 rounded-xl transition-colors ${
                isSelected
                    ? 'bg-violet-600/20 border border-violet-500/30'
                    : 'hover:bg-slate-800/60 border border-transparent'
            }`}
        >
            {isEditing ? (
                <div className="flex-1 flex items-center gap-2 px-2 py-2 min-w-0">
                    <MessageSquare
                        className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-violet-400' : 'text-slate-500'}`}
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSave}
                        disabled={isRenaming}
                        maxLength={200}
                        className="flex-1 min-w-0 bg-slate-800/80 border border-violet-500/50 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-violet-400 disabled:opacity-50"
                    />
                </div>
            ) : (
                <>
                    <button
                        type="button"
                        onClick={onSelect}
                        className="flex-1 flex items-center gap-2 px-3 py-2.5 text-left min-w-0"
                    >
                        <MessageSquare
                            className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-violet-400' : 'text-slate-500'}`}
                        />
                        <span
                            className={`text-sm truncate ${isSelected ? 'text-violet-200' : 'text-slate-300'}`}
                        >
                            {conversation.title}
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={handleStartRename}
                        disabled={isRenaming}
                        className="p-2 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-violet-400 transition-all disabled:opacity-40"
                        aria-label="Rename chat"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}
                        className="p-2 mr-1 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </>
            )}
        </div>
    )
}
