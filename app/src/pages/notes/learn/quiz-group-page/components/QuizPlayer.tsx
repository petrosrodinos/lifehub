import { useCallback, useEffect, useRef, useState } from 'react';
import {
    X,
    ChevronRight,
    Check,
    AlertCircle,
    Trophy,
    Clock,
    RotateCcw,
    Lightbulb,
} from 'lucide-react';
import {
    useCompleteQuizAttempt,
    useSubmitQuizAnswer,
} from '../../../../../features/quizzes/hooks/use-quiz-groups';
import { QUIZ_DIFFICULTY_MAP } from '../../../../../features/quizzes/constants';
import type {
    CompleteAttemptResponse,
    QuizQuestion,
    SubmitAnswerResponse,
} from '../../../../../features/quizzes/interfaces/quiz.interface';

interface Props {
    attemptUuid: string;
    groupUuid: string;
    questions: QuizQuestion[];
    onClose: () => void;
    onComplete: (result: CompleteAttemptResponse) => void;
}

type Phase = 'answering' | 'feedback' | 'completed';

interface AnswerRecord {
    questionUuid: string;
    feedback: SubmitAnswerResponse;
}

export function QuizPlayer({ attemptUuid, groupUuid, questions, onClose, onComplete }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>('answering');
    const [answers, setAnswers] = useState<Map<string, AnswerRecord>>(new Map());
    const [result, setResult] = useState<CompleteAttemptResponse | null>(null);
    const [showHint, setShowHint] = useState(false);

    // Per-question state
    const [selectedOptionUuid, setSelectedOptionUuid] = useState<string | undefined>();
    const [booleanAnswer, setBooleanAnswer] = useState<boolean | undefined>();
    const [textAnswer, setTextAnswer] = useState('');

    const startTimeRef = useRef(Date.now());

    const submitAnswer = useSubmitQuizAnswer();
    const completeAttempt = useCompleteQuizAttempt();

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const isLastQuestion = currentIndex === totalQuestions - 1;

    const resetQuestionState = () => {
        setSelectedOptionUuid(undefined);
        setBooleanAnswer(undefined);
        setTextAnswer('');
        setShowHint(false);
    };

    const canSubmit = useCallback(() => {
        if (!currentQuestion) return false;
        switch (currentQuestion.question_type) {
            case 'MULTIPLE_CHOICE': return !!selectedOptionUuid;
            case 'TRUE_FALSE': return booleanAnswer !== undefined;
            case 'SHORT_ANSWER': return textAnswer.trim().length > 0;
        }
    }, [currentQuestion, selectedOptionUuid, booleanAnswer, textAnswer]);

    async function handleSubmit() {
        if (!canSubmit() || submitAnswer.isPending) return;

        const dto: { question_uuid: string; selected_option_uuid?: string; boolean_answer?: boolean; text_answer?: string } = {
            question_uuid: currentQuestion.uuid,
        };
        if (currentQuestion.question_type === 'MULTIPLE_CHOICE') dto.selected_option_uuid = selectedOptionUuid;
        if (currentQuestion.question_type === 'TRUE_FALSE') dto.boolean_answer = booleanAnswer;
        if (currentQuestion.question_type === 'SHORT_ANSWER') dto.text_answer = textAnswer.trim();

        submitAnswer.mutate(
            { attemptUuid, data: dto },
            {
                onSuccess: (feedback) => {
                    setAnswers((prev) => new Map(prev).set(currentQuestion.uuid, { questionUuid: currentQuestion.uuid, feedback }));
                    setPhase('feedback');
                },
            },
        );
    }

    async function handleNext() {
        if (isLastQuestion) {
            const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
            completeAttempt.mutate(
                { attemptUuid, timeSpent, groupUuid },
                {
                    onSuccess: (res) => {
                        setResult(res);
                        setPhase('completed');
                        onComplete(res);
                    },
                },
            );
        } else {
            setCurrentIndex((i) => i + 1);
            setPhase('answering');
            resetQuestionState();
        }
    }

    function handleRetake() {
        onClose();
    }

    // Keyboard navigation
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (phase === 'feedback' && e.key === 'Enter') handleNext();
            if (phase === 'answering' && e.key === 'Enter' && canSubmit()) handleSubmit();
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [phase, canSubmit]);

    const currentFeedback = answers.get(currentQuestion?.uuid ?? '')?.feedback;
    const progressPct = ((currentIndex + (phase === 'feedback' ? 1 : 0)) / totalQuestions) * 100;
    const diff = currentQuestion ? QUIZ_DIFFICULTY_MAP[currentQuestion.difficulty] : null;

    if (phase === 'completed' && result) {
        return (
            <QuizResultScreen
                result={result}
                questions={questions}
                answers={answers}
                onRetake={handleRetake}
                onClose={onClose}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60 flex-shrink-0">
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">
                        {currentIndex + 1} / {totalQuestions}
                    </span>
                    {diff && (
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${diff.color} ${diff.bg} ${diff.border}`}>
                            {diff.label}
                        </span>
                    )}
                </div>
                <div className="w-8" />
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-slate-800 flex-shrink-0">
                <div
                    className="h-full bg-violet-600 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                />
            </div>

            {/* Question */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 max-w-xl mx-auto w-full">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {currentQuestion?.question_type?.replace('_', ' ')}
                    </span>
                    <h2 className="text-lg font-semibold text-slate-100 leading-snug">
                        {currentQuestion?.question_text}
                    </h2>

                    {currentQuestion?.hint && (
                        <div>
                            {!showHint ? (
                                <button
                                    onClick={() => setShowHint(true)}
                                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-violet-400 transition-colors mt-1"
                                >
                                    <Lightbulb className="w-3 h-3" />
                                    Show hint
                                </button>
                            ) : (
                                <p className="text-xs text-violet-300 bg-violet-900/20 border border-violet-700/30 rounded-lg px-3 py-2 mt-2">
                                    <Lightbulb className="w-3 h-3 inline mr-1" />
                                    {currentQuestion.hint}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Question input */}
                {currentQuestion?.question_type === 'MULTIPLE_CHOICE' && (
                    <MultipleChoiceInput
                        options={currentQuestion.options}
                        selectedUuid={selectedOptionUuid}
                        onSelect={setSelectedOptionUuid}
                        disabled={phase === 'feedback'}
                        feedback={currentFeedback}
                    />
                )}

                {currentQuestion?.question_type === 'TRUE_FALSE' && (
                    <TrueFalseInput
                        value={booleanAnswer}
                        onChange={setBooleanAnswer}
                        disabled={phase === 'feedback'}
                        feedback={currentFeedback}
                        correctAnswer={currentQuestion.correct_answer}
                    />
                )}

                {currentQuestion?.question_type === 'SHORT_ANSWER' && (
                    <ShortAnswerInput
                        value={textAnswer}
                        onChange={setTextAnswer}
                        disabled={phase === 'feedback'}
                        onSubmit={phase === 'answering' ? handleSubmit : undefined}
                    />
                )}

                {/* Feedback */}
                {phase === 'feedback' && currentFeedback && (
                    <div
                        className={`rounded-xl border p-4 ${
                            currentFeedback.is_correct
                                ? 'bg-emerald-900/20 border-emerald-700/40'
                                : 'bg-red-900/20 border-red-700/40'
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {currentFeedback.is_correct ? (
                                <>
                                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <span className="text-sm font-semibold text-emerald-400">Correct!</span>
                                    <span className="text-xs text-emerald-500 ml-auto">
                                        +{currentFeedback.points_awarded} pt{currentFeedback.points_awarded !== 1 ? 's' : ''}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                    <span className="text-sm font-semibold text-red-400">Incorrect</span>
                                    <span className="text-xs text-slate-500 ml-auto">
                                        Correct: <span className="text-slate-300">{currentFeedback.correct_answer}</span>
                                    </span>
                                </>
                            )}
                        </div>
                        {currentFeedback.explanation && (
                            <p className="text-xs text-slate-300 leading-relaxed">
                                {currentFeedback.explanation}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Footer action */}
            <div className="px-4 py-4 border-t border-slate-800/60 flex-shrink-0 max-w-xl mx-auto w-full">
                {phase === 'answering' ? (
                    <button
                        onClick={handleSubmit}
                        disabled={!canSubmit() || submitAnswer.isPending}
                        className="w-full py-3 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                    >
                        {submitAnswer.isPending ? 'Checking…' : 'Submit Answer'}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        disabled={completeAttempt.isPending}
                        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 transition-colors"
                    >
                        {completeAttempt.isPending
                            ? 'Finishing…'
                            : isLastQuestion
                            ? 'See Results'
                            : 'Next Question'}
                        {!completeAttempt.isPending && <ChevronRight className="w-4 h-4" />}
                    </button>
                )}
            </div>
        </div>
    );
}

// --- Sub-components ---

function MultipleChoiceInput({
    options,
    selectedUuid,
    onSelect,
    disabled,
    feedback,
}: {
    options: QuizQuestion['options'];
    selectedUuid?: string;
    onSelect: (uuid: string) => void;
    disabled: boolean;
    feedback?: SubmitAnswerResponse;
}) {
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => {
                const isSelected = opt.uuid === selectedUuid;
                const isCorrectOpt = feedback && opt.uuid === feedback.correct_option_uuid;
                const isWrongSelected = feedback && isSelected && !feedback.is_correct;

                let cls =
                    'w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ';
                if (isCorrectOpt) cls += 'bg-emerald-900/20 border-emerald-600/60 text-emerald-200';
                else if (isWrongSelected) cls += 'bg-red-900/20 border-red-600/60 text-red-200';
                else if (isSelected) cls += 'bg-violet-900/20 border-violet-600/50 text-slate-100';
                else if (disabled) cls += 'bg-slate-800/30 border-slate-700/30 text-slate-400 cursor-default';
                else cls += 'bg-slate-800/50 border-slate-700/40 text-slate-200 hover:border-slate-600/60 cursor-pointer';

                return (
                    <button
                        key={opt.uuid}
                        onClick={() => !disabled && onSelect(opt.uuid)}
                        className={cls}
                    >
                        <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${isSelected || isCorrectOpt ? 'bg-current border-current opacity-80' : 'border-slate-600'}`} />
                        <span className="text-sm">{opt.text}</span>
                        {isCorrectOpt && <Check className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />}
                        {isWrongSelected && <X className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />}
                    </button>
                );
            })}
        </div>
    );
}

function TrueFalseInput({
    value,
    onChange,
    disabled,
    feedback,
    correctAnswer,
}: {
    value?: boolean;
    onChange: (v: boolean) => void;
    disabled: boolean;
    feedback?: SubmitAnswerResponse;
    correctAnswer: string;
}) {
    const correctBool = correctAnswer?.toLowerCase() === 'true';

    return (
        <div className="grid grid-cols-2 gap-3">
            {([true, false] as const).map((bool) => {
                const label = bool ? 'True' : 'False';
                const isSelected = value === bool;
                const isCorrectOpt = feedback && bool === correctBool;
                const isWrongSelected = feedback && isSelected && !feedback.is_correct;

                let cls =
                    'flex flex-col items-center justify-center gap-1.5 p-5 rounded-2xl border text-sm font-semibold transition-all ';
                if (isCorrectOpt) cls += 'bg-emerald-900/20 border-emerald-600/60 text-emerald-300';
                else if (isWrongSelected) cls += 'bg-red-900/20 border-red-600/60 text-red-300';
                else if (isSelected) cls += 'bg-violet-900/20 border-violet-600/50 text-violet-200';
                else if (disabled) cls += 'bg-slate-800/30 border-slate-700/30 text-slate-500 cursor-default';
                else cls += 'bg-slate-800/50 border-slate-700/40 text-slate-200 hover:border-slate-600/60 cursor-pointer';

                return (
                    <button key={label} onClick={() => !disabled && onChange(bool)} className={cls}>
                        <span className="text-2xl">{bool ? '✓' : '✗'}</span>
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    );
}

function ShortAnswerInput({
    value,
    onChange,
    disabled,
    onSubmit,
}: {
    value: string;
    onChange: (v: string) => void;
    disabled: boolean;
    onSubmit?: () => void;
}) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="Type your answer here…"
            rows={3}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && onSubmit) {
                    e.preventDefault();
                    onSubmit();
                }
            }}
            className="w-full px-3 py-3 bg-slate-800 border border-slate-700/50 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500 resize-none disabled:opacity-50"
        />
    );
}

// --- Results screen ---

function QuizResultScreen({
    result,
    questions,
    answers,
    onRetake,
    onClose,
}: {
    result: CompleteAttemptResponse;
    questions: QuizQuestion[];
    answers: Map<string, AnswerRecord>;
    onRetake: () => void;
    onClose: () => void;
}) {
    const [showReview, setShowReview] = useState(false);

    const minutes = Math.floor(result.time_spent_seconds / 60);
    const seconds = result.time_spent_seconds % 60;
    const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    const grade =
        result.percentage >= 90
            ? { label: 'Excellent!', color: 'text-emerald-400' }
            : result.percentage >= 70
            ? { label: 'Good job!', color: 'text-violet-400' }
            : result.percentage >= 50
            ? { label: 'Keep practicing!', color: 'text-amber-400' }
            : { label: 'Try again!', color: 'text-red-400' };

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-end px-4 py-3 border-b border-slate-800/60 flex-shrink-0">
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start px-4 py-10 max-w-md mx-auto w-full gap-8">
                {/* Score */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <Trophy className="w-14 h-14 text-amber-400" />
                    <h2 className={`text-3xl font-bold ${grade.color}`}>{grade.label}</h2>
                    <div className="text-6xl font-bold text-white">{result.percentage}%</div>
                    <p className="text-slate-400 text-sm">
                        {result.score} / {result.max_score} points
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 w-full">
                    <StatCard label="Correct" value={result.correct_answers} color="text-emerald-400" />
                    <StatCard label="Wrong" value={result.incorrect_answers} color="text-red-400" />
                    <StatCard
                        label="Time"
                        value={timeStr}
                        color="text-slate-300"
                        icon={<Clock className="w-4 h-4" />}
                    />
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full">
                    <button
                        onClick={() => setShowReview((v) => !v)}
                        className="w-full py-2.5 text-sm font-medium rounded-xl border border-slate-700/50 text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                        {showReview ? 'Hide' : 'Review'} Answers
                    </button>
                    <button
                        onClick={onRetake}
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Retake Quiz
                    </button>
                </div>

                {/* Answer review */}
                {showReview && (
                    <div className="flex flex-col gap-3 w-full">
                        <h3 className="text-sm font-semibold text-slate-300">Answer Review</h3>
                        {questions.map((q, i) => {
                            const record = answers.get(q.uuid);
                            const fb = record?.feedback;
                            return (
                                <div
                                    key={q.uuid}
                                    className={`rounded-xl border p-3 ${
                                        fb?.is_correct
                                            ? 'border-emerald-700/40 bg-emerald-900/10'
                                            : 'border-red-700/40 bg-red-900/10'
                                    }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <span className="text-xs text-slate-500 font-mono flex-shrink-0 mt-0.5">
                                            #{i + 1}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-200 mb-1">{q.question_text}</p>
                                            {!fb?.is_correct && (
                                                <p className="text-xs text-emerald-400">
                                                    ✓ {fb?.correct_answer ?? q.correct_answer}
                                                </p>
                                            )}
                                            {fb?.explanation && (
                                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                                    {fb.explanation}
                                                </p>
                                            )}
                                        </div>
                                        {fb?.is_correct ? (
                                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    color,
    icon,
}: {
    label: string;
    value: string | number;
    color: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-3">
            {icon && <span className="text-slate-400">{icon}</span>}
            <span className={`text-xl font-bold ${color}`}>{value}</span>
            <span className="text-xs text-slate-500">{label}</span>
        </div>
    );
}
