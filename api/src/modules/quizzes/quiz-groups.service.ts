import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { QuizGenerationService } from './quiz-generation.service';
import { CreateQuizGroupDto, QuizQuestionTypeDto, QuizDifficultyDto } from './dto/create-quiz-group.dto';
import { UpdateQuizGroupDto } from './dto/update-quiz-group.dto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaAny = any;

const QUESTION_INCLUDE = {
    options: {
        orderBy: { order_index: 'asc' },
    },
};

@Injectable()
export class QuizGroupsService {
    private readonly logger = new Logger(QuizGroupsService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly generationService: QuizGenerationService,
    ) {}

    private get db(): PrismaAny {
        return this.prisma;
    }

    async create(userUuid: string, dto: CreateQuizGroupDto) {
        const notes = await this.prisma.note.findMany({
            where: { user_uuid: userUuid, uuid: { in: dto.note_uuids } },
            select: { uuid: true, title: true, content: true, summary: true },
        });

        const foundUuids = notes.map((n) => n.uuid);
        const missing = dto.note_uuids.filter((u) => !foundUuids.includes(u));
        if (missing.length > 0) {
            throw new NotFoundException(`Notes not found: ${missing.join(', ')}`);
        }

        const questionTypes = dto.question_types?.length
            ? dto.question_types
            : [QuizQuestionTypeDto.MULTIPLE_CHOICE, QuizQuestionTypeDto.TRUE_FALSE, QuizQuestionTypeDto.SHORT_ANSWER];

        const group = await this.db.quizGroup.create({
            data: {
                user_uuid: userUuid,
                user_title: dto.user_title ?? null,
                source_note_uuids: dto.note_uuids,
                difficulty: dto.difficulty ?? QuizDifficultyDto.MIXED,
                question_count_target: dto.question_count_target ?? 10,
                question_types: questionTypes,
                status: 'PENDING',
            },
        });

        setImmediate(() => {
            this.generationService
                .generate(
                    {
                        uuid: group.uuid,
                        user_title: group.user_title,
                        difficulty: group.difficulty,
                        question_types: group.question_types,
                        question_count_target: group.question_count_target,
                    },
                    notes,
                )
                .catch((err: Error) => {
                    this.logger.error(`Background generation error for quiz group ${group.uuid}: ${err.message}`);
                });
        });

        return group;
    }

    async findAll(userUuid: string) {
        const groups = await this.db.quizGroup.findMany({
            where: { user_uuid: userUuid },
            include: {
                _count: { select: { questions: true, attempts: true } },
                attempts: {
                    where: { status: 'COMPLETED' },
                    orderBy: { score: 'desc' },
                    take: 1,
                },
            },
            orderBy: { created_at: 'desc' },
        });

        return groups.map((g: PrismaAny) => ({
            ...g,
            best_attempt: g.attempts[0] ?? null,
            attempts: undefined,
        }));
    }

    async findOne(userUuid: string, uuid: string) {
        const group = await this.db.quizGroup.findFirst({
            where: { uuid, user_uuid: userUuid },
            include: {
                questions: {
                    include: QUESTION_INCLUDE,
                    orderBy: { order_index: 'asc' },
                },
                attempts: {
                    orderBy: { created_at: 'desc' },
                    take: 10,
                },
            },
        });

        if (!group) throw new NotFoundException('Quiz group not found');
        return group;
    }

    async update(userUuid: string, uuid: string, dto: UpdateQuizGroupDto) {
        await this.assertOwnership(userUuid, uuid);
        return this.db.quizGroup.update({
            where: { uuid },
            data: { user_title: dto.user_title },
        });
    }

    async remove(userUuid: string, uuid: string) {
        await this.assertOwnership(userUuid, uuid);
        return this.db.quizGroup.delete({ where: { uuid } });
    }

    async removeQuestion(userUuid: string, groupUuid: string, questionUuid: string) {
        await this.assertOwnership(userUuid, groupUuid);
        const question = await this.db.quizQuestion.findFirst({
            where: { uuid: questionUuid, group_uuid: groupUuid },
        });
        if (!question) throw new NotFoundException('Quiz question not found');
        return this.db.quizQuestion.delete({ where: { uuid: questionUuid } });
    }

    private async assertOwnership(userUuid: string, groupUuid: string) {
        const group = await this.db.quizGroup.findFirst({
            where: { uuid: groupUuid, user_uuid: userUuid },
        });
        if (!group) throw new NotFoundException('Quiz group not found');
        return group;
    }
}
