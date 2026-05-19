import { tool } from '@openai/agents';
import { z } from 'zod';
import { NotesRetrievalService } from '@/assistant/retrieval/notes-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createSearchNotesTool(
    notesRetrieval: NotesRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'search_notes',
        description: 'Semantically search the user notes library for content relevant to the question.',
        parameters: z.object({
            query: z.string().describe('Natural language search query'),
            top_k: z.number().int().min(1).max(20).nullable().optional(),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ query, top_k }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;
            if (!context?.user_uuid) {
                return { notes: [], totalMatches: 0, error: 'Missing user context' };
            }

            return notesRetrieval.search(context.user_uuid, query, {
                topK: top_k ?? assistantConfig.notesRetrievalTopK,
            });
        },
    });
}
