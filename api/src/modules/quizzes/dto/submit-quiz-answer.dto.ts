import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SubmitQuizAnswerDto {
    @ApiProperty({ description: 'UUID of the question being answered' })
    @IsString()
    question_uuid: string;

    @ApiProperty({ required: false, description: 'Selected option UUID (MULTIPLE_CHOICE)' })
    @IsOptional()
    @IsString()
    selected_option_uuid?: string;

    @ApiProperty({ required: false, description: 'Boolean answer (TRUE_FALSE)' })
    @IsOptional()
    @IsBoolean()
    boolean_answer?: boolean;

    @ApiProperty({ required: false, description: 'Text answer (SHORT_ANSWER)' })
    @IsOptional()
    @IsString()
    text_answer?: string;
}

export class CompleteQuizAttemptDto {
    @ApiProperty({ description: 'Time spent in seconds' })
    @IsInt()
    @Min(0)
    time_spent_seconds: number;
}
