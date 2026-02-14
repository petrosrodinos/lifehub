import { useState, useEffect } from 'react'
import { useScheduleStore } from '../store/schedule.store'
import { useActivitiesStore } from '../store/activities.store'
import type { ScheduleDay, ScheduleSlot } from '../config/schedule.config'

type SlotEditModalProps = {
  day: ScheduleDay
  slotIndex: number
  initialSlot: ScheduleSlot
  onClose: () => void
  mode: 'edit' | 'add'
}

const TIME_PATTERN = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

function formatTimeForInput(value: string): string {
  const [h, m] = value.split(':').map(Number)
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

export function SlotEditModal({
  day,
  slotIndex,
  initialSlot,
  onClose,
  mode,
}: SlotEditModalProps) {
  const activities = useActivitiesStore((s) => s.activities)
  const updateSlot = useScheduleStore((s) => s.updateSlot)
  const addSlot = useScheduleStore((s) => s.addSlot)
  const removeSlot = useScheduleStore((s) => s.removeSlot)

  const [start, setStart] = useState(initialSlot.start)
  const [end, setEnd] = useState(initialSlot.end)
  const [label, setLabel] = useState(initialSlot.label)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const startNorm = formatTimeForInput(start)
    const endNorm = formatTimeForInput(end)

    if (!TIME_PATTERN.test(startNorm) || !TIME_PATTERN.test(endNorm)) {
      setError('Use HH:mm format (e.g. 09:00)')
      return
    }

    const [sH, sM] = startNorm.split(':').map(Number)
    const [eH, eM] = endNorm.split(':').map(Number)
    const startMin = sH * 60 + sM
    const endMin = eH * 60 + eM

    if (endMin <= startMin) {
      setError('End time must be after start time')
      return
    }

    const trimmed = label.trim()
    if (!trimmed) {
      setError('Activity is required')
      return
    }

    const slotUpdate = { start: startNorm, end: endNorm, label: trimmed }
    if (mode === 'add') {
      addSlot(day, slotUpdate)
    } else {
      updateSlot(day, slotIndex, slotUpdate)
    }
    onClose()
  }

  const handleDelete = () => {
    removeSlot(day, slotIndex)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50 p-6"
        role="dialog"
        aria-label="Edit time slot"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            {mode === 'add' ? 'Add slot' : 'Edit slot'} – {day}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Start</label>
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">End</label>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Activity</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              list="activity-suggestions"
              placeholder="e.g. work, book, meditation"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <datalist id="activity-suggestions">
              {activities.map((a) => (
                <option key={a.id} value={a.name} />
              ))}
            </datalist>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              {mode === 'add' ? 'Add' : 'Save'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
