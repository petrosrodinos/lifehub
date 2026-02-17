import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Search } from "lucide-react";
import { Modal } from "../../../../components/ui/Modal";
import { useExercises } from "../../../../features/exercises/hooks/use-exercises";
import { useMuscleGroups } from "../../../../features/muscle-groups/hooks/use-muscle-groups";
import { useCreateWorkoutEntry } from "../../../../features/workout-entries/hooks/use-workout-entries";
import { useWorkout } from "../../../../features/workout/hooks/use-workout";
import type { Exercise } from "../../../../features/exercises/interfaces/exercises.interface";

type AddExerciseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  workoutUuid: string;
};

export function AddExerciseModal({ isOpen, onClose, workoutUuid }: AddExerciseModalProps) {
  const navigate = useNavigate();
  const { data: exercises = [] } = useExercises();
  const { data: muscleGroups = [] } = useMuscleGroups();
  const { data: workout } = useWorkout(workoutUuid);
  const createEntry = useCreateWorkoutEntry();

  const [muscleGroupUuid, setMuscleGroupUuid] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setMuscleGroupUuid("");
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    if (muscleGroupUuid) {
      filtered = filtered.filter((ex) => ex.muscle_group_uuid === muscleGroupUuid);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((ex) => ex.name.toLowerCase().includes(query));
    }

    return filtered;
  }, [exercises, muscleGroupUuid, searchQuery]);

  const existingExerciseUuids = useMemo(() => {
    return new Set(workout?.entries?.map((entry) => entry.exercise_uuid) || []);
  }, [workout?.entries]);

  const handleSelectExercise = (exercise: Exercise) => {
    if (existingExerciseUuids.has(exercise.uuid)) return;

    createEntry.mutate(
      {
        workout_uuid: workoutUuid,
        exercise_uuid: exercise.uuid,
        order: workout?.entries?.length || 0,
      },
      {
        onSuccess: (newEntry) => {
          onClose();
          navigate(`/dashboard/gym/workout-entry/${newEntry.uuid}`);
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Exercise" size="lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Muscle Group</label>
          <select
            value={muscleGroupUuid}
            onChange={(e) => setMuscleGroupUuid(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <option value="">All Muscle Groups</option>
            {muscleGroups.map((group) => (
              <option key={group.uuid} value={group.uuid}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises..."
            className="w-full pl-10 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
          {filteredExercises.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">No exercises found</p>
            </div>
          ) : (
            filteredExercises.map((exercise) => {
              const isAlreadyAdded = existingExerciseUuids.has(exercise.uuid);

              return (
                <button
                  key={exercise.uuid}
                  type="button"
                  onClick={() => handleSelectExercise(exercise)}
                  disabled={isAlreadyAdded || createEntry.isPending}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    isAlreadyAdded
                      ? "bg-slate-800/30 opacity-50 cursor-not-allowed"
                      : "bg-slate-800/50 hover:bg-slate-700/60 hover:border-violet-500/40 border border-transparent cursor-pointer"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{exercise.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {exercise.muscle_group?.name} • {exercise.type}
                    </p>
                  </div>

                  {isAlreadyAdded && (
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded shrink-0 ml-3">
                      Added
                    </span>
                  )}

                  {createEntry.isPending && !isAlreadyAdded && (
                    <Loader2 className="w-4 h-4 animate-spin text-violet-400 shrink-0 ml-3" />
                  )}
                </button>
              );
            })
          )}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={createEntry.isPending}
            className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
