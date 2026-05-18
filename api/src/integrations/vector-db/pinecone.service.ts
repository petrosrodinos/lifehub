import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';

const EMBEDDING_DIMENSION = 1536; // text-embedding-3-small

@Injectable()
export class PineconeService implements OnModuleInit {
    private readonly logger = new Logger(PineconeService.name);
    private client: Pinecone;
    private indexName: string;

    async onModuleInit() {
        this.indexName = process.env.PINECONE_INDEX ?? 'lifehub-notes';
        const apiKey = process.env.PINECONE_API_KEY ?? '';
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
}
