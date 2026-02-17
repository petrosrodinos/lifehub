import { BarChart3 } from "lucide-react";

export function GraphTab() {
  return (
    <div className="text-center py-14 px-4 border border-dashed border-slate-700 rounded-xl">
      <BarChart3 className="w-8 h-8 text-slate-600 mx-auto mb-3" />
      <p className="text-slate-300 font-medium">Graphs coming soon</p>
      <p className="text-sm text-slate-500 mt-1">Progress charts and trends will be available here.</p>
    </div>
  );
}
