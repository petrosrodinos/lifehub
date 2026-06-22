import { useMonthlyBudgetProgress } from '../../../../features/expenses/expense-entries/hooks/use-expense-entries';
import { useAuthStore } from '../../../../store/auth-store';
import { getMonthlyBudgetProgressDisplay } from '../../utils/monthly-budget-progress.helper';

export function MonthlyBudgetProgress() {
  const { data, isLoading } = useMonthlyBudgetProgress();
  const showAccountBalances = useAuthStore((state) => state.showAccountBalances);

  if (isLoading) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 space-y-4">
        <div className="h-5 w-40 bg-slate-800/50 rounded animate-pulse" />
        <div className="h-2 w-full bg-slate-800/50 rounded-full animate-pulse" />
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-slate-800/50 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-800/50 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const totalIncome = data?.totalIncome ?? 0;
  const totalExpense = data?.totalExpense ?? 0;
  const progressPercentage = data?.progressPercentage ?? 0;
  const display = getMonthlyBudgetProgressDisplay({ totalIncome, totalExpense, progressPercentage });
  const hasIncome = totalIncome > 0;

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">This month</p>
          <p className="text-lg font-semibold text-white">Spending vs income</p>
        </div>
        {hasIncome && showAccountBalances && (
          <p className={`text-sm font-medium tabular-nums ${display.isOverBudget ? 'text-red-400' : 'text-emerald-400'}`}>
            {display.isOverBudget ? `+${display.overBudgetLabel} over` : `${display.remainingLabel} left`}
          </p>
        )}
      </div>

      {!hasIncome ? (
        <p className="text-sm text-slate-500">No income recorded this month yet.</p>
      ) : (
        <>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                display.isOverBudget
                  ? 'bg-gradient-to-r from-red-500 to-red-400'
                  : 'bg-gradient-to-r from-violet-500 to-emerald-400'
              }`}
              style={{ width: `${display.barWidth}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              Spent{' '}
              <span className="text-white font-medium tabular-nums">
                {showAccountBalances ? display.expenseLabel : '••••••'}
              </span>
            </span>
            <span className="text-slate-400">
              of{' '}
              <span className="text-white font-medium tabular-nums">
                {showAccountBalances ? display.incomeLabel : '••••••'}
              </span>
            </span>
          </div>
        </>
      )}

      {hasIncome && !showAccountBalances && (
        <p className="text-xs text-slate-500">{Math.round(progressPercentage)}% of income spent</p>
      )}
    </div>
  );
}
