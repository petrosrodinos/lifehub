import { useState, useCallback } from "react";
import type { CreateExpenseEntryPresetDto } from "../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces";
import type { ExpenseEntryType } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { TransactionFormFields } from "../../transactions/components/TransactionFormFields";

type PresetTransactionFormProps = {
  onSubmit: (data: CreateExpenseEntryPresetDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending: boolean;
  initialData?: Partial<CreateExpenseEntryPresetDto>;
};

export function PresetTransactionForm({ onSubmit, onCancel, submitLabel, isPending, initialData }: PresetTransactionFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [type, setType] = useState<ExpenseEntryType>(initialData?.type || ExpenseEntryTypes.EXPENSE);
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [fromAccountUuid, setFromAccountUuid] = useState(initialData?.from_account_uuid || "");
  const [toAccountUuid, setToAccountUuid] = useState(initialData?.to_account_uuid || "");
  const [categoryUuid, setCategoryUuid] = useState(initialData?.category_uuid || "");
  const [subcategoryUuid, setSubcategoryUuid] = useState(initialData?.subcategory_uuid || "");
  const [selectedTagUuids, setSelectedTagUuids] = useState<string[]>(initialData?.tag_uuids || []);

  const handleCategorySelect = useCallback((nextCategoryUuid: string, nextSubcategoryUuid: string) => {
    setCategoryUuid(nextCategoryUuid);
    setSubcategoryUuid(nextSubcategoryUuid);
  }, []);

  const isTransfer = type === ExpenseEntryTypes.TRANSFER;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreateExpenseEntryPresetDto = {
      title: title.trim(),
      type,
      amount: parseFloat(amount),
      description: description || undefined,
      from_account_uuid: fromAccountUuid,
      to_account_uuid: isTransfer ? toAccountUuid : undefined,
      category_uuid: isTransfer ? undefined : categoryUuid,
      subcategory_uuid: isTransfer ? undefined : subcategoryUuid,
      tag_uuids: selectedTagUuids.length > 0 ? selectedTagUuids : undefined,
    };

    onSubmit(data);
  };

  const isFormValid = title.trim() && amount && parseFloat(amount) > 0 && fromAccountUuid && (isTransfer ? toAccountUuid : categoryUuid && subcategoryUuid);
  const pendingSubmitLabel = submitLabel === "Create" ? "Creating..." : "Saving...";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Monthly rent"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          disabled={isPending}
          required
        />
      </div>

      <TransactionFormFields
        type={type}
        onTypeChange={setType}
        amount={amount}
        onAmountChange={setAmount}
        fromAccountUuid={fromAccountUuid}
        onFromAccountChange={setFromAccountUuid}
        toAccountUuid={toAccountUuid}
        onToAccountChange={setToAccountUuid}
        categoryUuid={categoryUuid}
        subcategoryUuid={subcategoryUuid}
        onCategorySelect={handleCategorySelect}
        selectedTagUuids={selectedTagUuids}
        onTagsChange={setSelectedTagUuids}
        description={description}
        onDescriptionChange={setDescription}
        isPending={isPending}
      />

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
