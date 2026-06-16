import { ArrowDownLeft, ArrowRightLeft, ArrowUpRight } from "lucide-react";
import { useExpenseEntryPresets } from "../../../../features/expenses/expense-entry-presets/hooks/use-expense-entry-presets";
import type { ExpenseEntryPreset } from "../../../../features/expenses/expense-entry-presets/interfaces/expense-entry-presets.interfaces";
import { ExpenseEntryTypes } from "../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { formatAmount } from "../../utils/transaction";

type PresetTransactionPickerProps = {
  onSelect: (preset: ExpenseEntryPreset) => void;
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

export function PresetTransactionPicker({ onSelect }: PresetTransactionPickerProps) {
  const { data: presets = [], isLoading } = useExpenseEntryPresets();

  if (isLoading) {
    return <div className="text-center py-8 text-slate-400">Loading presets...</div>;
  }

  if (presets.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">No preset transactions yet</p>
        <p className="text-sm text-slate-500 mt-1">Add presets from the New menu to use them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[60vh] overflow-y-auto">
      {presets.map((preset) => {
        const isTransfer = preset.type === ExpenseEntryTypes.TRANSFER && !!preset.to_account;

        return (
          <button
            key={preset.uuid}
            type="button"
            onClick={() => onSelect(preset)}
            className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-violet-500/50 rounded-xl transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-9 h-9 bg-slate-700/50 rounded-lg shrink-0">{getTypeIcon(preset.type)}</div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{preset.title}</p>
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
              </div>

              <span className={`text-sm font-semibold shrink-0 ${getTypeColor(preset.type)}`}>{getAmountDisplay(preset)}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
