import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { AiService } from '@/integrations/ai/services/ai.service';
import { GcsService } from '@/integrations/storage/gcs/services/gcs.service';

export interface ChatGeneratedImage {
    url: string;
    prompt: string;
}

@Injectable()
export class ChatImageService {
    private readonly logger = new Logger(ChatImageService.name);

    private readonly storageFolder: string;

    constructor(
        private readonly aiService: AiService,
        private readonly gcsService: GcsService,
        configService: ConfigService,
    ) {
        this.storageFolder = configService.get<string>('GCS_FOLDER_NAME') ?? 'documents';
    }

    async createAndUpload(user_uuid: string, prompt: string): Promise<ChatGeneratedImage> {
        const { imageBuffer, mediaType } = await this.aiService.generateImage({ prompt });

        const extension = mediaType === 'image/jpeg' ? 'jpg' : 'png';
        const filename = `${randomUUID()}.${extension}`;
        const folder = `${this.storageFolder}/${user_uuid}`;

        const upload = await this.gcsService.uploadImageFromBuffer(
            imageBuffer,
            filename,
            mediaType,
            folder,
        );

        this.logger.log(`Uploaded chat image for user ${user_uuid}: ${upload.path}`);

        return { url: upload.url, prompt };
    }
}
