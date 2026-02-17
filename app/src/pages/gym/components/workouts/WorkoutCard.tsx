import { useNavigate } from "react-router-dom";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { DateTime } from "luxon";
import type { Workout } from "../../../../features/workout/interfaces/workout.interface";

type WorkoutCardProps = {
  workout: Workout;
};

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const navigate = useNavigate();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return DateTime.fromISO(dateString).toFormat("MMM d, yyyy");
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    return DateTime.fromISO(dateString).toFormat("h:mm a");
  };

  const calculateDuration = () => {
    if (!workout.started_at || !workout.finished_at) return null;
    const start = DateTime.fromISO(workout.started_at);
    const end = DateTime.fromISO(workout.finished_at);
    return Math.round(end.diff(start, "minutes").minutes);
  };

  const duration = calculateDuration();
  const setsCount = workout.entries?.reduce((sum, entry) => sum + (entry.sets?.length || 0), 0) || 0;

  const handleCardClick = () => {
    navigate(`/dashboard/gym/workout/${workout.uuid}`);
  };

  return (
    <>
      <div className="relative bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-violet-500/40 rounded-xl p-4 transition-all duration-200 group">
        <button type="button" onClick={handleCardClick} className="w-full text-left">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white truncate mb-1">{workout.name || "Unnamed Workout"}</h3>
              {workout.notes && <p className="text-sm text-slate-400 line-clamp-2">{workout.notes}</p>}
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 transition-colors shrink-0" />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{formatDate(workout.started_at)}</span>
            </div>
            {duration !== null && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{duration} min</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="text-violet-400 font-medium">{setsCount} sets</span>
            </div>
          </div>

          {workout.started_at && <p className="text-xs text-slate-500 mt-2">{formatTime(workout.started_at)}</p>}
        </button>
      </div>
    </>
  );
}
