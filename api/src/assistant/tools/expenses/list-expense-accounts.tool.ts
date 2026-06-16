import { tool } from '@openai/agents';
import { z } from 'zod';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createListExpenseAccountsTool(
    expensesRetrieval: ExpensesRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'list_expense_accounts',
        description: 'List all expense accounts for the user with names and balances. Use when the user asks about their accounts or when account names need disambiguation.',
        parameters: z.object({}),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute(_args, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { accounts: [], error: 'Missing user context' };
            }

            const accounts = await expensesRetrieval.listAccounts(context.user_uuid);

            return { accounts };
        },
    });
}
