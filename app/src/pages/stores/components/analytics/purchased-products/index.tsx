import { usePurchasedProductsFilters } from "../../../hooks/use-purchased-products-filters"
import { PurchasedProductsChart } from "./PurchasedProductsChart"
import { PurchasedProductsFilters } from "./PurchasedProductsFilters"
import { PurchasedProductsLoading } from "./PurchasedProductsLoading"

export function PurchasedProductsSection() {
  const {
    selectedStoreUuid,
    fromDate,
    toDate,
    stores,
    isStoresLoading,
    productsData,
    isProductsLoading,
    handleStoreChange,
    handleFromDateChange,
    handleToDateChange,
    handleClearFilters,
  } = usePurchasedProductsFilters()

  const hasFilters = selectedStoreUuid || fromDate || toDate

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-1">
        Purchased Products
      </h3>

      <p className="text-sm text-slate-400 mb-6">
        See which products you purchase most frequently
      </p>

      <PurchasedProductsFilters
        stores={stores ?? []}
        isStoresLoading={isStoresLoading}
        selectedStoreUuid={selectedStoreUuid}
        fromDate={fromDate}
        toDate={toDate}
        hasFilters={!!hasFilters}
        onStoreChange={handleStoreChange}
        onFromDateChange={handleFromDateChange}
        onToDateChange={handleToDateChange}
        onClearFilters={handleClearFilters}
      />

      {isProductsLoading && <PurchasedProductsLoading />}

      {!isProductsLoading && (
        <PurchasedProductsChart data={productsData ?? []} />
      )}
    </div>
  )
}
