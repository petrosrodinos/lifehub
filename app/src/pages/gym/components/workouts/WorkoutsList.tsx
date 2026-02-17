import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useWorkouts } from "../../../../features/workout/hooks/use-workout";
import { WorkoutCard } from "./WorkoutCard";
import { WorkoutsLoading } from "./WorkoutsLoading";
import { WorkoutFilters } from "./WorkoutFilters";
import type { Workout } from "../../../../features/workout/interfaces/workout.interface";

type PaginatedResponse = {
  data: Workout[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type WorkoutsListProps = {
  fromDate?: string;
  toDate?: string;
  onFilterChange: (filters: { fromDate?: string; toDate?: string }) => void;
};

export function WorkoutsList({ fromDate, toDate, onFilterChange }: WorkoutsListProps) {
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useWorkouts({
    page,
    limit: 20,
    from_date: fromDate,
    to_date: toDate,
  });

  const isPaginated = data && typeof data === 'object' && 'data' in data;
  const workouts = isPaginated ? (data as PaginatedResponse).data : (data as Workout[] || []);
  const meta = isPaginated ? (data as PaginatedResponse).meta : null;

  const hasActiveFilters = fromDate || toDate;

  const handleFilterChange = (filters: { fromDate?: string; toDate?: string }) => {
    setPage(1);
    onFilterChange(filters);
  };

  if (isLoading) {
    return <WorkoutsLoading />;
  }

  if (workouts.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              hasActiveFilters || showFilters
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                : "bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-800"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && <span className="w-2 h-2 bg-violet-400 rounded-full" />}
          </button>
        </div>

        {showFilters && (
          <WorkoutFilters
            fromDate={fromDate}
            toDate={toDate}
            onFilterChange={handleFilterChange}
            onClose={() => setShowFilters(false)}
          />
        )}

        <div className="text-center py-12 px-4 border border-dashed border-slate-700 rounded-xl">
          <p className="text-slate-300 font-medium">No workouts yet</p>
          <p className="text-sm text-slate-500 mt-1">
            Start tracking your workouts to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            hasActiveFilters || showFilters
              ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
              : "bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-800"
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && <span className="w-2 h-2 bg-violet-400 rounded-full" />}
        </button>

        {meta && meta.totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-slate-400">
              Page {page} of {meta.totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {showFilters && (
        <WorkoutFilters
          fromDate={fromDate}
          toDate={toDate}
          onFilterChange={handleFilterChange}
          onClose={() => setShowFilters(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.uuid} workout={workout} />
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-slate-400">
            Page {page} of {meta.totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages}
            className="p-2 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
