import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AiService } from '@/integrations/ai/services/ai.service';
import { AiModels, AiProviders } from '@/integrations/ai/interfaces/ai.interface';
import { FlashCardsService } from './flash-cards.service';
import { FlashCardImageService } from './flash-card-image.service';
import { chunkNoteContent } from './utils/chunking.utils';
import {
    buildCardGenerationSystemPrompt,
    buildCardGenerationUserPrompt,
    buildGroupTitlePrompt,
} from './utils/prompts';
import { z } from 'zod';

const FlashCardAiSchema = z.object({
    front: z.string().max(120),
    back: z.string().max(600),
    keywords: z.array(z.string().max(30)).max(5),
    ai_image_prompt: z.string().max(400),
});

type FlashCardAiOutput = z.infer<typeof FlashCardAiSchema>;

interface GroupRef {
    uuid: string;
    user_title?: string | null;
}

interface NoteRef {
    title: string;
    summary: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaAny = any;

@Injectable()
export class FlashCardGenerationService {
    private readonly logger = new Logger(FlashCardGenerationService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
        private readonly flashCardsService: FlashCardsService,
        private readonly imageService: FlashCardImageService,
    ) { }

    private get db(): PrismaAny {
        return this.prisma;
    }

    async generate(group: GroupRef, notes: NoteRef[], userUuid: string, cardsPerNote: number = 5): Promise<void> {
        try {
            await this.db.flashCardGroup.update({
                where: { uuid: group.uuid },
                data: { status: 'PROCESSING' },
            });

            const combined = notes
                .map((n) => `--- ${n.title} ---\n\n${n.summary}`)
                .join('\n\n');

            const chunks = chunkNoteContent(combined);
            const allCards: FlashCardAiOutput[] = [];
            let totalInputTokens = 0;
            let totalOutputTokens = 0;
            let totalCost = 0;

            const system = buildCardGenerationSystemPrompt();

            const cardsPerChunk = Math.ceil((cardsPerNote * notes.length) / chunks.length);

            for (let i = 0; i < chunks.length; i++) {
                try {
                    const prompt = buildCardGenerationUserPrompt(chunks[i], i, chunks.length, cardsPerChunk);
                    const { response, usage } = await this.aiService.generateTextWithSchema({
                        provider: AiProviders.openai,
                        model: AiModels.openai.gpt4oMini,
                        system,
                        prompt,
                        schema: FlashCardAiSchema,
                        maxTokens: 2048,
                    });

                    const cards = response as FlashCardAiOutput[];
                    allCards.push(...cards);

                    if (usage) {
                        totalInputTokens += usage.inputTokens;
                        totalOutputTokens += usage.outputTokens;
                        totalCost += usage.totalCost;
                    }
                } catch (error) {
                    this.logger.error(`Chunk ${i + 1} generation failed: ${error.message}`);
                }
            }

            if (allCards.length === 0) {
                await this.db.flashCardGroup.update({
                    where: { uuid: group.uuid },
                    data: { status: 'FAILED', error_message: 'AI generation produced no cards' },
                });
                return;
            }

            const deduplicated = this.deduplicate(allCards);

            const cardPayloads = deduplicated.map((card, index) => ({
                group_uuid: group.uuid,
                front: card.front,
                back: card.back,
                keywords: card.keywords,
                ai_image_prompt: card.ai_image_prompt,
                order_index: index,
            }));

            const createdCards = await this.flashCardsService.createMany(cardPayloads);

            let aiTitle: string | undefined;
            if (!group.user_title) {
                try {
                    const { response } = await this.aiService.generateText({
                        provider: AiProviders.openai,
                        model: AiModels.openai.gpt4oMini,
                        prompt: buildGroupTitlePrompt(createdCards.map((c: { front: string }) => c.front)),
                        maxTokens: 30,
                    });
                    aiTitle = response.trim().replace(/^["']|["']$/g, '');
                } catch {
                    aiTitle = notes[0]?.title ?? 'Flash Cards';
                }
            }

            await this.db.flashCardGroup.update({
                where: { uuid: group.uuid },
                data: {
                    ai_title: aiTitle,
                    total_cards: createdCards.length,
                    input_tokens: totalInputTokens,
                    output_tokens: totalOutputTokens,
                    total_cost_usd: totalCost,
                },
            });

            const { completed, failed } = await this.imageService.generateForAll(
                createdCards,
                group,
                userUuid,
            );

            const finalStatus = failed === 0 ? 'COMPLETED' : 'PARTIAL';

            await this.db.flashCardGroup.update({
                where: { uuid: group.uuid },
                data: {
                    status: finalStatus,
                    completed_cards: completed,
                    failed_cards: failed,
                },
            });
        } catch (error) {
            this.logger.error(`Flash card generation failed for group ${group.uuid}: ${error.message}`);
            await this.db.flashCardGroup.update({
                where: { uuid: group.uuid },
                data: { status: 'FAILED', error_message: error.message },
            });
        }
    }

    private deduplicate(cards: FlashCardAiOutput[]): FlashCardAiOutput[] {
        const seen: string[] = [];
        return cards.filter((card) => {
            const normalized = card.front.toLowerCase().trim();
            if (seen.some((s) => this.isSimilar(s, normalized))) {
                return false;
            }
            seen.push(normalized);
            return true;
        });
    }

    private isSimilar(a: string, b: string): boolean {
        if (a === b) return true;
        const longer = a.length > b.length ? a : b;
        const shorter = a.length > b.length ? b : a;
        return longer.includes(shorter) && shorter.length / longer.length > 0.8;
    }
}
