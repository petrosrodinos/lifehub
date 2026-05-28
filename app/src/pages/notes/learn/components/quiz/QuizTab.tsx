import { useState } from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { useQuizGroups } from '../../../../../features/quizzes/hooks/use-quiz-groups';
import { QuizGroupCard } from './QuizGroupCard';
import { CreateQuizModal } from './CreateQuizModal';

export function QuizTab() {
    const [showCreate, setShowCreate] = useState(false);
    const { data: groups = [], isLoading } = useQuizGroups();

    return (
        <>
            <div className="flex items-center justify-between pt-3 pb-2">
                <span className="text-xs text-slate-500">
                    {groups.length > 0 && `${groups.length} quiz${groups.length !== 1 ? 'zes' : ''}`}
                </span>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                >
                    <Plus className="w-3.5 h-3.5" />
                    New Quiz
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-28 bg-slate-800/50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : groups.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/50 flex items-center justify-center mb-4">
                        <HelpCircle className="w-7 h-7 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">No quizzes yet</h3>
                    <p className="text-sm text-slate-500 max-w-xs mb-5">
                        Select your notes and let AI generate an interactive quiz to test your knowledge.
                    </p>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create your first quiz
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {groups.map((group) => (
                        <QuizGroupCard key={group.uuid} group={group} />
                    ))}
                </div>
            )}

            <CreateQuizModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
        </>
    );
}
