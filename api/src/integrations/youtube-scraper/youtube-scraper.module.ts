import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { YoutubeScraperAdapter } from './youtube-scraper.adapter';
import { YoutubeScraperService } from './services/youtube-scraper.service';
import { YoutubeScraperConfig } from './config/youtube-scraper.config';

@Module({
    imports: [ConfigModule],
    providers: [YoutubeScraperService, YoutubeScraperAdapter, YoutubeScraperConfig, Logger],
    exports: [YoutubeScraperService],
})
export class YoutubeScraperIntegrationModule {}
