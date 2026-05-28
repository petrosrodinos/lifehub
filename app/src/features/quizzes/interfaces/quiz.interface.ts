export type QuizGroupStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'PARTIAL';
export type QuizDifficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'MIXED';
export type QuizQuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';
export type QuizAttemptStatus = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';

export interface QuizQuestionOption {
    uuid: string;
    question_uuid: string;
    text: string;
    order_index: number;
    // is_correct is NOT included when fetched for a live attempt (sanitized server-side)
}

export interface QuizQuestion {
    uuid: string;
    group_uuid: string;
    question_text: string;
    question_type: QuizQuestionType;
    difficulty: QuizDifficulty;
    correct_answer: string;
    explanation: string | null;
    hint: string | null;
    source_note_uuid: string | null;
    order_index: number;
    points: number;
    acceptable_answers: string[];
    options: QuizQuestionOption[];
    created_at: string;
    updated_at: string;
}

export interface QuizAttemptAnswer {
    uuid: string;
    attempt_uuid: string;
    question_uuid: string;
    selected_option_uuid: string | null;
    boolean_answer: boolean | null;
    text_answer: string | null;
    is_correct: boolean;
    points_awarded: number;
    submitted_at: string;
}

export interface QuizAttempt {
    uuid: string;
    user_uuid: string;
    group_uuid: string;
    status: QuizAttemptStatus;
    score: number;
    max_score: number;
    correct_answers: number;
    incorrect_answers: number;
    total_questions: number;
    time_spent_seconds: number;
    started_at: string;
    completed_at: string | null;
    answers?: QuizAttemptAnswer[];
    created_at: string;
    updated_at: string;
}

export interface QuizGroup {
    uuid: string;
    user_uuid: string;
    user_title: string | null;
    ai_title: string | null;
    ai_description: string | null;
    status: QuizGroupStatus;
    difficulty: QuizDifficulty;
    question_count_target: number;
    question_types: string[];
    total_questions: number;
    source_note_uuids: string[];
    input_tokens: number;
    output_tokens: number;
    total_cost_usd: string;
    error_message: string | null;
    questions: QuizQuestion[];
    attempts: QuizAttempt[];
    created_at: string;
    updated_at: string;
}

export interface QuizGroupListItem {
    uuid: string;
    user_uuid: string;
    user_title: string | null;
    ai_title: string | null;
    ai_description: string | null;
    status: QuizGroupStatus;
    difficulty: QuizDifficulty;
    total_questions: number;
    source_note_uuids: string[];
    question_types: string[];
    created_at: string;
    updated_at: string;
    _count: { questions: number; attempts: number };
    best_attempt: QuizAttempt | null;
}

export interface CreateQuizGroupDto {
    note_uuids: string[];
    user_title?: string;
    difficulty: QuizDifficulty;
    question_count_target: number;
    question_types: QuizQuestionType[];
}

export interface UpdateQuizGroupDto {
    user_title?: string;
}

export interface StartAttemptResponse {
    attempt_uuid: string;
    questions: QuizQuestion[];
}

export interface SubmitAnswerDto {
    question_uuid: string;
    selected_option_uuid?: string;
    boolean_answer?: boolean;
    text_answer?: string;
}

export interface SubmitAnswerResponse {
    is_correct: boolean;
    correct_answer: string;
    correct_option_uuid: string | null;
    explanation: string | null;
    hint: string | null;
    points_awarded: number;
}

export interface CompleteAttemptResponse {
    uuid: string;
    score: number;
    max_score: number;
    correct_answers: number;
    incorrect_answers: number;
    total_questions: number;
    time_spent_seconds: number;
    percentage: number;
}

export function getQuizGroupTitle(
    group: Pick<QuizGroupListItem | QuizGroup, 'user_title' | 'ai_title'>,
): string {
    return group.user_title || group.ai_title || 'Quiz';
}

export function isQuizGroupProcessing(status: QuizGroupStatus): boolean {
    return status === 'PENDING' || status === 'PROCESSING';
}
