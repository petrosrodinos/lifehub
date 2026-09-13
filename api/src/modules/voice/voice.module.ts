import { Module } from '@nestjs/common';
import { ChatImagesModule } from '@/assistant/images/chat-images.module';
import { RetrievalModule } from '@/assistant/retrieval/retrieval.module';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { ChatModule } from '@/modules/chat/chat.module';
import { CreateJwtServiceModule } from '@/shared/utils/jwt/jwt.module';
import { VoiceGateway } from './voice.gateway';
import { VoiceSessionService } from './voice-session.service';

@Module({
  imports: [
    RetrievalModule,
    ChatImagesModule,
    ChatModule,
    CreateJwtServiceModule,
  ],
  providers: [AssistantConfig, VoiceGateway, VoiceSessionService],
})
export class VoiceModule {}
