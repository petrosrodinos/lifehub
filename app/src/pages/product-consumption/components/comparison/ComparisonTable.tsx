import type { ComparisonEntry } from "../../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { formatCurrency } from "../../../../utils/format-currency.utils";

type ComparisonTableProps = {
  entries: ComparisonEntry[];
};

const ROWS: { label: string; render: (e: ComparisonEntry) => string }[] = [
  { label: "Latest price", render: (e) => (e.latest_purchase_price !== null ? formatCurrency(e.latest_purchase_price) : "—") },
  { label: "Avg. cost / day", render: (e) => (e.average_cost_per_day !== null ? formatCurrency(e.average_cost_per_day) : "—") },
  { label: "Avg. cost / month", render: (e) => (e.average_cost_per_day !== null ? formatCurrency(e.average_cost_per_day * 30) : "—") },
  { label: "Avg. cost / year", render: (e) => (e.average_cost_per_day !== null ? formatCurrency(e.average_cost_per_day * 365) : "—") },
  { label: "Avg. lifespan", render: (e) => (e.average_lifespan_days !== null ? `${Math.round(e.average_lifespan_days)} days` : "—") },
  { label: "Purchases", render: (e) => String(e.purchase_count) },
];

export function ComparisonTable({ entries }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900/60">
            <th className="text-left font-medium text-slate-400 px-4 py-3">Metric</th>
            {entries.map((e) => (
              <th key={e.product.uuid} className="text-left font-medium text-white px-4 py-3">
                {e.product.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-t border-slate-800/50">
              <td className="px-4 py-3 text-slate-400">{row.label}</td>
              {entries.map((e) => (
                <td key={e.product.uuid} className="px-4 py-3 text-white font-medium">
                  {row.render(e)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
