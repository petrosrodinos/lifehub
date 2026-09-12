import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import type { ProductPurchase } from "../../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { Routes } from "../../../../routes/routes";
import { formatCurrency } from "../../../../utils/format-currency.utils";
import { STATUS_BADGE_CLASSES, STATUS_LABELS } from "../../utils/product-consumption.utils";

type ProductCardProps = {
  purchase: ProductPurchase;
};

export function ProductCard({ purchase }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(Routes.productConsumption.detail(purchase.product_uuid))}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(Routes.productConsumption.detail(purchase.product_uuid));
        }
      }}
      className="w-full text-left bg-slate-900/40 hover:bg-slate-900/60 border border-slate-800/50 hover:border-violet-500/40 rounded-lg p-4 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-slate-800/50 rounded-lg shrink-0">
          <Package className="w-4 h-4 text-violet-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-white truncate">{purchase.product?.name ?? "Product"}</p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${STATUS_BADGE_CLASSES[purchase.status]}`}>{STATUS_LABELS[purchase.status]}</span>
          </div>
          <p className="text-xs text-slate-400 truncate">{purchase.product?.category?.name ?? "Uncategorized"}</p>
        </div>

        <div className="text-right shrink-0">
          {purchase.cost_per_day !== null ? (
            <>
              <p className="text-sm font-semibold text-white">
                {purchase.cost_per_day_is_provisional && "~"}
                {formatCurrency(purchase.cost_per_day)}/day
              </p>
              <p className="text-xs text-slate-400">{formatCurrency(purchase.cost_per_month ?? 0)}/mo</p>
            </>
          ) : (
            <p className="text-xs text-slate-500">No cost yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
