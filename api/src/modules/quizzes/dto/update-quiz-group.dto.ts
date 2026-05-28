import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateQuizGroupDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    user_title?: string;
}
