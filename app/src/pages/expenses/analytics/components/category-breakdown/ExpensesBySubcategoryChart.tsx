import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { ExpenseBySubcategoryData } from "../../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";
import { getPieChartDimensions, useIsSmallScreen } from "../../utils/pie-chart.utils";
import { formatCurrency } from "../../../../../utils/format-currency.utils";

type ExpensesBySubcategoryChartProps = {
  data: ExpenseBySubcategoryData[];
};

type ChartPayload = {
  count: number;
  percentage: number;
  category: string;
};

const tooltipContentStyle = {
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "8px",
  color: "#f1f5f9",
};

export function ExpensesBySubcategoryChart({ data }: ExpensesBySubcategoryChartProps) {
  const isSmallScreen = useIsSmallScreen();
  const dimensions = getPieChartDimensions(isSmallScreen, data.length);

  if (data.length === 0) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Expenses by Subcategory</h3>
        <div className="flex items-center justify-center h-64 text-slate-400">No expense data available</div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.subcategoryName,
    value: item.total,
    category: item.categoryName,
    color: item.categoryColor,
    count: item.count,
    percentage: item.percentage,
  }));

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Expenses by Subcategory</h3>
      <div className="relative w-full overflow-hidden">
        <ResponsiveContainer width="100%" height={dimensions.height}>
          <PieChart margin={{ top: 8, right: 8, bottom: 4, left: 8 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy={dimensions.centerY}
              outerRadius={dimensions.outerRadius}
              innerRadius={dimensions.innerRadius}
              paddingAngle={2}
              strokeWidth={0}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipContentStyle}
              formatter={(value: number | undefined, _name: string | undefined, item) => {
                const payload = item.payload as ChartPayload;
                const amount = value !== undefined ? formatCurrency(value) : "N/A";
                const percentage = payload.percentage.toFixed(1);
                return [`${amount} (${percentage}%) · ${payload.count} transactions`, item.payload.name];
              }}
              labelStyle={{ color: "#cbd5e1" }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={dimensions.legendWrapperStyle}
              iconType="circle"
              iconSize={8}
              formatter={(value, entry) => {
                const payload = entry.payload as ChartPayload;
                return `${value} - ${payload.category}`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
