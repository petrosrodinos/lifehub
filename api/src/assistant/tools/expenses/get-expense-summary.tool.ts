import { tool } from '@openai/agents';
import { z } from 'zod';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createGetExpenseSummaryTool(
    expensesRetrieval: ExpensesRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'get_expense_summary',
        description: 'Get income, expense, and balance totals for a date range, optionally filtered by account name or tag name.',
        parameters: z.object({
            from_date: z.string().nullable().optional().describe('Start date in ISO format (YYYY-MM-DD)'),
            to_date: z.string().nullable().optional().describe('End date in ISO format (YYYY-MM-DD)'),
            account_name: z.string().nullable().optional().describe('Account name to filter by'),
            tag_name: z.string().nullable().optional().describe('Tag name to filter by, e.g. Claude'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ from_date, to_date, account_name, tag_name }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { error: 'Missing user context' };
            }

            return expensesRetrieval.getSummary(context.user_uuid, {
                from_date: from_date ?? undefined,
                to_date: to_date ?? undefined,
                account_name: account_name ?? undefined,
                tag_name: tag_name ?? undefined,
            });
        },
    });
}
