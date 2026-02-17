type GymEmptyStateProps = {
  onCreateClick: () => void;
};

export function GymEmptyState({ onCreateClick }: GymEmptyStateProps) {
  return (
    <div className="text-center py-12 px-4 border border-dashed border-slate-700 rounded-xl">
      <p className="text-slate-300 font-medium">No muscle groups yet</p>
      <p className="text-sm text-slate-500 mt-1">Create your first muscle group and start adding exercises.</p>
      <button
        type="button"
        onClick={onCreateClick}
        className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
      >
        Create muscle group
      </button>
    </div>
  );
}
