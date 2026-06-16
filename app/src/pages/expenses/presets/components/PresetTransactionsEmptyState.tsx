import { Bookmark } from "lucide-react";

export function PresetTransactionsEmptyState() {
  return (
    <div className="text-center py-8">
      <Bookmark className="w-12 h-12 mx-auto text-slate-600 mb-3" />
      <p className="text-slate-400">No preset transactions yet</p>
      <p className="text-sm text-slate-500 mt-1">Save recurring transactions as presets for quick entry</p>
    </div>
  );
}
