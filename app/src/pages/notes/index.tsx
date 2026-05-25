import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Plus, Loader2, ChevronDown, ChevronUp, Youtube, AlertCircle, Sparkles, Wand2, Tags, Pencil, Trash2, Check, X, Search, SlidersHorizontal } from 'lucide-react'
import { useNotes, useCreateNote, useSummarizeNote, useBulkAutoTagNotes } from '../../features/notes/hooks/use-notes'
import { useNoteTags, useCreateNoteTag, useUpdateNoteTag, useDeleteNoteTag } from '../../features/notes/hooks/use-note-tags'
import { fetchYoutubeTranscript } from '../../features/notes/services/notes'
import { NOTE_TYPES, NOTE_TYPE_MAP } from '../../features/notes/constants'
import { TagSelector } from '../../components/ui/TagSelector'
import { Drawer } from '../../components/ui/Drawer'
import { ConfirmationModal } from '../../components/ui/ConfirmationModal'
import { useNotesFilter } from './hooks/use-notes-filter'
import { NotesFilterPanel } from './components/NotesFilterPanel'
import type { NoteType, NoteTag } from '../../features/notes/interfaces/note.interface'
import { Routes } from '../../routes/routes'

const TAG_COLORS = ['#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#06b6d4', '#f97316'] as const

const TYPE_MAP = NOTE_TYPE_MAP
const PREVIEW_LENGTH = 120
const MAX_VISIBLE_TAGS = 3

function NoteCardSkeleton() {
    return (
        <div className="bg-slate-900/80 border border-slate-800/50 rounded-2xl p-4 animate-pulse">
            <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 bg-slate-800 rounded" />
                    <div className="h-5 w-16 bg-slate-800 rounded-full" />
                    <div className="h-3 w-full bg-slate-800/60 rounded" />
                    <div className="h-3 w-4/5 bg-slate-800/60 rounded" />
                </div>
                <div className="h-3 w-10 bg-slate-800 rounded flex-shrink-0" />
            </div>
        </div>
    )
}

