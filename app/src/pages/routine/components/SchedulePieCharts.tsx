import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
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
import { ChartsSkeleton } from './ScheduleSkeleton'

const CHART_DISPLAY_OPTIONS = [
  { id: 'hours', label: 'Hours' },
  { id: 'percentage', label: 'Percentage' },
] as const

const TIME_PERIOD_OPTIONS = [
  { id: 'weekly', label: 'Weekly', multiplier: 1 },
  { id: 'monthly', label: 'Monthly', multiplier: 4 },
  { id: 'yearly', label: 'Yearly', multiplier: 24 },
] as const

type TimePeriod = typeof TIME_PERIOD_OPTIONS[number]['id']

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
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('weekly')
  const { data: allSlots = [], isLoading } = useScheduleSlots()

  const multiplier = TIME_PERIOD_OPTIONS.find((opt) => opt.id === timePeriod)?.multiplier ?? 1
  const weekData = getWeekActivityStats(allSlots)
  const adjustedWeekData = weekData.map((activity) => ({
    ...activity,
    value: activity.value * multiplier,
    minutes: activity.minutes ? activity.minutes * multiplier : activity.value * multiplier,
  }))
  const weekDisplayData =
    displayMode === 'percentage'
      ? toPercentageData(weekData, getWeekTotalMinutes())
      : adjustedWeekData

  if (isLoading) {
    return <ChartsSkeleton />
  }

  if (allSlots.length === 0) {
    return (
      <div className="text-slate-100 p-6 md:p-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <BarChart3 className="w-20 h-20 mx-auto text-slate-600 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">No Data Available</h2>
          <p className="text-slate-400 mb-6">
            Add time slots to your schedule to see activity breakdown charts
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="text-slate-100 pb-10">
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-200">Week Total</h2>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
              className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
            >
              {TIME_PERIOD_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
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
                        adjustedWeekData.find((d) => d.name === item.name)?.value ??
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
                        adjustedWeekData.find((d) => d.name === payload.name)?.value ??
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
