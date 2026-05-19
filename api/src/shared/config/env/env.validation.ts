import { z } from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z.enum(['local', 'development', 'test', 'staging', 'production']),
    PORT: z.coerce.number().default(3000),
    APP_URL: z.string().url().optional(),
    LANDING_URL: z.string().url().optional(),
    API_URL: z.string().url().optional(),
    DATABASE_URL: z.string().url().optional(),
    JWT_SECRET: z.string().default('secret'),
    JWT_EXPIRATION_TIME: z.string().optional().default('1m'),
    GCS_PROJECT_ID: z.string().optional(),
    GCS_BUCKET_NAME: z.string().optional(),
    GCS_FOLDER_NAME: z.string().optional(),
    GCS_CREDENTIALS_JSON_BASE64: z.string().optional(),
    OPENAI_API_KEY: z.string().optional(),
    PINECONE_API_KEY: z.string().optional(),
    PINECONE_INDEX: z.string().optional(),
    ASSISTANT_MODEL: z.string().optional(),
    CHAT_MAX_HISTORY_MESSAGES: z.string().optional(),
    NOTES_RETRIEVAL_TOP_K: z.string().optional(),
    NOTE_SNIPPET_MAX_CHARS: z.string().optional(),
    ASSISTANT_TOOL_TIMEOUT_MS: z.string().optional(),
    ASSISTANT_IMAGE_TOOL_TIMEOUT_MS: z.string().optional(),
});

export function validateEnv(config: Record<string, unknown>) {
    const parsed = EnvSchema.safeParse(config);

    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error('Invalid environment variables');
    }

    return parsed.data;
}

export type EnvConfig = z.infer<typeof EnvSchema>;
