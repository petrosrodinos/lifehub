import { useState } from "react";
import { Filter } from "lucide-react";
import { AnalyticsFilters } from "./AnalyticsFilters";

type AccountFiltersProps = {
  selectedAccounts: string[];
  onAccountsChange: (accounts: string[]) => void;
  fromDate: string;
  onFromDateChange: (date: string) => void;
  toDate: string;
  onToDateChange: (date: string) => void;
};

export function AccountFilters({
  selectedAccounts,
  onAccountsChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
}: AccountFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors border border-slate-700"
        >
          <Filter className="w-4 h-4" />
          {isFiltersOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {isFiltersOpen && (
        <AnalyticsFilters
          selectedAccounts={selectedAccounts}
          onAccountsChange={onAccountsChange}
          fromDate={fromDate}
          onFromDateChange={onFromDateChange}
          toDate={toDate}
          onToDateChange={onToDateChange}
        />
      )}
    </div>
  );
}
