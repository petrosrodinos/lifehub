import { Injectable, Logger } from '@nestjs/common';
import { ExpenseEntryType } from '@/generated/prisma';
import { ExpenseEntriesService } from '@/modules/expenses/expense-entries/expense-entries.service';
import { ExpenseAccountsService } from '@/modules/expenses/expense-accounts/expense-accounts.service';
import { ExpenseCategoriesService } from '@/modules/expenses/expense-categories/expense-categories.service';
import { ExpenseSubcategoriesService } from '@/modules/expenses/expense-subcategories/expense-subcategories.service';
import {
    resolveAccount,
    resolveCategoryOrSubcategory,
    type EntityCandidate,
} from '@/assistant/utils/expense-entity-resolver.helper';

export interface ExpenseEntryFilters {
    from_date?: string;
    to_date?: string;
    type?: ExpenseEntryType;
    account_name?: string;
    category_name?: string;
    subcategory_name?: string;
    search?: string;
    limit?: number;
}

export interface ExpenseSummaryFilters {
    from_date?: string;
    to_date?: string;
    account_name?: string;
}

export interface ExpenseBreakdownFilters {
    from_date?: string;
    to_date?: string;
    group_by?: 'category' | 'subcategory';
    type?: ExpenseEntryType;
}

export interface SlimExpenseEntry {
    uuid: string;
    type: ExpenseEntryType;
    amount: number;
    description: string | null;
    entry_date: string;
    account: string;
    category: string | null;
    subcategory: string | null;
    tags: string[];
}

export interface ExpenseEntriesResult {
    entries: SlimExpenseEntry[];
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
}

export interface ExpenseSummaryResult {
    totalIncome: number;
    totalExpense: number;
    accountsBalance: number;
    netBalance: number;
}

export interface ExpenseBreakdownItem {
    uuid: string;
    name: string;
    total: number;
    count: number;
    percentage: number;
    categoryName?: string;
}

export interface ExpenseAccountItem {
    uuid: string;
    name: string;
    balance: number;
}

export interface ExpenseCategoryItem {
    uuid: string;
    name: string;
    subcategories: Array<{ uuid: string; name: string }>;
}

type ResolvedEntryFilters = {
    type?: ExpenseEntryType;
    from_account_uuid?: string;
    category_uuid?: string;
    subcategory_uuid?: string;
};

type ResolverError = {
    error: string;
    candidates?: EntityCandidate[];
};

type ResolvedEntryFiltersResult = ResolvedEntryFilters | ResolverError;

function isResolverError(value: ResolvedEntryFiltersResult): value is ResolverError {
    return 'error' in value;
}

@Injectable()
export class ExpensesRetrievalService {
    private readonly logger = new Logger(ExpensesRetrievalService.name);

    constructor(
        private readonly expenseEntriesService: ExpenseEntriesService,
        private readonly expenseAccountsService: ExpenseAccountsService,
        private readonly expenseCategoriesService: ExpenseCategoriesService,
        private readonly expenseSubcategoriesService: ExpenseSubcategoriesService,
    ) {}

    async listEntries(user_uuid: string, filters: ExpenseEntryFilters): Promise<ExpenseEntriesResult | ResolverError> {
        const resolved = await this.resolveEntryFilters(user_uuid, filters);

        if (isResolverError(resolved)) {
            return resolved;
        }

        const limit = Math.min(filters.limit ?? 20, 50);
        const result = await this.expenseEntriesService.findAll(user_uuid, {
            page: 1,
            limit,
            type: resolved.type,
            category_uuid: resolved.category_uuid,
            subcategory_uuid: resolved.subcategory_uuid,
            from_account_uuid: resolved.from_account_uuid,
            from_date: this.parseDate(filters.from_date),
            to_date: this.parseDate(filters.to_date),
            search: filters.search,
        });

        this.logger.log(`Listed ${result.data.length} expense entries for user ${user_uuid}`);

        return {
            entries: result.data.map((entry) => this.toSlimEntry(entry)),
            total: result.pagination.total,
            page: result.pagination.page,
            limit: result.pagination.limit,
            hasNextPage: result.pagination.hasNextPage,
        };
    }

