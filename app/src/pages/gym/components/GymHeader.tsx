import { Plus, Dumbbell } from "lucide-react";

type GymHeaderProps = {
  onOpenMenu: () => void;
  onCreateWorkout: () => void;
};

export function GymHeader({ onOpenMenu, onCreateWorkout }: GymHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-semibold text-white">Gym</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage muscle groups and exercises</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onOpenMenu}
          className="p-2.5 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-800/50 transition-colors"
          title="Manage categories"
        >
          <Dumbbell className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onCreateWorkout}
          className="flex items-center gap-2 px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          <span className="hidden sm:inline">New</span>
        </button>
      </div>
    </header>
  );
}
