import { useState, useEffect } from "react";
import type { CreateExpenseEntryDto, ExpenseEntryType } from "../../../../features/expense-entries/interfaces/expense-entries.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expense-entries/interfaces/expense-entries.interfaces";
import { useExpenseAccounts } from "../../../../features/expense-accounts/hooks/use-expense-accounts";
import { useExpenseCategories } from "../../../../features/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../../features/expense-subcategories/hooks/use-expense-subcategories";

type TransactionFormProps = {
  onSubmit: (data: CreateExpenseEntryDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending: boolean;
  initialData?: Partial<CreateExpenseEntryDto>;
};

export function TransactionForm({ onSubmit, onCancel, submitLabel, isPending, initialData }: TransactionFormProps) {
  const { data: accountsData } = useExpenseAccounts();
  const { data: categoriesData } = useExpenseCategories();
  const { data: subcategoriesData } = useExpenseSubcategories();

  const [type, setType] = useState<ExpenseEntryType>(initialData?.type || ExpenseEntryTypes.EXPENSE);
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [fromAccountUuid, setFromAccountUuid] = useState(initialData?.from_account_uuid || "");
  const [toAccountUuid, setToAccountUuid] = useState(initialData?.to_account_uuid || "");
  const [categoryUuid, setCategoryUuid] = useState(initialData?.category_uuid || "");
  const [subcategoryUuid, setSubcategoryUuid] = useState(initialData?.subcategory_uuid || "");
  const [entryDate, setEntryDate] = useState(initialData?.entry_date ? initialData.entry_date.split("T")[0] : new Date().toISOString().split("T")[0]);

  const accounts = accountsData || [];
  const categories = categoriesData || [];
  const subcategories = subcategoriesData || [];

  const filteredSubcategories = categoryUuid ? subcategories.filter((sub) => sub.category_uuid === categoryUuid) : [];

  useEffect(() => {
    if (categoryUuid && !filteredSubcategories.find((sub) => sub.uuid === subcategoryUuid)) {
      setSubcategoryUuid(filteredSubcategories[0]?.uuid || "");
    }
  }, [categoryUuid, filteredSubcategories, subcategoryUuid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreateExpenseEntryDto = {
      type,
      amount: parseFloat(amount),
      description: description || undefined,
      from_account_uuid: fromAccountUuid,
      to_account_uuid: type === ExpenseEntryTypes.TRANSFER ? toAccountUuid : undefined,
      category_uuid: categoryUuid,
      subcategory_uuid: subcategoryUuid,
      entry_date: entryDate,
    };

    onSubmit(data);
  };

  const isFormValid = amount && parseFloat(amount) > 0 && fromAccountUuid && categoryUuid && subcategoryUuid && (type !== ExpenseEntryTypes.TRANSFER || toAccountUuid);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType(ExpenseEntryTypes.EXPENSE)}
            disabled={isPending}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              type === ExpenseEntryTypes.EXPENSE
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            💸 Expense
          </button>
          <button
            type="button"
            onClick={() => setType(ExpenseEntryTypes.INCOME)}
            disabled={isPending}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              type === ExpenseEntryTypes.INCOME
                ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            💰 Income
          </button>
          <button
            type="button"
            onClick={() => setType(ExpenseEntryTypes.TRANSFER)}
            disabled={isPending}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              type === ExpenseEntryTypes.TRANSFER
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            🔄 Transfer
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
        <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" disabled={isPending} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">{type === ExpenseEntryTypes.TRANSFER ? "From Account" : "Account"}</label>
        <div className="grid grid-cols-2 gap-2">
          {accounts.map((account) => (
            <button
              key={account.uuid}
              type="button"
              onClick={() => setFromAccountUuid(account.uuid)}
              disabled={isPending}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                fromAccountUuid === account.uuid
                  ? "text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              style={
                fromAccountUuid === account.uuid
                  ? {
                      backgroundColor: account.color || "#8b5cf6",
                      boxShadow: `0 10px 30px -10px ${account.color || "#8b5cf6"}50`,
                    }
                  : undefined
              }
            >
              <span className="mr-2">{account.icon}</span>
              {account.name}
            </button>
          ))}
        </div>
      </div>

      {type === ExpenseEntryTypes.TRANSFER && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">To Account</label>
          <div className="grid grid-cols-2 gap-2">
            {accounts
              .filter((account) => account.uuid !== fromAccountUuid)
              .map((account) => (
                <button
                  key={account.uuid}
                  type="button"
                  onClick={() => setToAccountUuid(account.uuid)}
                  disabled={isPending}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                    toAccountUuid === account.uuid
                      ? "text-white shadow-lg"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={
                    toAccountUuid === account.uuid
                      ? {
                          backgroundColor: account.color || "#8b5cf6",
                          boxShadow: `0 10px 30px -10px ${account.color || "#8b5cf6"}50`,
                        }
                      : undefined
                  }
                >
                  <span className="mr-2">{account.icon}</span>
                  {account.name}
                </button>
              ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
        <select value={categoryUuid} onChange={(e) => setCategoryUuid(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors" disabled={isPending} required>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.uuid} value={category.uuid}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Subcategory</label>
        <select value={subcategoryUuid} onChange={(e) => setSubcategoryUuid(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors" disabled={isPending || !categoryUuid} required>
          <option value="">Select subcategory</option>
          {filteredSubcategories.map((subcategory) => (
            <option key={subcategory.uuid} value={subcategory.uuid}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional description" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" disabled={isPending} />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
        <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors" disabled={isPending} required />
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={isPending || !isFormValid} className="flex-1 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isPending ? "Creating..." : submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={isPending} className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}