function NoteCard({
    note,
    onNavigate,
}: {
    note: { uuid: string; title: string; type: NoteType; content: string; tags: NoteTag[]; created_at: string }
    onNavigate: () => void
}) {
    const [expanded, setExpanded] = useState(false)
    const t = TYPE_MAP[note.type]
    const Icon = t.Icon
    const isLong = note.content.length > PREVIEW_LENGTH
    const displayContent = expanded || !isLong ? note.content : note.content.slice(0, PREVIEW_LENGTH) + '…'

    const visibleTags = note.tags.slice(0, MAX_VISIBLE_TAGS)
    const hiddenCount = note.tags.length - visibleTags.length

    return (
        <div className="bg-slate-900/80 border border-slate-700/50 hover:border-slate-600/60 rounded-2xl p-4 transition-all hover:bg-slate-800/60 overflow-hidden">
            <button className="w-full min-w-0 text-left" onClick={onNavigate}>
                <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${t.bg} border ${t.border}`}>
                        <Icon className={`w-4 h-4 ${t.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-white font-medium text-sm truncate">{note.title}</span>
                            <span className="text-slate-600 text-xs flex-shrink-0 ml-2">
                                {new Date(note.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        {note.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                                {visibleTags.map((tag) => (
                                    <span
                                        key={tag.uuid}
                                        className="inline-block max-w-full px-2 py-0.5 rounded-full text-xs font-medium border break-words"
                                        style={{
                                            backgroundColor: tag.color + '20',
                                            borderColor: tag.color + '50',
                                            color: tag.color,
                                        }}
                                    >
                                        {tag.title}
                                    </span>
                                ))}
                                {hiddenCount > 0 && (
                                    <span className="text-slate-500 text-xs flex-shrink-0">+{hiddenCount}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </button>

            <div className="mt-2 pl-12 min-w-0">
                <p className="text-slate-500 text-xs leading-relaxed break-words">{displayContent}</p>
                {isLong && (
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className="flex items-center gap-1 mt-1.5 text-violet-400/70 hover:text-violet-400 text-xs transition-colors"
                    >
                        {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> Show more</>}
                    </button>
                )}
            </div>
        </div>
    )
}

export function NotesPage() {
    const navigate = useNavigate()
    const { data: notes = [], isLoading } = useNotes()
    const { data: allTags = [] } = useNoteTags()
    const createMutation = useCreateNote()
    const createTagMutation = useCreateNoteTag()
    const updateTagMutation = useUpdateNoteTag()
    const deleteTagMutation = useDeleteNoteTag()
    const summarizeMutation = useSummarizeNote()
    const bulkAutoTagMutation = useBulkAutoTagNotes()

    const [title, setTitle] = useState('')
    const [selectedType, setSelectedType] = useState<NoteType>('NOTE')
    const [content, setContent] = useState('')
    const [selectedTagUuids, setSelectedTagUuids] = useState<string[]>([])
    const [summarizeAfterCreate, setSummarizeAfterCreate] = useState(true)
    const [showForm, setShowForm] = useState(false)

    // Filters
    const {
        showFilters, setShowFilters,
        searchText, setSearchText,
        filterTypes, filterTagUuids,
        hasActiveFilters,
        toggleTypeFilter, toggleTagFilter,
        clearFilters, closeFilters,
        filteredNotes,
    } = useNotesFilter(notes, allTags)

    // Tags panel
    const [showTagsPanel, setShowTagsPanel] = useState(false)
    const [editingTagUuid, setEditingTagUuid] = useState<string | null>(null)
    const [tagToDelete, setTagToDelete] = useState<NoteTag | null>(null)
    const [editTagTitle, setEditTagTitle] = useState('')
    const [editTagColor, setEditTagColor] = useState<string>(TAG_COLORS[0])
    const [newTagTitle, setNewTagTitle] = useState('')
    const [newTagColor, setNewTagColor] = useState<string>(TAG_COLORS[0])
    const [showNewTagForm, setShowNewTagForm] = useState(false)

    function startEditTag(tag: NoteTag) {
        setEditingTagUuid(tag.uuid)
        setEditTagTitle(tag.title)
        setEditTagColor(tag.color as typeof TAG_COLORS[number])
    }

    function cancelEditTag() {
        setEditingTagUuid(null)
    }

    async function saveEditTag() {
        if (!editingTagUuid || !editTagTitle.trim()) return
        await updateTagMutation.mutateAsync({ uuid: editingTagUuid, data: { title: editTagTitle.trim(), color: editTagColor } })
        setEditingTagUuid(null)
    }

    async function handleCreateTag() {
        if (!newTagTitle.trim()) return
        await createTagMutation.mutateAsync({ title: newTagTitle.trim(), color: newTagColor })
        setNewTagTitle('')
        setNewTagColor(TAG_COLORS[0])
        setShowNewTagForm(false)
    }

    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [isFetchingTranscript, setIsFetchingTranscript] = useState(false)
    const [fetchError, setFetchError] = useState('')

    function handleTypeChange(type: NoteType) {
        setSelectedType(type)
        if (type !== 'VIDEO') {
            setYoutubeUrl('')
            setFetchError('')
        }
    }

    async function handleFetchTranscript() {
        if (!youtubeUrl.trim()) return
        setIsFetchingTranscript(true)
        setFetchError('')
        try {
            const result = await fetchYoutubeTranscript(youtubeUrl.trim())
            setContent(result.transcript)
            if (!title.trim() && result.title) setTitle(result.title)
            setYoutubeUrl('')
        } catch (err) {
            setFetchError(err instanceof Error ? err.message : 'Failed to fetch transcript')
        } finally {
            setIsFetchingTranscript(false)
        }
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        if (!content.trim()) return
        const note = await createMutation.mutateAsync({
            ...(title.trim() ? { title: title.trim() } : {}),
            type: selectedType,
            content: content.trim(),
            tag_uuids: selectedTagUuids.length ? selectedTagUuids : undefined,
        })
        if (summarizeAfterCreate) {
            summarizeMutation.mutate(note.uuid)
        }
        navigate(Routes.notes.detail(note.uuid))
    }

    return (
        <div className="min-h-full pb-24">
            <div className="px-4 pt-6 pb-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Notes</h1>
                        <p className="text-slate-400 text-sm mt-0.5">{notes.length} saved {notes.length === 1 ? 'note' : 'notes'}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 w-full sm:flex sm:w-auto sm:items-center">
                        <button
                            onClick={() => bulkAutoTagMutation.mutate()}
                            disabled={bulkAutoTagMutation.isPending || notes.length === 0}
                            title="Auto-tag all untagged notes with AI"
                            className="flex min-w-0 items-center justify-center gap-1 h-9 px-2 sm:px-3 sm:shrink-0 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs sm:text-sm font-medium transition-all"
                        >
                            {bulkAutoTagMutation.isPending
                                ? <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
                                : <Wand2 className="w-4 h-4 shrink-0" />
                            }
                            <span className="truncate hidden sm:inline">
                                {bulkAutoTagMutation.isPending ? 'Tagging…' : 'Auto-tag'}
                            </span>
                        </button>
                        <button
                            onClick={() => setShowTagsPanel(true)}
                            className="flex min-w-0 items-center justify-center gap-1 h-9 px-2 sm:px-3 sm:shrink-0 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-all"
                        >
                            <Tags className="w-4 h-4 shrink-0" />
                            <span className="truncate hidden sm:inline">Tags</span>
                            {allTags.length > 0 && (
                                <span className="shrink-0 text-xs text-slate-500 tabular-nums">{allTags.length}</span>
                            )}
                        </button>
                        <button
                            onClick={() => setShowFilters((v) => !v)}
                            title="Toggle filters"
                            className={`relative flex min-w-0 items-center justify-center gap-1 h-9 px-2 sm:px-3 sm:shrink-0 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                                showFilters
                                    ? 'bg-violet-600/20 border border-violet-500/40 text-violet-400'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                            }`}
                        >
                            <SlidersHorizontal className="w-4 h-4 shrink-0" />
                            <span className="truncate hidden sm:inline">Filter</span>
                            {hasActiveFilters && (
                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 sm:hidden" />
                            )}
                        </button>
                        <button
                            onClick={() => setShowForm((v) => !v)}
                            className="flex min-w-0 items-center justify-center gap-1 h-9 px-2 sm:px-4 sm:shrink-0 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-medium transition-all shadow-lg shadow-violet-600/25"
                        >
                            <Plus className="w-4 h-4 shrink-0" />
                            <span className="truncate hidden sm:inline">New note</span>
                        </button>
                    </div>
                </div>

                {/* Filters panel — hidden by default */}
                {showFilters && (
                    <NotesFilterPanel
                        allTags={allTags}
                        searchText={searchText}
                        onSearchChange={setSearchText}
                        filterTypes={filterTypes}
                        onToggleType={toggleTypeFilter}
                        filterTagUuids={filterTagUuids}
                        onToggleTag={toggleTagFilter}
                        hasActiveFilters={hasActiveFilters}
                        totalCount={notes.length}
                        filteredCount={filteredNotes.length}
                        onClear={clearFilters}
                        onClose={closeFilters}
                    />
                )}

                {showForm && (
                    <form onSubmit={handleCreate} className="mb-6 bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-5">
                        <h2 className="text-white font-semibold mb-4">New note</h2>

                        <input
                            type="text"
                            placeholder="Title (optional — AI will generate from content)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/60 transition-colors mb-4"
                        />

                        <div className="grid grid-cols-5 gap-2 mb-4">
                            {NOTE_TYPES.map(({ type, label, Icon, color, bg, border }) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleTypeChange(type)}
                                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                                        selectedType === type
                                            ? `${bg} ${border} ${color}`
                                            : 'bg-slate-800/40 border-slate-700/40 text-slate-500 hover:border-slate-600/60 hover:text-slate-300'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="text-xs font-medium">{label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mb-4">
                            <TagSelector
                                selectedTagUuids={selectedTagUuids}
                                onChange={setSelectedTagUuids}
                                allTags={allTags}
                                onCreateTag={(data) => createTagMutation.mutateAsync(data)}
                                isCreating={createTagMutation.isPending}
                            />
                        </div>

                        {selectedType === 'VIDEO' && (
                            <div className="mb-4">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400/50" />
                                        <input
                                            type="url"
                                            placeholder="https://youtube.com/watch?v=..."
                                            value={youtubeUrl}
                                            onChange={(e) => { setYoutubeUrl(e.target.value); setFetchError('') }}
                                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleFetchTranscript() } }}
                                            disabled={isFetchingTranscript}
                                            className="w-full bg-slate-800/60 border border-rose-400/20 focus:border-rose-400/40 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors disabled:opacity-50"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleFetchTranscript}
                                        disabled={!youtubeUrl.trim() || isFetchingTranscript}
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-400/20 text-rose-400 text-sm font-medium hover:bg-rose-500/20 hover:border-rose-400/35 disabled:opacity-35 disabled:cursor-not-allowed transition-all"
                                    >
                                        {isFetchingTranscript
                                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            : <Youtube className="w-3.5 h-3.5" />
                                        }
                                        Fetch
                                    </button>
                                </div>
                                {fetchError && (
                                    <div className="flex items-center gap-1.5 mt-2 text-rose-400 text-xs">
                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                        {fetchError}
                                    </div>
                                )}
                            </div>
                        )}

                        <textarea
                            placeholder={selectedType === 'VIDEO' ? 'Transcript will appear here, or write your own notes…' : 'Write your note here...'}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            disabled={isFetchingTranscript}
                            className={`w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/60 transition-colors resize-none mb-4 ${isFetchingTranscript ? 'animate-pulse opacity-50' : ''}`}
                            required
                        />

                        <label className="flex items-center gap-2.5 mb-4 cursor-pointer select-none group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={summarizeAfterCreate}
                                    onChange={(e) => setSummarizeAfterCreate(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded border-2 transition-colors flex items-center justify-center ${summarizeAfterCreate ? 'bg-violet-600 border-violet-600' : 'bg-transparent border-slate-600 group-hover:border-slate-500'}`}>
                                    {summarizeAfterCreate && (
                                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="flex items-center gap-1.5 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                                Summarize with AI after saving
                            </span>
                        </label>

                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={createMutation.isPending}
                                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium transition-all"
                            >
                                {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="px-4">
                {isLoading ? (
                    <div className="grid gap-3">
                        {Array.from({ length: 4 }).map((_, i) => <NoteCardSkeleton key={i} />)}
                    </div>
                ) : notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-4">
                            <FileText className="w-7 h-7 text-slate-600" />
                        </div>
                        <p className="text-slate-400 font-medium">No notes yet</p>
                        <p className="text-slate-600 text-sm mt-1">Create your first note above</p>
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-4">
                            <Search className="w-7 h-7 text-slate-600" />
                        </div>
                        <p className="text-slate-400 font-medium">No notes match your filters</p>
                        <button onClick={clearFilters} className="text-violet-400 hover:text-violet-300 text-sm mt-2 transition-colors">
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note.uuid}
                                note={note}
                                onNavigate={() => navigate(Routes.notes.detail(note.uuid))}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={!!tagToDelete}
                onClose={() => setTagToDelete(null)}
                onConfirm={() => {
                    if (tagToDelete) deleteTagMutation.mutate(tagToDelete.uuid)
                    setTagToDelete(null)
                }}
                title="Delete tag"
                description={`"${tagToDelete?.title}" will be removed from all notes. This action cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                isPending={deleteTagMutation.isPending}
            />

            {/* Tags management drawer */}
            <Drawer
                isOpen={showTagsPanel}
                onClose={() => { setShowTagsPanel(false); setEditingTagUuid(null); setShowNewTagForm(false) }}
                title={<span className="flex items-center gap-2"><Tags className="w-4 h-4 text-violet-400" />Tags</span>}
            >
                <div className="flex flex-col gap-1 p-4">
                    {allTags.length === 0 && !showNewTagForm && (
                        <p className="text-slate-500 text-sm text-center py-6">No tags yet. Create your first one below.</p>
                    )}

                    {allTags.map((tag) => (
                        <div key={tag.uuid} className="rounded-xl bg-slate-800/50 border border-slate-700/40 overflow-hidden">
                            {editingTagUuid === tag.uuid ? (
                                <div className="p-3 space-y-2.5">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={editTagTitle}
                                        onChange={(e) => setEditTagTitle(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') saveEditTag(); if (e.key === 'Escape') cancelEditTag() }}
                                        className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 transition-colors"
                                    />
                                    <div className="flex gap-1.5 flex-wrap">
                                        {TAG_COLORS.map((color) => (
                                            <button key={color} type="button" onClick={() => setEditTagColor(color)}
                                                className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${editTagColor === color ? 'border-white scale-110' : 'border-slate-700'}`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
                                            style={{ backgroundColor: editTagColor + '20', borderColor: editTagColor + '50', color: editTagColor }}>
                                            {editTagTitle || 'Preview'}
                                        </span>
                                        <div className="flex gap-1.5">
                                            <button onClick={cancelEditTag}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition-colors">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={saveEditTag}
                                                disabled={!editTagTitle.trim() || updateTagMutation.isPending}
                                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs transition-colors">
                                                {updateTagMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 px-3 py-2.5">
                                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: tag.color }} />
                                    <span className="flex-1 text-sm font-medium truncate" style={{ color: tag.color }}>
                                        {tag.title}
                                    </span>
                                    <div className="flex gap-1 flex-shrink-0">
                                        <button onClick={() => startEditTag(tag)}
                                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition-colors">
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => setTagToDelete(tag)}
                                            disabled={deleteTagMutation.isPending && deleteTagMutation.variables === tag.uuid}
                                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 disabled:opacity-40 transition-colors">
                                            {deleteTagMutation.isPending && deleteTagMutation.variables === tag.uuid
                                                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                : <Trash2 className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {showNewTagForm ? (
                        <div className="mt-2 rounded-xl bg-slate-800/50 border border-violet-500/20 p-3 space-y-2.5">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Tag name"
                                value={newTagTitle}
                                onChange={(e) => setNewTagTitle(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleCreateTag(); if (e.key === 'Escape') { setShowNewTagForm(false); setNewTagTitle('') } }}
                                className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 transition-colors"
                            />
                            <div className="flex gap-1.5 flex-wrap">
                                {TAG_COLORS.map((color) => (
                                    <button key={color} type="button" onClick={() => setNewTagColor(color)}
                                        className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${newTagColor === color ? 'border-white scale-110' : 'border-slate-700'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                {newTagTitle ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
                                        style={{ backgroundColor: newTagColor + '20', borderColor: newTagColor + '50', color: newTagColor }}>
                                        {newTagTitle}
                                    </span>
                                ) : <span />}
                                <div className="flex gap-1.5">
                                    <button onClick={() => { setShowNewTagForm(false); setNewTagTitle('') }}
                                        className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white text-xs transition-colors">
                                        Cancel
                                    </button>
                                    <button onClick={handleCreateTag}
                                        disabled={!newTagTitle.trim() || createTagMutation.isPending}
                                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs transition-colors">
                                        {createTagMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowNewTagForm(true)}
                            className="mt-2 flex items-center gap-2 w-full px-3 py-2.5 rounded-xl border border-dashed border-slate-700/60 hover:border-violet-500/40 text-slate-500 hover:text-violet-400 text-sm transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            New tag
                        </button>
                    )}
                </div>
            </Drawer>
        </div>
    )
}
