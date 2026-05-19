import { Module } from '@nestjs/common';
import { InternalYoutubeScraperService } from './youtube-scraper.service';
import { InternalYoutubeScraperController } from './youtube-scraper.controller';
import { YoutubeScraperIntegrationModule } from '@/integrations/youtube-scraper/youtube-scraper.module';

@Module({
    imports: [YoutubeScraperIntegrationModule],
    controllers: [InternalYoutubeScraperController],
    providers: [InternalYoutubeScraperService],
})
export class InternalYoutubeScraperModule {}
