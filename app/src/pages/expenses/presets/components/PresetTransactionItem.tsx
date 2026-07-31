import { ArrowDownLeft, ArrowRightLeft, ArrowUpRight, Edit2, Trash2 } from "lucide-react";
import type { ExpenseEntryPreset, CreateExpenseEntryPresetDto } from "../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { formatAmount } from "../../utils/transaction";
import { mapPresetToFormData } from "../utils/preset-form-data.helper";
import { formatPresetRecurrenceLabel } from "../utils/preset-recurrence.helper";
import { PresetTransactionForm } from "./PresetTransactionForm";

type PresetTransactionItemProps = {
  preset: ExpenseEntryPreset;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onEdit: (data: CreateExpenseEntryPresetDto) => void;
  onDelete: () => void;
  isUpdatePending: boolean;
};

function getTypeIcon(type: ExpenseEntryPreset["type"]) {
  switch (type) {
    case ExpenseEntryTypes.INCOME:
      return <ArrowDownLeft className="w-4 h-4 text-emerald-400" />;
    case ExpenseEntryTypes.EXPENSE:
      return <ArrowUpRight className="w-4 h-4 text-red-400" />;
    case ExpenseEntryTypes.TRANSFER:
      return <ArrowRightLeft className="w-4 h-4 text-blue-400" />;
    default:
      return null;
  }
}

function getTypeColor(type: ExpenseEntryPreset["type"]) {
  switch (type) {
    case ExpenseEntryTypes.INCOME:
      return "text-emerald-400";
    case ExpenseEntryTypes.EXPENSE:
      return "text-red-400";
    case ExpenseEntryTypes.TRANSFER:
      return "text-blue-400";
    default:
      return "text-slate-400";
  }
}

function getAmountDisplay(preset: ExpenseEntryPreset) {
  const formattedAmount = formatAmount(preset.amount);

  switch (preset.type) {
    case ExpenseEntryTypes.INCOME:
      return `+${formattedAmount}`;
    case ExpenseEntryTypes.EXPENSE:
      return `-${formattedAmount}`;
    default:
      return formattedAmount;
  }
}

export function PresetTransactionItem({
  preset,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onEdit,
  onDelete,
  isUpdatePending,
}: PresetTransactionItemProps) {
  if (isEditing) {
    return (
      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
        <PresetTransactionForm
          key={preset.uuid}
          initialData={mapPresetToFormData(preset)}
          onSubmit={onEdit}
          onCancel={onCancelEdit}
          submitLabel="Save"
          isPending={isUpdatePending}
        />
      </div>
    );
  }

  const isTransfer = preset.type === ExpenseEntryTypes.TRANSFER && !!preset.to_account;
  const recurrenceLabel = formatPresetRecurrenceLabel(preset);

  return (
    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-9 h-9 bg-slate-700/50 rounded-lg shrink-0">{getTypeIcon(preset.type)}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{preset.title}</p>
            {recurrenceLabel && (
              <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-violet-500/15 text-violet-300 border border-violet-500/30">
                {recurrenceLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5 truncate">
            {isTransfer
              ? `${preset.from_account?.name || "Account"} → ${preset.to_account?.name || "Account"}`
              : preset.from_account?.name || "Account"}
          </p>
          {!isTransfer && (preset.category || preset.subcategory) && (
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {preset.category?.name}
              {preset.subcategory ? ` · ${preset.subcategory.name}` : ""}
            </p>
          )}
          {preset.description && <p className="text-xs text-slate-500 mt-1 truncate">{preset.description}</p>}
          {preset.tags && preset.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {preset.tags.map((tag) => (
                <span
                  key={tag.uuid}
                  className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    borderColor: `${tag.color}50`,
                    color: tag.color,
                  }}
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className={`text-sm font-semibold ${getTypeColor(preset.type)}`}>{getAmountDisplay(preset)}</span>
          <div className="flex items-center gap-1">
            <button type="button" onClick={onStartEdit} className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-700/50 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
            <button type="button" onClick={onDelete} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
