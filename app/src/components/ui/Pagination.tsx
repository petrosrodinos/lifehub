import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: PaginationProps) {
  const startItem = totalItems != null && pageSize != null ? (currentPage - 1) * pageSize + 1 : null;
  const endItem =
    totalItems != null && pageSize != null
      ? Math.min(currentPage * pageSize, totalItems)
      : null;

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-slate-700/60 bg-slate-900/60">
      {startItem != null && endItem != null && totalItems != null ? (
        <p className="text-xs text-slate-400">
          {startItem}–{endItem} of {totalItems}
        </p>
      ) : (
        <p className="text-xs text-slate-400">
          Page {currentPage} of {totalPages}
        </p>
      )}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 rounded-lg border border-slate-700/70 text-slate-300 hover:bg-slate-800/60 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-lg border border-slate-700/70 text-slate-300 hover:bg-slate-800/60 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
