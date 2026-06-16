import { tool } from '@openai/agents';
import { z } from 'zod';
import { ExpenseEntryType } from '@/generated/prisma';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createGetSpendingBreakdownTool(
    expensesRetrieval: ExpensesRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'get_spending_breakdown',
        description: 'Get spending totals grouped by category or subcategory for a date range.',
        parameters: z.object({
            from_date: z.string().nullable().optional().describe('Start date in ISO format (YYYY-MM-DD)'),
            to_date: z.string().nullable().optional().describe('End date in ISO format (YYYY-MM-DD)'),
            group_by: z.enum(['category', 'subcategory']).nullable().optional().describe('Group results by category or subcategory'),
            type: z.nativeEnum(ExpenseEntryType).nullable().optional().describe('Entry type; defaults to EXPENSE'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ from_date, to_date, group_by, type }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { breakdown: [], error: 'Missing user context' };
            }

            return expensesRetrieval.getBreakdown(context.user_uuid, {
                from_date: from_date ?? undefined,
                to_date: to_date ?? undefined,
                group_by: group_by ?? undefined,
                type: type ?? undefined,
            });
        },
    });
}
