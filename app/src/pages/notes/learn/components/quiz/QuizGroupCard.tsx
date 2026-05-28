import { useNavigate } from 'react-router-dom';
import { ChevronRight, Loader2, AlertTriangle, Trophy, HelpCircle } from 'lucide-react';
import { Routes } from '../../../../../routes/routes';
import {
    getQuizGroupTitle,
    isQuizGroupProcessing,
} from '../../../../../features/quizzes/interfaces/quiz.interface';
import { QUIZ_DIFFICULTY_MAP } from '../../../../../features/quizzes/constants';
import type { QuizGroupListItem } from '../../../../../features/quizzes/interfaces/quiz.interface';

interface Props {
    group: QuizGroupListItem;
}

export function QuizGroupCard({ group }: Props) {
    const navigate = useNavigate();
    const title = getQuizGroupTitle(group);
    const processing = isQuizGroupProcessing(group.status);
    const failed = group.status === 'FAILED';
    const diff = QUIZ_DIFFICULTY_MAP[group.difficulty];
    const bestScore = group.best_attempt;
    const percentage =
        bestScore && bestScore.max_score > 0
            ? Math.round((bestScore.score / bestScore.max_score) * 100)
            : null;

    return (
        <button
            type="button"
            disabled={!group.uuid}
            onClick={() => {
                if (!group.uuid) return;
                navigate(Routes.notes.learn.quiz(group.uuid));
            }}
            className="w-full text-left bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4 hover:border-slate-600/60 hover:bg-slate-800/60 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-100 truncate mb-1">{title}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${diff.color} ${diff.bg} ${diff.border}`}
                        >
                            {diff.label}
                        </span>
                        {!processing && !failed && (
                            <span className="text-xs text-slate-500">
                                {group.total_questions} questions
                            </span>
                        )}
                    </div>
                </div>

                {processing ? (
                    <Loader2 className="w-4 h-4 text-violet-400 animate-spin flex-shrink-0 mt-0.5" />
                ) : failed ? (
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0 mt-0.5 transition-colors" />
                )}
            </div>

            {/* Status / Score row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {processing && (
                        <span className="text-xs text-violet-400">Generating questions…</span>
                    )}
                    {failed && (
                        <span className="text-xs text-red-400">Generation failed</span>
                    )}
                    {!processing && !failed && percentage !== null && (
                        <div className="flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-xs text-amber-400 font-medium">
                                Best: {percentage}%
                            </span>
                        </div>
                    )}
                    {!processing && !failed && percentage === null && group._count.attempts === 0 && (
                        <span className="text-xs text-slate-500">Not attempted yet</span>
                    )}
                </div>

                {!processing && !failed && group.total_questions > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <HelpCircle className="w-3 h-3" />
                        <span>{group._count.attempts} attempt{group._count.attempts !== 1 ? 's' : ''}</span>
                    </div>
                )}
            </div>

            {/* Score progress bar */}
            {percentage !== null && (
                <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            )}
        </button>
    );
}
