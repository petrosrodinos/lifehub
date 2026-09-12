import { useState } from "react";
import { useVatLiability } from "../../../features/expenses/expense-entries/hooks/use-expense-entries";
import { getLocalMonthQueryParams } from "../../../features/expenses/expense-entries/utils/month-query-params.helper";
import { MonthPicker } from "../../../components/ui/MonthPicker";
import { formatCurrency } from "../../../utils/format-currency.utils";

export function VatLiabilityCard() {
  const initial = getLocalMonthQueryParams();
  const [year, setYear] = useState(initial.year);
  const [month, setMonth] = useState(initial.month);

  const { data, isLoading } = useVatLiability({ year, month });

  const vatToPay = data?.vatToPay ?? 0;
  const isOwed = vatToPay > 0;

  const handleChange = (nextYear: number, nextMonth: number) => {
    setYear(nextYear);
    setMonth(nextMonth);
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">VAT to pay</p>
        <MonthPicker year={year} month={month} onChange={handleChange} disabled={isLoading} />
      </div>

      {isLoading ? (
        <div className="h-8 w-32 bg-slate-800/50 rounded-lg animate-pulse" />
      ) : (
        <>
          <p className={`text-2xl font-bold ${isOwed ? "text-red-400" : "text-emerald-400"}`}>
            {formatCurrency(Math.abs(vatToPay))}
          </p>
          <div className="flex flex-wrap justify-between gap-2 text-sm text-slate-400">
            <span>Collected on income: {formatCurrency(data?.vatCollected ?? 0)}</span>
            <span>Paid on expenses: {formatCurrency(data?.vatPaid ?? 0)}</span>
          </div>
        </>
      )}
    </div>
  );
}
