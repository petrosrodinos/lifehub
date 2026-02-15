import { FolderTree } from "lucide-react";

type EmptyStateProps = {
  onCreateClick: () => void;
};

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <FolderTree className="w-16 h-16 mx-auto text-slate-600 mb-4" />
      <p className="text-slate-400 mb-2">No categories yet</p>
      <p className="text-sm text-slate-500 mb-4">Create your first category to organize expenses</p>
      <button type="button" onClick={onCreateClick} className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors">
        Create First Category
      </button>
    </div>
  );
}
