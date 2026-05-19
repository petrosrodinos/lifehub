import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { GcsIntegrationModule } from '@/integrations/storage/gcs/gcs.module';
import { ChatImageService } from './chat-image.service';

@Module({
    imports: [ConfigModule, AiIntegrationModule, GcsIntegrationModule],
    providers: [ChatImageService],
    exports: [ChatImageService],
})
export class ChatImagesModule {}
