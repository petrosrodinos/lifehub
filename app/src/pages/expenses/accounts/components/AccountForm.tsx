import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { CreateExpenseAccountDto, UpdateExpenseAccountDto } from "../../../../features/expense-accounts/interfaces/expense-accounts.interfaces";
import { PRESET_COLORS } from "../../constants/expenses-colors";
import { ACCOUNT_PRESET_ICONS } from "../../constants/account-icons";
import { EmojiPicker } from "../../components/EmojiPicker";
import { ColorPicker } from "../../components/ColorPicker";

type AccountFormProps<T extends CreateExpenseAccountDto | UpdateExpenseAccountDto> = {
  onSubmit: (data: T) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending?: boolean;
  initialData?: {
    name?: string;
    icon?: string;
    color?: string;
    balance?: number;
  };
};

export function AccountForm<T extends CreateExpenseAccountDto | UpdateExpenseAccountDto>({ onSubmit, onCancel, submitLabel, isPending = false, initialData }: AccountFormProps<T>) {
  const [name, setName] = useState(initialData?.name || "");
  const [icon, setIcon] = useState(initialData?.icon || ACCOUNT_PRESET_ICONS[0]);
  const [color, setColor] = useState(initialData?.color || PRESET_COLORS[0]);
  const [balance, setBalance] = useState(initialData?.balance?.toString() || "0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onSubmit({
      name: trimmedName,
      icon,
      color,
      balance: parseFloat(balance) || 0,
    } as T);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-slate-300">
          Account Name
        </label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Main Bank Account" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" autoFocus disabled={isPending} required />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-300">Icon</label>
        <EmojiPicker
          value={icon}
          onChange={setIcon}
          presetEmojis={ACCOUNT_PRESET_ICONS}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-300">Color</label>
        <ColorPicker
          value={color}
          onChange={setColor}
          presetColors={PRESET_COLORS}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="balance" className="block text-sm font-semibold text-slate-300">
          Initial Balance
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
          <input id="balance" type="number" step="0.01" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="0.00" className="w-full pl-8 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending} />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending || !name.trim()} className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={isPending} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}
