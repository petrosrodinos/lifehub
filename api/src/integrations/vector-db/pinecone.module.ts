import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';
import { PineconeConfig } from './pinecone.config';

@Module({
    providers: [PineconeConfig, PineconeService],
    exports: [PineconeService],
})
export class PineconeModule {}
