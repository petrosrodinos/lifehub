import { useCallback, useState } from "react";
import { Briefcase } from "lucide-react";
import { useExpenseAccounts } from "../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import type { ExpenseAccount } from "../../features/expenses/expense-accounts/interfaces/expense-accounts.interfaces";
import type { ExpenseEntryType } from "../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { AccountFilters } from "../expenses/analytics/components/account-overview/AccountFilters";
import { AccountStatsCards } from "../expenses/analytics/components/account-overview/AccountStatsCards";
import { TransactionsListSection } from "../expenses/transactions/components/TransactionsListSection";
import { VatLiabilityCard } from "./components/VatLiabilityCard";

export function BusinessPage() {
  const { data: accountsData } = useExpenseAccounts();
  const accounts = accountsData || [];
  const accountsFilter = useCallback((account: ExpenseAccount) => account.is_professional === true, []);
  const hasProfessionalAccounts = accounts.some((account) => account.is_professional);

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState<ExpenseEntryType | "">("");
  const [categoryUuid, setCategoryUuid] = useState("");
  const [subcategoryUuid, setSubcategoryUuid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (setter: (v: any) => void) => (v: any) => {
    setter(v);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)] -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
        <header className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-violet-600/20 border border-violet-600/30 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">Business</h1>
            <p className="text-sm text-slate-500">Professional accounts, transactions and VAT liability</p>
          </div>
        </header>

        {!hasProfessionalAccounts ? (
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-8 text-center">
            <p className="text-slate-300 font-medium">No professional accounts yet</p>
            <p className="text-sm text-slate-500 mt-1">
              Mark an account as "Professional / Business account" from the Expenses page to see it here.
            </p>
          </div>
        ) : (
          <>
            <AccountFilters
              accountsFilter={accountsFilter}
              selectedAccounts={selectedAccounts}
              onAccountsChange={handleFilterChange(setSelectedAccounts)}
              fromDate={fromDate}
              onFromDateChange={handleFilterChange(setFromDate)}
              toDate={toDate}
              onToDateChange={handleFilterChange(setToDate)}
              type={type}
              onTypeChange={handleFilterChange(setType)}
              categoryUuid={categoryUuid}
              onCategoryChange={handleFilterChange(setCategoryUuid)}
              subcategoryUuid={subcategoryUuid}
              onSubcategoryChange={handleFilterChange(setSubcategoryUuid)}
            />

            <AccountStatsCards
              accountsFilter={accountsFilter}
              selectedAccounts={selectedAccounts}
              setSelectedAccounts={setSelectedAccounts}
              fromDate={fromDate}
              toDate={toDate}
            />

            <VatLiabilityCard />

            <TransactionsListSection
              selectedAccounts={selectedAccounts}
              fromDate={fromDate}
              toDate={toDate}
              type={type}
              categoryUuid={categoryUuid}
              subcategoryUuid={subcategoryUuid}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              showQuickStats={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
