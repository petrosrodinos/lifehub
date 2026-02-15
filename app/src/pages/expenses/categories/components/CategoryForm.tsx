import { useState } from "react";
import { Loader2 } from "lucide-react";
import { CATEGORY_PRESET_ICONS } from "../../constants/account-icons";
import { PRESET_COLORS } from "../../constants/expenses-colors";
import { EmojiPicker } from "../../../../components/ui/EmojiPicker";
import { ColorPicker } from "../../../../components/ui/ColorPicker";

type CategoryFormProps = {
  initialName: string;
  initialColor: string;
  initialIcon: string;
  onSubmit: (name: string, color: string, icon: string) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending?: boolean;
};

export function CategoryForm({ initialName, initialColor, initialIcon, onSubmit, onCancel, submitLabel, isPending = false }: CategoryFormProps) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);
  const [icon, setIcon] = useState(initialIcon);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSubmit(trimmed, color, icon);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50" autoFocus disabled={isPending} />

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Icon</label>
        <EmojiPicker value={icon} onChange={setIcon} presetEmojis={CATEGORY_PRESET_ICONS} disabled={isPending} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Color</label>
        <ColorPicker value={color} onChange={setColor} presetColors={PRESET_COLORS} disabled={isPending} />
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="flex-1 px-3 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={isPending} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}
