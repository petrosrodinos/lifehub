import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';

@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
@UseGuards(JwtGuard)
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new note' })
    @ApiResponse({ status: 201, description: 'Note created successfully' })
    create(
        @CurrentUser('user_uuid') user_uuid: string,
        @Body() createNoteDto: CreateNoteDto,
    ) {
        return this.notesService.create(user_uuid, createNoteDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all notes for the current user' })
    findAll(@CurrentUser('user_uuid') user_uuid: string) {
        return this.notesService.findAll(user_uuid);
    }

    @Get(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get a note by UUID' })
    @ApiParam({ name: 'uuid', description: 'Note UUID' })
    findOne(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.notesService.findOne(user_uuid, uuid);
    }

    @Patch(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a note' })
    @ApiParam({ name: 'uuid', description: 'Note UUID' })
    update(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
        @Body() updateNoteDto: UpdateNoteDto,
    ) {
        return this.notesService.update(user_uuid, uuid, updateNoteDto);
    }

    @Delete(':uuid')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete a note' })
    @ApiParam({ name: 'uuid', description: 'Note UUID' })
    remove(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.notesService.remove(user_uuid, uuid);
    }

    @Post(':uuid/summarize')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Summarize a note with AI' })
    @ApiParam({ name: 'uuid', description: 'Note UUID' })
    @ApiResponse({ status: 200, description: 'Returns AI-generated summary as markdown' })
    summarize(
        @CurrentUser('user_uuid') user_uuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.notesService.summarize(user_uuid, uuid);
    }
}
