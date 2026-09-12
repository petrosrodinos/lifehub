import { useVatLiability } from "../../../features/expenses/expense-entries/hooks/use-expense-entries";
import { formatCurrency } from "../../../utils/format-currency.utils";

type VatLiabilityCardProps = {
  year: number;
  month: number;
};

export function VatLiabilityCard({ year, month }: VatLiabilityCardProps) {
  const { data, isLoading } = useVatLiability({ year, month });

  const vatToPay = data?.vatToPay ?? 0;
  const isOwed = vatToPay > 0;

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 space-y-4">
      <p className="text-sm font-medium text-slate-400">VAT to pay</p>

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
