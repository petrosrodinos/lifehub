import { tool } from '@openai/agents';
import { z } from 'zod';
import { ExpenseEntryType } from '@/generated/prisma';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createListExpenseEntriesTool(
    expensesRetrieval: ExpensesRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'list_expense_entries',
        description: 'List the user expense, income, or transfer entries with optional filters by date range, account name, category name, subcategory name, or description search.',
        parameters: z.object({
            from_date: z.string().nullable().optional().describe('Start date in ISO format (YYYY-MM-DD)'),
            to_date: z.string().nullable().optional().describe('End date in ISO format (YYYY-MM-DD)'),
            type: z.nativeEnum(ExpenseEntryType).nullable().optional().describe('Entry type; use EXPENSE when the user asks about expenses'),
            account_name: z.string().nullable().optional().describe('Account name to filter by, e.g. Eurobank'),
            category_name: z.string().nullable().optional().describe('Category name to filter by'),
            subcategory_name: z.string().nullable().optional().describe('Subcategory name to filter by'),
            search: z.string().nullable().optional().describe('Search text in the entry description'),
            limit: z.number().int().min(1).max(50).nullable().optional().describe('Maximum number of entries to return'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute({ from_date, to_date, type, account_name, category_name, subcategory_name, search, limit }, runContext) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { entries: [], total: 0, error: 'Missing user context' };
            }

            return expensesRetrieval.listEntries(context.user_uuid, {
                from_date: from_date ?? undefined,
                to_date: to_date ?? undefined,
                type: type ?? undefined,
                account_name: account_name ?? undefined,
                category_name: category_name ?? undefined,
                subcategory_name: subcategory_name ?? undefined,
                search: search ?? undefined,
                limit: limit ?? undefined,
            });
        },
    });
}
