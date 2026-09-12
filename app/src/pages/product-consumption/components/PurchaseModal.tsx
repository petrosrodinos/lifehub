import { useEffect, useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { useExpenseProducts } from "../../../features/receipts/expense-products/hooks/use-expense-products";
import { ProductSources } from "../../../features/receipts/expense-products/interfaces/expense-products.interfaces";
import { useExpenseAccounts } from "../../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import { useExpenseCategories } from "../../../features/expenses/expense-categories/hooks/use-expense-categories";
import { useExpenseSubcategories } from "../../../features/expenses/expense-subcategories/hooks/use-expense-subcategories";
import { useCreateProductPurchase, useCreateProductPurchaseFromExpense } from "../../../features/product-consumption/product-purchases/hooks/use-product-purchases";
import { ProductTrackingMethods, type ProductTrackingMethod } from "../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import type { ExpenseEntry } from "../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { previewCostPerDay, previewCostPerMonth } from "../../../features/product-consumption/product-purchases/utils/consumption-calculations";
import { formatCurrency } from "../../../utils/format-currency.utils";
import { CreateProductModal } from "./CreateProductModal";
import { Plus } from "lucide-react";

const inputClasses = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all";
const labelClasses = "block text-sm font-semibold text-slate-300";

type PurchaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Provided when tracking usage from an existing expense entry (prefills price/date/category). */
  expenseEntry?: ExpenseEntry;
  /** Provided when adding another purchase cycle to an already-known product. */
  lockedProductUuid?: string;
  lockedProductName?: string;
};

