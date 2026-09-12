import { Link } from "react-router-dom";
import { Routes } from "../../../../routes/routes";
import type { ProductPurchase } from "../../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { formatRemainingDays } from "../../utils/product-consumption.utils";

type FinishingSoonListProps = {
  purchases: ProductPurchase[];
};

export function FinishingSoonList({ purchases }: FinishingSoonListProps) {
  if (purchases.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-300">Finishing Soon</h3>
      <div className="space-y-2">
        {purchases.map((p) => (
          <Link
            key={p.uuid}
            to={Routes.productConsumption.detail(p.product_uuid)}
            className="flex items-center justify-between bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-violet-500/40 rounded-lg px-4 py-3 transition-all"
          >
            <span className="text-sm font-medium text-white truncate">{p.product?.name ?? "Product"}</span>
            <span className="text-xs font-semibold text-amber-400 shrink-0 ml-3">{formatRemainingDays(p.remaining_days)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
