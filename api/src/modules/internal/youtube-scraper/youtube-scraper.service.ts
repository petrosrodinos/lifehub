import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { YoutubeScraperService } from '@/integrations/youtube-scraper/services/youtube-scraper.service';
import { FetchTranscriptDto } from './dto/fetch-transcript.dto';

@Injectable()
export class InternalYoutubeScraperService {
    private readonly logger = new Logger(InternalYoutubeScraperService.name);

    constructor(private readonly youtubeScraper: YoutubeScraperService) {}

    async fetchTranscript(dto: FetchTranscriptDto): Promise<{ title: string; transcript: string }> {
        const results = await this.youtubeScraper.getVideoTranscript({
            youtube_url: dto.youtube_url,
            include_transcript_text: true,
        });

        if (!results || results.length === 0) {
            throw new NotFoundException('No transcript found for this video');
        }

        const video = results[0];
        const transcript =
            video.transcript_text ||
            video.transcript.map((s) => s.text).join(' ');

        return { title: video.title || '', transcript };
    }
}
