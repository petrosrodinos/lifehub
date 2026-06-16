import { tool } from '@openai/agents';
import { z } from 'zod';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createListExpenseCategoriesTool(
    expensesRetrieval: ExpensesRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'list_expense_categories',
        description: 'List all expense categories and their subcategories for the user. Use when the user asks about categories or when category names need disambiguation.',
        parameters: z.object({}),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute(_args, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { categories: [], error: 'Missing user context' };
            }

            const categories = await expensesRetrieval.listCategories(context.user_uuid);

            return { categories };
        },
    });
}
