import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YoutubeScraperConfig {
    private readonly logger = new Logger(YoutubeScraperConfig.name);
    private readonly baseUrl = 'https://api.apify.com/v2';
    private readonly actorId = 'starvibe~youtube-video-transcript';
    private token: string;

    constructor(private readonly configService: ConfigService) {
        this.token = this.configService.get<string>('APIFY_TOKEN');

        if (!this.token) {
            this.logger.error('APIFY_TOKEN is required for YouTube scraper integration');
        }
    }

    getToken(): string {
        return this.token;
    }

    getRunSyncDatasetUrl(): string {
        return `${this.baseUrl}/acts/${this.actorId}/run-sync-get-dataset-items`;
    }
}
