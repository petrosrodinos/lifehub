import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Loader2, AlertTriangle, Image, Pencil, Check, X, Trash2 } from 'lucide-react';
import {
    useFlashCardGroup,
    useUpdateFlashCardGroup,
    useDeleteFlashCard,
} from '../../../features/flash-cards/hooks/use-flash-cards';
import { FlashCardPlayer } from './components/FlashCardPlayer';
import { ConfirmationModal } from '../../../components/ui/ConfirmationModal';
import { Routes } from '../../../routes/routes';
import {
    getGroupTitle,
    isGroupProcessing,
} from '../../../features/flash-cards/interfaces/flash-cards.interface';
import type { FlashCard } from '../../../features/flash-cards/interfaces/flash-cards.interface';

export function FlashCardGroupPage() {
    const { uuid } = useParams<{ uuid: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [playingCards, setPlayingCards] = useState<FlashCard[] | null>(null);
    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState('');

    const { data: group, isLoading } = useFlashCardGroup(uuid!);

    useEffect(() => {
        if (group && searchParams.get('play') === '1' && group.cards.length > 0 && !playingCards) {
            setPlayingCards(group.cards);
        }
    }, [group?.uuid, searchParams.get('play')]);
    const updateGroup = useUpdateFlashCardGroup(uuid!);

    function startEditTitle() {
        setTitleDraft(group?.user_title || group?.ai_title || '');
        setEditingTitle(true);
    }

    function cancelEdit() {
        setEditingTitle(false);
        setTitleDraft('');
    }

    function saveTitle() {
        if (!titleDraft.trim()) return cancelEdit();
        updateGroup.mutate({ user_title: titleDraft.trim() }, { onSuccess: cancelEdit });
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
            </div>
        );
    }

    if (!group) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <p className="text-slate-400 mb-4">Flash card group not found.</p>
                <button
                    onClick={() => navigate(Routes.notes.learn.prefix)}
                    className="text-sm text-violet-400 hover:text-violet-300"
                >
                    Back to Learn
                </button>
            </div>
        );
    }

    const title = getGroupTitle(group);
    const processing = isGroupProcessing(group.status);
    const canPlay = (group.status === 'COMPLETED' || group.status === 'PARTIAL') && group.cards.length > 0;

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 pt-4 pb-3 flex-shrink-0 border-b border-slate-800/60">
                <button
                    onClick={() => navigate(Routes.notes.learn.prefix)}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Learn
                </button>

                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        {editingTitle ? (
                            <div className="flex items-center gap-2">
                                <input
                                    autoFocus
                                    type="text"
                                    value={titleDraft}
                                    onChange={(e) => setTitleDraft(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') saveTitle();
                                        if (e.key === 'Escape') cancelEdit();
                                    }}
                                    maxLength={200}
                                    className="flex-1 px-2 py-1 bg-slate-800 border border-violet-500 rounded-lg text-base font-bold text-white focus:outline-none"
                                />
                                <button
                                    onClick={saveTitle}
                                    disabled={updateGroup.isPending}
                                    className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-900/20"
                                >
                                    {updateGroup.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                </button>
                                <button onClick={cancelEdit} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 group">
                                <h1 className="text-xl font-bold text-white truncate">{title}</h1>
                                <button
                                    onClick={startEditTitle}
                                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all flex-shrink-0"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}
                        <p className="text-xs text-slate-500 mt-0.5">
                            {group.cards.length} cards · {group.source_note_uuids.length} notes
                        </p>
                    </div>
                    {canPlay && (
                        <button
                            onClick={() => setPlayingCards(group.cards)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors flex-shrink-0"
                        >
                            <Play className="w-4 h-4" />
                            Play
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
                {processing && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Loader2 className="w-8 h-8 text-violet-400 animate-spin mb-4" />
                        <p className="text-slate-300 font-medium mb-1">Generating your flash cards…</p>
                        <p className="text-xs text-slate-500">This may take a minute. This page updates automatically.</p>
                    </div>
                )}

                {group.status === 'FAILED' && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <AlertTriangle className="w-8 h-8 text-red-400 mb-4" />
                        <p className="text-slate-300 font-medium mb-1">Generation failed</p>
                        <p className="text-xs text-slate-500 max-w-xs">{group.error_message || 'An error occurred during AI generation.'}</p>
                    </div>
                )}

                {(group.status === 'COMPLETED' || group.status === 'PARTIAL') && (
                    <>
                        {group.status === 'PARTIAL' && (
                            <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-amber-900/20 border border-amber-700/30 text-amber-300 text-sm">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                Some images failed to generate. Cards are still playable.
                            </div>
                        )}
                        <div className="flex flex-col gap-4">
                            {group.cards.map((card, i) => (
                                <FlashCardTile
                                    key={card.uuid}
                                    card={card}
                                    index={i}
                                    groupUuid={group.uuid}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {playingCards && (
                <FlashCardPlayer
                    cards={playingCards}
                    onClose={() => setPlayingCards(null)}
                />
            )}
        </div>
    );
}

function FlashCardTile({ card, index, groupUuid }: { card: FlashCard; index: number; groupUuid: string }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const deleteCard = useDeleteFlashCard(groupUuid);

    return (
        <>
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl overflow-hidden flex gap-3 p-3">
                {/* Thumbnail */}
                <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-800">
                    {card.image?.url ? (
                        <img
                            src={card.image.url}
                            alt={card.front}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).parentElement!.innerHTML =
                                    '<div class="w-full h-full flex items-center justify-center"><svg class="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>';
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Image className="w-5 h-5 text-slate-600" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-xs font-mono text-slate-600 flex-shrink-0">#{index + 1}</span>
                            <h3 className="text-sm font-semibold text-slate-100 truncate">{card.front}</h3>
                        </div>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="p-1 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-900/20 transition-colors flex-shrink-0"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-2">{card.back}</p>

                    {card.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {card.keywords.slice(0, 3).map((kw) => (
                                <span
                                    key={kw}
                                    className="px-1.5 py-0.5 text-xs rounded-full bg-violet-900/30 text-violet-300 border border-violet-700/40"
                                >
                                    {kw}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => {
                    deleteCard.mutate(card.uuid);
                    setShowConfirm(false);
                }}
                title="Delete flash card"
                description={`Delete "${card.front}"? This cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                isPending={deleteCard.isPending}
            />
        </>
    );
}
