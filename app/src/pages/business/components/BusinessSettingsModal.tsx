import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import { useExpenseCategories } from "../../../features/expenses/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../features/expenses/expense-subcategories/hooks/use-expense-subcategories";
import { useBusinessSettings, useUpdateBusinessSettings } from "../../../features/expenses/business-settings/hooks/use-business-settings";
import type { BusinessSettings } from "../../../features/expenses/business-settings/interfaces/business-settings.interfaces";
import { CategorySubcategoryPickerModal } from "../../expenses/transactions/components/CategorySubcategoryPickerModal";

type BusinessSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type BusinessSettingsFormProps = {
  settings: BusinessSettings;
  onClose: () => void;
};

function BusinessSettingsForm({ settings, onClose }: BusinessSettingsFormProps) {
  const { data: categoriesData } = useExpenseCategories();
  const { data: subcategoriesData } = useExpenseSubcategories();
  const updateSettings = useUpdateBusinessSettings();

  const [categoryUuid, setCategoryUuid] = useState(settings.vat_payment_category_uuid ?? "");
  const [subcategoryUuid, setSubcategoryUuid] = useState(settings.vat_payment_subcategory_uuid ?? "");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const categories = categoriesData || [];
  const subcategories = subcategoriesData || [];
  const selectedCategory = categories.find((category) => category.uuid === categoryUuid);
  const selectedSubcategory = subcategories.find((subcategory) => subcategory.uuid === subcategoryUuid);
  const hasSelection = Boolean(selectedCategory && selectedSubcategory);

  const handleSelect = (nextCategoryUuid: string, nextSubcategoryUuid: string) => {
    setCategoryUuid(nextCategoryUuid);
    setSubcategoryUuid(nextSubcategoryUuid);
  };

  const handleClear = () => {
    setCategoryUuid("");
    setSubcategoryUuid("");
  };

  const handleSave = () => {
    updateSettings.mutate(
      {
        vat_payment_category_uuid: hasSelection ? categoryUuid : null,
        vat_payment_subcategory_uuid: hasSelection ? subcategoryUuid : null,
      },
      { onSuccess: onClose },
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">VAT payment category</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            disabled={updateSettings.isPending}
            className="flex-1 min-w-0 flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-left hover:border-violet-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {hasSelection ? (
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{selectedCategory?.name}</p>
                <p className="text-sm text-slate-400 truncate">{selectedSubcategory?.name}</p>
              </div>
            ) : (
              <span className="flex-1 text-slate-500">Select category</span>
            )}
            <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
          </button>
          {hasSelection && (
            <button
              type="button"
              onClick={handleClear}
              disabled={updateSettings.isPending}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Clear VAT payment category"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Expenses in this category and subcategory are treated as VAT payments to the tax authority. When you record one you choose the VAT period it covers.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="flex-1 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateSettings.isPending ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={updateSettings.isPending}
          className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>

      <CategorySubcategoryPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        categories={categories}
        subcategories={subcategories}
        selectedCategoryUuid={categoryUuid}
        selectedSubcategoryUuid={subcategoryUuid}
        onSelect={handleSelect}
      />
    </div>
  );
}

export function BusinessSettingsModal({ isOpen, onClose }: BusinessSettingsModalProps) {
  const { data: settings } = useBusinessSettings();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Business settings">
      {settings ? (
        <BusinessSettingsForm settings={settings} onClose={onClose} />
      ) : (
        <div className="h-24 bg-slate-800/50 rounded-lg animate-pulse" />
      )}
    </Modal>
  );
}
