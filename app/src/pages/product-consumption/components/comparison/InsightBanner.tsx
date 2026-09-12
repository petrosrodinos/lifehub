import { Sparkles } from "lucide-react";
import type { ComparisonEntry, ComparisonInsight } from "../../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { formatCurrency } from "../../../../utils/format-currency.utils";

type InsightBannerProps = {
  insight: ComparisonInsight;
  entries: ComparisonEntry[];
};

export function InsightBanner({ insight, entries }: InsightBannerProps) {
  const cheaper = entries.find((e) => e.product.uuid === insight.cheaper_product_uuid);
  const pricier = entries.find((e) => e.product.uuid === insight.pricier_product_uuid);

  if (!cheaper || !pricier) {
    return null;
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3">
      <Sparkles className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
      <p className="text-sm text-slate-200">
        <span className="font-semibold text-white">{cheaper.product.name}</span> costs <span className="font-semibold text-violet-300">{insight.percent_cheaper_per_day}% less per day</span> despite costing{" "}
        <span className="font-semibold text-white">{formatCurrency(insight.price_difference)}</span> more upfront than {pricier.product.name}.
      </p>
    </div>
  );
}
