import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateConversationDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(200)
    title: string;
}
