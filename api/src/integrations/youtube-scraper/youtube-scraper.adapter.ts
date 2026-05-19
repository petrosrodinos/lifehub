import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import {
    YoutubeScraperInput,
    YoutubeVideoResult,
} from './interfaces/youtube-scraper.interfaces';
import { YoutubeScraperConfig } from './config/youtube-scraper.config';

@Injectable()
export class YoutubeScraperAdapter {
    private readonly logger = new Logger(YoutubeScraperAdapter.name);

    constructor(private readonly config: YoutubeScraperConfig) {}

    async run(input: YoutubeScraperInput): Promise<YoutubeVideoResult[]> {
        try {
            const response = await axios.post<YoutubeVideoResult[]>(
                this.config.getRunSyncDatasetUrl(),
                input,
                {
                    params: { token: this.config.getToken() },
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            return response.data;
        } catch (error) {
            this.logger.error('YouTube scraper run error:', error?.response?.data ?? error.message);
            throw new Error(`YouTube scraper failed: ${error.message}`);
        }
    }
}
