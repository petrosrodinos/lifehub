import { Loader2, Dumbbell, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { useWorkoutEntries } from "../../../features/workout-entries/hooks/use-workout-entries";
import { ExerciseTypes } from "../../../features/exercises/interfaces/exercises.interface";
import type { WorkoutSet } from "../../../features/workout-sets/interfaces/workout-sets.interface";

type HistoryTabProps = {
  exerciseUuid: string;
  currentEntryUuid: string;
};

function formatSetDetails(set: WorkoutSet) {
  const details = [];
  if (set.type === ExerciseTypes.REPS && set.reps) details.push(`${set.reps} reps`);
  if (set.type === ExerciseTypes.TIME && set.duration_seconds) details.push(`${set.duration_seconds}s`);
  if (set.weight) details.push(`${set.weight}kg`);
  if (set.distance_meters) details.push(`${set.distance_meters}m`);
  return details.join(" · ");
}

export function HistoryTab({ exerciseUuid }: HistoryTabProps) {
  const navigate = useNavigate();
  const { data: entries, isLoading } = useWorkoutEntries({ exercise_uuid: exerciseUuid });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-7 h-7 animate-spin text-violet-400" />
      </div>
    );
  }

  const historyEntries = (entries || []).filter((e) => e.sets && e.sets.length > 0);

  if (historyEntries.length === 0) {
    return (
      <div className="text-center py-14 px-4 border border-dashed border-slate-700 rounded-xl">
        <Dumbbell className="w-8 h-8 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-300 font-medium">No history yet</p>
        <p className="text-sm text-slate-500 mt-1">Previous workout sessions with this exercise will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {historyEntries.map((entry) => {
        const workoutDate = entry.workout?.started_at ? DateTime.fromISO(entry.workout.started_at).toFormat("EEE, MMM d, yyyy") : "Unknown date";
        const workoutName = entry.workout?.name;
        const sets = entry.sets || [];

        return (
          <button
            key={entry.uuid}
            type="button"
            onClick={() => navigate(`/dashboard/gym/workout-entry/${entry.uuid}`)}
            className="w-full text-left bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800/80 p-5 hover:border-violet-500/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-300">{workoutDate}</span>
                {workoutName && <span className="text-xs text-slate-500">— {workoutName}</span>}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </div>

            <div className="space-y-2">
              {sets.map((set, idx) => (
                <div key={set.uuid} className="flex items-center gap-3 px-3 py-2 bg-slate-800/40 rounded-lg">
                  <span className="text-xs font-semibold text-violet-400 w-6 text-center">{idx + 1}</span>
                  <span className="text-sm text-white">{formatSetDetails(set)}</span>
                  {set.notes && <span className="text-xs text-slate-500 ml-auto truncate max-w-[120px]">{set.notes}</span>}
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 mt-3">
              {sets.length} set{sets.length !== 1 ? "s" : ""}
            </p>
          </button>
        );
      })}
    </div>
  );
}
