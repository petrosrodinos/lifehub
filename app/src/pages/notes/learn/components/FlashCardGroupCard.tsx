import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trash2, Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal';
import { useDeleteFlashCardGroup } from '../../../../features/flash-cards/hooks/use-flash-cards';
import type { FlashCardGroupListItem } from '../../../../features/flash-cards/interfaces/flash-cards.interface';
import { getGroupTitle, isGroupProcessing } from '../../../../features/flash-cards/interfaces/flash-cards.interface';
import { Routes } from '../../../../routes/routes';

interface Props {
    group: FlashCardGroupListItem;
    onPlay: (uuid: string) => void;
}

function StatusBadge({ status }: { status: FlashCardGroupListItem['status'] }) {
    if (status === 'PENDING' || status === 'PROCESSING') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 bg-violet-900/30 border border-violet-700/40 px-2 py-0.5 rounded-full">
                <Loader2 className="w-3 h-3 animate-spin" />
                Generating…
            </span>
        );
    }
    if (status === 'COMPLETED') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-900/30 border border-emerald-700/40 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                Ready
            </span>
        );
    }
    if (status === 'PARTIAL') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-900/30 border border-amber-700/40 px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                Partial
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-900/30 border border-red-700/40 px-2 py-0.5 rounded-full">
            <XCircle className="w-3 h-3" />
            Failed
        </span>
    );
}

export function FlashCardGroupCard({ group, onPlay }: Props) {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const deleteGroup = useDeleteFlashCardGroup();

    const title = getGroupTitle(group);
    const processing = isGroupProcessing(group.status);
    const coverImage = group.cards[0]?.image?.url;
    const cardCount = group._count?.cards ?? group.total_cards;

    return (
        <>
            <div
                className="bg-slate-900/80 border border-slate-700/50 hover:border-slate-600/60 rounded-2xl overflow-hidden transition-all hover:bg-slate-800/60 cursor-pointer"
                onClick={() => navigate(Routes.notes.learn.cards(group.uuid))}
            >
                <div className="h-40 bg-slate-800 relative overflow-hidden">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            {processing ? (
                                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                            ) : (
                                <div className="text-4xl">🃏</div>
                            )}
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <StatusBadge status={group.status} />
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-slate-100 truncate mb-1">{title}</h3>
                    <p className="text-xs text-slate-500 mb-3">
                        {processing ? 'Generating your flash cards…' : `${cardCount} cards · ${group.source_note_uuids.length} notes`}
                    </p>

                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => onPlay(group.uuid)}
                            disabled={processing || group.status === 'FAILED'}
                            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                        >
                            <Play className="w-3.5 h-3.5" />
                            Play
                        </button>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => {
                    deleteGroup.mutate(group.uuid);
                    setShowConfirm(false);
                }}
                title="Delete flash card group"
                description={`Delete "${title}" and all its ${cardCount} cards? This cannot be undone.`}
                confirmText="Delete"
                variant="danger"
            />
        </>
    );
}
