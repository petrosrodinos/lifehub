import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { NoteTagsService } from './note-tags.service';
import { CreateNoteTagDto } from './dto/create-note-tag.dto';
import { UpdateNoteTagDto } from './dto/update-note-tag.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Note Tags')
@ApiBearerAuth()
@Controller('note-tags')
@UseGuards(JwtGuard)
export class NoteTagsController {
    constructor(private readonly noteTagsService: NoteTagsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new note tag' })
    @ApiResponse({ status: 201, description: 'Note tag created successfully' })
    create(
        @CurrentUser('user_uuid') user_uuid: string,
        @Body() dto: CreateNoteTagDto,
    ) {
        return this.noteTagsService.create(user_uuid, dto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all note tags for the current user' })
    findAll(@CurrentUser('user_uuid') user_uuid: string) {
        return this.noteTagsService.findAll(user_uuid);
    }

    @Get(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a note tag by UUID' })
    @ApiParam({ name: 'uuid', description: 'Note tag UUID' })
    findOne(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.noteTagsService.findOne(user_uuid, uuid);
    }

    @Patch(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a note tag' })
    @ApiParam({ name: 'uuid', description: 'Note tag UUID' })
    update(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
        @Body() dto: UpdateNoteTagDto,
    ) {
        return this.noteTagsService.update(user_uuid, uuid, dto);
    }

    @Delete(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a note tag' })
    @ApiParam({ name: 'uuid', description: 'Note tag UUID' })
    remove(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.noteTagsService.remove(user_uuid, uuid);
    }
}
