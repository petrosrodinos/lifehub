import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { useExpenseAccounts } from "../../../../features/expense-accounts/hooks/use-expense-accounts";
import { useBalanceTrend, useIncomeExpense, useStats } from "../../../../features/expense-entries/hooks/use-expense-entries";
import { AnalyticsFilters } from "./AnalyticsFilters";
import { BalanceTrendChart } from "./BalanceTrendChart";
import { IncomeExpenseChart } from "./IncomeExpenseChart";
import { StatsCard } from "./StatsCard";
import { ChartSkeleton } from "./ChartSkeleton";
import { StatsCardSkeleton } from "./StatsCardSkeleton";

export function AnalyticsSection() {
  const { data: accountsData } = useExpenseAccounts();
  const accounts = accountsData || [];

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (accounts.length > 0 && selectedAccounts.length === 0) {
      setSelectedAccounts(accounts.map((account) => account.uuid));
    }
  }, [accounts, selectedAccounts.length]);

  const analyticsParams = {
    account_uuids: selectedAccounts.join(','),
    from_date: fromDate,
    to_date: toDate,
  };

  const { data: balanceTrendData = [], isLoading: isLoadingBalance } = useBalanceTrend(analyticsParams);
  const { data: incomeExpenseData = [], isLoading: isLoadingIncomeExpense } = useIncomeExpense(analyticsParams);
  const { data: stats, isLoading: isLoadingStats } = useStats(analyticsParams);

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
          onAccountsChange={setSelectedAccounts}
          fromDate={fromDate}
          onFromDateChange={setFromDate}
          toDate={toDate}
          onToDateChange={setToDate}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoadingStats ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <StatsCard label="Total Income" value={stats?.totalIncome || 0} color="green" icon="💰" />
            <StatsCard label="Total Expenses" value={stats?.totalExpense || 0} color="red" icon="💸" />
            <StatsCard label="Net Balance" value={stats?.netBalance || 0} color="violet" icon="📊" />
          </>
        )}
      </div>

      <div className="space-y-6">
        {isLoadingBalance ? (
          <ChartSkeleton />
        ) : (
          <BalanceTrendChart data={balanceTrendData} />
        )}
        
        {isLoadingIncomeExpense ? (
          <ChartSkeleton />
        ) : (
          <IncomeExpenseChart data={incomeExpenseData} />
        )}
      </div>
    </div>
  );
}
