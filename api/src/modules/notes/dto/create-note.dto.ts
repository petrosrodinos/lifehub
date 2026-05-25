import { IsString, MinLength, IsEnum, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum NoteType {
    BOOK = 'BOOK',
    IDEA = 'IDEA',
    NOTE = 'NOTE',
    VIDEO = 'VIDEO',
    ARTICLE = 'ARTICLE',
}

export class CreateNoteDto {
    @ApiProperty({ description: 'Note title (generated from content by AI when omitted)', example: 'Atomic Habits summary', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ description: 'Note type', enum: NoteType, example: NoteType.BOOK })
    @IsEnum(NoteType)
    type: NoteType;

    @ApiProperty({ description: 'Note content', example: 'The book argues that small habits...' })
    @IsString()
    @MinLength(1)
    content: string;

    @ApiProperty({ description: 'UUIDs of tags to attach to the note', required: false, type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tag_uuids?: string[];
}
