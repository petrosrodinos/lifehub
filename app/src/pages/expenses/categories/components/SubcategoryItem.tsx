import { Edit2, Trash2 } from "lucide-react";
import type { ExpenseSubcategory } from "../../../../features/expenses/expense-subcategories/interfaces/expense-subcategories.interfaces";
import { SubcategoryForm } from "./SubcategoryForm";

type SubcategoryItemProps = {
  subcategory: ExpenseSubcategory;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onEdit: (name: string) => void;
  onDelete: () => void;
  isUpdatePending: boolean;
  canEditDelete: boolean;
};

export function SubcategoryItem({ subcategory, isEditing, onStartEdit, onCancelEdit, onEdit, onDelete, isUpdatePending, canEditDelete }: SubcategoryItemProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg">
      {isEditing ? (
        <div className="flex-1">
          <SubcategoryForm initialName={subcategory.name} onSubmit={onEdit} onCancel={onCancelEdit} submitLabel="Save" isPending={isUpdatePending} />
        </div>
      ) : (
        <>
          <span className="flex-1 text-sm text-slate-300">{subcategory.name}</span>
          {canEditDelete && (
            <div className="flex gap-1">
              <button type="button" onClick={onStartEdit} className="p-1.5 text-slate-400 hover:text-violet-400 rounded hover:bg-slate-700 transition-colors">
                <Edit2 className="w-3 h-3" />
              </button>
              <button type="button" onClick={onDelete} className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-700 transition-colors">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
