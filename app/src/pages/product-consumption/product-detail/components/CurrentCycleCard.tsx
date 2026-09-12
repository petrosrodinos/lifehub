import { useState } from "react";
import type { ProductPurchase } from "../../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { ProductPurchaseStatuses } from "../../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { useUpdateProductPurchase } from "../../../../features/product-consumption/product-purchases/hooks/use-product-purchases";
import { formatCurrency } from "../../../../utils/format-currency.utils";
import { formatDate, formatRemainingDays, STATUS_BADGE_CLASSES, STATUS_LABELS } from "../../utils/product-consumption.utils";

type CurrentCycleCardProps = {
  purchase: ProductPurchase;
};

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export function CurrentCycleCard({ purchase }: CurrentCycleCardProps) {
  const updatePurchase = useUpdateProductPurchase();
  const [finishDate, setFinishDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [showFinishInput, setShowFinishInput] = useState(false);

  const isActive = purchase.status === ProductPurchaseStatuses.ACTIVE;

  const handleMarkFinished = () => {
    updatePurchase.mutate({
      uuid: purchase.uuid,
      data: { actual_finish_date: new Date(finishDate).toISOString(), status: ProductPurchaseStatuses.FINISHED },
    });
    setShowFinishInput(false);
  };

  const handleStatusChange = (status: "PAUSED" | "DISCARDED" | "ACTIVE") => {
    updatePurchase.mutate({ uuid: purchase.uuid, data: { status } });
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-800/50 bg-slate-900/30 p-4">
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_BADGE_CLASSES[purchase.status]}`}>{STATUS_LABELS[purchase.status]}</span>

        {isActive && (
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => handleStatusChange("PAUSED")} className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
              Pause
            </button>
            <button type="button" onClick={() => handleStatusChange("DISCARDED")} className="text-xs text-slate-400 hover:text-red-400 transition-colors">
              Discard
            </button>
            <button type="button" onClick={() => setShowFinishInput((v) => !v)} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-lg transition-colors">
              Mark Finished
            </button>
          </div>
        )}

        {purchase.status === ProductPurchaseStatuses.PAUSED && (
          <button type="button" onClick={() => handleStatusChange("ACTIVE")} className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-lg transition-colors">
            Resume
          </button>
        )}
      </div>

      {showFinishInput && (
        <div className="flex items-center gap-2">
          <input type="date" value={finishDate} onChange={(e) => setFinishDate(e.target.value)} className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
          <button type="button" onClick={handleMarkFinished} disabled={updatePurchase.isPending} className="px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
            Confirm
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatTile label="Purchase price" value={formatCurrency(purchase.purchase_price)} />
        <StatTile label="Start date" value={formatDate(purchase.start_date)} />
        {purchase.cost_per_unit !== null && <StatTile label="Cost / unit" value={formatCurrency(purchase.cost_per_unit)} />}
        {purchase.cost_per_use !== null && <StatTile label="Cost / use" value={formatCurrency(purchase.cost_per_use)} />}
        <StatTile label="Cost / day" value={purchase.cost_per_day !== null ? `${purchase.cost_per_day_is_provisional ? "~" : ""}${formatCurrency(purchase.cost_per_day)}` : "—"} />
        <StatTile label="Cost / month" value={purchase.cost_per_month !== null ? formatCurrency(purchase.cost_per_month) : "—"} />
        <StatTile label="Cost / year" value={purchase.cost_per_year !== null ? formatCurrency(purchase.cost_per_year) : "—"} />
        {purchase.expected_lifespan_days !== null && <StatTile label="Expected lifespan" value={`${Math.round(purchase.expected_lifespan_days)} days`} />}
        {purchase.actual_lifespan_days !== null && <StatTile label="Actual lifespan" value={`${purchase.actual_lifespan_days} days`} />}
        {purchase.estimated_finish_date && <StatTile label="Estimated finish" value={formatDate(purchase.estimated_finish_date)} />}
        {isActive && purchase.remaining_days !== null && <StatTile label="Remaining" value={formatRemainingDays(purchase.remaining_days) ?? "—"} />}
      </div>
    </div>
  );
}
