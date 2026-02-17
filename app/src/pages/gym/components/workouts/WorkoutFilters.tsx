import { useState } from "react";
import { Calendar, X } from "lucide-react";

type WorkoutFiltersProps = {
  fromDate?: string;
  toDate?: string;
  onFilterChange: (filters: { fromDate?: string; toDate?: string }) => void;
  onClose: () => void;
};

export function WorkoutFilters({ fromDate, toDate, onFilterChange, onClose }: WorkoutFiltersProps) {
  const [localFromDate, setLocalFromDate] = useState(fromDate || "");
  const [localToDate, setLocalToDate] = useState(toDate || "");

  const handleApply = () => {
    onFilterChange({
      fromDate: localFromDate || undefined,
      toDate: localToDate || undefined,
    });
    onClose();
  };

  const handleClear = () => {
    setLocalFromDate("");
    setLocalToDate("");
    onFilterChange({});
    onClose();
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-violet-400" />
          <h3 className="text-base font-semibold text-white">Filter Workouts</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="from-date" className="block text-sm font-medium text-slate-300 mb-2">
            From Date
          </label>
          <input
            id="from-date"
            type="date"
            value={localFromDate}
            onChange={(e) => setLocalFromDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
          />
        </div>
        <div>
          <label htmlFor="to-date" className="block text-sm font-medium text-slate-300 mb-2">
            To Date
          </label>
          <input
            id="to-date"
            type="date"
            value={localToDate}
            onChange={(e) => setLocalToDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleApply}
          className="flex-1 px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 rounded-lg text-violet-300 font-medium text-sm transition-colors"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 font-medium text-sm transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
