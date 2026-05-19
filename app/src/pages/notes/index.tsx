import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Lightbulb, FileText, Video, Newspaper, Plus, Loader2, StickyNote, ChevronDown, ChevronUp, Youtube, AlertCircle } from 'lucide-react'
import { useNotes, useCreateNote } from '../../features/notes/hooks/use-notes'
import { fetchYoutubeTranscript } from '../../features/notes/services/notes'
import type { NoteType } from '../../features/notes/interfaces/note.interface'
import { Routes } from '../../routes/routes'

const NOTE_TYPES: { type: NoteType; label: string; Icon: typeof BookOpen; color: string; bg: string; border: string }[] = [
    { type: 'BOOK', label: 'Book', Icon: BookOpen, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
    { type: 'IDEA', label: 'Idea', Icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
    { type: 'NOTE', label: 'Note', Icon: StickyNote, color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/30' },
    { type: 'VIDEO', label: 'Video', Icon: Video, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30' },
    { type: 'ARTICLE', label: 'Article', Icon: Newspaper, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30' },
]

const TYPE_MAP = Object.fromEntries(NOTE_TYPES.map((t) => [t.type, t]))
const PREVIEW_LENGTH = 120

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

function NoteCard({ note, onNavigate }: { note: { uuid: string; title: string; type: NoteType; content: string; created_at: string }; onNavigate: () => void }) {
    const [expanded, setExpanded] = useState(false)
    const t = TYPE_MAP[note.type]
    const Icon = t.Icon
    const isLong = note.content.length > PREVIEW_LENGTH
    const displayContent = expanded || !isLong ? note.content : note.content.slice(0, PREVIEW_LENGTH) + '…'

    return (
        <div className="bg-slate-900/80 border border-slate-700/50 hover:border-slate-600/60 rounded-2xl p-4 transition-all hover:bg-slate-800/60">
            <button className="w-full text-left" onClick={onNavigate}>
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
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${t.color} ${t.bg} border ${t.border}`}>
                            <Icon className="w-3 h-3" />
                            {t.label}
                        </span>
                    </div>
                </div>
            </button>

            <div className="mt-2 pl-12">
                <p className="text-slate-500 text-xs leading-relaxed">{displayContent}</p>
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
    const createMutation = useCreateNote()

    const [title, setTitle] = useState('')
    const [selectedType, setSelectedType] = useState<NoteType>('NOTE')
    const [content, setContent] = useState('')
    const [showForm, setShowForm] = useState(false)

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
        if (!title.trim() || !content.trim()) return
        await createMutation.mutateAsync({ title: title.trim(), type: selectedType, content: content.trim() })
        setTitle('')
        setContent('')
        setSelectedType('NOTE')
        setYoutubeUrl('')
        setFetchError('')
        setShowForm(false)
    }

    return (
        <div className="min-h-full pb-24">
            <div className="px-4 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Notes</h1>
                        <p className="text-slate-400 text-sm mt-0.5">{notes.length} saved {notes.length === 1 ? 'note' : 'notes'}</p>
                    </div>
                    <button
                        onClick={() => setShowForm((v) => !v)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-600/25"
                    >
                        <Plus className="w-4 h-4" />
                        New note
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleCreate} className="mb-6 bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-5">
                        <h2 className="text-white font-semibold mb-4">New note</h2>

                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/60 transition-colors mb-4"
                            required
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
                ) : (
                    <div className="grid gap-3">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.uuid}
                                note={note}
                                onNavigate={() => navigate(Routes.notes.detail(note.uuid))}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
