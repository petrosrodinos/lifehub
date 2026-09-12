import type { ProductPurchase } from "../../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { formatCurrency } from "../../../../utils/format-currency.utils";
import { formatDate, STATUS_BADGE_CLASSES, STATUS_LABELS } from "../../utils/product-consumption.utils";

type PurchaseHistoryTableProps = {
  purchases: ProductPurchase[];
};

export function PurchaseHistoryTable({ purchases }: PurchaseHistoryTableProps) {
  if (purchases.length === 0) {
    return <p className="text-sm text-slate-500">No purchases yet.</p>;
  }

  const sorted = [...purchases].sort((a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime());

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900/60">
            <th className="text-left font-medium text-slate-400 px-4 py-3">Purchase</th>
            <th className="text-left font-medium text-slate-400 px-4 py-3">Price</th>
            <th className="text-left font-medium text-slate-400 px-4 py-3">Started</th>
            <th className="text-left font-medium text-slate-400 px-4 py-3">Finished</th>
            <th className="text-left font-medium text-slate-400 px-4 py-3">Lifespan</th>
            <th className="text-left font-medium text-slate-400 px-4 py-3">Cost / day</th>
            <th className="text-left font-medium text-slate-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p, index) => (
            <tr key={p.uuid} className="border-t border-slate-800/50">
              <td className="px-4 py-3 text-slate-400">#{sorted.length - index}</td>
              <td className="px-4 py-3 text-white font-medium">{formatCurrency(p.purchase_price)}</td>
              <td className="px-4 py-3 text-slate-300">{formatDate(p.start_date)}</td>
              <td className="px-4 py-3 text-slate-300">{formatDate(p.actual_finish_date)}</td>
              <td className="px-4 py-3 text-slate-300">{p.actual_lifespan_days !== null ? `${p.actual_lifespan_days} days` : "—"}</td>
              <td className="px-4 py-3 text-white font-medium">
                {p.cost_per_day !== null ? (
                  <>
                    {p.cost_per_day_is_provisional && "~"}
                    {formatCurrency(p.cost_per_day)}
                  </>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_BADGE_CLASSES[p.status]}`}>{STATUS_LABELS[p.status]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
