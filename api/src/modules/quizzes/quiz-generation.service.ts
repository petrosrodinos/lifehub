import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AiService } from '@/integrations/ai/services/ai.service';
import { AiModels, AiProviders } from '@/integrations/ai/interfaces/ai.interface';
import { z } from 'zod';
import { chunkNoteContent, buildNoteContext } from './utils/chunking.utils';
import {
    buildQuizGenerationSystemPrompt,
    buildQuizGenerationUserPrompt,
    buildQuizTitlePrompt,
    buildQuizDescriptionPrompt,
} from './utils/prompts';

const QuizOptionAiSchema = z.object({
    text: z.string().max(250),
    is_correct: z.boolean(),
});

const QuizQuestionAiSchema = z.object({
    question_text: z.string().min(10).max(500),
    question_type: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER']),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    correct_answer: z.string().max(500),
    explanation: z.string().max(600),
    hint: z.string().max(200).optional(),
    options: z.array(QuizOptionAiSchema).min(2).max(4).optional(),
    acceptable_answers: z.array(z.string().max(200)).max(5).optional(),
    grading_guidance: z.string().max(400).optional(),
});

type QuizQuestionAiOutput = z.infer<typeof QuizQuestionAiSchema>;

interface GroupRef {
    uuid: string;
    user_title?: string | null;
    difficulty: string;
    question_types: string[];
    question_count_target: number;
}

interface NoteRef {
    uuid: string;
    title: string;
    content: string;
    summary?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaAny = any;

@Injectable()
export class QuizGenerationService {
    private readonly logger = new Logger(QuizGenerationService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
    ) {}

    private get db(): PrismaAny {
        return this.prisma;
    }

