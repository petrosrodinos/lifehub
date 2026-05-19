import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat/conversations')
@UseGuards(JwtGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new chat conversation' })
    create(
        @CurrentUser('user_uuid') user_uuid: string,
        @Body() dto: CreateConversationDto,
    ) {
        return this.chatService.createConversation(user_uuid, dto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'List chat conversations' })
    findAll(@CurrentUser('user_uuid') user_uuid: string) {
        return this.chatService.findAllConversations(user_uuid);
    }

    @Get(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a chat conversation' })
    @ApiParam({ name: 'uuid', description: 'Conversation UUID' })
    findOne(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.chatService.findOneConversation(user_uuid, uuid);
    }

    @Patch(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Rename a chat conversation' })
    @ApiParam({ name: 'uuid', description: 'Conversation UUID' })
    update(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
        @Body() dto: UpdateConversationDto,
    ) {
        return this.chatService.updateConversation(user_uuid, uuid, dto);
    }

    @Delete(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a chat conversation' })
    @ApiParam({ name: 'uuid', description: 'Conversation UUID' })
    remove(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.chatService.removeConversation(user_uuid, uuid);
    }

    @Get(':uuid/messages')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get messages for a conversation' })
    @ApiParam({ name: 'uuid', description: 'Conversation UUID' })
    findMessages(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.chatService.findMessages(user_uuid, uuid);
    }

    @Post(':uuid/messages')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Send a message and get assistant response' })
    @ApiParam({ name: 'uuid', description: 'Conversation UUID' })
    @ApiResponse({ status: 201, description: 'User and assistant messages' })
    sendMessage(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
        @Body() dto: SendMessageDto,
    ) {
        return this.chatService.sendMessage(user_uuid, uuid, dto.content);
    }
}
