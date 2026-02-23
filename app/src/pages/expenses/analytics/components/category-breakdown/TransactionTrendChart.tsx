import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { TransactionTrendData } from "../../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces";

type TransactionTrendChartProps = {
  data: TransactionTrendData[];
  type: "INCOME" | "EXPENSE";
};

export function TransactionTrendChart({ data, type }: TransactionTrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {type === "INCOME" ? "Income" : "Expense"} Trend
        </h3>
        <div className="flex items-center justify-center h-64 text-slate-400">
          No data available for the selected filters
        </div>
      </div>
    );
  }

  const color = type === "INCOME" ? "#22c55e" : "#ef4444";

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        {type === "INCOME" ? "Income" : "Expense"} Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8" }}
            tickLine={{ stroke: "#334155" }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8" }}
            tickLine={{ stroke: "#334155" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "#f1f5f9",
            }}
            formatter={(value: number | undefined) => value !== undefined ? [`$${value.toLocaleString()}`, "Total"] : ["N/A", "Total"]}
            labelStyle={{ color: "#cbd5e1" }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
