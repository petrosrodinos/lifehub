import { formatCurrency } from "../../../utils/format-currency.utils";
import type { CreateExpenseEntryDto, ExpenseEntry } from "../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";

export const expenseEntryToCreateDto = (transaction: ExpenseEntry): Partial<CreateExpenseEntryDto> => ({
  type: transaction.type,
  amount: typeof transaction.amount === "string" ? parseFloat(transaction.amount) : transaction.amount,
  description: transaction.description,
  from_account_uuid: transaction.from_account_uuid,
  to_account_uuid: transaction.to_account_uuid,
  category_uuid: transaction.category_uuid,
  subcategory_uuid: transaction.subcategory_uuid,
  entry_date: transaction.entry_date,
  tag_uuids: transaction.tags?.map((tag) => tag.uuid) ?? [],
});

export const formatDate = (value: string) => {
    const date = new Date(value);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);

}

export const formatAmount = (value: string | number) => {
    return formatCurrency(value, { absolute: true });
}