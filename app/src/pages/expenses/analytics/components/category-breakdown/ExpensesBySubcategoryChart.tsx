import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { ExpenseBySubcategoryData } from "../../../../../features/expense-entries/interfaces/expense-entries.interfaces";

type ExpensesBySubcategoryChartProps = {
  data: ExpenseBySubcategoryData[];
};

export function ExpensesBySubcategoryChart({ data }: ExpensesBySubcategoryChartProps) {
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
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props) => {
              const percentage = props.payload?.percentage || 0;
              return `${props.name} (${percentage.toFixed(1)}%)`;
            }}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
            formatter={(value: number | undefined, _name: string | undefined, props: any) => [value !== undefined ? `$${value.toLocaleString()} (${props.payload.count} transactions)` : "N/A", props.payload.name]}
            labelStyle={{ color: "#cbd5e1" }}
          />
          <Legend wrapperStyle={{ color: "#cbd5e1" }} iconType="circle" formatter={(value, entry: any) => `${value} - ${entry.payload.category}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
