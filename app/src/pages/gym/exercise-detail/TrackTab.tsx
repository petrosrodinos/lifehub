import { Dumbbell } from "lucide-react";
import type { WorkoutEntry } from "../../../features/gym/workout-entries/interfaces/workout-entries.interface";
import { useCreateWorkoutSet, useReorderWorkoutSets } from "../../../features/gym/workout-sets/hooks/use-workout-sets";
import { ExerciseTypes } from "../../../features/gym/exercises/interfaces/exercises.interface";
import type { CreateWorkoutSetDto } from "../../../features/gym/workout-sets/interfaces/workout-sets.interface";
import type { WorkoutSet } from "../../../features/gym/workout-sets/interfaces/workout-sets.interface";
import { SetForm } from "../workout-detail/components/SetForm";
import type { SetFormValues } from "../workout-detail/components/SetForm";
import { SortableSetCard } from "./SortableSetCard";
import { ReorderableList } from "../../../components/ui/ReorderableList";

type TrackTabProps = {
  entry: WorkoutEntry;
};

export function TrackTab({ entry }: TrackTabProps) {
  const createSet = useCreateWorkoutSet();
  const reorderSets = useReorderWorkoutSets();

  const exercise = entry.exercise;
  const exerciseSets = entry.sets || [];
  const exerciseType = exercise?.type || ExerciseTypes.REPS;

  const handleReorderSets = (reordered: WorkoutSet[]) => {
    reorderSets.mutate(reordered.map((s, i) => ({ uuid: s.uuid, order: i })));
  };

  const handleSave = (values: SetFormValues) => {
    const data: CreateWorkoutSetDto = {
      workout_entry_uuid: entry.uuid,
      type: exerciseType,
      order: exerciseSets.length + 1,
    };

    if (exerciseType === ExerciseTypes.REPS) {
      data.reps = values.reps;
      if (values.weight > 0) data.weight = values.weight;
    }

    if (exerciseType === ExerciseTypes.TIME) {
      if (values.durationSeconds > 0) data.duration_seconds = values.durationSeconds;
      if (values.distanceMeters > 0) data.distance_meters = values.distanceMeters;
    }

    createSet.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800/80 p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-violet-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Add Set</h2>
        </div>

        <SetForm exerciseType={exerciseType} onSave={handleSave} isPending={createSet.isPending} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Sets ({exerciseSets.length})</h2>
        </div>

        {exerciseSets.length === 0 ? (
          <div className="text-center py-10 px-4 border border-dashed border-slate-700 rounded-xl">
            <Dumbbell className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No sets yet</p>
            <p className="text-sm text-slate-500 mt-1">Use the controls above to add your first set.</p>
          </div>
        ) : (
          <ReorderableList
            items={exerciseSets}
            getItemId={(s) => s.uuid}
            onReorder={handleReorderSets}
            orderKey="order"
            gapClass="space-y-3"
          >
            {(set, index, sortableProps) => (
              <SortableSetCard set={set} setNumber={index + 1} sortableProps={sortableProps} />
            )}
          </ReorderableList>
        )}
      </div>
    </div>
  );
}
