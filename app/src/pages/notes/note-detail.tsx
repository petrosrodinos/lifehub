import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {
    ArrowLeft, Pencil, Trash2, Save, X, Loader2, Sparkles,
    BookOpen, Lightbulb, StickyNote, Video, Newspaper, MessageSquare,
} from 'lucide-react'
import { useNote, useUpdateNote, useDeleteNote, useSummarizeNote } from '../../features/notes/hooks/use-notes'
import { useNoteTags, useCreateNoteTag } from '../../features/notes/hooks/use-note-tags'
import { useNoteConversation, useSendNoteMessage } from '../../features/notes/hooks/use-note-chat'
import type { NoteType } from '../../features/notes/interfaces/note.interface'
import type { DisplayMessage } from '../../features/assistant/interfaces/chat.interface'
import { ConfirmationModal } from '../../components/ui/ConfirmationModal'
import { TagSelector } from '../../components/ui/TagSelector'
import { Drawer } from '../../components/ui/Drawer'
import { ChatMessageList } from '../../components/chat/ChatMessageList'
import { ChatComposer } from '../../components/chat/ChatComposer'
import { Routes } from '../../routes/routes'

const NOTE_TYPES: { type: NoteType; label: string; Icon: typeof BookOpen; color: string; bg: string; border: string }[] = [
    { type: 'BOOK', label: 'Book', Icon: BookOpen, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
    { type: 'IDEA', label: 'Idea', Icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
    { type: 'NOTE', label: 'Note', Icon: StickyNote, color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/30' },
    { type: 'VIDEO', label: 'Video', Icon: Video, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30' },
    { type: 'ARTICLE', label: 'Article', Icon: Newspaper, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30' },
]

const TYPE_MAP = Object.fromEntries(NOTE_TYPES.map((t) => [t.type, t]))

function NoteDetailSkeleton() {
    return (
        <div className="min-h-full pb-28 animate-pulse">
            <div className="sticky top-0 bg-slate-950/95 border-b border-slate-800/60 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-slate-800 rounded" />
                    <div className="flex gap-2">
                        <div className="h-8 w-16 bg-slate-800 rounded-lg" />
                        <div className="h-8 w-8 bg-slate-800 rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="px-4 pt-5 space-y-4">
                <div className="h-10 w-full bg-slate-800/60 rounded-xl" />
                <div className="h-5 w-20 bg-slate-800 rounded-full" />
                <div className="h-7 w-3/4 bg-slate-800 rounded" />
                <div className="h-3 w-24 bg-slate-800/50 rounded" />
                <div className="space-y-2 pt-2">
                    <div className="h-3.5 w-full bg-slate-800/60 rounded" />
                    <div className="h-3.5 w-full bg-slate-800/60 rounded" />
                    <div className="h-3.5 w-5/6 bg-slate-800/60 rounded" />
                    <div className="h-3.5 w-full bg-slate-800/60 rounded" />
                    <div className="h-3.5 w-2/3 bg-slate-800/60 rounded" />
                </div>
            </div>
        </div>
    )
}

export function NoteDetailPage() {
    const { uuid = '' } = useParams<{ uuid: string }>()
    const navigate = useNavigate()
    const { data: note, isLoading } = useNote(uuid)
    const { data: allTags = [] } = useNoteTags()
    const updateMutation = useUpdateNote()
    const deleteMutation = useDeleteNote()
    const summarizeMutation = useSummarizeNote()
    const createTagMutation = useCreateNoteTag()

    // Note chat
    const { data: noteConversationData } = useNoteConversation(uuid)
    const sendNoteMessage = useSendNoteMessage(uuid)
    const hasConversation = !!noteConversationData?.conversation
    const [showComposer, setShowComposer] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editType, setEditType] = useState<NoteType>('NOTE')
    const [editContent, setEditContent] = useState('')
    const [editTagUuids, setEditTagUuids] = useState<string[]>([])
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    function startEditing() {
        if (!note) return
        setEditTitle(note.title)
        setEditType(note.type)
        setEditContent(note.content)
        setEditTagUuids(note.tags.map((t) => t.uuid))
        setIsEditing(true)
    }

    function cancelEditing() {
        setIsEditing(false)
    }

    async function handleSave() {
        if (!note) return
        await updateMutation.mutateAsync({
            uuid: note.uuid,
            data: {
                title: editTitle.trim(),
                type: editType,
                content: editContent.trim(),
                tag_uuids: editTagUuids,
            },
        })
        setIsEditing(false)
    }

    async function handleDelete() {
        if (!note) return
        await deleteMutation.mutateAsync(note.uuid)
    }

    async function handleSummarize() {
        await summarizeMutation.mutateAsync(uuid)
    }

    async function handleSendNoteMessage(content: string) {
        await sendNoteMessage.mutateAsync(content)
        // After the first send, hide the inline composer and open the drawer
        setShowComposer(false)
        setDrawerOpen(true)
    }

    async function handleContinueDiscussion(content: string) {
        await sendNoteMessage.mutateAsync(content)
    }

    const drawerDisplayMessages: DisplayMessage[] = useMemo(() => {
        const messages = noteConversationData?.messages ?? []
        return messages.map((m) => ({
            ...m,
            status: m.uuid.startsWith('pending-assistant-') ? ('pending' as const) : ('complete' as const),
        }))
    }, [noteConversationData])

    if (isLoading) return <NoteDetailSkeleton />

    if (!note) {
        return (
            <div className="flex flex-col items-center justify-center min-h-full pt-16 text-center px-4">
                <p className="text-slate-400">Note not found</p>
                <button onClick={() => navigate(Routes.notes.prefix)} className="text-violet-400 text-sm mt-2 hover:underline">
                    Back to notes
                </button>
            </div>
        )
    }

    const typeInfo = TYPE_MAP[isEditing ? editType : note.type]
    const TypeIcon = typeInfo.Icon

    return (
        <div className="min-h-full pb-28">
            <style>{`
                .prose-notes h1,.prose-notes h2,.prose-notes h3{color:#f1f5f9;font-weight:600;margin-top:1.2em;margin-bottom:.5em}
                .prose-notes h1{font-size:1.1rem}
                .prose-notes h2{font-size:1rem}
                .prose-notes h3{font-size:.9rem}
                .prose-notes p{color:#94a3b8;font-size:.875rem;line-height:1.7;margin-bottom:.75em}
                .prose-notes ul,.prose-notes ol{color:#94a3b8;font-size:.875rem;line-height:1.7;padding-left:1.4em;margin-bottom:.75em}
                .prose-notes li{margin-bottom:.3em}
                .prose-notes strong{color:#e2e8f0;font-weight:600}
                .prose-notes em{color:#cbd5e1}
                .prose-notes code{background:rgba(139,92,246,.15);color:#a78bfa;padding:.1em .4em;border-radius:4px;font-size:.8em}
                .prose-notes blockquote{border-left:2px solid rgba(139,92,246,.4);padding-left:1em;color:#94a3b8;font-style:italic}
                .prose-notes hr{border-color:rgba(71,85,105,.4);margin:1em 0}
            `}</style>

            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800/60 px-4 py-3">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(Routes.notes.prefix)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Notes</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={cancelEditing}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-sm transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={updateMutation.isPending}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium transition-all"
                                >
                                    {updateMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                {/* AI discussion button */}
                                {hasConversation ? (
                                    <button
                                        onClick={() => setDrawerOpen(true)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 text-sm transition-colors border border-violet-500/30"
                                    >
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        Discussion
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setShowComposer((prev) => !prev)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Discuss
                                    </button>
                                )}
                                <button
                                    onClick={startEditing}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 text-sm transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Inline AI composer – shown when "Discuss" is clicked and no chat exists yet */}
                {showComposer && !hasConversation && (
                    <div className="mt-3">
                        <ChatComposer
                            onSend={handleSendNoteMessage}
                            disabled={false}
                            isPending={sendNoteMessage.isPending}
                            placeholder="Ask something about this note…"
                            variant="inline"
                        />
                    </div>
                )}
            </div>

            <div className="px-4 pt-5">
                {/* Type + tags (view) / type grid + TagSelector (edit) */}
                {isEditing ? (
                    <>
                        <div className="grid grid-cols-5 gap-2 mb-4">
                            {NOTE_TYPES.map(({ type, label, Icon, color, bg, border }) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setEditType(type)}
                                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all ${
                                        editType === type
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
                                selectedTagUuids={editTagUuids}
                                onChange={setEditTagUuids}
                                allTags={allTags}
                                onCreateTag={(data) => createTagMutation.mutateAsync(data)}
                                isCreating={createTagMutation.isPending}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${typeInfo.color} ${typeInfo.bg} border ${typeInfo.border}`}>
                            <TypeIcon className="w-3.5 h-3.5" />
                            {typeInfo.label}
                        </span>
                        {note.tags.map((tag) => (
                            <span
                                key={tag.uuid}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                                style={{
                                    backgroundColor: tag.color + '20',
                                    borderColor: tag.color + '50',
                                    color: tag.color,
                                }}
                            >
                                {tag.title}
                            </span>
                        ))}
                    </div>
                )}

                {/* AI summary — view mode only */}
                {!isEditing && (
                    <div className="mb-5">
                        {!note.summary && (
                            <button
                                onClick={handleSummarize}
                                disabled={summarizeMutation.isPending}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white text-sm font-medium transition-all shadow-lg shadow-violet-600/20"
                            >
                                {summarizeMutation.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Sparkles className="w-4 h-4" />
                                )}
                                {summarizeMutation.isPending ? 'Summarizing…' : 'Summarize with AI'}
                            </button>
                        )}

                        {note.summary && (
                            <div className="bg-slate-900/60 border border-violet-500/20 rounded-2xl p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-4 h-4 text-violet-400" />
                                    <span className="text-violet-400 text-sm font-medium">AI Summary</span>
                                </div>
                                <div className="prose-notes">
                                    <ReactMarkdown>{note.summary}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Title */}
                {isEditing ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-transparent text-2xl font-bold text-white placeholder-slate-600 focus:outline-none mb-5 border-b border-slate-700/60 pb-2"
                        placeholder="Title"
                    />
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-white mb-1">{note.title}</h1>
                        <p className="text-slate-600 text-xs mb-5">
                            {new Date(note.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            {note.updated_at !== note.created_at && ' · edited'}
                        </p>
                    </>
                )}

                {/* Content */}
                {isEditing ? (
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={12}
                        className="w-full bg-slate-800/40 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-violet-500/60 transition-colors resize-none leading-relaxed"
                        placeholder="Write your note here..."
                    />
                ) : (
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                )}
            </div>

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="Delete note"
                description="This note will be permanently deleted. This action cannot be undone."
                confirmText="Delete"
                variant="danger"
                isPending={deleteMutation.isPending}
            />

            {/* Note Discussion Drawer */}
            <Drawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title={
                    <span className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-violet-400" />
                        Note Discussion
                    </span>
                }
                rawContent
            >
                <ChatMessageList
                    messages={drawerDisplayMessages}
                    isLoading={sendNoteMessage.isPending && drawerDisplayMessages.length === 0}
                    emptySubtitle="Ask a question or share your thoughts about this note."
                />
                <ChatComposer
                    onSend={handleContinueDiscussion}
                    disabled={false}
                    isPending={sendNoteMessage.isPending}
                    placeholder="Continue the discussion…"
                    variant="inline"
                />
            </Drawer>
        </div>
    )
}