    async getSummary(user_uuid: string, filters: ExpenseSummaryFilters): Promise<ExpenseSummaryResult | ResolverError> {
        let accountUuids: string | undefined;

        if (filters.account_name) {
            const accounts = await this.expenseAccountsService.findAll(user_uuid);
            const accountResolution = resolveAccount(accounts, filters.account_name);

            if (accountResolution.ok === false) {
                return { error: accountResolution.error, candidates: accountResolution.candidates };
            }

            accountUuids = accountResolution.uuid;
        }

        const stats = await this.expenseEntriesService.getStats(user_uuid, {
            account_uuids: accountUuids,
            from_date: this.parseDate(filters.from_date),
            to_date: this.parseDate(filters.to_date),
        });

        return stats;
    }

    async getBreakdown(user_uuid: string, filters: ExpenseBreakdownFilters): Promise<ExpenseBreakdownItem[] | ResolverError> {
        const data = await this.expenseEntriesService.getExpensesBySubcategory(user_uuid, {
            type: filters.type ?? ExpenseEntryType.EXPENSE,
            group_by: filters.group_by ?? 'subcategory',
            from_date: this.parseDate(filters.from_date),
            to_date: this.parseDate(filters.to_date),
        });

        return data.map((item) => ({
            uuid: item.uuid,
            name: item.name,
            total: item.total,
            count: item.count,
            percentage: item.percentage,
            ...('categoryName' in item ? { categoryName: item.categoryName } : {}),
        }));
    }

    async listAccounts(user_uuid: string): Promise<ExpenseAccountItem[]> {
        const accounts = await this.expenseAccountsService.findAll(user_uuid);

        return accounts.map((account) => ({
            uuid: account.uuid,
            name: account.name,
            balance: Number(account.balance),
        }));
    }

    async listCategories(user_uuid: string): Promise<ExpenseCategoryItem[]> {
        const categories = await this.expenseCategoriesService.findAll(user_uuid);

        return categories.map((category) => ({
            uuid: category.uuid,
            name: category.name,
            subcategories: category.subcategories.map((subcategory) => ({
                uuid: subcategory.uuid,
                name: subcategory.name,
            })),
        }));
    }

    private async resolveEntryFilters(user_uuid: string, filters: ExpenseEntryFilters): Promise<ResolvedEntryFiltersResult> {
        let from_account_uuid: string | undefined;
        let category_uuid: string | undefined;
        let subcategory_uuid: string | undefined;

        if (filters.account_name) {
            const accounts = await this.expenseAccountsService.findAll(user_uuid);
            const accountResolution = resolveAccount(accounts, filters.account_name);

            if (accountResolution.ok === false) {
                return { error: accountResolution.error, candidates: accountResolution.candidates };
            }

            from_account_uuid = accountResolution.uuid;
        }

        if (filters.subcategory_name || filters.category_name) {
            const [categories, subcategories] = await Promise.all([
                this.expenseCategoriesService.findAll(user_uuid),
                this.expenseSubcategoriesService.findAll(user_uuid),
            ]);

            const nameToResolve = filters.subcategory_name ?? filters.category_name!;
            const resolution = resolveCategoryOrSubcategory(
                categories,
                subcategories.map((subcategory) => ({
                    uuid: subcategory.uuid,
                    name: subcategory.name,
                    category_uuid: subcategory.category_uuid,
                })),
                nameToResolve,
            );

            if (resolution.ok === false) {
                return { error: resolution.error, candidates: resolution.candidates };
            }

            category_uuid = resolution.category_uuid;
            subcategory_uuid = resolution.subcategory_uuid;
        }

        return {
            type: filters.type,
            from_account_uuid,
            category_uuid,
            subcategory_uuid,
        };
    }

    private parseDate(value?: string): Date | undefined {
        if (!value) {
            return undefined;
        }

        const parsed = new Date(value);

        if (Number.isNaN(parsed.getTime())) {
            return undefined;
        }

        return parsed;
    }

    private toSlimEntry(entry: {
        uuid: string;
        type: ExpenseEntryType;
        amount: unknown;
        description: string | null;
        entry_date: Date;
        from_account: { name: string };
        category: { name: string } | null;
        subcategory: { name: string } | null;
        tags: Array<{ title: string }>;
    }): SlimExpenseEntry {
        return {
            uuid: entry.uuid,
            type: entry.type,
            amount: Number(entry.amount),
            description: entry.description,
            entry_date: entry.entry_date.toISOString(),
            account: entry.from_account.name,
            category: entry.category?.name ?? null,
            subcategory: entry.subcategory?.name ?? null,
            tags: entry.tags.map((tag) => tag.title),
        };
    }
}
