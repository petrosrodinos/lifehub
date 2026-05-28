import { useState } from 'react';
import { ArrowLeft, Loader2, Sparkles, Check } from 'lucide-react';
import { Modal } from '../../../../../components/ui/Modal';
import { useCreateQuizGroup } from '../../../../../features/quizzes/hooks/use-quiz-groups';
import { NoteSelector } from '../NoteSelector';
import {
    QUIZ_DIFFICULTIES,
    QUIZ_QUESTION_TYPES,
    QUESTION_COUNT_OPTIONS,
} from '../../../../../features/quizzes/constants';
import type { QuizDifficulty, QuizQuestionType } from '../../../../../features/quizzes/interfaces/quiz.interface';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'select' | 'configure';

export function CreateQuizModal({ isOpen, onClose }: Props) {
    const [step, setStep] = useState<Step>('select');
    const [selectedUuids, setSelectedUuids] = useState<string[]>([]);
    const [userTitle, setUserTitle] = useState('');
    const [difficulty, setDifficulty] = useState<QuizDifficulty>('MIXED');
    const [questionCount, setQuestionCount] = useState(10);
    const [selectedTypes, setSelectedTypes] = useState<QuizQuestionType[]>([
        'MULTIPLE_CHOICE',
        'TRUE_FALSE',
        'SHORT_ANSWER',
    ]);

    const createQuiz = useCreateQuizGroup();

    function toggleNote(uuid: string) {
        setSelectedUuids((prev) =>
            prev.includes(uuid) ? prev.filter((u) => u !== uuid) : [...prev, uuid],
        );
    }

    function toggleType(type: QuizQuestionType) {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.length > 1
                    ? prev.filter((t) => t !== type)
                    : prev
                : [...prev, type],
        );
    }

    function handleClose() {
        setStep('select');
        setSelectedUuids([]);
        setUserTitle('');
        setDifficulty('MIXED');
        setQuestionCount(10);
        setSelectedTypes(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER']);
        onClose();
    }

    function handleCreate() {
        createQuiz.mutate(
            {
                note_uuids: selectedUuids,
                user_title: userTitle.trim() || undefined,
                difficulty,
                question_count_target: questionCount,
                question_types: selectedTypes,
            },
            { onSuccess: handleClose },
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="New Quiz" size="md" scrollable>
            {step === 'select' ? (
                <div className="flex flex-col gap-4">
                    <NoteSelector selectedUuids={selectedUuids} onToggle={toggleNote} />
                    <button
                        onClick={() => setStep('configure')}
                        disabled={selectedUuids.length === 0}
                        className="w-full py-2.5 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                    >
                        Next — {selectedUuids.length} note{selectedUuids.length !== 1 ? 's' : ''} selected
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    <button
                        onClick={() => setStep('select')}
                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to note selection
                    </button>

                    {/* Custom title */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium mb-1.5 block">
                            Custom title (optional)
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. JavaScript Fundamentals Quiz"
                            value={userTitle}
                            onChange={(e) => setUserTitle(e.target.value)}
                            maxLength={200}
                            className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700/50 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                        />
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium mb-2 block">
                            Difficulty
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                            {QUIZ_DIFFICULTIES.map((d) => (
                                <button
                                    key={d.value}
                                    type="button"
                                    onClick={() => setDifficulty(d.value)}
                                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                                        difficulty === d.value
                                            ? `${d.bg} ${d.color} ${d.border}`
                                            : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:border-slate-600'
                                    }`}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Question count */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium mb-2 block">
                            Number of questions
                        </label>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5 flex-wrap flex-1">
                                {QUESTION_COUNT_OPTIONS.map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => setQuestionCount(n)}
                                        className={`w-10 h-9 text-sm font-medium rounded-lg border transition-colors ${
                                            questionCount === n
                                                ? 'bg-violet-600 border-violet-500 text-white'
                                                : 'bg-slate-800 border-slate-700/50 text-slate-300 hover:border-slate-600'
                                        }`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                min={5}
                                max={30}
                                value={questionCount}
                                onChange={(e) => {
                                    const v = Math.min(30, Math.max(5, Number(e.target.value)));
                                    setQuestionCount(v);
                                }}
                                className="w-16 px-2 py-2 bg-slate-800 border border-slate-700/50 rounded-lg text-sm text-slate-100 text-center focus:outline-none focus:border-violet-500"
                            />
                        </div>
                    </div>

                    {/* Question types */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium mb-2 block">
                            Question types
                        </label>
                        <div className="flex flex-col gap-2">
                            {QUIZ_QUESTION_TYPES.map((t) => {
                                const active = selectedTypes.includes(t.value);
                                return (
                                    <button
                                        key={t.value}
                                        type="button"
                                        onClick={() => toggleType(t.value)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                                            active
                                                ? 'bg-violet-900/20 border-violet-600/50'
                                                : 'bg-slate-800/50 border-slate-700/40 hover:border-slate-600/60'
                                        }`}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-colors ${
                                                active
                                                    ? 'bg-violet-600 border-violet-500'
                                                    : 'border-slate-600'
                                            }`}
                                        >
                                            {active && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-200">
                                                {t.label}
                                            </p>
                                            <p className="text-xs text-slate-500">{t.description}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        onClick={handleCreate}
                        disabled={createQuiz.isPending}
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                    >
                        {createQuiz.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Sparkles className="w-4 h-4" />
                        )}
                        {createQuiz.isPending ? 'Creating…' : `Generate ${questionCount} questions`}
                    </button>
                </div>
            )}
        </Modal>
    );
}
