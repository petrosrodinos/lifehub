import { useState, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import type { ExpenseEntryType } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { useExpenseAccounts } from "../../../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import { useExpenseCategories } from "../../../../features/expenses/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../../features/expenses/expense-subcategories/hooks/use-expense-subcategories";
import { useExpenseTags, useCreateExpenseTag } from "../../../../features/expenses/expense-tags/hooks/use-expense-tags";
import { TagSelector } from "../../../../components/ui/TagSelector";
import { CategorySubcategoryPickerModal } from "./CategorySubcategoryPickerModal";

type TransactionFormFieldsProps = {
  type: ExpenseEntryType;
  onTypeChange: (type: ExpenseEntryType) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  fromAccountUuid: string;
  onFromAccountChange: (uuid: string) => void;
  toAccountUuid: string;
  onToAccountChange: (uuid: string) => void;
  categoryUuid: string;
  subcategoryUuid: string;
  onCategorySelect: (categoryUuid: string, subcategoryUuid: string) => void;
  selectedTagUuids: string[];
  onTagsChange: (uuids: string[]) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  isPending: boolean;
};

export function TransactionFormFields({
  type,
  onTypeChange,
  amount,
  onAmountChange,
  fromAccountUuid,
  onFromAccountChange,
  toAccountUuid,
  onToAccountChange,
  categoryUuid,
  subcategoryUuid,
  onCategorySelect,
  selectedTagUuids,
  onTagsChange,
  description,
  onDescriptionChange,
  isPending,
}: TransactionFormFieldsProps) {
  const { data: accountsData } = useExpenseAccounts();
  const { data: categoriesData } = useExpenseCategories();
  const { data: subcategoriesData } = useExpenseSubcategories();
  const { data: tagsData } = useExpenseTags();
  const createTagMutation = useCreateExpenseTag();
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);

  const accounts = accountsData || [];
  const categories = categoriesData || [];
  const subcategories = subcategoriesData || [];
  const tags = tagsData || [];

  const handleCreateTag = useCallback(
    async (data: { title: string; color?: string }) => {
      const tag = await createTagMutation.mutateAsync(data);
      return tag;
    },
    [createTagMutation],
  );

  const handleOpenCategoryPicker = useCallback(() => {
    setIsCategoryPickerOpen(true);
  }, []);

  const handleCloseCategoryPicker = useCallback(() => {
    setIsCategoryPickerOpen(false);
  }, []);

  const selectedCategory = categories.find((category) => category.uuid === categoryUuid);
  const selectedSubcategory = subcategories.find((subcategory) => subcategory.uuid === subcategoryUuid);
  const selectedCategoryColor = selectedCategory?.color || "#8b5cf6";
  const hasCategorySelection = Boolean(selectedCategory && selectedSubcategory);
  const isTransfer = type === ExpenseEntryTypes.TRANSFER;

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onTypeChange(ExpenseEntryTypes.EXPENSE)}
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
            onClick={() => onTypeChange(ExpenseEntryTypes.INCOME)}
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
            onClick={() => onTypeChange(ExpenseEntryTypes.TRANSFER)}
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
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.00"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          disabled={isPending}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">{isTransfer ? "From Account" : "Account"}</label>
        <div className="grid grid-cols-2 gap-2">
          {accounts.map((account) => (
            <button
              key={account.uuid}
              type="button"
              onClick={() => onFromAccountChange(account.uuid)}
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

      {isTransfer && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">To Account</label>
          <div className="grid grid-cols-2 gap-2">
            {accounts
              .filter((account) => account.uuid !== fromAccountUuid)
              .map((account) => (
                <button
                  key={account.uuid}
                  type="button"
                  onClick={() => onToAccountChange(account.uuid)}
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

      {!isTransfer && (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <button
              type="button"
              onClick={handleOpenCategoryPicker}
              disabled={isPending}
              className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-left hover:border-violet-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasCategorySelection ? (
                <>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{ backgroundColor: selectedCategoryColor }}
                  >
                    {selectedCategory?.icon || "📁"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{selectedCategory?.name}</p>
                    <p className="text-sm text-slate-400 truncate">{selectedSubcategory?.name}</p>
                  </div>
                </>
              ) : (
                <span className="flex-1 text-slate-500">Select category</span>
              )}
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
            </button>
          </div>

          <CategorySubcategoryPickerModal
            isOpen={isCategoryPickerOpen}
            onClose={handleCloseCategoryPicker}
            categories={categories}
            subcategories={subcategories}
            selectedCategoryUuid={categoryUuid}
            selectedSubcategoryUuid={subcategoryUuid}
            onSelect={onCategorySelect}
          />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
            <TagSelector
              selectedTagUuids={selectedTagUuids}
              onChange={onTagsChange}
              allTags={tags}
              onCreateTag={handleCreateTag}
              isCreating={createTagMutation.isPending}
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Optional description"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          disabled={isPending}
        />
      </div>
    </>
  );
}
