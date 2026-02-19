import { useState } from "react";
import { X } from "lucide-react";
import { useActivities } from "../../../../features/activities/hooks/use-activities";
import type { HabitsTodayFilter } from "../HabitsTodaySection/use-habits-today";

interface HabitsTodayFiltersProps {
  onFilterChange: (filter: HabitsTodayFilter) => void;
}

const DEFAULT: HabitsTodayFilter = { dateFrom: "", dateTo: "", activityUuid: "" };

export function HabitsTodayFilters({ onFilterChange }: HabitsTodayFiltersProps) {
  const [filter, setFilter] = useState<HabitsTodayFilter>(DEFAULT);
  const { data: allActivities = [] } = useActivities();

  const hasActiveFilters = !!(filter.dateFrom || filter.dateTo || filter.activityUuid);

  const update = (patch: Partial<HabitsTodayFilter>) => {
    const next = { ...filter, ...patch };
    setFilter(next);
    onFilterChange(next);
  };

  const handleClear = () => {
    setFilter(DEFAULT);
    onFilterChange(DEFAULT);
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Filters</span>
        {hasActiveFilters && (
          <button onClick={handleClear} className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-slate-400">From</label>
          <input type="date" value={filter.dateFrom} onChange={(e) => update({ dateFrom: e.target.value })} className="w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500/60" />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400">To</label>
          <input type="date" value={filter.dateTo} onChange={(e) => update({ dateTo: e.target.value })} className="w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500/60" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-400">Activity</label>
        <select value={filter.activityUuid} onChange={(e) => update({ activityUuid: e.target.value })} className="w-full rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500/60">
          <option value="">All activities</option>
          {allActivities.map((activity) => (
            <option key={activity.uuid} value={activity.uuid}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
