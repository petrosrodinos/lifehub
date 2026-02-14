import { useState } from 'react'
import { TAB_OPTIONS, type TabId } from '../config/schedule.config'
import { WeeklySlotBoard } from './WeeklySlotBoard'
import { SchedulePieCharts } from './SchedulePieCharts'
import { ActivitiesMenu } from './ActivitiesMenu'

export function AppTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('schedule')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="border-b border-slate-700/50 sticky top-0 z-20 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <nav className="flex gap-1">
            {TAB_OPTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 text-sm font-medium transition-colors rounded-t-lg ${
                  activeTab === id
                    ? 'text-amber-400 bg-slate-800/80 border-b-2 border-amber-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800/40 transition-colors"
            title="Manage activities"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </div>
      <ActivitiesMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        {activeTab === 'schedule' && <WeeklySlotBoard />}
        {activeTab === 'charts' && <SchedulePieCharts />}
      </main>
    </div>
  )
}
