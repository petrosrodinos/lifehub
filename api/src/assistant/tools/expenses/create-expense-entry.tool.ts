import { tool } from '@openai/agents';
import { z } from 'zod';
import { ExpenseEntryType } from '@/generated/prisma';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { AssistantToolContext } from '../tool-context.interface';

export function createCreateExpenseEntryTool(
    expensesRetrieval: ExpensesRetrievalService,
    assistantConfig: AssistantConfig,
) {
    return tool({
        name: 'create_expense_entry',
        description: 'Create a new expense, income, or transfer entry for the user. Use only when the user explicitly asks to add, log, or record a transaction. For transfers, both account_name (source) and to_account_name (destination) are required.',
        parameters: z.object({
            type: z.nativeEnum(ExpenseEntryType).describe('EXPENSE, INCOME, or TRANSFER'),
            amount: z.number().min(0).describe('Transaction amount'),
            account_name: z.string().describe('Source account name, e.g. Eurobank'),
            to_account_name: z.string().nullable().optional().describe('Destination account name, required for TRANSFER entries'),
            category_name: z.string().nullable().optional().describe('Category or subcategory name'),
            subcategory_name: z.string().nullable().optional().describe('Subcategory name, more specific than category_name'),
            tag_names: z.array(z.string()).nullable().optional().describe('Tag names to attach to the entry'),
            description: z.string().nullable().optional().describe('Entry description, e.g. Grocery shopping'),
            has_vat: z.boolean().nullable().optional().describe('Whether 24% VAT applies; only valid for professional accounts'),
            entry_date: z.string().nullable().optional().describe('Entry date/time in ISO format; defaults to now'),
            quantity: z.number().int().min(1).max(100).nullable().optional().describe('Number of identical entries to create; defaults to 1'),
        }),
        timeoutMs: assistantConfig.toolTimeoutMs,
        async execute(
            { type, amount, account_name, to_account_name, category_name, subcategory_name, tag_names, description, has_vat, entry_date, quantity },
            runContext,
        ) {
            const context = runContext?.context as AssistantToolContext | undefined;

            if (!context?.user_uuid) {
                return { error: 'Missing user context' };
            }

            return expensesRetrieval.createEntry(context.user_uuid, {
                type,
                amount,
                account_name,
                to_account_name: to_account_name ?? undefined,
                category_name: category_name ?? undefined,
                subcategory_name: subcategory_name ?? undefined,
                tag_names: tag_names ?? undefined,
                description: description ?? undefined,
                has_vat: has_vat ?? undefined,
                entry_date: entry_date ?? undefined,
                quantity: quantity ?? undefined,
            });
        },
    });
}
