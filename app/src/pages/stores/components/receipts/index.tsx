import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Plus, Package } from "lucide-react";
import { useExpenseReceipts } from "../../../../features/receipts/expense-receipt/hooks/use-expense-receipt";
import { ReceiptCard } from "./ReceiptCard";
import { ReceiptsLoading } from "./ReceiptsLoading";
import { ReceiptsFilters, type ReceiptsFiltersValue } from "./ReceiptsFilters";
import { CreateReceiptModal } from "./create-receipt/CreateReceiptModal";
import { ProductsModal } from "../products/ProductsModal";
import { Pagination } from "../../../../components/ui/Pagination";

const DEFAULT_FILTERS: ReceiptsFiltersValue = {};
const RECEIPTS_PAGE_SIZE = 20;

export function ReceiptsSection() {
  const { uuid } = useParams<{ uuid: string }>();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [filters, setFilters] = useState<ReceiptsFiltersValue>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();

  const highlightedReceiptUuid = searchParams.get("receipt") || undefined;

  const receiptParams = useMemo(() => {
    const params: { store_uuid?: string; date_from?: string; date_to?: string; page: number; limit: number } = {
      page,
      limit: RECEIPTS_PAGE_SIZE,
    };
    const storeUuid = uuid ?? filters.store_uuid;
    if (storeUuid) params.store_uuid = storeUuid;
    if (filters.date_from) params.date_from = filters.date_from;
    if (filters.date_to) params.date_to = filters.date_to;
    return params;
  }, [uuid, filters.store_uuid, filters.date_from, filters.date_to, page]);

  const { data: response, isLoading } = useExpenseReceipts(receiptParams);

  const receipts = response?.data ?? [];
  const pagination = response?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  useEffect(() => {
    setPage(1);
  }, [uuid, filters.store_uuid, filters.date_from, filters.date_to]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <ReceiptsFilters value={filters} onChange={setFilters} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={() => setIsProductsOpen(true)} className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors border border-slate-700 text-sm">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Products</span>
          </button>
          <button type="button" onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Receipt</span>
          </button>
        </div>
      </header>

      {isLoading ? (
        <ReceiptsLoading />
      ) : receipts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-slate-500">No receipts match the filters.</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {receipts.map((receipt) => (
              <ReceiptCard key={receipt.uuid} receipt={receipt} highlightedReceiptUuid={highlightedReceiptUuid} />
            ))}
          </div>
          {totalPages > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={pagination?.total}
              pageSize={pagination?.limit}
            />
          )}
        </>
      )}

      <CreateReceiptModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} storeUuid={uuid} />

      <ProductsModal isOpen={isProductsOpen} onClose={() => setIsProductsOpen(false)} />
    </div>
  );
}
