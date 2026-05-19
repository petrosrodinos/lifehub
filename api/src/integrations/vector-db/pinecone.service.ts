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
        const apiKey = this.pineconeConfig.apiKey;
        this.logger.log(`Initializing Pinecone — index: "${this.indexName}", apiKey set: ${!!apiKey}`);
        this.client = new Pinecone({ apiKey });
        await this.ensureIndexExists();
    }

    private async ensureIndexExists() {
        try {
            this.logger.log(`Listing existing Pinecone indexes...`);
            const { indexes } = await this.client.listIndexes();
            this.logger.log(`Found indexes: ${JSON.stringify(indexes?.map(i => ({ name: i.name, dimension: i.dimension, metric: i.metric })))}`);

            const exists = indexes?.some((i) => i.name === this.indexName);

            if (exists) {
                this.logger.log(`Index "${this.indexName}" already exists — skipping creation`);
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
