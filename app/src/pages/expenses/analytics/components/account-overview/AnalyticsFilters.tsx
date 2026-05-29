import { useExpenseAccounts } from "../../../../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import { useExpenseCategories } from "../../../../../features/expenses/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../../../features/expenses/expense-subcategories/hooks/use-expense-subcategories";
import { ExpenseEntryTypes } from "../../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import type { ExpenseEntryType } from "../../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";

type AnalyticsFiltersProps = {
  selectedAccounts: string[];
  onAccountsChange: (accounts: string[]) => void;
  fromDate: string;
  onFromDateChange: (date: string) => void;
  toDate: string;
  onToDateChange: (date: string) => void;
  type?: ExpenseEntryType | "";
  onTypeChange?: (type: ExpenseEntryType | "") => void;
  categoryUuid?: string;
  onCategoryChange?: (uuid: string) => void;
  subcategoryUuid?: string;
  onSubcategoryChange?: (uuid: string) => void;
};

export function AnalyticsFilters({ selectedAccounts, onAccountsChange, fromDate, onFromDateChange, toDate, onToDateChange, type, onTypeChange, categoryUuid, onCategoryChange, subcategoryUuid, onSubcategoryChange }: AnalyticsFiltersProps) {
  const { data: accountsData } = useExpenseAccounts();
  const { data: categoriesData } = useExpenseCategories();
  const { data: subcategoriesData } = useExpenseSubcategories();
  const accounts = accountsData || [];
  const categories = categoriesData || [];
  const allSubcategories = subcategoriesData || [];
  const subcategories = categoryUuid ? allSubcategories.filter((s) => s.category_uuid === categoryUuid) : [];

  const handleAccountToggle = (accountUuid: string) => {
    if (selectedAccounts.includes(accountUuid)) {
      onAccountsChange(selectedAccounts.filter((uuid) => uuid !== accountUuid));
    } else {
      onAccountsChange([...selectedAccounts, accountUuid]);
    }
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === accounts.length) {
      onAccountsChange([]);
    } else {
      onAccountsChange(accounts.map((account) => account.uuid));
    }
  };

  const handleTypeToggle = (t: ExpenseEntryType) => {
    if (!onTypeChange) return;
    onTypeChange(type === t ? "" : t);
  };

  const handleCategoryChange = (uuid: string) => {
    onCategoryChange?.(uuid);
    onSubcategoryChange?.("");
  };

  const handleSubcategoryChange = (uuid: string) => {
    onSubcategoryChange?.(uuid);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <button type="button" onClick={handleSelectAll} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            {selectedAccounts.length === accounts.length ? "Deselect All" : "Select All"}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Accounts</label>
          <div className="grid grid-cols-2 gap-2">
            {accounts.map((account) => {
              const isSelected = selectedAccounts.includes(account.uuid);
              return (
                <button
                  key={account.uuid}
                  type="button"
                  onClick={() => handleAccountToggle(account.uuid)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${isSelected ? "text-white shadow-lg" : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"}`}
                  style={
                    isSelected
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
              );
            })}
          </div>
        </div>
      </div>

      {onTypeChange && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Type</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleTypeToggle(ExpenseEntryTypes.EXPENSE)}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${type === ExpenseEntryTypes.EXPENSE ? "bg-red-600 text-white shadow-lg shadow-red-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}
            >
              💸 Expense
            </button>
            <button
              type="button"
              onClick={() => handleTypeToggle(ExpenseEntryTypes.INCOME)}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${type === ExpenseEntryTypes.INCOME ? "bg-green-600 text-white shadow-lg shadow-green-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}
            >
              💰 Income
            </button>
            <button
              type="button"
              onClick={() => handleTypeToggle(ExpenseEntryTypes.TRANSFER)}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${type === ExpenseEntryTypes.TRANSFER ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"}`}
            >
              🔄 Transfer
            </button>
          </div>
        </div>
      )}

      {onCategoryChange && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Category</label>
          <select
            value={categoryUuid}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.uuid} value={category.uuid}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {onSubcategoryChange && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Subcategory</label>
          <select
            value={subcategoryUuid}
            onChange={(e) => handleSubcategoryChange(e.target.value)}
            disabled={!categoryUuid}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">All subcategories</option>
            {subcategories.map((sub) => (
              <option key={sub.uuid} value={sub.uuid}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">From Date (Optional)</label>
          <input type="date" value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} placeholder="All time" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">To Date (Optional)</label>
          <input type="date" value={toDate} onChange={(e) => onToDateChange(e.target.value)} placeholder="All time" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors" />
        </div>
      </div>
    </div>
  );
}