export function PurchaseModal({ isOpen, onClose, expenseEntry, lockedProductUuid, lockedProductName }: PurchaseModalProps) {
  const isFromExpense = !!expenseEntry;

  const { data: products = [] } = useExpenseProducts(ProductSources.CONSUMPTION, !lockedProductUuid);
  const { data: accounts = [] } = useExpenseAccounts();
  const { data: categories = [] } = useExpenseCategories();
  const { data: subcategories = [] } = useExpenseSubcategories();

  const createFromExpense = useCreateProductPurchaseFromExpense();
  const createManual = useCreateProductPurchase();
  const isPending = createFromExpense.isPending || createManual.isPending;

  const [productUuid, setProductUuid] = useState("");
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);

  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [createExpenseToggle, setCreateExpenseToggle] = useState(false);
  const [fromAccountUuid, setFromAccountUuid] = useState("");
  const [categoryUuid, setCategoryUuid] = useState("");
  const [subcategoryUuid, setSubcategoryUuid] = useState("");

  const [trackingMethod, setTrackingMethod] = useState<ProductTrackingMethod>(ProductTrackingMethods.START_FINISH);
  const [startDate, setStartDate] = useState("");
  const [actualFinishDate, setActualFinishDate] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [unitLabel, setUnitLabel] = useState("");
  const [consumptionAmount, setConsumptionAmount] = useState("");
  const [consumptionPeriodDays, setConsumptionPeriodDays] = useState("1");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setProductUuid("");
    setIsCreateProductModalOpen(false);
    setPurchasePrice("");
    setPurchaseDate(new Date().toISOString().split("T")[0]);
    setCreateExpenseToggle(false);
    setFromAccountUuid("");
    setCategoryUuid("");
    setSubcategoryUuid("");
    setTrackingMethod(ProductTrackingMethods.START_FINISH);
    setStartDate("");
    setActualFinishDate("");
    setTotalUnits("");
    setUnitLabel("");
    setConsumptionAmount("");
    setConsumptionPeriodDays("1");
    setNotes("");
  }, [isOpen, lockedProductUuid]);

  const filteredSubcategories = categoryUuid ? subcategories.filter((sub) => sub.category_uuid === categoryUuid) : subcategories;

  const price = isFromExpense ? (expenseEntry ? Number(expenseEntry.amount) : undefined) : purchasePrice ? parseFloat(purchasePrice) : undefined;

  const previewDaily = previewCostPerDay({
    tracking_method: trackingMethod,
    purchase_price: price,
    total_units: totalUnits ? parseFloat(totalUnits) : undefined,
    consumption_amount: consumptionAmount ? parseFloat(consumptionAmount) : undefined,
    consumption_period_days: consumptionPeriodDays ? parseInt(consumptionPeriodDays, 10) : undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const methodFields =
      trackingMethod === ProductTrackingMethods.QUANTITY_DOSE
        ? {
            total_units: totalUnits ? parseFloat(totalUnits) : undefined,
            unit_label: unitLabel.trim() || undefined,
            consumption_amount: consumptionAmount ? parseFloat(consumptionAmount) : undefined,
            consumption_period_days: consumptionPeriodDays ? parseInt(consumptionPeriodDays, 10) : undefined,
          }
        : {};

    const startDateIso = startDate ? new Date(startDate).toISOString() : undefined;
    const actualFinishDateIso = actualFinishDate ? new Date(actualFinishDate).toISOString() : undefined;

    if (isFromExpense && expenseEntry) {
      createFromExpense.mutate(
        {
          expense_entry_uuid: expenseEntry.uuid,
          data: {
            product_uuid: productUuid,
            tracking_method: trackingMethod,
            start_date: startDateIso,
            actual_finish_date: actualFinishDateIso,
            notes: notes.trim() || undefined,
            ...methodFields,
          },
        },
        { onSuccess: onClose },
      );
      return;
    }

    const submitManualPurchase = (product_uuid: string) => {
      createManual.mutate(
        {
          product_uuid,
          purchase_price: parseFloat(purchasePrice),
          purchase_date: purchaseDate ? new Date(purchaseDate).toISOString() : undefined,
          create_expense: createExpenseToggle,
          from_account_uuid: createExpenseToggle ? fromAccountUuid : undefined,
          category_uuid: createExpenseToggle ? categoryUuid || undefined : undefined,
          subcategory_uuid: createExpenseToggle ? subcategoryUuid || undefined : undefined,
          tracking_method: trackingMethod,
          start_date: startDateIso,
          actual_finish_date: actualFinishDateIso,
          notes: notes.trim() || undefined,
          ...methodFields,
        },
        { onSuccess: onClose },
      );
    };

    submitManualPurchase(lockedProductUuid || productUuid);
  };

  const isValid =
    !!(lockedProductUuid || productUuid) &&
    (isFromExpense || (!!purchasePrice && parseFloat(purchasePrice) >= 0 && (!createExpenseToggle || !!fromAccountUuid)));

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Track Product Usage" size="lg" scrollable>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isFromExpense && expenseEntry && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-300">
              <span className="text-slate-400">From expense: </span>
              <span className="font-semibold text-white">{formatCurrency(expenseEntry.amount)}</span>
              <span className="text-slate-400"> on {new Date(expenseEntry.entry_date).toLocaleDateString()}</span>
            </div>
          )}

          {lockedProductUuid ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm">
              <span className="text-slate-400">Product: </span>
              <span className="font-semibold text-white">{lockedProductName}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className={labelClasses}>Product</label>
                <button
                  type="button"
                  onClick={() => setIsCreateProductModalOpen(true)}
                  disabled={isPending}
                  className="flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Product
                </button>
              </div>
              <select value={productUuid} onChange={(e) => setProductUuid(e.target.value)} className={inputClasses} disabled={isPending} required>
                <option value="">Select a product</option>
                {products.map((p) => (
                  <option key={p.uuid} value={p.uuid}>
                    {p.name}
                    {p.brand ? ` (${p.brand})` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!isFromExpense && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className={labelClasses}>Purchase price</label>
                  <input type="number" step="0.01" min="0" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="50.00" className={inputClasses} disabled={isPending} required />
                </div>
                <div className="space-y-2">
                  <label className={labelClasses}>Purchase date</label>
                  <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className={inputClasses} disabled={isPending} />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={createExpenseToggle} onChange={(e) => setCreateExpenseToggle(e.target.checked)} disabled={isPending} className="rounded border-slate-700 bg-slate-800 text-violet-600 focus:ring-violet-500/50" />
                Also record this as an expense
              </label>

              {createExpenseToggle && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-slate-800 bg-slate-900/30 p-3">
                  <div className="space-y-2">
                    <label className={labelClasses}>Account</label>
                    <select value={fromAccountUuid} onChange={(e) => setFromAccountUuid(e.target.value)} className={inputClasses} disabled={isPending} required={createExpenseToggle}>
                      <option value="">Select account</option>
                      {accounts.map((a) => (
                        <option key={a.uuid} value={a.uuid}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      Category <span className="text-slate-500 font-normal">(opt.)</span>
                    </label>
                    <select
                      value={categoryUuid}
                      onChange={(e) => {
                        setCategoryUuid(e.target.value);
                        setSubcategoryUuid("");
                      }}
                      className={inputClasses}
                      disabled={isPending}
                    >
                      <option value="">None</option>
                      {categories.map((cat) => (
                        <option key={cat.uuid} value={cat.uuid}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      Subcategory <span className="text-slate-500 font-normal">(opt.)</span>
                    </label>
                    <select value={subcategoryUuid} onChange={(e) => setSubcategoryUuid(e.target.value)} className={inputClasses} disabled={isPending || !categoryUuid}>
                      <option value="">None</option>
                      {filteredSubcategories.map((sub) => (
                        <option key={sub.uuid} value={sub.uuid}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <label className={labelClasses}>Tracking method</label>
            <div className="flex gap-2 bg-slate-900/50 rounded-xl border border-slate-800/50 p-1">
              <button
                type="button"
                onClick={() => setTrackingMethod(ProductTrackingMethods.START_FINISH)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${trackingMethod === ProductTrackingMethods.START_FINISH ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                Start / Finish
              </button>
              <button
                type="button"
                onClick={() => setTrackingMethod(ProductTrackingMethods.QUANTITY_DOSE)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${trackingMethod === ProductTrackingMethods.QUANTITY_DOSE ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                Quantity / Dose
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>
              Start date <span className="text-slate-500 font-normal">(opt., leave blank if not started yet)</span>
            </label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClasses} disabled={isPending} />
          </div>

          <div className="space-y-2">
            <label className={labelClasses}>
              Finish date <span className="text-slate-500 font-normal">(opt., leave blank if still in use)</span>
            </label>
            <input type="date" value={actualFinishDate} onChange={(e) => setActualFinishDate(e.target.value)} className={inputClasses} disabled={isPending} />
          </div>

          {trackingMethod === ProductTrackingMethods.QUANTITY_DOSE && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-2">
                <label className={labelClasses}>Total units</label>
                <input type="number" step="0.01" min="0" value={totalUnits} onChange={(e) => setTotalUnits(e.target.value)} placeholder="100" className={inputClasses} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label className={labelClasses}>Unit</label>
                <input type="text" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} placeholder="pills" className={inputClasses} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label className={labelClasses}>Amount / period</label>
                <input type="number" step="0.01" min="0" value={consumptionAmount} onChange={(e) => setConsumptionAmount(e.target.value)} placeholder="2" className={inputClasses} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label className={labelClasses}>Period (days)</label>
                <input type="number" step="1" min="1" value={consumptionPeriodDays} onChange={(e) => setConsumptionPeriodDays(e.target.value)} className={inputClasses} disabled={isPending} />
              </div>
            </div>
          )}

          {previewDaily !== null && (
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm">
              <span className="text-violet-300">Estimated cost: </span>
              <span className="font-semibold text-white">{formatCurrency(previewDaily)}/day</span>
              <span className="text-slate-400"> · {formatCurrency(previewCostPerMonth(previewDaily))}/month</span>
            </div>
          )}

          <div className="space-y-2">
            <label className={labelClasses}>
              Notes <span className="text-slate-500 font-normal">(opt.)</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="e.g., switched to twice daily after the first week"
              className={inputClasses}
              disabled={isPending}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isPending || !isValid} className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isPending ? "Saving..." : "Start Tracking"}
            </button>
            <button type="button" onClick={onClose} disabled={isPending} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <CreateProductModal isOpen={isCreateProductModalOpen} onClose={() => setIsCreateProductModalOpen(false)} onCreated={(product) => setProductUuid(product.uuid)} />
    </>
  );
}
