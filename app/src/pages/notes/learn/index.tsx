import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, ArrowLeft } from 'lucide-react';
import { useFlashCardGroups } from '../../../features/flash-cards/hooks/use-flash-cards';
import { FlashCardGroupCard } from './components/FlashCardGroupCard';
import { FlashCardGroupSkeleton } from './components/FlashCardGroupSkeleton';
import { CreateFlashCardGroupModal } from './components/CreateFlashCardGroupModal';
import { QuizzesPlaceholder } from './components/QuizzesPlaceholder';
import { Routes } from '../../../routes/routes';

type Tab = 'flashcards' | 'quizzes';

export function LearnPage() {
    const navigate = useNavigate();
    const [tab, setTab] = useState<Tab>('flashcards');
    const [showCreate, setShowCreate] = useState(false);
    const { data: groups = [], isLoading } = useFlashCardGroups();

    function handlePlay(uuid: string) {
        navigate(Routes.notes.learn.cards(uuid) + '?play=1');
    }

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 pt-4 pb-2 flex-shrink-0">
                <button
                    onClick={() => navigate(Routes.notes.prefix)}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Notes
                </button>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Learn</h1>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Flash Cards
                    </button>
                </div>

                <div className="flex gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
                    {(['flashcards', 'quizzes'] as Tab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                                tab === t
                                    ? 'bg-slate-700 text-slate-100'
                                    : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {t === 'flashcards' ? 'Flash Cards' : 'Quizzes'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
                {tab === 'flashcards' ? (
                    isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                            {[1, 2, 3].map((i) => <FlashCardGroupSkeleton key={i} />)}
                        </div>
                    ) : groups.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/50 flex items-center justify-center mb-4">
                                <BookOpen className="w-7 h-7 text-slate-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-300 mb-2">No flash cards yet</h3>
                            <p className="text-sm text-slate-500 max-w-xs mb-5">
                                Select your notes and let AI generate interactive flash cards for you.
                            </p>
                            <button
                                onClick={() => setShowCreate(true)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Create your first deck
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                            {groups.map((group) => (
                                <FlashCardGroupCard
                                    key={group.uuid}
                                    group={group}
                                    onPlay={handlePlay}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    <QuizzesPlaceholder />
                )}
            </div>

            <CreateFlashCardGroupModal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
            />
        </div>
    );
}
