import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { PineconeModule } from '@/integrations/vector-db/pinecone.module';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { NotesRetrievalService } from './notes-retrieval.service';

@Module({
    imports: [PrismaModule, AiIntegrationModule, PineconeModule],
    providers: [AssistantConfig, NotesRetrievalService],
    exports: [NotesRetrievalService],
})
export class RetrievalModule {}
