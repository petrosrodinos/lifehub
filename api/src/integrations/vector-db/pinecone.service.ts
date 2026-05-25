import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeConfig } from './pinecone.config';

const EMBEDDING_DIMENSION = 1536;

export interface PineconeQueryMatch {
    id: string;
    score: number;
    metadata: Record<string, string>;
}

@Injectable()
export class PineconeService implements OnModuleInit {
    private readonly logger = new Logger(PineconeService.name);
    private client: Pinecone;
    private indexName: string;

    constructor(private readonly pineconeConfig: PineconeConfig) {}

    async onModuleInit() {
        this.indexName = this.pineconeConfig.indexName;
        this.client = new Pinecone({ apiKey: this.pineconeConfig.apiKey });
        await this.ensureIndexExists();
    }

    private async ensureIndexExists() {
        try {
            const { indexes } = await this.client.listIndexes();
            const exists = indexes?.some((i) => i.name === this.indexName);

            if (exists) {
                return;
            }

            this.logger.log(`Index "${this.indexName}" not found — creating standard dense index (dim=${EMBEDDING_DIMENSION})...`);
            await this.client.createIndex({
                name: this.indexName,
                dimension: EMBEDDING_DIMENSION,
                metric: 'cosine',
                spec: {
                    serverless: {
                        cloud: 'aws',
                        region: 'us-east-1',
                    },
                },
                waitUntilReady: true,
            });
            this.logger.log(`Index "${this.indexName}" created and ready`);
        } catch (error) {
            this.logger.error(`ensureIndexExists failed: ${error.message}`, error.stack);
        }
    }

    async upsertVector(id: string, vector: number[], metadata: Record<string, string>) {
        try {
            const index = this.client.index(this.indexName);
            await index.upsert({ records: [{ id, values: vector, metadata }] });
        } catch (error) {
            this.logger.error(`Failed to upsert vector ${id}: ${error.message}`);
            throw error;
        }
    }

    async deleteVector(id: string) {
        try {
            const index = this.client.index(this.indexName);
            await index.deleteOne({ id });
        } catch (error) {
            this.logger.warn(`Failed to delete vector ${id}: ${error.message}`);
        }
    }

    async queryVectors(
        vector: number[],
        user_uuid: string,
        topK: number,
    ): Promise<PineconeQueryMatch[]> {
        try {
            const index = this.client.index(this.indexName);
            const response = await index.query({
                vector,
                topK,
                includeMetadata: true,
                filter: { user_uuid: { $eq: user_uuid } },
            });

            return (response.matches ?? []).map((match) => ({
                id: match.id ?? '',
                score: match.score ?? 0,
                metadata: (match.metadata ?? {}) as Record<string, string>,
            }));
        } catch (error) {
            this.logger.error(`Failed to query vectors for user ${user_uuid}: ${error.message}`);
            throw error;
        }
    }
}
