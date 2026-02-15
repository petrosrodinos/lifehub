import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

type DataPoint = {
  date: string;
  balance: number;
};

type BalanceTrendChartProps = {
  data: DataPoint[];
};

export function BalanceTrendChart({ data }: BalanceTrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Balance Trend</h3>
        <div className="flex items-center justify-center h-64 text-slate-400">
          No data available for the selected filters
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Balance Trend</h3>
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
            formatter={(value: number | undefined) => value !== undefined ? [`$${value.toLocaleString()}`, "Balance"] : ["N/A", "Balance"]}
            labelStyle={{ color: "#cbd5e1" }}
          />
          <Legend
            wrapperStyle={{ color: "#cbd5e1" }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: "#8b5cf6", r: 4 }}
            activeDot={{ r: 6 }}
            name="Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
