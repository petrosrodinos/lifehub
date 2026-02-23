import { Store } from "lucide-react";

type ReceiptsHeaderProps = {
  onCreateClick: () => void;
};

export function ReceiptsHeader({ onCreateClick }: ReceiptsHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-semibold text-white">Receipts</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your expense receipts</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button type="button" onClick={onCreateClick} className="flex items-center gap-2 px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors">
          <Store className="w-4 h-4" strokeWidth={2} />
          <span className="hidden sm:inline">New</span>
        </button>
      </div>
    </header>
  );
}
