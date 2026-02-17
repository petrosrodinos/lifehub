import { useWorkouts } from "../../../../features/workout/hooks/use-workout";
import { WorkoutCard } from "./WorkoutCard";
import { WorkoutsLoading } from "./WorkoutsLoading";

export function WorkoutsList() {
  const { data: workouts = [], isLoading } = useWorkouts();

  if (isLoading) {
    return <WorkoutsLoading />;
  }

  if (workouts.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-slate-700 rounded-xl">
        <p className="text-slate-300 font-medium">No workouts yet</p>
        <p className="text-sm text-slate-500 mt-1">
          Start tracking your workouts to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.uuid} workout={workout} />
      ))}
    </div>
  );
}
