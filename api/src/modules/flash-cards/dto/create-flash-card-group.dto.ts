import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsInt,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateFlashCardGroupDto {
    @ApiProperty({ description: 'UUIDs of notes to generate flash cards from', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    note_uuids: string[];

    @ApiProperty({ description: 'Optional custom title for the group', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    user_title?: string;

    @ApiProperty({ description: 'Number of flash cards to generate per note (1–20)', required: false, default: 5 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(20)
    cards_per_note?: number;
}
