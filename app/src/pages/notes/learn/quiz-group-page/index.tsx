import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Play,
    Loader2,
    AlertTriangle,
    Pencil,
    Check,
    X,
    Trash2,
    FileText,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    Trophy,
    Clock,
} from 'lucide-react';
import {
    useQuizGroup,
    useUpdateQuizGroup,
    useDeleteQuizGroup,
    useDeleteQuizQuestion,
    useStartQuizAttempt,
} from '../../../../features/quizzes/hooks/use-quiz-groups';
import { useNotes } from '../../../../features/notes/hooks/use-notes';
import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal';
import { Routes } from '../../../../routes/routes';
import {
    getQuizGroupTitle,
    isQuizGroupProcessing,
} from '../../../../features/quizzes/interfaces/quiz.interface';
import { QUIZ_DIFFICULTY_MAP } from '../../../../features/quizzes/constants';
import { QuizPlayer } from './components/QuizPlayer';
import type {
    CompleteAttemptResponse,
    QuizAttempt,
    QuizQuestion,
    StartAttemptResponse,
} from '../../../../features/quizzes/interfaces/quiz.interface';

export function QuizGroupPage() {
    const { uuid } = useParams<{ uuid: string }>();
    const navigate = useNavigate();

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState('');
    const [activeAttempt, setActiveAttempt] = useState<StartAttemptResponse | null>(null);
    const [lastResult, setLastResult] = useState<CompleteAttemptResponse | null>(null);
    const [confirmDeleteGroup, setConfirmDeleteGroup] = useState(false);

    const { data: group, isLoading } = useQuizGroup(uuid!);
    const { data: allNotes = [] } = useNotes();
    const sourceNotes = allNotes.filter((n) => group?.source_note_uuids.includes(n.uuid));

    const updateGroup = useUpdateQuizGroup(uuid!);
    const deleteGroup = useDeleteQuizGroup();
    const startAttempt = useStartQuizAttempt();

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

    function handleDeleteGroup() {
        deleteGroup.mutate(uuid!, {
            onSuccess: () => navigate(Routes.notes.learn.prefix),
        });
    }

    function handleStartQuiz() {
        startAttempt.mutate(uuid!, {
            onSuccess: (data) => {
                setLastResult(null);
                setActiveAttempt(data);
            },
        });
    }

    function handleQuizComplete(result: CompleteAttemptResponse) {
        setLastResult(result);
    }

    function handlePlayerClose() {
        setActiveAttempt(null);
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
                <p className="text-slate-400 mb-4">Quiz not found.</p>
                <button
                    onClick={() => navigate(Routes.notes.learn.prefix)}
                    className="text-sm text-violet-400 hover:text-violet-300"
                >
                    Back to Learn
                </button>
            </div>
        );
    }

    const title = getQuizGroupTitle(group);
    const processing = isQuizGroupProcessing(group.status);
    const canPlay =
        (group.status === 'COMPLETED' || group.status === 'PARTIAL') &&
        group.questions.length > 0;
    const diff = QUIZ_DIFFICULTY_MAP[group.difficulty];
    const bestAttempt = group.attempts
        .filter((a: QuizAttempt) => a.status === 'COMPLETED')
        .sort((a: QuizAttempt, b: QuizAttempt) => b.score - a.score)[0] ?? null;

    return (
        <>
            <div className="flex flex-col h-full">
                {/* Header */}
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
                                        {updateGroup.isPending ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Check className="w-4 h-4" />
                                        )}
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800"
                                    >
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

                            <div className="flex items-center gap-2 flex-wrap mt-1">
                                <span
                                    className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${diff.color} ${diff.bg} ${diff.border}`}
                                >
                                    {diff.label}
                                </span>
                                {!processing && (
                                    <span className="text-xs text-slate-500">
                                        {group.total_questions} question{group.total_questions !== 1 ? 's' : ''}
                                    </span>
                                )}
                                {group.ai_description && (
                                    <p className="w-full text-xs text-slate-500 mt-1">{group.ai_description}</p>
                                )}
                            </div>

                            {sourceNotes.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {sourceNotes.map((note) => (
                                        <button
                                            key={note.uuid}
                                            onClick={() => navigate(Routes.notes.detail(note.uuid))}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/50 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
                                        >
                                            <FileText className="w-3 h-3 text-slate-500" />
                                            {note.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 flex-shrink-0">
                            {canPlay && (
                                <button
                                    onClick={handleStartQuiz}
                                    disabled={startAttempt.isPending}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white transition-colors"
                                >
                                    {startAttempt.isPending ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Play className="w-4 h-4" />
                                    )}
                                    {group.attempts.length > 0 ? 'Retake' : 'Start Quiz'}
                                </button>
                            )}
                            <button
                                onClick={() => setConfirmDeleteGroup(true)}
                                className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-900/20 transition-colors self-end"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Last result banner */}
                {lastResult && (
                    <div className="mx-4 mt-3 p-3 rounded-xl bg-violet-900/20 border border-violet-700/30 flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-200">
                                Score: {lastResult.percentage}%
                            </p>
                            <p className="text-xs text-slate-400">
                                {lastResult.correct_answers}/{lastResult.total_questions} correct
                            </p>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {processing && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <Loader2 className="w-8 h-8 text-violet-400 animate-spin mb-4" />
                            <p className="text-slate-300 font-medium mb-1">Generating quiz questions…</p>
                            <p className="text-xs text-slate-500">
                                This may take a minute. This page updates automatically.
                            </p>
                        </div>
                    )}

                    {group.status === 'FAILED' && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <AlertTriangle className="w-8 h-8 text-red-400 mb-4" />
                            <p className="text-slate-300 font-medium mb-1">Generation failed</p>
                            <p className="text-xs text-slate-500 max-w-xs">
                                {group.error_message || 'An error occurred during AI generation.'}
                            </p>
                        </div>
                    )}

                    {(group.status === 'COMPLETED' || group.status === 'PARTIAL') && (
                        <div className="flex flex-col gap-6 pt-4">
                            {/* Attempt history */}
                            {group.attempts.length > 0 && (
                                <AttemptHistory attempts={group.attempts} bestAttempt={bestAttempt} />
                            )}

                            {/* Question list */}
                            <div>
                                <h2 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-violet-400" />
                                    Questions ({group.questions.length})
                                </h2>
                                <div className="flex flex-col gap-2">
                                    {group.questions.map((q: QuizQuestion, i: number) => (
                                        <QuizQuestionCard
                                            key={q.uuid}
                                            question={q}
                                            index={i}
                                            groupUuid={group.uuid}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Quiz player overlay */}
            {activeAttempt && (
                <QuizPlayer
                    attemptUuid={activeAttempt.attempt_uuid}
                    groupUuid={uuid!}
                    questions={activeAttempt.questions}
                    onClose={handlePlayerClose}
                    onComplete={handleQuizComplete}
                />
            )}

            {/* Delete group confirmation */}
            <ConfirmationModal
                isOpen={confirmDeleteGroup}
                onClose={() => setConfirmDeleteGroup(false)}
                onConfirm={handleDeleteGroup}
                title="Delete quiz"
                description={`Delete "${title}" and all its questions and attempts? This cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                isPending={deleteGroup.isPending}
            />
        </>
    );
}

