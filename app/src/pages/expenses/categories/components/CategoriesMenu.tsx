import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useExpenseCategories, useCreateExpenseCategory, useUpdateExpenseCategory, useDeleteExpenseCategory } from "../../../../features/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories, useCreateExpenseSubcategory, useUpdateExpenseSubcategory, useDeleteExpenseSubcategory } from "../../../../features/expense-subcategories/hooks/use-expense-subcategories";
import type { ExpenseCategory } from "../../../../features/expense-categories/interfaces/expense-categories.interfaces";
import type { ExpenseSubcategory } from "../../../../features/expense-subcategories/interfaces/expense-subcategories.interfaces";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";
import { CategoryForm } from "./CategoryForm";
import { CategoryItem } from "./CategoryItem";
import { EmptyState } from "./EmptyState";
import { PRESET_COLORS } from "../../../../config/constants/dropdowns/expenses-colors";
import { CATEGORY_PRESET_ICONS } from "../../../../config/constants/dropdowns/account-icons";

type CategoriesMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CategoriesMenu({ isOpen, onClose }: CategoriesMenuProps) {
  const { data: categories = [], isLoading: categoriesLoading } = useExpenseCategories();
  const { data: allSubcategories = [], isLoading: subcategoriesLoading } = useExpenseSubcategories();
  const createCategory = useCreateExpenseCategory();
  const updateCategory = useUpdateExpenseCategory();
  const deleteCategory = useDeleteExpenseCategory();
  const createSubcategory = useCreateExpenseSubcategory();
  const updateSubcategory = useUpdateExpenseSubcategory();
  const deleteSubcategory = useDeleteExpenseSubcategory();

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingCategoryUuid, setEditingCategoryUuid] = useState<string | null>(null);
  const [editingSubcategoryUuid, setEditingSubcategoryUuid] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [addingSubcategoryToCategoryUuid, setAddingSubcategoryToCategoryUuid] = useState<string | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<ExpenseCategory | null>(null);
  const [deletingSubcategory, setDeletingSubcategory] = useState<ExpenseSubcategory | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const toggleCategory = (uuid: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(uuid)) {
        next.delete(uuid);
      } else {
        next.add(uuid);
      }
      return next;
    });
  };

  const handleAddCategory = (name: string, color: string, icon: string) => {
    createCategory.mutate(
      { name, color, icon },
      {
        onSuccess: () => {
          setIsAddingCategory(false);
        },
      },
    );
  };

  const handleUpdateCategory = (uuid: string, name: string, color: string, icon: string) => {
    updateCategory.mutate(
      { uuid, data: { name, color, icon } },
      {
        onSuccess: () => {
          setEditingCategoryUuid(null);
        },
      },
    );
  };

  const handleAddSubcategory = (categoryUuid: string, name: string) => {
    createSubcategory.mutate(
      { category_uuid: categoryUuid, name },
      {
        onSuccess: () => {
          setAddingSubcategoryToCategoryUuid(null);
        },
      },
    );
  };

  const handleUpdateSubcategory = (uuid: string, name: string, categoryUuid: string) => {
    updateSubcategory.mutate(
      { uuid, data: { name, category_uuid: categoryUuid } },
      {
        onSuccess: () => {
          setEditingSubcategoryUuid(null);
        },
      },
    );
  };

  const handleDeleteCategoryConfirm = () => {
    if (deletingCategory) {
      deleteCategory.mutate(deletingCategory.uuid, {
        onSuccess: () => {
          setDeletingCategory(null);
        },
      });
    }
  };

  const handleDeleteSubcategoryConfirm = () => {
    if (deletingSubcategory) {
      deleteSubcategory.mutate(deletingSubcategory.uuid, {
        onSuccess: () => {
          setDeletingSubcategory(null);
        },
      });
    }
  };

  const getSubcategoriesForCategory = (categoryUuid: string) => {
    return allSubcategories.filter((sub) => sub.category_uuid === categoryUuid);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[90]" onClick={onClose} />
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-slate-900 border-l border-slate-700 z-[91] flex flex-col shadow-xl" role="dialog" aria-label="Categories menu">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Categories & Subcategories</h2>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isAddingCategory ? (
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Add category</h3>
              <CategoryForm initialName="" initialColor={PRESET_COLORS[0]} initialIcon={CATEGORY_PRESET_ICONS[0]} onSubmit={handleAddCategory} onCancel={() => setIsAddingCategory(false)} submitLabel="Add" isPending={createCategory.isPending} />
            </div>
          ) : (
            <button type="button" onClick={() => setIsAddingCategory(true)} className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors font-medium">
              + Add category
            </button>
          )}

          <div className="space-y-2">
            {categoriesLoading || subcategoriesLoading ? (
              <div className="text-center py-8 text-slate-400">Loading categories...</div>
            ) : categories.length === 0 ? (
              <EmptyState onCreateClick={() => setIsAddingCategory(true)} />
            ) : (
              categories.map((category) => {
                const subcategories = getSubcategoriesForCategory(category.uuid);
                const isExpanded = expandedCategories.has(category.uuid);

                return (
                  <CategoryItem
                    key={category.uuid}
                    category={category}
                    subcategories={subcategories}
                    isExpanded={isExpanded}
                    onToggle={() => toggleCategory(category.uuid)}
                    onEdit={(name, color, icon) => handleUpdateCategory(category.uuid, name, color, icon)}
                    onDelete={() => setDeletingCategory(category)}
                    onAddSubcategory={(name) => handleAddSubcategory(category.uuid, name)}
                    onEditSubcategory={(subcategoryUuid, name) => handleUpdateSubcategory(subcategoryUuid, name, category.uuid)}
                    onDeleteSubcategory={setDeletingSubcategory}
                    isEditing={editingCategoryUuid === category.uuid}
                    onStartEdit={() => setEditingCategoryUuid(category.uuid)}
                    onCancelEdit={() => setEditingCategoryUuid(null)}
                    isUpdatePending={updateCategory.isPending}
                    addingSubcategory={addingSubcategoryToCategoryUuid === category.uuid}
                    onStartAddingSubcategory={() => setAddingSubcategoryToCategoryUuid(category.uuid)}
                    onCancelAddingSubcategory={() => setAddingSubcategoryToCategoryUuid(null)}
                    isCreateSubcategoryPending={createSubcategory.isPending}
                    editingSubcategoryUuid={editingSubcategoryUuid}
                    onStartEditSubcategory={setEditingSubcategoryUuid}
                    onCancelEditSubcategory={() => setEditingSubcategoryUuid(null)}
                    isUpdateSubcategoryPending={updateSubcategory.isPending}
                  />
                );
              })
            )}
          </div>
        </div>
      </aside>

      <ConfirmationModal isOpen={!!deletingCategory} onClose={() => setDeletingCategory(null)} onConfirm={handleDeleteCategoryConfirm} title="Delete Category" description={`Are you sure you want to delete "${deletingCategory?.name}"? This will also delete all associated subcategories and may affect expense entries.`} confirmText="Delete" cancelText="Cancel" variant="danger" isPending={deleteCategory.isPending} />

      <ConfirmationModal isOpen={!!deletingSubcategory} onClose={() => setDeletingSubcategory(null)} onConfirm={handleDeleteSubcategoryConfirm} title="Delete Subcategory" description={`Are you sure you want to delete "${deletingSubcategory?.name}"? This may affect expense entries.`} confirmText="Delete" cancelText="Cancel" variant="danger" isPending={deleteSubcategory.isPending} />
    </>
  );
}
