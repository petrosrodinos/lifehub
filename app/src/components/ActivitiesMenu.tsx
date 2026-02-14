import { useState, useEffect } from 'react'
import { useActivitiesStore } from '../store/activities.store'
import { useScheduleStore } from '../store/schedule.store'

type ActivitiesMenuProps = {
  isOpen: boolean
  onClose: () => void
}

const PRESET_COLORS = [
  '#f59e0b',
  '#0284c7',
  '#10b981',
  '#8b5cf6',
  '#f43f5e',
  '#f97316',
  '#dc2626',
  '#6366f1',
  '#14b8a6',
  '#eab308',
]

function ActivityForm({
  initialName,
  initialColor,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  initialName: string
  initialColor: string
  onSubmit: (name: string, color: string) => void
  onCancel: () => void
  submitLabel: string
}) {
  const [name, setName] = useState(initialName)
  const [color, setColor] = useState(initialColor)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) {
      onSubmit(trimmed, color)
      onCancel()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Activity name"
        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        autoFocus
      />
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
              color === c ? 'border-white scale-110' : 'border-slate-600'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full h-10 cursor-pointer bg-slate-800 rounded"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export function ActivitiesMenu({ isOpen, onClose }: ActivitiesMenuProps) {
  const {
    activities,
    addActivity,
    updateActivity,
    removeActivity,
    resetToDefault,
  } = useActivitiesStore()
  const resetScheduleToDefault = useScheduleStore((s) => s.resetToDefault)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleAdd = (name: string, color: string) => {
    addActivity(name, color)
    setIsAdding(false)
  }

  const handleUpdate = (id: string, name: string, color: string) => {
    updateActivity(id, { name, color })
    setEditingId(null)
  }

  const handleReset = () => {
    resetToDefault()
    resetScheduleToDefault()
    setEditingId(null)
    setIsAdding(false)
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-slate-900 border-l border-slate-700 z-50 flex flex-col shadow-xl"
        role="dialog"
        aria-label="Activities menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Activities</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isAdding ? (
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <h3 className="text-sm font-medium text-slate-300 mb-3">Add activity</h3>
              <ActivityForm
                initialName=""
                initialColor={PRESET_COLORS[0]}
                onSubmit={handleAdd}
                onCancel={() => setIsAdding(false)}
                submitLabel="Add"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full py-3 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors font-medium"
            >
              + Add activity
            </button>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-400">Your activities</h3>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700"
              >
                {editingId === activity.id ? (
                  <div className="flex-1">
                    <ActivityForm
                      initialName={activity.name}
                      initialColor={activity.color}
                      onSubmit={(name, color) => handleUpdate(activity.id, name, color)}
                      onCancel={() => setEditingId(null)}
                      submitLabel="Save"
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="w-8 h-8 rounded-lg shrink-0"
                      style={{ backgroundColor: activity.color }}
                    />
                    <span className="flex-1 text-white font-medium capitalize">
                      {activity.name}
                    </span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(activity.id)}
                        className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeActivity(activity.id)}
                        className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
