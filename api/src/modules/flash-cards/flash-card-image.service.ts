import { Injectable, Logger } from '@nestjs/common';
import pLimit from 'p-limit';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AiService } from '@/integrations/ai/services/ai.service';
import { GcsService } from '@/integrations/storage/gcs/services/gcs.service';
import { buildCardImagePrompt } from './utils/prompts';

interface CardRef {
    uuid: string;
    front: string;
    back: string;
    keywords: string[];
    ai_image_prompt: string | null;
}

interface GroupRef {
    uuid: string;
}

const CONCURRENCY = 3;

@Injectable()
export class FlashCardImageService {
    private readonly logger = new Logger(FlashCardImageService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
        private readonly gcsService: GcsService,
    ) {}

    async generateForCard(
        card: CardRef,
        group: GroupRef,
        userUuid: string,
    ): Promise<void> {
        const prompt = buildCardImagePrompt({
            front: card.front,
            back: card.back,
            keywords: card.keywords,
            ai_image_prompt: card.ai_image_prompt ?? undefined,
        });

        const { imageBuffer, mediaType } = await this.aiService.generateImage({
            model: 'gpt-image-1',
            prompt,
            size: '1024x1024',
        });

        const folder = `flash-cards/${userUuid}/${group.uuid}`;
        const filename = `${card.uuid}.png`;

        const uploaded = await this.gcsService.uploadImageFromBuffer(
            imageBuffer,
            filename,
            mediaType || 'image/png',
            folder,
        );

        await (this.prisma as any).flashCardImage.create({
            data: {
                card_uuid: card.uuid,
                url: uploaded.url,
                gcs_path: uploaded.path,
                gcs_bucket: uploaded.bucket,
                filename: uploaded.filename,
                size: uploaded.size,
                content_type: uploaded.contentType,
            },
        });
    }

    async generateForAll(
        cards: CardRef[],
        group: GroupRef,
        userUuid: string,
    ): Promise<{ completed: number; failed: number }> {
        const limit = pLimit(CONCURRENCY);
        let completed = 0;
        let failed = 0;

        await Promise.all(
            cards.map((card) =>
                limit(async () => {
                    try {
                        await this.generateForCard(card, group, userUuid);
                        completed++;
                    } catch (error) {
                        failed++;
                        this.logger.error(
                            `Image generation failed for card ${card.uuid}: ${error.message}`,
                        );
                    }
                }),
            ),
        );

        return { completed, failed };
    }

    async deleteForGroup(groupUuid: string): Promise<void> {
        const images = await (this.prisma as any).flashCardImage.findMany({
            where: { card: { group_uuid: groupUuid } },
        });

        for (const image of images) {
            try {
                await this.gcsService.deleteImage({
                    filename: image.filename,
                    folder: image.gcs_path.split('/').slice(0, -1).join('/'),
                });
            } catch (error) {
                this.logger.warn(`GCS delete failed for ${image.gcs_path}: ${error.message}`);
            }
        }
    }
}
