import { useState } from "react";
import { useBalanceTrend, useIncomeExpense } from "../../../../../features/expense-entries/hooks/use-expense-entries";
import { AccountFilters } from "./AccountFilters";
import { AccountStatsCards } from "./AccountStatsCards";
import { BalanceTrendChart } from "./BalanceTrendChart";
import { IncomeExpenseChart } from "./IncomeExpenseChart";
import { ChartSkeleton } from "../ChartSkeleton";

export function AccountOverview() {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const analyticsParams = {
    account_uuids: selectedAccounts.join(","),
    from_date: fromDate,
    to_date: toDate,
  };

  const { data: balanceTrendData = [], isLoading: isLoadingBalance } = useBalanceTrend(analyticsParams);
  const { data: incomeExpenseData = [], isLoading: isLoadingIncomeExpense } = useIncomeExpense(analyticsParams);

  return (
    <div className="space-y-6">
      <AccountFilters
        selectedAccounts={selectedAccounts}
        onAccountsChange={setSelectedAccounts}
        fromDate={fromDate}
        onFromDateChange={setFromDate}
        toDate={toDate}
        onToDateChange={setToDate}
      />

      <AccountStatsCards
        selectedAccounts={selectedAccounts}
        setSelectedAccounts={setSelectedAccounts}
        fromDate={fromDate}
        toDate={toDate}
      />

      {isLoadingBalance ? <ChartSkeleton /> : <BalanceTrendChart data={balanceTrendData} />}

      {isLoadingIncomeExpense ? <ChartSkeleton /> : <IncomeExpenseChart data={incomeExpenseData} />}
    </div>
  );
}
