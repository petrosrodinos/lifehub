import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFlashCardGroupDto {
    @ApiProperty({ description: 'Custom title for the group', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    user_title?: string;
}
