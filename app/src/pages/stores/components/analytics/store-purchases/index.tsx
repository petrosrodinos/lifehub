import { useStorePurchasesFilters } from "../../../hooks/use-store-purchases-filters"
import { StorePurchasesChart } from "./StorePurchasesChart"
import { StorePurchasesFilters } from "./StorePurchasesFilters"
import { StorePurchasesLoading } from "./StorePurchasesLoading"

export function StorePurchasesSection() {
  const {
    fromDate,
    toDate,
    spendingData,
    isSpendingLoading,
    handleFromDateChange,
    handleToDateChange,
    handleClearFilters,
  } = useStorePurchasesFilters()

  const hasFilters = !!fromDate || !!toDate

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-1">
        Total Spending Per Store
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        See how much you spend at each store
      </p>
      <StorePurchasesFilters
        fromDate={fromDate}
        toDate={toDate}
        hasFilters={hasFilters}
        onFromDateChange={handleFromDateChange}
        onToDateChange={handleToDateChange}
        onClearFilters={handleClearFilters}
      />
      {isSpendingLoading && <StorePurchasesLoading />}
      {!isSpendingLoading && (
        <StorePurchasesChart data={spendingData ?? []} />
      )}
    </div>
  )
}
