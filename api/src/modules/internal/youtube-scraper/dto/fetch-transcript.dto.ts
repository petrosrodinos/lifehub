import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FetchTranscriptDto {
    @ApiProperty({ description: 'YouTube video URL' })
    @IsNotEmpty()
    @IsString()
    youtube_url: string;
}
