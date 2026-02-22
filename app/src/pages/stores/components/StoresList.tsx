import { useExpenseStores } from "../../../features/expenses/expense-store/hooks/use-expense-store"
import { StoreCard } from "./StoreCard"
import { StoresLoading } from "./StoresLoading"

export function StoresList() {
  const { data: stores = [], isLoading } = useExpenseStores()

  if (isLoading) {
    return <StoresLoading />
  }

  if (stores.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-slate-500">No stores yet. Create your first store to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {stores.map((store) => (
        <StoreCard key={store.uuid} store={store} />
      ))}
    </div>
  )
}
