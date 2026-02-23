import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { PriceEvolutionPoint } from "../../../../../features/receipts/expense-receipt-item/interfaces/price-evolution.interfaces"
import { formatPriceEvolutionDate } from "../../utils/analytics.utils"

type PriceEvolutionChartProps = {
  data: PriceEvolutionPoint[]
}

export function PriceEvolutionChart({ data }: PriceEvolutionChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        No price data available for the selected product
      </div>
    )
  }

  const formattedData = data.map((point) => ({
    ...point,
    label: formatPriceEvolutionDate(point.date),
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

        <XAxis
          dataKey="label"
          stroke="#94a3b8"
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          tickLine={{ stroke: "#334155" }}
        />

        <YAxis
          stroke="#94a3b8"
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          tickLine={{ stroke: "#334155" }}
          tickFormatter={(value: number) => `€${value.toFixed(2)}`}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
          formatter={(value: number | undefined) => [
            `€${(value ?? 0).toFixed(2)}`,
            "Unit Price",
          ]}
          labelFormatter={(label, payload) => {
            const storeName =
              payload?.[0]?.payload?.store_name ?? "Unknown store"

            return `${String(label)} · ${storeName}`
          }}
          labelStyle={{ color: "#cbd5e1" }}
        />

        <Legend wrapperStyle={{ color: "#cbd5e1" }} iconType="line" />

        <Line
          type="monotone"
          dataKey="unit_price"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={{ fill: "#8b5cf6", r: 4 }}
          activeDot={{ r: 6 }}
          name="Unit Price"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
