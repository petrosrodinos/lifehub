import { Injectable } from '@nestjs/common';
import { scoreShortAnswer } from './utils/answer-validation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyQuestion = any;

@Injectable()
export class QuizScoringService {
    scoreAnswer(
        question: AnyQuestion,
        dto: {
            selected_option_uuid?: string;
            boolean_answer?: boolean;
            text_answer?: string;
        },
    ): { isCorrect: boolean; correctOptionUuid?: string; pointsAwarded: number } {
        let isCorrect = false;
        let correctOptionUuid: string | undefined;

        switch (question.question_type) {
            case 'MULTIPLE_CHOICE': {
                const correctOpt = question.options?.find((o: AnyQuestion) => o.is_correct);
                correctOptionUuid = correctOpt?.uuid;
                isCorrect = !!dto.selected_option_uuid && dto.selected_option_uuid === correctOptionUuid;
                break;
            }
            case 'TRUE_FALSE': {
                const correctBool = question.correct_answer?.toLowerCase() === 'true';
                isCorrect = dto.boolean_answer === correctBool;
                break;
            }
            case 'SHORT_ANSWER': {
                isCorrect = scoreShortAnswer(
                    dto.text_answer ?? '',
                    question.correct_answer,
                    question.acceptable_answers ?? [],
                );
                break;
            }
        }

        return {
            isCorrect,
            correctOptionUuid,
            pointsAwarded: isCorrect ? (question.points ?? 1) : 0,
        };
    }

    computeFinalScore(answers: Array<{ is_correct: boolean; points_awarded: number }>, maxScore: number) {
        const score = answers.reduce((sum, a) => sum + a.points_awarded, 0);
        const correct = answers.filter((a) => a.is_correct).length;
        const incorrect = answers.filter((a) => !a.is_correct).length;
        const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
        return { score, correct, incorrect, percentage };
    }
}
