import { useState, useCallback, useEffect } from "react";
import { useCreateExpenseEntry } from "../../../../features/expenses/expense-entries/hooks/use-expense-entries";
import type { CreateExpenseEntryDto } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import type { ExpenseEntryPreset } from "../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces";
import {
  CREATE_TRANSACTION_TABS,
  CREATE_TRANSACTION_TAB_OPTIONS,
  type CreateTransactionTab,
} from "../../../../config/constants/dropdowns/create-transaction-tabs";
import { TransactionForm } from "./TransactionForm";
import { PresetTransactionPicker } from "./PresetTransactionPicker";
import { Modal } from "../../../../components/ui/Modal";
import { mapPresetToCreateEntryDto } from "../utils/preset-to-entry.helper";

type CreateTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<CreateExpenseEntryDto>;
  formKey?: string;
};

export function CreateTransactionModal({ isOpen, onClose, initialData, formKey = "new" }: CreateTransactionModalProps) {
  const createEntry = useCreateExpenseEntry();
  const [activeTab, setActiveTab] = useState<CreateTransactionTab>(CREATE_TRANSACTION_TABS.MANUAL);
  const [formInitialData, setFormInitialData] = useState<Partial<CreateExpenseEntryDto> | undefined>(initialData);
  const [activeFormKey, setActiveFormKey] = useState(formKey);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(CREATE_TRANSACTION_TABS.MANUAL);
      setFormInitialData(initialData);
      setActiveFormKey(formKey);
    }
  }, [isOpen, initialData, formKey]);

  const handleClose = useCallback(() => {
    setActiveTab(CREATE_TRANSACTION_TABS.MANUAL);
    setFormInitialData(undefined);
    setActiveFormKey("new");
    onClose();
  }, [onClose]);

  const handleSubmit = (data: CreateExpenseEntryDto) => {
    createEntry.mutate(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const handlePresetSelect = useCallback((preset: ExpenseEntryPreset) => {
    const mapped = mapPresetToCreateEntryDto(preset);
    setFormInitialData(mapped);
    setActiveFormKey(`preset-${preset.uuid}-${Date.now()}`);
    setActiveTab(CREATE_TRANSACTION_TABS.MANUAL);
  }, []);

  const resolvedInitialData = formInitialData ?? initialData;
  const resolvedFormKey = formInitialData ? activeFormKey : formKey;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Transaction" scrollable>
      <div className="flex gap-2 bg-slate-900/50 rounded-xl border border-slate-800/50 p-1 mb-4">
        {CREATE_TRANSACTION_TAB_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setActiveTab(option.value)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === option.value
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {activeTab === CREATE_TRANSACTION_TABS.MANUAL ? (
        <TransactionForm
          key={resolvedFormKey}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          submitLabel="Create"
          isPending={createEntry.isPending}
          initialData={resolvedInitialData}
          showQuantity
        />
      ) : (
        <PresetTransactionPicker onSelect={handlePresetSelect} />
      )}
    </Modal>
  );
}
