import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { QuizScoringService } from './quiz-scoring.service';
import { SubmitQuizAnswerDto, CompleteQuizAttemptDto } from './dto/submit-quiz-answer.dto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaAny = any;

const QUESTION_WITH_OPTIONS = {
    include: {
        options: { orderBy: { order_index: 'asc' } },
    },
};

@Injectable()
export class QuizAttemptsService {
    private readonly logger = new Logger(QuizAttemptsService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly scoringService: QuizScoringService,
    ) {}

    private get db(): PrismaAny {
        return this.prisma;
    }

    async startAttempt(userUuid: string, groupUuid: string) {
        const group = await this.db.quizGroup.findFirst({
            where: { uuid: groupUuid, user_uuid: userUuid },
            include: {
                questions: {
                    ...QUESTION_WITH_OPTIONS,
                    orderBy: { order_index: 'asc' },
                },
            },
        });

        if (!group) throw new NotFoundException('Quiz group not found');
        if (group.status !== 'COMPLETED' && group.status !== 'PARTIAL') {
            throw new BadRequestException('Quiz is not ready — generation may still be in progress');
        }
        if (group.questions.length === 0) {
            throw new BadRequestException('Quiz has no questions');
        }

        const maxScore = group.questions.reduce((sum: number, q: PrismaAny) => sum + q.points, 0);

        const attempt = await this.db.quizAttempt.create({
            data: {
                user_uuid: userUuid,
                group_uuid: groupUuid,
                status: 'IN_PROGRESS',
                total_questions: group.questions.length,
                max_score: maxScore,
            },
        });

        // Strip is_correct from options so the client cannot trivially read answers
        const sanitizedQuestions = group.questions.map((q: PrismaAny) => ({
            ...q,
            options: q.options.map(({ is_correct: _, ...opt }: PrismaAny) => opt),
        }));

        return { attempt_uuid: attempt.uuid, questions: sanitizedQuestions };
    }

    async submitAnswer(userUuid: string, attemptUuid: string, dto: SubmitQuizAnswerDto) {
        const attempt = await this.db.quizAttempt.findFirst({
            where: { uuid: attemptUuid, user_uuid: userUuid },
        });
        if (!attempt) throw new NotFoundException('Attempt not found');
        if (attempt.status !== 'IN_PROGRESS') {
            throw new BadRequestException('Attempt is no longer in progress');
        }

        const question = await this.db.quizQuestion.findFirst({
            where: { uuid: dto.question_uuid, group_uuid: attempt.group_uuid },
            ...QUESTION_WITH_OPTIONS,
        });
        if (!question) throw new NotFoundException('Question not found in this quiz');

        const existing = await this.db.quizAttemptAnswer.findFirst({
            where: { attempt_uuid: attemptUuid, question_uuid: dto.question_uuid },
        });
        if (existing) throw new BadRequestException('Question already answered');

        const { isCorrect, correctOptionUuid, pointsAwarded } =
            this.scoringService.scoreAnswer(question, dto);

        await this.db.quizAttemptAnswer.create({
            data: {
                attempt_uuid: attemptUuid,
                question_uuid: dto.question_uuid,
                selected_option_uuid: dto.selected_option_uuid ?? null,
                boolean_answer: dto.boolean_answer ?? null,
                text_answer: dto.text_answer ?? null,
                is_correct: isCorrect,
                points_awarded: pointsAwarded,
            },
        });

        return {
            is_correct: isCorrect,
            correct_answer: question.correct_answer,
            correct_option_uuid: correctOptionUuid ?? null,
            explanation: question.explanation ?? null,
            hint: question.hint ?? null,
            points_awarded: pointsAwarded,
        };
    }

    async completeAttempt(userUuid: string, attemptUuid: string, dto: CompleteQuizAttemptDto) {
        const attempt = await this.db.quizAttempt.findFirst({
            where: { uuid: attemptUuid, user_uuid: userUuid },
            include: { answers: true },
        });
        if (!attempt) throw new NotFoundException('Attempt not found');
        if (attempt.status !== 'IN_PROGRESS') {
            throw new BadRequestException('Attempt is not in progress');
        }

        const { score, correct, incorrect, percentage } = this.scoringService.computeFinalScore(
            attempt.answers,
            attempt.max_score,
        );

        const updated = await this.db.quizAttempt.update({
            where: { uuid: attemptUuid },
            data: {
                status: 'COMPLETED',
                score,
                correct_answers: correct,
                incorrect_answers: incorrect,
                time_spent_seconds: dto.time_spent_seconds,
                completed_at: new Date(),
            },
        });

        return {
            uuid: updated.uuid,
            score,
            max_score: attempt.max_score,
            correct_answers: correct,
            incorrect_answers: incorrect,
            total_questions: attempt.total_questions,
            time_spent_seconds: dto.time_spent_seconds,
            percentage,
        };
    }

    async getAttempt(userUuid: string, attemptUuid: string) {
        const attempt = await this.db.quizAttempt.findFirst({
            where: { uuid: attemptUuid, user_uuid: userUuid },
            include: {
                answers: {
                    include: {
                        question: {
                            include: { options: { orderBy: { order_index: 'asc' } } },
                        },
                    },
                },
            },
        });
        if (!attempt) throw new NotFoundException('Attempt not found');
        return attempt;
    }

    async listAttempts(userUuid: string, groupUuid: string) {
        const group = await this.db.quizGroup.findFirst({
            where: { uuid: groupUuid, user_uuid: userUuid },
        });
        if (!group) throw new NotFoundException('Quiz group not found');

        return this.db.quizAttempt.findMany({
            where: { user_uuid: userUuid, group_uuid: groupUuid },
            orderBy: { created_at: 'desc' },
        });
    }
}
