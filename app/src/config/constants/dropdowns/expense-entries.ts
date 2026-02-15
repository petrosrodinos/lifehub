import { ExpenseEntryTypes } from "../../../features/expense-entries/interfaces/expense-entries.interfaces";

export const ExpenseEntryTypeOptions = [
    {
        label: 'Income',
        value: ExpenseEntryTypes.INCOME,
    },
    {
        label: 'Expense',
        value: ExpenseEntryTypes.EXPENSE,
    },
    {
        label: 'Transfer',
        value: ExpenseEntryTypes.TRANSFER,
    },
] as const;

export const ExpenseEntryTypeLabels = {
    [ExpenseEntryTypes.INCOME]: 'Income',
    [ExpenseEntryTypes.EXPENSE]: 'Expense',
    [ExpenseEntryTypes.TRANSFER]: 'Transfer',
} as const;

export type ExpenseEntryTypeOption = (typeof ExpenseEntryTypeOptions)[number];
export type ExpenseEntryTypeLabel = (typeof ExpenseEntryTypeLabels)[keyof typeof ExpenseEntryTypeLabels];