import { useState, useCallback } from "react";
import type {
  CreateExpenseEntryPresetDto,
  ExpenseRecurrenceFrequency,
} from "../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces";
import type { ExpenseEntryType } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { ExpenseRecurrenceFrequencies } from "../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces";
import {
  PRESET_RECURRENCE_DAY_OPTIONS,
  PRESET_RECURRENCE_FREQUENCY_OPTIONS,
  PRESET_RECURRENCE_MONTH_OPTIONS,
  PRESET_RECURRENCE_WEEKDAY_OPTIONS,
} from "../../../../config/constants/dropdowns/preset-recurrence";
import { evaluateAmountExpression } from "../../transactions/utils/amount-calculator.helper";
import { TransactionFormFields } from "../../transactions/components/TransactionFormFields";
import { buildPresetRecurrencePayload, isPresetRecurrenceValid } from "../utils/preset-recurrence.helper";

type PresetTransactionFormProps = {
  onSubmit: (data: CreateExpenseEntryPresetDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending: boolean;
  initialData?: Partial<CreateExpenseEntryPresetDto>;
};

const selectClassName =
  "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors";

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
  const [isRecurring, setIsRecurring] = useState(initialData?.is_recurring ?? false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<ExpenseRecurrenceFrequency | "">(
    initialData?.recurrence_frequency || "",
  );
  const [recurrenceWeekday, setRecurrenceWeekday] = useState<number | "">(initialData?.recurrence_weekday ?? "");
  const [recurrenceDayOfMonth, setRecurrenceDayOfMonth] = useState<number | "">(
    initialData?.recurrence_day_of_month ?? "",
  );
  const [recurrenceMonth, setRecurrenceMonth] = useState<number | "">(initialData?.recurrence_month ?? "");

  const handleCategorySelect = useCallback((nextCategoryUuid: string, nextSubcategoryUuid: string) => {
    setCategoryUuid(nextCategoryUuid);
    setSubcategoryUuid(nextSubcategoryUuid);
  }, []);

  const handleRecurringToggle = useCallback((checked: boolean) => {
    setIsRecurring(checked);

    if (!checked) {
      setRecurrenceFrequency("");
      setRecurrenceWeekday("");
      setRecurrenceDayOfMonth("");
      setRecurrenceMonth("");
    }
  }, []);

  const handleFrequencyChange = useCallback((value: ExpenseRecurrenceFrequency | "") => {
    setRecurrenceFrequency(value);
    setRecurrenceWeekday("");
    setRecurrenceDayOfMonth("");
    setRecurrenceMonth("");
  }, []);

  const isTransfer = type === ExpenseEntryTypes.TRANSFER;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedAmount = evaluateAmountExpression(amount);
    if (!resolvedAmount || parseFloat(resolvedAmount) <= 0) return;

    const recurrencePayload = buildPresetRecurrencePayload({
      is_recurring: isRecurring,
      recurrence_frequency: recurrenceFrequency,
      recurrence_weekday: recurrenceWeekday,
      recurrence_day_of_month: recurrenceDayOfMonth,
      recurrence_month: recurrenceMonth,
    });

    const data: CreateExpenseEntryPresetDto = {
      title: title.trim(),
      type,
      amount: parseFloat(resolvedAmount),
      description: description || undefined,
      from_account_uuid: fromAccountUuid,
      to_account_uuid: isTransfer ? toAccountUuid : undefined,
      category_uuid: isTransfer ? undefined : categoryUuid,
      subcategory_uuid: isTransfer ? undefined : subcategoryUuid,
      tag_uuids: selectedTagUuids.length > 0 ? selectedTagUuids : undefined,
      ...recurrencePayload,
    };

    onSubmit(data);
  };

  const resolvedAmount = evaluateAmountExpression(amount);
  const isRecurrenceValid = isPresetRecurrenceValid({
    is_recurring: isRecurring,
    recurrence_frequency: recurrenceFrequency,
    recurrence_weekday: recurrenceWeekday,
    recurrence_day_of_month: recurrenceDayOfMonth,
    recurrence_month: recurrenceMonth,
  });
  const isFormValid =
    title.trim() &&
    resolvedAmount !== null &&
    parseFloat(resolvedAmount) > 0 &&
    fromAccountUuid &&
    (isTransfer ? toAccountUuid : categoryUuid && subcategoryUuid) &&
    isRecurrenceValid;
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

      <div className="space-y-3 rounded-lg border border-slate-700 bg-slate-800/40 p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => handleRecurringToggle(e.target.checked)}
            disabled={isPending}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-violet-600 focus:ring-violet-500"
          />
          <span className="text-sm font-medium text-slate-300">Make recurring</span>
        </label>

        {isRecurring && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Frequency</label>
              <select
                value={recurrenceFrequency}
                onChange={(e) => handleFrequencyChange(e.target.value as ExpenseRecurrenceFrequency | "")}
                className={selectClassName}
                disabled={isPending}
                required
              >
                <option value="">Select frequency</option>
                {PRESET_RECURRENCE_FREQUENCY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {recurrenceFrequency === ExpenseRecurrenceFrequencies.WEEKLY && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Day of week</label>
                <select
                  value={recurrenceWeekday}
                  onChange={(e) => setRecurrenceWeekday(e.target.value ? Number(e.target.value) : "")}
                  className={selectClassName}
                  disabled={isPending}
                  required
                >
                  <option value="">Select day</option>
                  {PRESET_RECURRENCE_WEEKDAY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {recurrenceFrequency === ExpenseRecurrenceFrequencies.MONTHLY && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Day of month</label>
                <select
                  value={recurrenceDayOfMonth}
                  onChange={(e) => setRecurrenceDayOfMonth(e.target.value ? Number(e.target.value) : "")}
                  className={selectClassName}
                  disabled={isPending}
                  required
                >
                  <option value="">Select day</option>
                  {PRESET_RECURRENCE_DAY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {recurrenceFrequency === ExpenseRecurrenceFrequencies.YEARLY && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Month</label>
                  <select
                    value={recurrenceMonth}
                    onChange={(e) => setRecurrenceMonth(e.target.value ? Number(e.target.value) : "")}
                    className={selectClassName}
                    disabled={isPending}
                    required
                  >
                    <option value="">Select month</option>
                    {PRESET_RECURRENCE_MONTH_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Day</label>
                  <select
                    value={recurrenceDayOfMonth}
                    onChange={(e) => setRecurrenceDayOfMonth(e.target.value ? Number(e.target.value) : "")}
                    className={selectClassName}
                    disabled={isPending}
                    required
                  >
                    <option value="">Select day</option>
                    {PRESET_RECURRENCE_DAY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}
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
