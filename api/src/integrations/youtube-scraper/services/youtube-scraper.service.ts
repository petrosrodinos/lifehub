import { Injectable, Logger } from '@nestjs/common';
import {
    GetVideoTranscriptRequest,
    GetChannelTranscriptsRequest,
    YoutubeVideoResult,
} from '../interfaces/youtube-scraper.interfaces';
import { YoutubeScraperAdapter } from '../youtube-scraper.adapter';

@Injectable()
export class YoutubeScraperService {
    private readonly logger = new Logger(YoutubeScraperService.name);

    constructor(private readonly adapter: YoutubeScraperAdapter) {}

    async getVideoTranscript(request: GetVideoTranscriptRequest): Promise<YoutubeVideoResult[]> {
        try {
            return await this.adapter.run(request);
        } catch (error) {
            this.logger.error('Get video transcript error:', error.message);
            throw new Error(`Failed to get video transcript: ${error.message}`);
        }
    }

    async getChannelTranscripts(request: GetChannelTranscriptsRequest): Promise<YoutubeVideoResult[]> {
        try {
            return await this.adapter.run(request);
        } catch (error) {
            this.logger.error('Get channel transcripts error:', error.message);
            throw new Error(`Failed to get channel transcripts: ${error.message}`);
        }
    }
}
