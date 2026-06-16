import type { ExpenseBySubcategoryData } from "../../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { formatCurrency } from "../../../../../utils/format-currency.utils";

type ExpensesBySubcategoryTableProps = {
  data: ExpenseBySubcategoryData[];
};

export function ExpensesBySubcategoryTable({ data }: ExpensesBySubcategoryTableProps) {
  if (data.length === 0) {
    return null;
  }

  const totalExpenses = data.reduce((sum, item) => sum + item.total, 0);
  const totalTransactions = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Expense Breakdown by Subcategory</h3>
        <div className="text-sm text-slate-400">{totalTransactions} transactions</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-400">Subcategory</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-400">Category</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-slate-400">Amount</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-slate-400">Count</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-slate-400">%</th>
              <th className="text-right py-3 px-2 text-sm font-medium text-slate-400">Avg</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, _) => (
              <tr key={item.subcategoryUuid} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-2 text-sm text-white font-medium">{item.subcategoryName}</td>
                <td className="py-3 px-2 text-sm text-slate-400">{item.categoryName}</td>
                <td className="py-3 px-2 text-sm text-white text-right font-mono">{formatCurrency(item.total)}</td>
                <td className="py-3 px-2 text-sm text-slate-400 text-right">{item.count}</td>
                <td className="py-3 px-2 text-sm text-slate-400 text-right">{item.percentage.toFixed(1)}%</td>
                <td className="py-3 px-2 text-sm text-slate-400 text-right font-mono">{formatCurrency(item.total / item.count)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-700">
              <td colSpan={2} className="py-3 px-2 text-sm font-semibold text-white">
                Total
              </td>
              <td className="py-3 px-2 text-sm font-semibold text-white text-right font-mono">{formatCurrency(totalExpenses)}</td>
              <td className="py-3 px-2 text-sm font-semibold text-white text-right">{totalTransactions}</td>
              <td className="py-3 px-2 text-sm font-semibold text-white text-right">100%</td>
              <td className="py-3 px-2 text-sm font-semibold text-white text-right font-mono">{formatCurrency(totalExpenses / totalTransactions)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
