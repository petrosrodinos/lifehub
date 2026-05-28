import type { QuizDifficulty, QuizQuestionType } from './interfaces/quiz.interface';

export const QUIZ_DIFFICULTIES: { value: QuizDifficulty; label: string; color: string; bg: string; border: string }[] = [
    { value: 'EASY', label: 'Easy', color: 'text-emerald-400', bg: 'bg-emerald-900/30', border: 'border-emerald-700/50' },
    { value: 'MEDIUM', label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-900/30', border: 'border-amber-700/50' },
    { value: 'HARD', label: 'Hard', color: 'text-red-400', bg: 'bg-red-900/30', border: 'border-red-700/50' },
    { value: 'MIXED', label: 'Mixed', color: 'text-violet-400', bg: 'bg-violet-900/30', border: 'border-violet-700/50' },
];

export const QUIZ_DIFFICULTY_MAP = Object.fromEntries(
    QUIZ_DIFFICULTIES.map((d) => [d.value, d]),
) as Record<QuizDifficulty, (typeof QUIZ_DIFFICULTIES)[0]>;

export const QUIZ_QUESTION_TYPES: { value: QuizQuestionType; label: string; description: string }[] = [
    { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice', description: '4 options, 1 correct' },
    { value: 'TRUE_FALSE', label: 'True / False', description: 'Binary answer' },
    { value: 'SHORT_ANSWER', label: 'Short Answer', description: 'Text response' },
];

export const QUESTION_COUNT_OPTIONS = [5, 8, 10, 15, 20, 25, 30];

export const POLL_INTERVAL_MS = 3000;
