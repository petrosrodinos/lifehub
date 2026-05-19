import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AssistantModule } from '@/integrations/assistant/assistant.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
    imports: [PrismaModule, AssistantModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {}
