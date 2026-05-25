import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { ChatService } from './chat.service';
import { SendNoteMessageDto } from './dto/send-note-message.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat/note-conversations')
@UseGuards(JwtGuard)
export class NoteConversationController {
    constructor(private readonly chatService: ChatService) {}

    @Get(':noteUuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get conversation for a specific note (or null if none)' })
    @ApiParam({ name: 'noteUuid', description: 'Note UUID' })
    @ApiResponse({ status: 200, description: 'Conversation with messages, or null' })
    findNoteConversation(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('noteUuid') noteUuid: string,
    ) {
        return this.chatService.findNoteConversation(user_uuid, noteUuid);
    }

    @Post(':noteUuid/messages')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Send a message for a note conversation (creates conversation if needed)' })
    @ApiParam({ name: 'noteUuid', description: 'Note UUID' })
    @ApiResponse({ status: 201, description: 'User and assistant messages' })
    sendNoteMessage(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('noteUuid') noteUuid: string,
        @Body() dto: SendNoteMessageDto,
    ) {
        return this.chatService.sendNoteMessage(user_uuid, noteUuid, dto.content);
    }
}
