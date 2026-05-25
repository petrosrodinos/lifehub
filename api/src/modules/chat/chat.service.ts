import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { ChatMessage, ChatMessageRole, Prisma } from '@/generated/prisma';
import { AssistantOrchestratorService } from '@/integrations/assistant/assistant-orchestrator.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { stripMarkdownImages } from '@/integrations/assistant/utils/strip-markdown-images.utils';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

const DEFAULT_TITLE = 'New chat';
const TITLE_MAX_LENGTH = 80;

@Injectable()
export class ChatService {
    private readonly logger = new Logger(ChatService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly assistantOrchestrator: AssistantOrchestratorService,
        private readonly assistantConfig: AssistantConfig,
    ) {}

    async createConversation(user_uuid: string, dto: CreateConversationDto) {
        try {
            return await this.prisma.chatConversation.create({
                data: {
                    user_uuid,
                    title: dto.title ?? DEFAULT_TITLE,
                },
            });
        } catch (error) {
            this.logger.error(`Failed to create conversation: ${error.message}`);
            throw new InternalServerErrorException('Failed to create conversation');
        }
    }

    async findAllConversations(user_uuid: string) {
        try {
            return await this.prisma.chatConversation.findMany({
                where: { user_uuid },
                orderBy: { updated_at: 'desc' },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to get conversations');
        }
    }

    async findOneConversation(user_uuid: string, uuid: string) {
        const conversation = await this.prisma.chatConversation.findFirst({
            where: { uuid, user_uuid },
        });

        if (!conversation) {
            throw new NotFoundException('Conversation not found');
        }

        return conversation;
    }

    async updateConversation(user_uuid: string, uuid: string, dto: UpdateConversationDto) {
        await this.findOneConversation(user_uuid, uuid);

        try {
            return await this.prisma.chatConversation.update({
                where: { uuid },
                data: { title: dto.title },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to update conversation');
        }
    }

    async removeConversation(user_uuid: string, uuid: string) {
        await this.findOneConversation(user_uuid, uuid);

        try {
            return await this.prisma.chatConversation.delete({
                where: { uuid },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete conversation');
        }
    }

    async findMessages(user_uuid: string, conversation_uuid: string) {
        await this.findOneConversation(user_uuid, conversation_uuid);

        try {
            return await this.prisma.chatMessage.findMany({
                where: { conversation_uuid },
                orderBy: { created_at: 'asc' },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to get messages');
        }
    }

    async findNoteConversation(user_uuid: string, note_uuid: string) {
        const conversation = await this.prisma.chatConversation.findFirst({
            where: { user_uuid, note_uuid },
        });

        if (!conversation) return null;

        const messages = await this.prisma.chatMessage.findMany({
            where: { conversation_uuid: conversation.uuid },
            orderBy: { created_at: 'asc' },
        });

        return { conversation, messages };
    }

    async sendNoteMessage(user_uuid: string, note_uuid: string, content: string) {
        let conversation = await this.prisma.chatConversation.findFirst({
            where: { user_uuid, note_uuid },
        });

        if (!conversation) {
            const note = await this.prisma.note.findFirst({
                where: { uuid: note_uuid, user_uuid },
            });
            if (!note) throw new NotFoundException('Note not found');

            const context = `${note.title}\n\n${note.content}`;
            const title = note.title.length <= TITLE_MAX_LENGTH ? note.title : `${note.title.slice(0, TITLE_MAX_LENGTH)}…`;

            conversation = await this.prisma.chatConversation.create({
                data: {
                    user_uuid,
                    note_uuid,
                    context,
                    title,
                },
            });
        }

        const result = await this.sendMessage(user_uuid, conversation.uuid, content);
        return { ...result, conversationUuid: conversation.uuid };
    }

    async sendMessage(user_uuid: string, conversation_uuid: string, content: string) {
        const conversation = await this.findOneConversation(user_uuid, conversation_uuid);

        const priorHistory = await this.prisma.chatMessage.findMany({
            where: { conversation_uuid },
            orderBy: { created_at: 'desc' },
            take: this.assistantConfig.maxHistoryMessages,
        });

        let history: ChatMessage[] = priorHistory.reverse();

        // If conversation has note context, inject synthetic context messages before real history
        if (conversation.context) {
            const now = new Date();
            const syntheticUser: ChatMessage = {
                id: -1,
                uuid: 'ctx-user',
                conversation_uuid,
                role: ChatMessageRole.USER,
                content: `Note context:\n${conversation.context}`,
                metadata: null,
                created_at: now,
            };
            const syntheticAssistant: ChatMessage = {
                id: -2,
                uuid: 'ctx-assistant',
                conversation_uuid,
                role: ChatMessageRole.ASSISTANT,
                content: "Got it! I'll help you discuss this note.",
                metadata: null,
                created_at: now,
            };
            history = [syntheticUser, syntheticAssistant, ...history];
        }

        const userMessage = await this.prisma.chatMessage.create({
            data: {
                conversation_uuid,
                role: ChatMessageRole.USER,
                content,
            },
        });

        try {
            const { assistantText, toolTrace, images } = await this.assistantOrchestrator.run(
                user_uuid,
                history,
                content,
                conversation_uuid,
            );

            const metadataPayload: Record<string, unknown> = {};
            if (toolTrace.length > 0) metadataPayload.toolTrace = toolTrace;
            if (images.length > 0) metadataPayload.images = images;
            const metadata =
                Object.keys(metadataPayload).length > 0
                    ? (JSON.parse(JSON.stringify(metadataPayload)) as Prisma.InputJsonValue)
                    : undefined;

            const assistantContent = stripMarkdownImages(
                assistantText,
                images.map((image) => image.url),
            );

            const assistantMessage = await this.prisma.chatMessage.create({
                data: {
                    conversation_uuid,
                    role: ChatMessageRole.ASSISTANT,
                    content: assistantContent,
                    metadata,
                },
            });

            const titleUpdate =
                conversation.title === DEFAULT_TITLE
                    ? { title: this.truncateTitle(content) }
                    : {};

            await this.prisma.chatConversation.update({
                where: { uuid: conversation_uuid },
                data: { updated_at: new Date(), ...titleUpdate },
            });

            return {
                userMessage,
                assistantMessage,
            };
        } catch (error) {
            this.logger.error(`Assistant run failed: ${error.message}`, error.stack);
            await this.prisma.chatMessage.delete({ where: { uuid: userMessage.uuid } });
            throw new InternalServerErrorException('Failed to generate assistant response');
        }
    }

    private truncateTitle(text: string): string {
        const trimmed = text.trim().replace(/\s+/g, ' ');
        if (trimmed.length <= TITLE_MAX_LENGTH) return trimmed;
        return `${trimmed.slice(0, TITLE_MAX_LENGTH)}…`;
    }
}
