import { useState, useCallback, useMemo, useEffect } from "react";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { Modal } from "../../../../components/ui/Modal";
import type { ExpenseCategory } from "../../../../features/expenses/expense-categories/interfaces/expense-categories.interfaces";
import type { ExpenseSubcategory } from "../../../../features/expenses/expense-subcategories/interfaces/expense-subcategories.interfaces";

type CategorySubcategoryPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: ExpenseCategory[];
  subcategories: ExpenseSubcategory[];
  selectedCategoryUuid: string;
  selectedSubcategoryUuid: string;
  onSelect: (categoryUuid: string, subcategoryUuid: string) => void;
};

export function CategorySubcategoryPickerModal({
  isOpen,
  onClose,
  categories,
  subcategories,
  selectedCategoryUuid,
  selectedSubcategoryUuid,
  onSelect,
}: CategorySubcategoryPickerModalProps) {
  const [expandedCategoryUuid, setExpandedCategoryUuid] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setExpandedCategoryUuid(selectedCategoryUuid || null);
    }
  }, [isOpen, selectedCategoryUuid]);

  const subcategoriesByCategory = useMemo(() => {
    const map = new Map<string, ExpenseSubcategory[]>();
    for (const subcategory of subcategories) {
      const existing = map.get(subcategory.category_uuid) ?? [];
      existing.push(subcategory);
      map.set(subcategory.category_uuid, existing);
    }
    return map;
  }, [subcategories]);

  const handleToggleCategory = useCallback((categoryUuid: string) => {
    setExpandedCategoryUuid((current) => (current === categoryUuid ? null : categoryUuid));
  }, []);

  const handleSelectSubcategory = useCallback(
    (categoryUuid: string, subcategoryUuid: string) => {
      onSelect(categoryUuid, subcategoryUuid);
      onClose();
    },
    [onSelect, onClose],
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Category" size="lg" scrollable nested>
      {categories.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">No categories available</p>
      ) : (
        <div className="space-y-2">
          {categories.map((category) => {
            const categorySubcategories = subcategoriesByCategory.get(category.uuid) ?? [];
            const isExpanded = expandedCategoryUuid === category.uuid;
            const categoryColor = category.color || "#8b5cf6";

            return (
              <div key={category.uuid} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleToggleCategory(category.uuid)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-800/80 transition-colors"
                >
                  <span className="text-slate-400 shrink-0">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{ backgroundColor: categoryColor }}
                  >
                    {category.icon || "📁"}
                  </div>
                  <span className="flex-1 text-white font-medium">{category.name}</span>
                  <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded shrink-0">
                    {categorySubcategories.length}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 pl-14 space-y-1">
                    {categorySubcategories.length === 0 ? (
                      <p className="text-sm text-slate-500 py-2">No subcategories</p>
                    ) : (
                      categorySubcategories.map((subcategory) => {
                        const isSelected =
                          selectedCategoryUuid === category.uuid && selectedSubcategoryUuid === subcategory.uuid;

                        return (
                          <button
                            key={subcategory.uuid}
                            type="button"
                            onClick={() => handleSelectSubcategory(category.uuid, subcategory.uuid)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                              isSelected
                                ? "bg-violet-600/20 text-violet-200 border border-violet-500/40"
                                : "text-slate-300 hover:bg-slate-700/60 border border-transparent"
                            }`}
                          >
                            <span className="flex-1">{subcategory.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-violet-400 shrink-0" />}
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
}
