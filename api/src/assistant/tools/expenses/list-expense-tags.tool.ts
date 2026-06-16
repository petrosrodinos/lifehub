import { tool } from '@openai/agents';
import { z } from 'zod';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createListExpenseTagsTool(
    expensesRetrieval: ExpensesRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'list_expense_tags',
        description: 'List all expense tags for the user. Use when the user asks about tags or when tag names need disambiguation.',
        parameters: z.object({}),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute(_args, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { tags: [], error: 'Missing user context' };
            }

            const tags = await expensesRetrieval.listTags(context.user_uuid);

            return { tags };
        },
    });
}
