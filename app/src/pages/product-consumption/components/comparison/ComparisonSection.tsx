import { useState } from "react";
import { useCompareProducts } from "../../../../features/product-consumption/product-purchases/hooks/use-product-purchases";
import { ComparisonSelector } from "./ComparisonSelector";
import { ComparisonTable } from "./ComparisonTable";
import { InsightBanner } from "./InsightBanner";

export function ComparisonSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const { data, isLoading } = useCompareProducts(selected);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white">Compare Products</h2>
        <p className="text-sm text-slate-400">Select two or more products to compare their real consumption cost.</p>
        <ComparisonSelector selected={selected} onChange={setSelected} />
      </div>

      {selected.length < 2 ? (
        <p className="text-sm text-slate-500">Select at least 2 products to compare.</p>
      ) : isLoading ? (
        <div className="h-40 rounded-xl border border-slate-800/50 bg-slate-900/40 animate-pulse" />
      ) : data && data.products.length > 0 ? (
        <div className="space-y-4">
          {data.insight && <InsightBanner insight={data.insight} entries={data.products} />}
          <ComparisonTable entries={data.products} />
        </div>
      ) : (
        <p className="text-sm text-slate-500">No purchase data for the selected products yet.</p>
      )}
    </div>
  );
}
