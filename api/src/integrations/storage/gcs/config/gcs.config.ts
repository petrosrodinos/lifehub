import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';
import { GcsConfig as GcsConfigInterface } from '../interfaces/gcs.interfaces';

@Injectable()
export class GcsConfig {
    private storageClient: Storage;
    private readonly logger = new Logger(GcsConfig.name);
    private config: GcsConfigInterface;

    constructor(private readonly configService: ConfigService) {
        this.initGcs();
    }

    private initGcs() {
        try {
            const projectId = this.configService.get<string>('GCS_PROJECT_ID');
            const bucketName =
                this.configService.get<string>('GCS_BUCKET_NAME') ||
                this.configService.get<string>('GCS_BUCKET');
            const credentialsBase64 = this.configService.get<string>('GCS_CREDENTIALS_JSON_BASE64');
            const folderName = this.configService.get<string>('GCS_FOLDER_NAME') ?? 'documents';

            if (!projectId || !bucketName) {
                this.logger.error('GCS_PROJECT_ID and GCS_BUCKET_NAME (or GCS_BUCKET) are required');
                return;
            }

            const credentials = credentialsBase64
                ? this.parseCredentialsFromBase64(credentialsBase64)
                : undefined;

            this.config = {
                project_id: projectId,
                bucket_name: bucketName,
                credentials,
                folder_name: folderName,
            };

            const storageOptions: { projectId: string; credentials?: object } = {
                projectId: this.config.project_id,
            };

            if (this.config.credentials) {
                storageOptions.credentials = this.config.credentials;
            }

            this.storageClient = new Storage(storageOptions);
            this.logger.debug('Google Cloud Storage initialized');
        } catch (error) {
            this.logger.error('Error initializing Google Cloud Storage', error);
        }
    }

    private parseCredentialsFromBase64(base64: string): object {
        try {
            const normalized = base64.trim().replace(/^["']|["']$/g, '');
            const json = Buffer.from(normalized, 'base64').toString('utf-8');
            return JSON.parse(json) as object;
        } catch {
            throw new Error('Invalid GCS_CREDENTIALS_JSON_BASE64');
        }
    }

    getStorageClient(): Storage {
        return this.storageClient;
    }

    getConfig(): GcsConfigInterface {
        return this.config;
    }

    getBucketName(): string {
        return this.config.bucket_name;
    }
}
