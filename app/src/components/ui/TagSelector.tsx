import { useState, useRef, useEffect } from 'react'
import { Tag, X, Plus, Check, ChevronDown, Loader2 } from 'lucide-react'

const PRESET_COLORS = [
    '#8b5cf6',
    '#ec4899',
    '#ef4444',
    '#f59e0b',
    '#10b981',
    '#3b82f6',
    '#06b6d4',
    '#f97316',
] as const

export type TagSelectorItem = {
    uuid: string
    title: string
    color: string
}

export type CreateTagSelectorInput = {
    title: string
    color?: string
}

interface TagSelectorProps {
    selectedTagUuids: string[]
    onChange: (uuids: string[]) => void
    allTags: TagSelectorItem[]
    onCreateTag: (data: CreateTagSelectorInput) => Promise<TagSelectorItem>
    isCreating?: boolean
}

export function TagSelector({ selectedTagUuids, onChange, allTags, onCreateTag, isCreating = false }: TagSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [newTagTitle, setNewTagTitle] = useState('')
    const [newTagColor, setNewTagColor] = useState<string>(PRESET_COLORS[0])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const selectedTags = allTags.filter((t) => selectedTagUuids.includes(t.uuid))

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function toggleTag(uuid: string) {
        if (selectedTagUuids.includes(uuid)) {
            onChange(selectedTagUuids.filter((u) => u !== uuid))
        } else {
            onChange([...selectedTagUuids, uuid])
        }
    }

    function removeTag(uuid: string, e: React.MouseEvent) {
        e.stopPropagation()
        onChange(selectedTagUuids.filter((u) => u !== uuid))
    }

    async function handleCreateTag(e: React.FormEvent) {
        e.preventDefault()
        if (!newTagTitle.trim()) return
        setIsSubmitting(true)
        try {
            const tag = await onCreateTag({ title: newTagTitle.trim(), color: newTagColor })
            onChange([...selectedTagUuids, tag.uuid])
            setNewTagTitle('')
            setNewTagColor(PRESET_COLORS[0])
            setShowCreate(false)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Selected tags + trigger */}
            <div
                className="flex flex-wrap items-center gap-1.5 min-h-[38px] w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2 cursor-pointer hover:border-slate-600/70 transition-colors"
                onClick={() => setIsOpen((v) => !v)}
            >
                <Tag className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                {selectedTags.length === 0 && (
                    <span className="text-slate-500 text-sm">Add tags…</span>
                )}
                {selectedTags.map((tag) => (
                    <span
                        key={tag.uuid}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border"
                        style={{
                            backgroundColor: tag.color + '20',
                            borderColor: tag.color + '50',
                            color: tag.color,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {tag.title}
                        <button
                            type="button"
                            onClick={(e) => removeTag(tag.uuid, e)}
                            className="opacity-70 hover:opacity-100 transition-opacity"
                        >
                            <X className="w-2.5 h-2.5" />
                        </button>
                    </span>
                ))}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 ml-auto flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700/70 rounded-xl shadow-xl overflow-hidden">
                    {/* Existing tags */}
                    {allTags.length > 0 && (
                        <div className="max-h-40 overflow-y-auto">
                            {allTags.map((tag) => {
                                const selected = selectedTagUuids.includes(tag.uuid)
                                return (
                                    <button
                                        key={tag.uuid}
                                        type="button"
                                        onClick={() => toggleTag(tag.uuid)}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-slate-800/60 transition-colors text-left"
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: tag.color }}
                                        />
                                        <span className="text-sm text-slate-200 flex-1">{tag.title}</span>
                                        {selected && <Check className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />}
                                    </button>
                                )
                            })}
                        </div>
                    )}

                    {allTags.length === 0 && !showCreate && (
                        <p className="text-slate-500 text-xs px-3 py-2">No tags yet. Create one below.</p>
                    )}

                    <div className="border-t border-slate-700/50">
                        {!showCreate ? (
                            <button
                                type="button"
                                onClick={() => setShowCreate(true)}
                                disabled={isCreating}
                                className="w-full flex items-center gap-2 px-3 py-2 text-violet-400 hover:bg-slate-800/60 transition-colors text-sm"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                New tag
                            </button>
                        ) : (
                            <form onSubmit={handleCreateTag} className="p-3 space-y-2.5">
                                <input
                                    type="text"
                                    placeholder="Tag name"
                                    value={newTagTitle}
                                    onChange={(e) => setNewTagTitle(e.target.value)}
                                    autoFocus
                                    className="w-full bg-slate-800 border border-slate-700/60 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 transition-colors"
                                />
                                {/* Color swatches */}
                                <div className="flex gap-1.5 flex-wrap">
                                    {PRESET_COLORS.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setNewTagColor(color)}
                                            className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${newTagColor === color ? 'border-white scale-110' : 'border-slate-700'}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                {/* Preview + actions */}
                                <div className="flex items-center gap-2">
                                    {newTagTitle && (
                                        <span
                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
                                            style={{
                                                backgroundColor: newTagColor + '20',
                                                borderColor: newTagColor + '50',
                                                color: newTagColor,
                                            }}
                                        >
                                            {newTagTitle}
                                        </span>
                                    )}
                                    <div className="ml-auto flex gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => { setShowCreate(false); setNewTagTitle('') }}
                                            className="px-2.5 py-1 text-xs text-slate-400 hover:text-white transition-colors rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!newTagTitle.trim() || isSubmitting}
                                            className="flex items-center gap-1 px-2.5 py-1 text-xs bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-lg transition-colors"
                                        >
                                            {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
