import { usePriceEvolutionFilters } from "../../../hooks/use-price-evolution-filters"
import { PriceEvolutionChart } from "./PriceEvolutionChart"
import { PriceEvolutionFilters } from "./PriceEvolutionFilters"
import { PriceEvolutionLoading } from "./PriceEvolutionLoading"

export function AnalyticsSection() {
  const {
    selectedProductUuid,
    fromDate,
    toDate,
    products,
    isProductsLoading,
    priceData,
    isPriceLoading,
    handleProductChange,
    handleFromDateChange,
    handleToDateChange,
    handleClearDates,
  } = usePriceEvolutionFilters()

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-1">
          Price Evolution
        </h3>

        <p className="text-sm text-slate-400 mb-6">
          Track how product prices change over time across your receipts
        </p>

        <PriceEvolutionFilters
          products={products ?? []}
          isProductsLoading={isProductsLoading}
          selectedProductUuid={selectedProductUuid}
          fromDate={fromDate}
          toDate={toDate}
          onProductChange={handleProductChange}
          onFromDateChange={handleFromDateChange}
          onToDateChange={handleToDateChange}
          onClearDates={handleClearDates}
        />

        {isPriceLoading && <PriceEvolutionLoading />}

        {!isPriceLoading && selectedProductUuid && (
          <PriceEvolutionChart data={priceData ?? []} />
        )}

        {!selectedProductUuid && (
          <div className="flex items-center justify-center h-64 text-slate-500">
            Select a product to view its price evolution
          </div>
        )}
      </div>
    </div>
  )
}
