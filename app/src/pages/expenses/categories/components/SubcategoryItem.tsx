import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Edit2, GripVertical, Trash2 } from "lucide-react";
import type { ExpenseSubcategory } from "../../../../features/expenses/expense-subcategories/interfaces/expense-subcategories.interfaces";
import { SubcategoryForm } from "./SubcategoryForm";
import { getSubcategoryDragId } from "../utils/subcategory-drag-drop.helper";

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
  const isDraggable = canEditDelete && !isEditing;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: getSubcategoryDragId(subcategory.uuid),
    data: { type: "subcategory", subcategory, categoryUuid: subcategory.category_uuid },
    disabled: !isDraggable,
  });

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-2 bg-slate-800 rounded-lg ${isDragging ? "opacity-40" : ""}`}
    >
      {isEditing ? (
        <div className="flex-1">
          <SubcategoryForm initialName={subcategory.name} onSubmit={onEdit} onCancel={onCancelEdit} submitLabel="Save" isPending={isUpdatePending} />
        </div>
      ) : (
        <>
          {isDraggable && (
            <button
              type="button"
              className="p-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing touch-none shrink-0"
              {...attributes}
              {...listeners}
              aria-label={`Drag ${subcategory.name} to another category`}
            >
              <GripVertical className="w-3.5 h-3.5" />
            </button>
          )}
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