// --- Sub-components ---

function AttemptHistory({
    attempts,
    bestAttempt,
}: {
    attempts: QuizAttempt[];
    bestAttempt: QuizAttempt | null;
}) {
    const [expanded, setExpanded] = useState(false);
    const completed = attempts.filter((a) => a.status === 'COMPLETED');

    if (completed.length === 0) return null;

    const shown = expanded ? completed : completed.slice(0, 3);

    return (
        <div>
            <h2 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Attempt History
            </h2>
            <div className="flex flex-col gap-2">
                {shown.map((a) => {
                    const pct = a.max_score > 0 ? Math.round((a.score / a.max_score) * 100) : 0;
                    const isBest = a.uuid === bestAttempt?.uuid;
                    const mins = Math.floor(a.time_spent_seconds / 60);
                    const secs = a.time_spent_seconds % 60;
                    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

                    return (
                        <div
                            key={a.uuid}
                            className={`flex items-center gap-3 p-3 rounded-xl border ${
                                isBest
                                    ? 'border-amber-700/40 bg-amber-900/10'
                                    : 'border-slate-700/40 bg-slate-800/30'
                            }`}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-200">{pct}%</span>
                                    {isBest && (
                                        <span className="text-xs text-amber-400 font-medium">Best</span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500">
                                    {a.correct_answers}/{a.total_questions} correct
                                </p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock className="w-3 h-3" />
                                {timeStr}
                            </div>
                            <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-violet-600 rounded-full"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {completed.length > 3 && (
                <button
                    onClick={() => setExpanded((v) => !v)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 mt-2 transition-colors"
                >
                    {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {expanded ? 'Show less' : `Show ${completed.length - 3} more`}
                </button>
            )}
        </div>
    );
}

function QuizQuestionCard({
    question,
    index,
    groupUuid,
}: {
    question: QuizQuestion;
    index: number;
    groupUuid: string;
}) {
    const [expanded, setExpanded] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const deleteQuestion = useDeleteQuizQuestion(groupUuid);
    const diff = QUIZ_DIFFICULTY_MAP[question.difficulty];

    const typeLabel: Record<string, string> = {
        MULTIPLE_CHOICE: 'MC',
        TRUE_FALSE: 'T/F',
        SHORT_ANSWER: 'SA',
    };

    return (
        <>
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden">
                <div className="flex items-start gap-1 p-3">
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        className="flex-1 flex items-start gap-3 text-left min-w-0"
                    >
                        <span className="text-xs font-mono text-slate-600 flex-shrink-0 mt-0.5">
                            #{index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-200 leading-snug">{question.question_text}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                                    {typeLabel[question.question_type] ?? question.question_type}
                                </span>
                                <span
                                    className={`text-xs px-1.5 py-0.5 rounded border font-medium ${diff.color} ${diff.bg} ${diff.border}`}
                                >
                                    {diff.label}
                                </span>
                            </div>
                        </div>
                        {expanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-900/20 transition-colors flex-shrink-0"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>

                {expanded && (
                    <div className="px-3 pb-3 pt-0 flex flex-col gap-2 border-t border-slate-800/60">
                        {question.question_type === 'MULTIPLE_CHOICE' && question.options.length > 0 && (
                            <div className="flex flex-col gap-1 pt-2">
                                {question.options.map((opt) => (
                                    <p key={opt.uuid} className="text-xs text-slate-400">
                                        • {opt.text}
                                    </p>
                                ))}
                            </div>
                        )}
                        <div className="pt-1">
                            <span className="text-xs text-emerald-500 font-medium">Answer: </span>
                            <span className="text-xs text-slate-300">{question.correct_answer}</span>
                        </div>
                        {question.explanation && (
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {question.explanation}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={() => {
                    deleteQuestion.mutate(question.uuid);
                    setConfirmDelete(false);
                }}
                title="Delete question"
                description={`Delete this question? This cannot be undone.`}
                confirmText="Delete"
                variant="danger"
                isPending={deleteQuestion.isPending}
            />
        </>
    );
}
