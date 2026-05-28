import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { FlashCardsController } from './flash-cards.controller';
import { FlashCardGroupsService } from './flash-card-groups.service';
import { FlashCardsService } from './flash-cards.service';
import { FlashCardGenerationService } from './flash-card-generation.service';
import { FlashCardImageService } from './flash-card-image.service';

@Module({
    imports: [PrismaModule, AiIntegrationModule, GcsIntegrationModule],
    controllers: [FlashCardsController],
    providers: [
        FlashCardGroupsService,
        FlashCardsService,
        FlashCardGenerationService,
        FlashCardImageService,
    ],
})
export class FlashCardsModule {}
