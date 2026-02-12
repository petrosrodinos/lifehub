import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { SCHEDULE_DAYS, type ScheduleDay } from '../config/schedule.config'
import { useActivitiesStore } from '../store/activities.store'
import { useScheduleStore } from '../store/schedule.store'
import {
  getDayActivityStats,
  getWeekActivityStats,
  formatMinutesToHours,
  type ActivityMinutes,
} from '../utils/schedule-stats.utils'

type DayPieChartProps = {
  day: ScheduleDay
  data: ActivityMinutes[]
}

function DayPieChart({ day, data }: DayPieChartProps) {
  if (data.length === 0) return null

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-3">
        {day}
      </h3>
      <div className="w-full max-w-[220px] h-[220px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const item = payload[0].payload as ActivityMinutes
                return (
                  <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-white font-medium capitalize">{item.name}</p>
                    <p className="text-slate-300 text-sm">
                      {formatMinutesToHours(item.value)}
                    </p>
                  </div>
                )
              }}
            />
            <Legend
              formatter={(value) => (
                <span className="text-slate-400 capitalize text-xs">{value}</span>
              )}
              wrapperStyle={{ fontSize: 11 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function SchedulePieCharts() {
  const activities = useActivitiesStore((s) => s.activities)
  const schedule = useScheduleStore((s) => s.schedule)
  const colorMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (const a of activities) {
      map[a.name] = a.color
    }
    return map
  }, [activities])
  const weekData = getWeekActivityStats(colorMap, schedule)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Activity Breakdown
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Time spent by activity
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-lg font-semibold text-slate-200 mb-6">
            Per Day
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {SCHEDULE_DAYS.map((day) => (
              <DayPieChart
                key={day}
                day={day}
                data={getDayActivityStats(day, colorMap, schedule)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-200 mb-6">
            Week Total
          </h2>
          <div className="max-w-md mx-auto">
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={weekData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {weekData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const item = payload[0].payload as ActivityMinutes
                      return (
                        <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl">
                          <p className="text-white font-medium capitalize">
                            {item.name}
                          </p>
                          <p className="text-slate-300 text-sm">
                            {formatMinutesToHours(item.value)}
                          </p>
                        </div>
                      )
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span className="text-slate-400 capitalize text-xs">
                        {value}
                      </span>
                    )}
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
