import { useEffect } from "react";
import { useExpenseAccounts } from "../../../../../features/expense-accounts/hooks/use-expense-accounts";
import { useStats } from "../../../../../features/expense-entries/hooks/use-expense-entries";
import { StatsCard } from "./StatsCard";
import { StatsCardSkeleton } from "./StatsCardSkeleton";

type AccountStatsCardsProps = {
  selectedAccounts: string[];
  setSelectedAccounts: (accounts: string[]) => void;
  fromDate: string;
  toDate: string;
};

export function AccountStatsCards({ selectedAccounts, setSelectedAccounts, fromDate, toDate }: AccountStatsCardsProps) {
  const { data: accountsData } = useExpenseAccounts();
  const accounts = accountsData || [];

  useEffect(() => {
    if (accounts.length > 0 && selectedAccounts.length === 0) {
      setSelectedAccounts(accounts.map((account) => account.uuid));
    }
  }, [accounts, selectedAccounts.length, setSelectedAccounts]);

  const analyticsParams = {
    account_uuids: selectedAccounts.join(","),
    from_date: fromDate,
    to_date: toDate,
  };

  const { data: stats, isLoading: isLoadingStats } = useStats(analyticsParams);

  return (
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
  );
}
