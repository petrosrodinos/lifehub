import { formatCurrency } from '../../../utils/format-currency.utils';

type MonthlyBudgetProgressDisplayInput = {
  totalIncome: number;
  totalExpense: number;
  progressPercentage: number;
};

export const getMonthlyBudgetProgressDisplay = ({
  totalIncome,
  totalExpense,
  progressPercentage,
}: MonthlyBudgetProgressDisplayInput) => {
  const isOverBudget = totalIncome > 0 && totalExpense > totalIncome;
  const barWidth = totalIncome > 0 ? Math.min(100, progressPercentage) : 0;

  return {
    barWidth,
    isOverBudget,
    expenseLabel: formatCurrency(totalExpense),
    incomeLabel: formatCurrency(totalIncome),
    remainingLabel: formatCurrency(Math.max(0, totalIncome - totalExpense)),
    overBudgetLabel: formatCurrency(Math.max(0, totalExpense - totalIncome)),
  };
};
