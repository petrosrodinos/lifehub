import { useExpenseStores } from "../../../../features/receipts/expense-store/hooks/use-expense-store";

export type ReceiptsFiltersValue = {
  store_uuid?: string;
  date_from?: string;
  date_to?: string;
};

type ReceiptsFiltersProps = {
  value: ReceiptsFiltersValue;
  onChange: (value: ReceiptsFiltersValue) => void;
};

export function ReceiptsFilters({ value, onChange }: ReceiptsFiltersProps) {
  const { data: stores = [] } = useExpenseStores();

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const store_uuid = e.target.value || undefined;
    onChange({ ...value, store_uuid });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date_from = e.target.value || undefined;
    onChange({ ...value, date_from });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date_to = e.target.value || undefined;
    onChange({ ...value, date_to });
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[140px]">
        <label htmlFor="receipts-filter-store" className="block text-xs font-medium text-slate-400 mb-1">
          Store
        </label>
        <select id="receipts-filter-store" value={value.store_uuid ?? ""} onChange={handleStoreChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent">
          <option value="">All stores</option>
          {stores.map((store) => (
            <option key={store.uuid} value={store.uuid}>
              {store.name}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-[140px]">
        <label htmlFor="receipts-filter-date-from" className="block text-xs font-medium text-slate-400 mb-1">
          From
        </label>
        <input id="receipts-filter-date-from" type="date" value={value.date_from ?? ""} onChange={handleDateFromChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent" />
      </div>
      <div className="min-w-[140px]">
        <label htmlFor="receipts-filter-date-to" className="block text-xs font-medium text-slate-400 mb-1">
          To
        </label>
        <input id="receipts-filter-date-to" type="date" value={value.date_to ?? ""} onChange={handleDateToChange} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent" />
      </div>
    </div>
  );
}
