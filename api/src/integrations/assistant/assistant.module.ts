import { Module } from '@nestjs/common';
import { ChatImagesModule } from '@/assistant/images/chat-images.module';
import { RetrievalModule } from '@/assistant/retrieval/retrieval.module';
import { AssistantConfig } from './config/assistant.config';
import { AssistantOrchestratorService } from './assistant-orchestrator.service';

@Module({
    imports: [RetrievalModule, ChatImagesModule],
    providers: [AssistantConfig, AssistantOrchestratorService],
    exports: [AssistantOrchestratorService, AssistantConfig],
})
export class AssistantModule {}