    async generate(group: GroupRef, notes: NoteRef[]): Promise<void> {
        try {
            await this.db.quizGroup.update({
                where: { uuid: group.uuid },
                data: { status: 'PROCESSING', ai_model: AiModels.openai.gpt4oMini, ai_provider: AiProviders.openai },
            });

            const combined = notes.map(buildNoteContext).join('\n\n');
            const chunks = chunkNoteContent(combined);
            const questionsPerChunk = Math.max(2, Math.ceil(group.question_count_target / chunks.length));
            const system = buildQuizGenerationSystemPrompt();
            const allowedTypes = group.question_types.length > 0
                ? group.question_types
                : ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'];

            const allQuestions: QuizQuestionAiOutput[] = [];
            let totalInputTokens = 0;
            let totalOutputTokens = 0;
            let totalCost = 0;

            for (let i = 0; i < chunks.length; i++) {
                try {
                    const prompt = buildQuizGenerationUserPrompt(
                        chunks[i],
                        i,
                        chunks.length,
                        questionsPerChunk,
                        group.difficulty,
                        allowedTypes,
                    );

                    const { response, usage } = await this.aiService.generateTextWithSchema({
                        provider: AiProviders.openai,
                        model: AiModels.openai.gpt4oMini,
                        system,
                        prompt,
                        schema: QuizQuestionAiSchema,
                        maxTokens: 4096,
                    });

                    const questions = (response as QuizQuestionAiOutput[]).filter((q) =>
                        this.validateQuestion(q),
                    );
                    allQuestions.push(...questions);

                    if (usage) {
                        totalInputTokens += usage.inputTokens;
                        totalOutputTokens += usage.outputTokens;
                        totalCost += usage.totalCost;
                    }
                } catch (error) {
                    this.logger.error(`Chunk ${i + 1} generation failed: ${error.message}`);
                }
            }

            if (allQuestions.length === 0) {
                await this.db.quizGroup.update({
                    where: { uuid: group.uuid },
                    data: { status: 'FAILED', error_message: 'AI generation produced no questions' },
                });
                return;
            }

            const deduplicated = this.deduplicateQuestions(allQuestions);
            const trimmed = deduplicated.slice(0, group.question_count_target + 5);

            // Persist questions + options
            for (let idx = 0; idx < trimmed.length; idx++) {
                const q = trimmed[idx];
                const created = await this.db.quizQuestion.create({
                    data: {
                        group_uuid: group.uuid,
                        question_text: q.question_text,
                        question_type: q.question_type,
                        difficulty: q.difficulty,
                        correct_answer: q.correct_answer,
                        explanation: q.explanation,
                        hint: q.hint ?? null,
                        order_index: idx,
                        points: 1,
                        acceptable_answers: q.acceptable_answers ?? [],
                        grading_guidance: q.grading_guidance ?? null,
                    },
                });

                if (q.question_type === 'MULTIPLE_CHOICE' && q.options?.length) {
                    const shuffled = this.shuffleOptions(q.options);
                    for (let oi = 0; oi < shuffled.length; oi++) {
                        await this.db.quizQuestionOption.create({
                            data: {
                                question_uuid: created.uuid,
                                text: shuffled[oi].text,
                                is_correct: shuffled[oi].is_correct,
                                order_index: oi,
                            },
                        });
                    }
                }
            }

            // Generate AI title if no user title
            let aiTitle: string | undefined;
            let aiDescription: string | undefined;
            if (!group.user_title) {
                try {
                    const questionTexts = trimmed.map((q) => q.question_text);
                    const { response: titleResp } = await this.aiService.generateText({
                        provider: AiProviders.openai,
                        model: AiModels.openai.gpt4oMini,
                        prompt: buildQuizTitlePrompt(questionTexts),
                        maxTokens: 40,
                    });
                    aiTitle = titleResp.trim().replace(/^["']|["']$/g, '');

                    const { response: descResp } = await this.aiService.generateText({
                        provider: AiProviders.openai,
                        model: AiModels.openai.gpt4oMini,
                        prompt: buildQuizDescriptionPrompt(questionTexts, aiTitle),
                        maxTokens: 100,
                    });
                    aiDescription = descResp.trim();
                } catch {
                    aiTitle = notes[0]?.title ?? 'Quiz';
                }
            }

            await this.db.quizGroup.update({
                where: { uuid: group.uuid },
                data: {
                    status: 'COMPLETED',
                    ai_title: aiTitle,
                    ai_description: aiDescription,
                    total_questions: trimmed.length,
                    input_tokens: totalInputTokens,
                    output_tokens: totalOutputTokens,
                    total_cost_usd: totalCost,
                },
            });
        } catch (error) {
            this.logger.error(`Quiz generation failed for group ${group.uuid}: ${error.message}`);
            await this.db.quizGroup.update({
                where: { uuid: group.uuid },
                data: { status: 'FAILED', error_message: error.message },
            });
        }
    }

    private validateQuestion(q: QuizQuestionAiOutput): boolean {
        if (!q.question_text || !q.question_type || !q.correct_answer) return false;

        if (q.question_type === 'MULTIPLE_CHOICE') {
            if (!q.options || q.options.length < 2) return false;
            const correctCount = q.options.filter((o) => o.is_correct).length;
            if (correctCount !== 1) return false;
        }

        if (q.question_type === 'TRUE_FALSE') {
            const val = q.correct_answer.toLowerCase();
            if (val !== 'true' && val !== 'false') return false;
        }

        return true;
    }

    private deduplicateQuestions(questions: QuizQuestionAiOutput[]): QuizQuestionAiOutput[] {
        const seen: string[] = [];
        return questions.filter((q) => {
            const normalized = q.question_text.toLowerCase().trim().slice(0, 60);
            if (seen.some((s) => this.isSimilar(s, normalized))) return false;
            seen.push(normalized);
            return true;
        });
    }

    private isSimilar(a: string, b: string): boolean {
        if (a === b) return true;
        const longer = a.length > b.length ? a : b;
        const shorter = a.length > b.length ? b : a;
        return longer.includes(shorter) && shorter.length / longer.length > 0.75;
    }

    private shuffleOptions<T>(options: T[]): T[] {
        const arr = [...options];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}
