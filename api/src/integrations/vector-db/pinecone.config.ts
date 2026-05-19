import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PineconeConfig {
    readonly apiKey: string;
    readonly indexName: string;

    constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('PINECONE_API_KEY') ?? '';
        this.indexName = this.configService.get<string>('PINECONE_INDEX') ?? 'lifehub-notes';
    }
}
