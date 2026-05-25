import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SendNoteMessageDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    content: string;
}
