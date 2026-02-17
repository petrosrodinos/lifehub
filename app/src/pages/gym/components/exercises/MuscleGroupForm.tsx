import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ColorPicker } from "../../../../components/ui/ColorPicker";
import { MUSCLE_GROUP_COLORS } from "../../config";

type MuscleGroupFormProps = {
  initialName: string;
  initialColor: string;
  onSubmit: (name: string, color: string) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending?: boolean;
};

export function MuscleGroupForm({ initialName, initialColor, onSubmit, onCancel, submitLabel, isPending = false }: MuscleGroupFormProps) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSubmit(trimmed, color);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Muscle group name" className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50" autoFocus disabled={isPending} />

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Color</label>
        <ColorPicker value={color} onChange={setColor} presetColors={MUSCLE_GROUP_COLORS} disabled={isPending} />
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
