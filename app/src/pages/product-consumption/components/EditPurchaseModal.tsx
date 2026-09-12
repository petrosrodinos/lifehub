import { useEffect, useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { useUpdateProductPurchase } from "../../../features/product-consumption/product-purchases/hooks/use-product-purchases";
import { ProductTrackingMethods, type ProductPurchase, type ProductTrackingMethod } from "../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";

const inputClasses = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all";
const labelClasses = "block text-sm font-semibold text-slate-300";

type EditPurchaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  purchase: ProductPurchase;
};

const toDateInputValue = (value?: string | null) => (value ? value.split("T")[0] : "");

export function EditPurchaseModal({ isOpen, onClose, purchase }: EditPurchaseModalProps) {
  const updatePurchase = useUpdateProductPurchase();

  const [purchasePrice, setPurchasePrice] = useState(String(purchase.purchase_price));
  const [purchaseDate, setPurchaseDate] = useState(toDateInputValue(purchase.purchase_date));
  const [trackingMethod, setTrackingMethod] = useState<ProductTrackingMethod>(purchase.tracking_method);
  const [startDate, setStartDate] = useState(toDateInputValue(purchase.start_date));
  const [actualFinishDate, setActualFinishDate] = useState(toDateInputValue(purchase.actual_finish_date));
  const [totalUnits, setTotalUnits] = useState(purchase.total_units !== null && purchase.total_units !== undefined ? String(purchase.total_units) : "");
  const [unitLabel, setUnitLabel] = useState(purchase.unit_label ?? "");
  const [consumptionAmount, setConsumptionAmount] = useState(purchase.consumption_amount !== null && purchase.consumption_amount !== undefined ? String(purchase.consumption_amount) : "");
  const [consumptionPeriodDays, setConsumptionPeriodDays] = useState(purchase.consumption_period_days ? String(purchase.consumption_period_days) : "1");
  const [notes, setNotes] = useState(purchase.notes ?? "");

  useEffect(() => {
    if (!isOpen) return;

    setPurchasePrice(String(purchase.purchase_price));
    setPurchaseDate(toDateInputValue(purchase.purchase_date));
    setTrackingMethod(purchase.tracking_method);
    setStartDate(toDateInputValue(purchase.start_date));
    setActualFinishDate(toDateInputValue(purchase.actual_finish_date));
    setTotalUnits(purchase.total_units !== null && purchase.total_units !== undefined ? String(purchase.total_units) : "");
    setUnitLabel(purchase.unit_label ?? "");
    setConsumptionAmount(purchase.consumption_amount !== null && purchase.consumption_amount !== undefined ? String(purchase.consumption_amount) : "");
    setConsumptionPeriodDays(purchase.consumption_period_days ? String(purchase.consumption_period_days) : "1");
    setNotes(purchase.notes ?? "");
  }, [isOpen, purchase]);

  const isValid = !!purchasePrice && parseFloat(purchasePrice) >= 0 && !!purchaseDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePurchase.mutate(
      {
        uuid: purchase.uuid,
        data: {
          purchase_price: purchasePrice ? parseFloat(purchasePrice) : undefined,
          purchase_date: purchaseDate ? new Date(purchaseDate).toISOString() : undefined,
          tracking_method: trackingMethod,
          start_date: startDate ? new Date(startDate).toISOString() : undefined,
          actual_finish_date: actualFinishDate ? new Date(actualFinishDate).toISOString() : null,
          total_units: trackingMethod === ProductTrackingMethods.QUANTITY_DOSE && totalUnits ? parseFloat(totalUnits) : undefined,
          unit_label: trackingMethod === ProductTrackingMethods.QUANTITY_DOSE ? unitLabel.trim() || undefined : undefined,
          consumption_amount: trackingMethod === ProductTrackingMethods.QUANTITY_DOSE && consumptionAmount ? parseFloat(consumptionAmount) : undefined,
          consumption_period_days: trackingMethod === ProductTrackingMethods.QUANTITY_DOSE && consumptionPeriodDays ? parseInt(consumptionPeriodDays, 10) : undefined,
          notes: notes.trim() || undefined,
        },
      },
      { onSuccess: onClose },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Purchase" size="lg" scrollable>
      <form onSubmit={handleSubmit} className="space-y-4">
        {purchase.expense_entry_uuid && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-xs text-slate-400">Changing the price or date here will also update the linked expense.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className={labelClasses}>Purchase price</label>
            <input type="number" step="0.01" min="0" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className={inputClasses} disabled={updatePurchase.isPending} required />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Purchase date</label>
            <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className={inputClasses} disabled={updatePurchase.isPending} required />
          </div>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className={labelClasses}>Start date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClasses} disabled={updatePurchase.isPending} />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>
              Finish date <span className="text-slate-500 font-normal">(opt., leave blank if still in use)</span>
            </label>
            <input type="date" value={actualFinishDate} onChange={(e) => setActualFinishDate(e.target.value)} className={inputClasses} disabled={updatePurchase.isPending} />
          </div>
        </div>

        {trackingMethod === ProductTrackingMethods.QUANTITY_DOSE && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-2">
              <label className={labelClasses}>Total units</label>
              <input type="number" step="0.01" min="0" value={totalUnits} onChange={(e) => setTotalUnits(e.target.value)} placeholder="100" className={inputClasses} disabled={updatePurchase.isPending} />
            </div>
            <div className="space-y-2">
              <label className={labelClasses}>Unit</label>
              <input type="text" value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} placeholder="pills" className={inputClasses} disabled={updatePurchase.isPending} />
            </div>
            <div className="space-y-2">
              <label className={labelClasses}>Amount / period</label>
              <input type="number" step="0.01" min="0" value={consumptionAmount} onChange={(e) => setConsumptionAmount(e.target.value)} placeholder="2" className={inputClasses} disabled={updatePurchase.isPending} />
            </div>
            <div className="space-y-2">
              <label className={labelClasses}>Period (days)</label>
              <input type="number" step="1" min="1" value={consumptionPeriodDays} onChange={(e) => setConsumptionPeriodDays(e.target.value)} className={inputClasses} disabled={updatePurchase.isPending} />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className={labelClasses}>
            Notes <span className="text-slate-500 font-normal">(opt.)</span>
          </label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={inputClasses} disabled={updatePurchase.isPending} />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={updatePurchase.isPending || !isValid} className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {updatePurchase.isPending ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={onClose} disabled={updatePurchase.isPending} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
