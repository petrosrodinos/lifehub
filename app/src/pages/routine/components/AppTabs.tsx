import { useState } from 'react'
import { Settings } from 'lucide-react'
import { WeeklySlotBoard } from './slot-board'
import { SchedulePieCharts } from './SchedulePieCharts'
import { ActivitiesMenu } from './ActivitiesMenu'

const TAB_OPTIONS = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'charts', label: 'Pie Charts' },
] as const

type TabId = (typeof TAB_OPTIONS)[number]['id']

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
                    ? 'text-violet-400 bg-slate-800/80 border-b-2 border-violet-400'
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
            className="p-2 text-slate-400 hover:text-violet-400 rounded-lg hover:bg-slate-800/40 transition-colors"
            title="Manage activities"
          >
            <Settings className="w-5 h-5" />
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
