import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import { useProductSummary } from "../../../features/product-consumption/product-purchases/hooks/use-product-purchases";
import { ProductPurchaseStatuses } from "../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";
import { formatCurrency } from "../../../utils/format-currency.utils";
import { CurrentCycleCard } from "./components/CurrentCycleCard";
import { PurchaseHistoryTable } from "./components/PurchaseHistoryTable";
import { PurchaseModal } from "../components/PurchaseModal";
import { EditProductModal } from "../components/EditProductModal";

export function ProductDetailPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useProductSummary(uuid || "");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <div className="h-8 w-48 rounded bg-slate-900/40 animate-pulse" />
        <div className="h-40 rounded-xl border border-slate-800/50 bg-slate-900/40 animate-pulse" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-slate-400">Product not found.</p>
      </div>
    );
  }

  const activePurchase = data.purchases.find((p) => p.status === ProductPurchaseStatuses.ACTIVE) ?? data.current_purchase;

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)] -z-10" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{data.product.name}</h1>
              <p className="text-sm text-slate-400 mt-1">
                {data.product.category?.name ?? "Uncategorized"}
                {data.product.brand ? ` · ${data.product.brand}` : ""}
              </p>
            </div>
            <button type="button" onClick={() => setIsEditProductModalOpen(true)} className="p-1.5 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-md transition-colors shrink-0" aria-label="Edit product">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <button type="button" onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors shrink-0">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Purchase</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Lifetime spend</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(data.lifetime_spend)}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Avg. purchase price</p>
            <p className="text-sm font-semibold text-white">{formatCurrency(data.average_purchase_price)}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Avg. lifespan</p>
            <p className="text-sm font-semibold text-white">{data.average_lifespan_days !== null ? `${Math.round(data.average_lifespan_days)}d` : "—"}</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-lg px-4 py-3">
            <p className="text-xs text-slate-400 mb-1">Repurchase interval</p>
            <p className="text-sm font-semibold text-white">{data.repurchase_interval_days !== null ? `${Math.round(data.repurchase_interval_days)}d` : "—"}</p>
          </div>
        </div>

        {activePurchase && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-300">Current Cycle</h2>
            <CurrentCycleCard purchase={activePurchase} />
          </div>
        )}

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-300">Purchase History</h2>
          <PurchaseHistoryTable purchases={data.purchases} />
        </div>
      </div>

      <PurchaseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} lockedProductUuid={data.product.uuid} lockedProductName={data.product.name} />
      <EditProductModal isOpen={isEditProductModalOpen} onClose={() => setIsEditProductModalOpen(false)} product={data.product} />
    </div>
  );
}
