import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useProductPurchases } from "../../../../features/product-consumption/product-purchases/hooks/use-product-purchases";
import type { ProductPurchase } from "../../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { ProductCard } from "./ProductCard";
import { PurchaseModal } from "../PurchaseModal";

export function ProductsSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data, isLoading } = useProductPurchases({ limit: 100 });

  const rows = useMemo(() => {
    const purchases = data?.data ?? [];
    const latestByProduct = new Map<string, ProductPurchase>();

    purchases.forEach((p) => {
      if (!latestByProduct.has(p.product_uuid)) {
        latestByProduct.set(p.product_uuid, p);
      }
    });

    return Array.from(latestByProduct.values());
  }, [data]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Tracked Products</h2>
        <button type="button" onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 sm:px-4 px-2 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Purchase</span>
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg border border-slate-800/50 bg-slate-900/40 animate-pulse" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 border border-slate-800/50 rounded-lg">
          <p className="text-slate-400">No products tracked yet.</p>
          <p className="text-sm text-slate-500 mt-1">Track usage from an expense, or add a purchase here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((p) => (
            <ProductCard key={p.product_uuid} purchase={p} />
          ))}
        </div>
      )}

      <PurchaseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
