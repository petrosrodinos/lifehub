import { useSyncExternalStore } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { PurchasedProductPoint } from "../../../../../features/receipts/expense-receipt-item/interfaces/purchased-products.interfaces"

const SMALL_SCREEN_BREAKPOINT = 640

function subscribeToResize(callback: () => void) {
  window.addEventListener("resize", callback)
  return () => window.removeEventListener("resize", callback)
}

function getIsSmallScreen() {
  if (typeof window === "undefined") return false
  return window.innerWidth < SMALL_SCREEN_BREAKPOINT
}

const CHART_COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
  "#f97316",
] as const

type PurchasedProductsChartProps = {
  data: PurchasedProductPoint[]
}

export function PurchasedProductsChart({ data }: PurchasedProductsChartProps) {
  const isSmallScreen = useSyncExternalStore(
    subscribeToResize,
    getIsSmallScreen,
    getIsSmallScreen
  )

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        No purchased products data available
      </div>
    )
  }

  const tooltipWrapperStyle = isSmallScreen
    ? {
        position: "absolute" as const,
        top: "auto",
        left: "50%",
        bottom: 16,
        transform: "translateX(-50%)",
        zIndex: 10,
      }
    : undefined

  const legendWrapperStyle =
    isSmallScreen || data.length > 8
      ? {
          color: "#cbd5e1",
          paddingTop: 16,
          maxHeight: 100,
          overflowY: "auto" as const,
          overflowX: "hidden" as const,
        }
      : { color: "#cbd5e1", paddingTop: 16 }

  const outerRadius = isSmallScreen ? 90 : 130
  const innerRadius = isSmallScreen ? 40 : 60

  return (
    <div className="relative w-full min-h-[400px] overflow-hidden">
      <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total_quantity"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          paddingAngle={2}
          strokeWidth={0}
        >
          {data.map((_entry, index) => (
            <Cell
              key={`cell-${_entry.name}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip
          wrapperStyle={tooltipWrapperStyle}
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#f1f5f9",
            maxHeight: isSmallScreen ? 160 : undefined,
            overflowY: isSmallScreen ? "auto" : undefined,
          }}
          formatter={(value?: number, name?: string) => {
            const safeValue = value ?? 0
            const safeName = name ?? ""

            const total =
              data.find((d) => d.name === safeName)?.total_amount ?? 0

            return [
              `${safeValue} units · €${total.toFixed(2)}`,
              safeName,
            ] as [string, string]
          }}
          labelStyle={{ color: "#cbd5e1" }}
        />

        <Legend
          wrapperStyle={legendWrapperStyle}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
    </div>
  )
}
