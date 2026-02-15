import { useState } from "react";
import { Loader2 } from "lucide-react";

type SubcategoryFormProps = {
  initialName: string;
  onSubmit: (name: string) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending?: boolean;
};

export function SubcategoryForm({ initialName, onSubmit, onCancel, submitLabel, isPending = false }: SubcategoryFormProps) {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Subcategory name" className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50" autoFocus disabled={isPending} />
      <div className="flex gap-2">
        <button type="submit" disabled={isPending} className="flex-1 px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={isPending} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}
