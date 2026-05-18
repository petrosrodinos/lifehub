import { IsString, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum NoteType {
    BOOK = 'BOOK',
    IDEA = 'IDEA',
    NOTE = 'NOTE',
    VIDEO = 'VIDEO',
    ARTICLE = 'ARTICLE',
}

export class CreateNoteDto {
    @ApiProperty({ description: 'Note title', example: 'Atomic Habits summary' })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({ description: 'Note type', enum: NoteType, example: NoteType.BOOK })
    @IsEnum(NoteType)
    type: NoteType;

    @ApiProperty({ description: 'Note content', example: 'The book argues that small habits...' })
    @IsString()
    @MinLength(1)
    content: string;
}
