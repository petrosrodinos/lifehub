import { useState } from "react";
import { Edit2, Trash2, Clock } from "lucide-react";
import { DateTime } from "luxon";
import type { WorkoutSet } from "../../../../features/workout-sets/interfaces/workout-sets.interface";
import { DeleteSetModal } from "./DeleteSetModal";
import { EditSetModal } from "./EditSetModal";
import { ExerciseTypes } from "../../../../features/exercises/interfaces/exercises.interface";

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
      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 group hover:border-violet-500/40 transition-colors">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
            <span className="text-violet-400 font-semibold">{setNumber}</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-medium">{renderSetDetails()}</p>

            {set.notes && <p className="text-sm text-slate-400 mt-1">{set.notes}</p>}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-violet-500/10 text-violet-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 mt-2">
              {set.created_at && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(set.created_at)}</span>
                </div>
              )}
              {set.rest_seconds && (
                <p className="text-xs text-slate-500">Rest: {set.rest_seconds}s</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" onClick={() => setIsEditModalOpen(true)} className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-700 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <EditSetModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} set={set} />

      <DeleteSetModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} set={set} />
    </>
  );
}
