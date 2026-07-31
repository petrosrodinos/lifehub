import { useState, useCallback } from "react";
import type { CreateExpenseEntryDto, ExpenseEntryType } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { evaluateAmountExpression } from "../utils/amount-calculator.helper";
import { TransactionFormFields } from "./TransactionFormFields";

type TransactionFormProps = {
  onSubmit: (data: CreateExpenseEntryDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending: boolean;
  initialData?: Partial<CreateExpenseEntryDto>;
  showQuantity?: boolean;
};

export function TransactionForm({ onSubmit, onCancel, submitLabel, isPending, initialData, showQuantity = false }: TransactionFormProps) {
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

  const handleCategorySelect = useCallback((nextCategoryUuid: string, nextSubcategoryUuid: string) => {
    setCategoryUuid(nextCategoryUuid);
    setSubcategoryUuid(nextSubcategoryUuid);
  }, []);

  const isTransfer = type === ExpenseEntryTypes.TRANSFER;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedAmount = evaluateAmountExpression(amount);
    if (!resolvedAmount || parseFloat(resolvedAmount) <= 0) return;

    const data: CreateExpenseEntryDto = {
      type,
      amount: parseFloat(resolvedAmount),
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
  const resolvedAmount = evaluateAmountExpression(amount);
  const isFormValid = resolvedAmount !== null && parseFloat(resolvedAmount) > 0 && fromAccountUuid && (isTransfer ? toAccountUuid : categoryUuid && subcategoryUuid) && (!showQuantity || (parsedQuantity >= 1 && Number.isInteger(parsedQuantity)));
  const pendingSubmitLabel = submitLabel === "Create" ? "Creating..." : "Saving...";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {showQuantity && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
          <input type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors" disabled={isPending} required />
        </div>
      )}

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
