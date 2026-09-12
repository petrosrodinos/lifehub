import { useCallback, useState } from "react";
import { Briefcase } from "lucide-react";
import { useExpenseAccounts } from "../../features/expenses/expense-accounts/hooks/use-expense-accounts";
import type { ExpenseAccount } from "../../features/expenses/expense-accounts/interfaces/expense-accounts.interfaces";
import type { ExpenseEntryType } from "../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { getLocalMonthQueryParams } from "../../features/expenses/expense-entries/utils/month-query-params.helper";
import { MonthPicker } from "../../components/ui/MonthPicker";
import { AccountFilters } from "../expenses/analytics/components/account-overview/AccountFilters";
import { AccountStatsCards } from "../expenses/analytics/components/account-overview/AccountStatsCards";
import { TransactionsListSection } from "../expenses/transactions/components/TransactionsListSection";
import { VatLiabilityCard } from "./components/VatLiabilityCard";

const pad = (value: number) => String(value).padStart(2, "0");

function getMonthDateRange(year: number, month: number) {
  const daysInMonth = new Date(year, month, 0).getDate();

  return {
    from: `${year}-${pad(month)}-01`,
    to: `${year}-${pad(month)}-${pad(daysInMonth)}T23:59:59.999Z`,
  };
}

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

  const initialMonth = getLocalMonthQueryParams();
  const [vatYear, setVatYear] = useState(initialMonth.year);
  const [vatMonth, setVatMonth] = useState(initialMonth.month);
  const vatDateRange = getMonthDateRange(vatYear, vatMonth);

  const handleVatMonthChange = (nextYear: number, nextMonth: number) => {
    setVatYear(nextYear);
    setVatMonth(nextMonth);
    setCurrentPage(1);
  };

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

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">VAT</h2>
              <MonthPicker year={vatYear} month={vatMonth} onChange={handleVatMonthChange} />
            </div>

            <VatLiabilityCard year={vatYear} month={vatMonth} />

            <h2 className="text-lg font-semibold text-white">VAT Transactions</h2>

            <TransactionsListSection
              selectedAccounts={[]}
              fromDate={vatDateRange.from}
              toDate={vatDateRange.to}
              type={type}
              categoryUuid={categoryUuid}
              subcategoryUuid={subcategoryUuid}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              showQuickStats={false}
              hasVatOnly
            />
          </>
        )}
      </div>
    </div>
  );
}
