import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export enum QuizDifficultyDto {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
    MIXED = 'MIXED',
}

export enum QuizQuestionTypeDto {
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    TRUE_FALSE = 'TRUE_FALSE',
    SHORT_ANSWER = 'SHORT_ANSWER',
}

export class CreateQuizGroupDto {
    @ApiProperty({ description: 'UUIDs of notes to generate quiz from', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    note_uuids: string[];

    @ApiProperty({ required: false, description: 'Optional custom title' })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    user_title?: string;

    @ApiProperty({ enum: QuizDifficultyDto, default: QuizDifficultyDto.MIXED })
    @IsOptional()
    @IsEnum(QuizDifficultyDto)
    difficulty?: QuizDifficultyDto = QuizDifficultyDto.MIXED;

    @ApiProperty({ description: 'Target number of questions (5–30)', default: 10 })
    @IsOptional()
    @IsInt()
    @Min(5)
    @Max(30)
    question_count_target?: number = 10;

    @ApiProperty({ enum: QuizQuestionTypeDto, isArray: true, description: 'Question types to generate' })
    @IsOptional()
    @IsArray()
    @IsEnum(QuizQuestionTypeDto, { each: true })
    @ArrayMaxSize(3)
    question_types?: QuizQuestionTypeDto[] = [
        QuizQuestionTypeDto.MULTIPLE_CHOICE,
        QuizQuestionTypeDto.TRUE_FALSE,
        QuizQuestionTypeDto.SHORT_ANSWER,
    ];
}
