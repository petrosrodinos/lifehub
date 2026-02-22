import { ChevronDown, ChevronRight, Edit2, Trash2, Plus } from "lucide-react";
import type { ExpenseCategory } from "../../../../features/expense-categories/interfaces/expense-categories.interfaces";
import type { ExpenseSubcategory } from "../../../../features/expense-subcategories/interfaces/expense-subcategories.interfaces";
import { CategoryForm } from "./CategoryForm";
import { SubcategoryForm } from "./SubcategoryForm";
import { SubcategoryItem } from "./SubcategoryItem";
import { PRESET_COLORS } from "../../../../config/constants/dropdowns/expenses-colors";
import { CATEGORY_PRESET_ICONS } from "../../../../config/constants/dropdowns/account-icons";

type CategoryItemProps = {
  category: ExpenseCategory;
  subcategories: ExpenseSubcategory[];
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (name: string, color: string, icon: string) => void;
  onDelete: () => void;
  onAddSubcategory: (name: string) => void;
  onEditSubcategory: (subcategoryUuid: string, name: string) => void;
  onDeleteSubcategory: (subcategory: ExpenseSubcategory) => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  isUpdatePending: boolean;
  addingSubcategory: boolean;
  onStartAddingSubcategory: () => void;
  onCancelAddingSubcategory: () => void;
  isCreateSubcategoryPending: boolean;
  editingSubcategoryUuid: string | null;
  onStartEditSubcategory: (uuid: string) => void;
  onCancelEditSubcategory: () => void;
  isUpdateSubcategoryPending: boolean;
  canEditDelete: boolean;
};

export function CategoryItem({ category, subcategories, isExpanded, onToggle, onEdit, onDelete, onAddSubcategory, onEditSubcategory, onDeleteSubcategory, isEditing, onStartEdit, onCancelEdit, isUpdatePending, addingSubcategory, onStartAddingSubcategory, onCancelAddingSubcategory, isCreateSubcategoryPending, editingSubcategoryUuid, onStartEditSubcategory, onCancelEditSubcategory, isUpdateSubcategoryPending, canEditDelete }: CategoryItemProps) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700">
      {isEditing ? (
        <div className="p-3">
          <CategoryForm initialName={category.name} initialColor={category.color || PRESET_COLORS[0]} initialIcon={category.icon || CATEGORY_PRESET_ICONS[0]} onSubmit={onEdit} onCancel={onCancelEdit} submitLabel="Save" isPending={isUpdatePending} />
        </div>
      ) : (
        <div className="flex items-center gap-3 p-3">
          <button type="button" onClick={onToggle} className="p-1 text-slate-400 hover:text-white transition-colors">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ backgroundColor: category.color || "#8b5cf6" }}>
              {category.icon || "📁"}
            </div>
            <span className="flex-1 text-white font-medium">{category.name}</span>
            <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">{subcategories.length}</span>
          </div>
          <div className="flex gap-1">
            <button type="button" onClick={onStartAddingSubcategory} className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-700 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            {canEditDelete && (
              <>
                <button type="button" onClick={onStartEdit} className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-700 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button type="button" onClick={onDelete} className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="px-3 pb-3 pl-12 space-y-2">
          {addingSubcategory && (
            <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
              <SubcategoryForm initialName="" onSubmit={onAddSubcategory} onCancel={onCancelAddingSubcategory} submitLabel="Add" isPending={isCreateSubcategoryPending} />
            </div>
          )}
          {subcategories.length === 0 && !addingSubcategory ? <p className="text-sm text-slate-500 py-2">No subcategories yet</p> : subcategories.map((subcategory) => <SubcategoryItem key={subcategory.uuid} subcategory={subcategory} isEditing={editingSubcategoryUuid === subcategory.uuid} onStartEdit={() => onStartEditSubcategory(subcategory.uuid)} onCancelEdit={onCancelEditSubcategory} onEdit={(name) => onEditSubcategory(subcategory.uuid, name)} onDelete={() => onDeleteSubcategory(subcategory)} isUpdatePending={isUpdateSubcategoryPending} canEditDelete={canEditDelete} />)}
        </div>
      )}
    </div>
  );
}
