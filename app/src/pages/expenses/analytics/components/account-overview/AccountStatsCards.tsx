import { useEffect } from "react";
import { useExpenseAccounts } from "../../../../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import type { ExpenseAccount } from "../../../../../features/expenses/expense-accounts/interfaces/expense-accounts.interfaces";
import { useStats } from "../../../../../features/expenses/expense-entries/hooks/use-expense-entries";
import { StatsCard } from "./StatsCard";
import { StatsCardSkeleton } from "./StatsCardSkeleton";

type AccountStatsCardsProps = {
  selectedAccounts: string[];
  setSelectedAccounts: (accounts: string[]) => void;
  fromDate: string;
  toDate: string;
  accountsFilter?: (account: ExpenseAccount) => boolean;
  hasVatOnly?: boolean;
};

export function AccountStatsCards({ selectedAccounts, setSelectedAccounts, fromDate, toDate, accountsFilter, hasVatOnly = false }: AccountStatsCardsProps) {
  const { data: accountsData } = useExpenseAccounts();
  const accounts = (accountsData || []).filter(accountsFilter ?? (() => true));

  useEffect(() => {
    if (accounts.length > 0 && selectedAccounts.length === 0) {
      setSelectedAccounts(accounts.map((account) => account.uuid));
    }
  }, [accounts, selectedAccounts.length, setSelectedAccounts]);

  const analyticsParams = {
    account_uuids: selectedAccounts.join(","),
    from_date: fromDate,
    to_date: toDate,
    ...(hasVatOnly && { has_vat: true }),
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
