import { useState, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import type { CreateExpenseEntryDto, ExpenseEntryType } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { useExpenseAccounts } from "../../../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import { useExpenseCategories } from "../../../../features/expenses/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../../features/expenses/expense-subcategories/hooks/use-expense-subcategories";
import { useExpenseTags, useCreateExpenseTag } from "../../../../features/expenses/expense-tags/hooks/use-expense-tags";
import { TagSelector } from "../../../../components/ui/TagSelector";
import { CategorySubcategoryPickerModal } from "./CategorySubcategoryPickerModal";

type TransactionFormProps = {
  onSubmit: (data: CreateExpenseEntryDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending: boolean;
  initialData?: Partial<CreateExpenseEntryDto>;
  showQuantity?: boolean;
};

export function TransactionForm({ onSubmit, onCancel, submitLabel, isPending, initialData, showQuantity = false }: TransactionFormProps) {
  const { data: accountsData } = useExpenseAccounts();
  const { data: categoriesData } = useExpenseCategories();
  const { data: subcategoriesData } = useExpenseSubcategories();
  const { data: tagsData } = useExpenseTags();
  const createTagMutation = useCreateExpenseTag();

  const [type, setType] = useState<ExpenseEntryType>(initialData?.type || ExpenseEntryTypes.EXPENSE);
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "");
  const [quantity, setQuantity] = useState("1");
  const [description, setDescription] = useState(initialData?.description || "");
  const [fromAccountUuid, setFromAccountUuid] = useState(initialData?.from_account_uuid || "");
  const [toAccountUuid, setToAccountUuid] = useState(initialData?.to_account_uuid || "");
  const [categoryUuid, setCategoryUuid] = useState(initialData?.category_uuid || "");
  const [subcategoryUuid, setSubcategoryUuid] = useState(initialData?.subcategory_uuid || "");
  const [selectedTagUuids, setSelectedTagUuids] = useState<string[]>(initialData?.tag_uuids || []);
  const [entryDate, setEntryDate] = useState(initialData?.entry_date ? initialData.entry_date.split("T")[0] : new Date().toISOString().split("T")[0]);
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

  const handleCategorySelect = useCallback((nextCategoryUuid: string, nextSubcategoryUuid: string) => {
    setCategoryUuid(nextCategoryUuid);
    setSubcategoryUuid(nextSubcategoryUuid);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreateExpenseEntryDto = {
      type,
      amount: parseFloat(amount),
      description: description || undefined,
      from_account_uuid: fromAccountUuid,
      to_account_uuid: isTransfer ? toAccountUuid : undefined,
      category_uuid: isTransfer ? undefined : categoryUuid,
      subcategory_uuid: isTransfer ? undefined : subcategoryUuid,
      entry_date: entryDate,
      tag_uuids: selectedTagUuids.length > 0 ? selectedTagUuids : undefined,
      ...(showQuantity && { quantity: parseInt(quantity, 10) }),
    };

    onSubmit(data);
  };

  const parsedQuantity = parseInt(quantity, 10);
  const isFormValid = amount && parseFloat(amount) > 0 && fromAccountUuid && (isTransfer ? toAccountUuid : categoryUuid && subcategoryUuid) && (!showQuantity || (parsedQuantity >= 1 && Number.isInteger(parsedQuantity)));
  const pendingSubmitLabel = submitLabel === "Create" ? "Creating..." : "Saving...";

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

      {showQuantity && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
          <input type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" disabled={isPending} required />
        </div>
      )}

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
            onSelect={handleCategorySelect}
          />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
            <TagSelector
              selectedTagUuids={selectedTagUuids}
              onChange={setSelectedTagUuids}
              allTags={tags}
              onCreateTag={handleCreateTag}
              isCreating={createTagMutation.isPending}
            />
          </div>
        </>
      )}

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
          {isPending ? pendingSubmitLabel : submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={isPending} className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}
