import { useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import type { ChartDisplayMode, ScheduleDay } from '../../../features/routine/interfaces/routine.interface'
import { SCHEDULE_DAYS } from '../../../features/routine/interfaces/routine.interface'
import {
  formatMinutesToHours,
  getDayActivityStats,
  getDayTotalMinutes,
  getWeekActivityStats,
  getWeekTotalMinutes,
  toPercentageData,
  type ActivityMinutes,
} from '../../../features/routine/utils/schedule-stats.utils'
import { useScheduleSlots } from '../../../features/routine/hooks/use-routine'

const CHART_DISPLAY_OPTIONS = [
  { id: 'hours', label: 'Hours' },
  { id: 'percentage', label: 'Percentage' },
] as const

type DayPieChartProps = {
  day: ScheduleDay
  data: ActivityMinutes[]
  displayMode: ChartDisplayMode
}

function DayPieChart({ day, data, displayMode }: DayPieChartProps) {
  if (data.length === 0) return null

  const displayData =
    displayMode === 'percentage'
      ? toPercentageData(data, getDayTotalMinutes())
      : data

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-3">
        {day}
      </h3>
      <div className="w-full max-w-[220px] h-[220px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {displayData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const item = payload[0].payload as ActivityMinutes
                const minutes =
                  item.minutes ??
                  data.find((d) => d.name === item.name)?.value ??
                  item.value
                return (
                  <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-white font-medium capitalize">{item.name}</p>
                    <p className="text-slate-300 text-sm">
                      {displayMode === 'hours'
                        ? formatMinutesToHours(minutes)
                        : `${item.value}% (${formatMinutesToHours(minutes)})`}
                    </p>
                  </div>
                )
              }}
            />
            <Legend
              formatter={(value, entry) => {
                const payload = entry.payload as ActivityMinutes
                const minutes =
                  payload.minutes ??
                  data.find((d) => d.name === payload.name)?.value ??
                  payload.value
                const display =
                  displayMode === 'hours'
                    ? formatMinutesToHours(minutes)
                    : `${payload.value}%`
                return (
                  <span className="text-slate-400 capitalize text-xs">
                    {value}: {display}
                  </span>
                )
              }}
              wrapperStyle={{ fontSize: 11 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function SchedulePieCharts() {
  const [displayMode, setDisplayMode] = useState<ChartDisplayMode>('hours')
  const { data: allSlots = [], isLoading } = useScheduleSlots()

  const weekData = getWeekActivityStats(allSlots)
  const weekDisplayData =
    displayMode === 'percentage'
      ? toPercentageData(weekData, getWeekTotalMinutes())
      : weekData

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10 flex items-center justify-center">
        <div className="text-slate-400">Loading statistics...</div>
      </div>
    )
  }

  if (allSlots.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10 flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg
            className="w-20 h-20 mx-auto text-slate-600 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-3">No Data Available</h2>
          <p className="text-slate-400 mb-6">
            Add time slots to your schedule to see activity breakdown charts
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Activity Breakdown
            </h1>
            <p className="text-slate-400 mt-1 text-sm">Time spent by activity</p>
          </div>
          <select
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value as ChartDisplayMode)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 w-fit"
          >
            {CHART_DISPLAY_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </header>

        <section className="mb-16">
          <h2 className="text-lg font-semibold text-slate-200 mb-6">Per Day</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {SCHEDULE_DAYS.map((day) => (
              <DayPieChart
                key={day}
                day={day}
                data={getDayActivityStats(day, allSlots)}
                displayMode={displayMode}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-200 mb-6">Week Total</h2>
          <div className="max-w-md mx-auto">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={weekDisplayData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {weekDisplayData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const item = payload[0].payload as ActivityMinutes
                      const minutes =
                        item.minutes ??
                        weekData.find((d) => d.name === item.name)?.value ??
                        item.value
                      return (
                        <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl">
                          <p className="text-white font-medium capitalize">{item.name}</p>
                          <p className="text-slate-300 text-sm">
                            {displayMode === 'hours'
                              ? formatMinutesToHours(minutes)
                              : `${item.value}% (${formatMinutesToHours(minutes)})`}
                          </p>
                        </div>
                      )
                    }}
                  />
                  <Legend
                    formatter={(value, entry) => {
                      const payload = entry.payload as ActivityMinutes
                      const minutes =
                        payload.minutes ??
                        weekData.find((d) => d.name === payload.name)?.value ??
                        payload.value
                      const display =
                        displayMode === 'hours'
                          ? formatMinutesToHours(minutes)
                          : `${payload.value}%`
                      return (
                        <span className="text-slate-400 capitalize text-xs">
                          {value}: {display}
                        </span>
                      )
                    }}
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
