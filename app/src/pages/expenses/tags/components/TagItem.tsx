import { Edit2, Trash2 } from "lucide-react";
import type { ExpenseTag } from "../../../../features/expenses/expense-tags/interfaces/expense-tags.interfaces";
import { TagForm } from "./TagForm";
import { PRESET_COLORS } from "../../../../config/constants/dropdowns/expenses-colors";

type TagItemProps = {
  tag: ExpenseTag;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onEdit: (title: string, color: string) => void;
  onDelete: () => void;
  isUpdatePending: boolean;
};

export function TagItem({ tag, isEditing, onStartEdit, onCancelEdit, onEdit, onDelete, isUpdatePending }: TagItemProps) {
  if (isEditing) {
    return (
      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
        <TagForm
          initialTitle={tag.title}
          initialColor={tag.color}
          onSubmit={onEdit}
          onCancel={onCancelEdit}
          submitLabel="Save"
          isPending={isUpdatePending}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: tag.color }} />
      <span className="flex-1 text-sm font-medium truncate" style={{ color: tag.color }}>
        {tag.title}
      </span>
      <div className="flex items-center gap-1 shrink-0">
        <button type="button" onClick={onStartEdit} className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-700/50 transition-colors">
          <Edit2 className="w-4 h-4" />
        </button>
        <button type="button" onClick={onDelete} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export const TAG_DEFAULT_COLOR = PRESET_COLORS[0];
