import { ChatMessage } from '@/generated/prisma';

export interface AssistantToolTraceEntry {
    name: string;
    resultSummary?: string;
}

export interface AssistantGeneratedImage {
    url: string;
    prompt: string;
}

export interface AssistantRunResult {
    assistantText: string;
    toolTrace: AssistantToolTraceEntry[];
    images: AssistantGeneratedImage[];
}

export interface AssistantRunStreamPort {
    runStream(
        user_uuid: string,
        history: ChatMessage[],
        userMessage: string,
    ): AsyncIterable<string>;
}
