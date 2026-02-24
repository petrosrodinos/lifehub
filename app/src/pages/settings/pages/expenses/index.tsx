import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Eye, EyeOff } from "lucide-react";
import { useExpenseCategories } from "../../../../features/expenses/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../../features/expenses/expense-subcategories/hooks/use-expense-subcategories";
import { useHiddenCategories, useCreateHiddenCategory, useDeleteHiddenCategory } from "../../../../features/expenses/hidden-categories/hooks/use-hidden-categories";
import { useHiddenSubcategories, useCreateHiddenSubcategory, useDeleteHiddenSubcategory } from "../../../../features/expenses/hidden-subcategories/hooks/use-hidden-subcategories";
import { useMemo, useState } from "react";

export function ExpensesSettingsPage() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: categoriesLoading } = useExpenseCategories();
  const { data: subcategories = [], isLoading: subcategoriesLoading } = useExpenseSubcategories();
  const { data: hiddenCategories = [], isLoading: hiddenCategoriesLoading } = useHiddenCategories();
  const { data: hiddenSubcategories = [], isLoading: hiddenSubcategoriesLoading } = useHiddenSubcategories();
  const createHiddenCategory = useCreateHiddenCategory();
  const deleteHiddenCategory = useDeleteHiddenCategory();
  const createHiddenSubcategory = useCreateHiddenSubcategory();
  const deleteHiddenSubcategory = useDeleteHiddenSubcategory();

  const [selectedCategoryUuid, setSelectedCategoryUuid] = useState("");
  const [selectedSubcategoryUuid, setSelectedSubcategoryUuid] = useState("");

  const categoryByUuid = useMemo(() => {
    const map = new Map<string, { name: string }>();
    categories.forEach((c) => map.set(c.uuid, { name: c.name }));
    return map;
  }, [categories]);

  const subcategoryByUuid = useMemo(() => {
    const map = new Map<string, { name: string }>();
    subcategories.forEach((s) => map.set(s.uuid, { name: s.name }));
    return map;
  }, [subcategories]);

  const hiddenCategoryUuids = useMemo(() => new Set(hiddenCategories.map((h) => h.category_uuid)), [hiddenCategories]);
  const hiddenSubcategoryUuids = useMemo(() => new Set(hiddenSubcategories.map((h) => h.subcategory_uuid)), [hiddenSubcategories]);

  const categoriesNotHidden = useMemo(() => categories.filter((c) => !hiddenCategoryUuids.has(c.uuid)), [categories, hiddenCategoryUuids]);
  const subcategoriesNotHidden = useMemo(() => subcategories.filter((s) => !hiddenSubcategoryUuids.has(s.uuid)), [subcategories, hiddenSubcategoryUuids]);

  const handleBack = () => navigate("/dashboard/settings/security");

  const handleHideCategory = () => {
    if (!selectedCategoryUuid) return;
    createHiddenCategory.mutate({ category_uuid: selectedCategoryUuid }, { onSuccess: () => setSelectedCategoryUuid("") });
  };

  const handleHideSubcategory = () => {
    if (!selectedSubcategoryUuid) return;
    createHiddenSubcategory.mutate({ subcategory_uuid: selectedSubcategoryUuid }, { onSuccess: () => setSelectedSubcategoryUuid("") });
  };

  const loading = categoriesLoading || subcategoriesLoading || hiddenCategoriesLoading || hiddenSubcategoriesLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Settings
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-violet-400" />
            Expenses visibility
          </h1>
          <p className="text-slate-400">Hide categories or subcategories from expense views</p>
        </div>

        {loading ? (
          <div className="text-slate-400">Loading…</div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-violet-400" />
                Hidden categories
              </h2>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 space-y-4">
                {categoriesNotHidden.length > 0 && (
                  <div className="pb-4 border-b border-slate-700/50 flex flex-wrap items-end gap-2">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs text-slate-400 mb-1">Hide a category</label>
                      <select value={selectedCategoryUuid} onChange={(e) => setSelectedCategoryUuid(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                        <option value="">Select category</option>
                        {categoriesNotHidden.map((c) => (
                          <option key={c.uuid} value={c.uuid}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="button" onClick={handleHideCategory} disabled={!selectedCategoryUuid || createHiddenCategory.isPending} className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors">
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </button>
                  </div>
                )}
                {hiddenCategories.length === 0 ? (
                  <p className="text-slate-400 text-sm">No hidden categories</p>
                ) : (
                  <ul className="space-y-2">
                    {hiddenCategories.map((h) => (
                      <li key={h.uuid} className="flex items-center justify-between gap-3 py-2 border-b border-slate-700/50 last:border-0">
                        <span className="text-white">{categoryByUuid.get(h.category_uuid)?.name ?? h.category_uuid}</span>
                        <button type="button" onClick={() => deleteHiddenCategory.mutate(h.uuid)} disabled={deleteHiddenCategory.isPending} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                          Show
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-violet-400" />
                Hidden subcategories
              </h2>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 space-y-4">
                {subcategoriesNotHidden.length > 0 && (
                  <div className="pb-4 border-b border-slate-700/50 flex flex-wrap items-end gap-2">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs text-slate-400 mb-1">Hide a subcategory</label>
                      <select value={selectedSubcategoryUuid} onChange={(e) => setSelectedSubcategoryUuid(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                        <option value="">Select subcategory</option>
                        {subcategoriesNotHidden.map((s) => (
                          <option key={s.uuid} value={s.uuid}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="button" onClick={handleHideSubcategory} disabled={!selectedSubcategoryUuid || createHiddenSubcategory.isPending} className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors">
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </button>
                  </div>
                )}
                {hiddenSubcategories.length === 0 ? (
                  <p className="text-slate-400 text-sm">No hidden subcategories</p>
                ) : (
                  <ul className="space-y-2">
                    {hiddenSubcategories.map((h) => (
                      <li key={h.uuid} className="flex items-center justify-between gap-3 py-2 border-b border-slate-700/50 last:border-0">
                        <span className="text-white">{subcategoryByUuid.get(h.subcategory_uuid)?.name ?? h.subcategory_uuid}</span>
                        <button type="button" onClick={() => deleteHiddenSubcategory.mutate(h.uuid)} disabled={deleteHiddenSubcategory.isPending} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                          Show
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
