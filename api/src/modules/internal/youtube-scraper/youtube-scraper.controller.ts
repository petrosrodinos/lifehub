import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InternalYoutubeScraperService } from './youtube-scraper.service';
import { FetchTranscriptDto } from './dto/fetch-transcript.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';

@ApiTags('YouTube Scraper')
@ApiBearerAuth()
@Controller('youtube-scraper')
@UseGuards(JwtGuard)
export class InternalYoutubeScraperController {
    constructor(private readonly service: InternalYoutubeScraperService) {}

    @Post('transcript')
    @ApiOperation({ summary: 'Fetch transcript for a YouTube video' })
    @ApiResponse({ status: 201, description: 'Transcript fetched successfully' })
    fetchTranscript(@Body() dto: FetchTranscriptDto) {
        return this.service.fetchTranscript(dto);
    }
}
