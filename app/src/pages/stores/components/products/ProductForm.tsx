import { useState } from "react";
import type { CreateExpenseProductDto, UpdateExpenseProductDto } from "../../../../features/receipts/expense-products/interfaces/expense-products.interfaces";
import { useExpenseCategories } from "../../../../features/expenses/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../../features/expenses/expense-subcategories/hooks/use-expense-subcategories";

type ProductFormProps = {
  onSubmit: (data: CreateExpenseProductDto | UpdateExpenseProductDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending?: boolean;
  initialData?: {
    name?: string;
    brand?: string;
    unit?: string;
    size?: number;
    category_uuid?: string;
    subcategory_uuid?: string;
  };
};

export function ProductForm({ onSubmit, onCancel, submitLabel, isPending = false, initialData }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [unit, setUnit] = useState(initialData?.unit || "");
  const [size, setSize] = useState(initialData?.size?.toString() || "");
  const [categoryUuid, setCategoryUuid] = useState(initialData?.category_uuid || "");
  const [subcategoryUuid, setSubcategoryUuid] = useState(initialData?.subcategory_uuid || "");

  const { data: categories = [] } = useExpenseCategories();
  const { data: subcategories = [] } = useExpenseSubcategories();

  const filteredSubcategories = categoryUuid ? subcategories.filter((sub) => sub.category_uuid === categoryUuid) : subcategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    const payload: CreateExpenseProductDto = {
      name: trimmedName,
    };

    const trimmedBrand = brand.trim();

    if (trimmedBrand) {
      payload.brand = trimmedBrand;
    }

    const trimmedUnit = unit.trim();

    if (trimmedUnit) {
      payload.unit = trimmedUnit;
    }

    if (size) {
      payload.size = parseFloat(size);
    }

    if (categoryUuid) {
      payload.category_uuid = categoryUuid;
    }

    if (subcategoryUuid) {
      payload.subcategory_uuid = subcategoryUuid;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="product-name" className="block text-sm font-semibold text-slate-300">
          Name
        </label>
        <input id="product-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Whole Milk, Olive Oil" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" autoFocus disabled={isPending} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-2">
          <label htmlFor="product-brand" className="block text-sm font-semibold text-slate-300">
            Brand <span className="text-slate-500 font-normal">(opt.)</span>
          </label>
          <input id="product-brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g., Arla" className="w-full px-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending} />
        </div>

        <div className="space-y-2">
          <label htmlFor="product-unit" className="block text-sm font-semibold text-slate-300">
            Unit <span className="text-slate-500 font-normal">(opt.)</span>
          </label>
          <input id="product-unit" type="text" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g., L, kg, pcs" className="w-full px-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending} />
        </div>

        <div className="space-y-2">
          <label htmlFor="product-size" className="block text-sm font-semibold text-slate-300">
            Size <span className="text-slate-500 font-normal">(opt.)</span>
          </label>
          <input id="product-size" type="number" step="0.01" min="0" value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g., 1.5" className="w-full px-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label htmlFor="product-category" className="block text-sm font-semibold text-slate-300">
            Category <span className="text-slate-500 font-normal">(opt.)</span>
          </label>
          <select
            id="product-category"
            value={categoryUuid}
            onChange={(e) => {
              setCategoryUuid(e.target.value);
              setSubcategoryUuid("");
            }}
            className="w-full px-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
            disabled={isPending}
          >
            <option value="">None</option>
            {categories.map((cat) => (
              <option key={cat.uuid} value={cat.uuid}>
                {cat.icon ? `${cat.icon} ` : ""}
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="product-subcategory" className="block text-sm font-semibold text-slate-300">
            Subcategory <span className="text-slate-500 font-normal">(opt.)</span>
          </label>
          <select id="product-subcategory" value={subcategoryUuid} onChange={(e) => setSubcategoryUuid(e.target.value)} className="w-full px-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all" disabled={isPending || !categoryUuid}>
            <option value="">None</option>
            {filteredSubcategories.map((sub) => (
              <option key={sub.uuid} value={sub.uuid}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isPending || !name.trim()} className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isPending && (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={isPending} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </button>
      </div>
    </form>
  );
}
