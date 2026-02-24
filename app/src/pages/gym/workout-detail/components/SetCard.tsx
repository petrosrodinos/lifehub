import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { DateTime } from "luxon";
import type { WorkoutSet } from "../../../../features/gym/workout-sets/interfaces/workout-sets.interface";
import { DeleteSetModal } from "./DeleteSetModal";
import { EditSetModal } from "./EditSetModal";
import { ExerciseTypes } from "../../../../features/gym/exercises/interfaces/exercises.interface";

type SetCardProps = {
  set: WorkoutSet;
  setNumber: number;
};

export function SetCard({ set, setNumber }: SetCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const renderSetDetails = () => {
    const details = [];

    if (set.type === ExerciseTypes.REPS && set.reps) {
      details.push(`${set.reps} reps`);
    }

    if (set.type === ExerciseTypes.TIME && set.duration_seconds) {
      details.push(`${set.duration_seconds}s`);
    }

    if (set.weight) {
      details.push(`${set.weight}kg`);
    }

    if (set.distance_meters) {
      details.push(`${set.distance_meters}m`);
    }

    return details.join(" • ");
  };

  const renderTags = () => {
    const tags = [];

    if (set.is_warmup) tags.push("Warmup");
    if (set.is_dropset) tags.push("Dropset");
    if (set.is_amrap) tags.push("AMRAP");
    if (set.is_super_set) tags.push("Superset");
    if (set.is_cooldown) tags.push("Cooldown");
    if (set.is_rest) tags.push("Rest");

    return tags;
  };

  const tags = renderTags();

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return null;
    return DateTime.fromISO(timestamp).toFormat("h:mm a");
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 p-2.5 sm:p-3 bg-slate-800/50 rounded-lg border border-slate-700 group hover:border-violet-500/40 transition-colors">
        <div className="flex items-start gap-2 sm:gap-2.5 flex-1 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-violet-500/10 flex items-center justify-center shrink-0">
            <span className="text-violet-400 text-xs sm:text-sm font-semibold">{setNumber}</span>
          </div>

          <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
              <p className="text-white text-sm font-medium">{renderSetDetails()}</p>
            </div>

            {set.created_at && <p className="text-xs text-slate-400 break-words">{formatTime(set.created_at)}</p>}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="text-[11px] sm:text-xs px-1.5 py-0.5 bg-violet-500/10 text-violet-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity self-end sm:self-auto shrink-0">
          <button type="button" onClick={() => setIsEditModalOpen(true)} className="p-1.5 text-slate-400 hover:text-violet-400 rounded-md hover:bg-slate-700 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-slate-700 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <EditSetModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} set={set} />

      <DeleteSetModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} set={set} />
    </>
  );
}
