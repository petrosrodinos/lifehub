import { Search, X } from 'lucide-react'
import { NOTE_TYPES } from '../../../features/notes/constants'
import type { NoteTag, NoteType } from '../../../features/notes/interfaces/note.interface'

interface NotesFilterPanelProps {
    allTags: NoteTag[]
    searchText: string
    onSearchChange: (value: string) => void
    filterTypes: NoteType[]
    onToggleType: (type: NoteType) => void
    filterTagUuids: string[]
    onToggleTag: (uuid: string) => void
    hasActiveFilters: boolean
    totalCount: number
    filteredCount: number
    onClear: () => void
    onClose: () => void
}

export function NotesFilterPanel({
    allTags,
    searchText,
    onSearchChange,
    filterTypes,
    onToggleType,
    filterTagUuids,
    onToggleTag,
    hasActiveFilters,
    totalCount,
    filteredCount,
    onClear,
    onClose,
}: NotesFilterPanelProps) {
    return (
        <div className="flex flex-col gap-2.5 mb-5 p-3.5 bg-slate-900/60 border border-slate-700/50 rounded-2xl">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search notes…"
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
                {searchText && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Type toggles */}
            <div className="flex gap-1.5 flex-wrap">
                {NOTE_TYPES.map(({ type, label, Icon, hex }) => {
                    const active = filterTypes.includes(type)
                    return (
                        <button
                            key={type}
                            onClick={() => onToggleType(type)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                            style={{
                                backgroundColor: hex + (active ? '22' : '0d'),
                                borderColor:     hex + (active ? '80' : '30'),
                                color:           hex + (active ? ''   : '70'),
                            }}
                        >
                            <Icon className="w-3 h-3" />
                            {label}
                        </button>
                    )
                })}
            </div>

            {/* Tag toggles */}
            {allTags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                    {allTags.map((tag) => {
                        const active = filterTagUuids.includes(tag.uuid)
                        return (
                            <button
                                key={tag.uuid}
                                onClick={() => onToggleTag(tag.uuid)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all"
                                style={{
                                    backgroundColor: tag.color + (active ? '22' : '0d'),
                                    borderColor:     tag.color + (active ? '80' : '30'),
                                    color:           tag.color + (active ? ''   : '70'),
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: tag.color }}
                                />
                                {tag.title}
                            </button>
                        )
                    })}
                </div>
            )}

            {/* Footer: result count + actions */}
            <div className="flex items-center justify-between pt-0.5">
                <span className="text-xs text-slate-500">
                    {hasActiveFilters
                        ? `${filteredCount} of ${totalCount} ${totalCount === 1 ? 'note' : 'notes'}`
                        : `${totalCount} ${totalCount === 1 ? 'note' : 'notes'}`}
                </span>
                <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                        <button
                            onClick={onClear}
                            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
