import { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal } from '../../../../components/ui/Modal'
import type { ActivityTodayItem } from '../../interfaces/habbits-tab.interface'

type HabitCompletionActionsProps = {
  isOpen: boolean
  item: ActivityTodayItem | null
  loading: boolean
  onClose: () => void
  onComplete: (value?: number) => Promise<void>
  onSkip: () => Promise<void>
}

export function HabitCompletionActions({
  isOpen,
  item,
  loading,
  onClose,
  onComplete,
  onSkip,
}: HabitCompletionActionsProps) {
  const [quantityValue, setQuantityValue] = useState<string>('')

  if (!item) return null
  const habit = item

  const isQuantity = habit.schedule?.target_type === 'QUANTITY'

  async function handleComplete() {
    if (habit.status === 'COMPLETED') {
      toast('This occurrence is already completed')
      return
    }

    if (isQuantity) {
      const value = Number(quantityValue)
      if (!quantityValue || Number.isNaN(value) || value < 0) {
        toast.error('Enter a valid quantity')
        return
      }
      await onComplete(value)
      setQuantityValue('')
      onClose()
      return
    }

    await onComplete()
    onClose()
  }

  async function handleSkip() {
    if (habit.status === 'COMPLETED') {
      toast.error('Skipping after completion is not allowed')
      return
    }
    await onSkip()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={habit.activity.name} size="sm">
      <div className="space-y-4">
        <p className="text-sm text-slate-300">Choose an action for this occurrence.</p>

        {isQuantity && (
          <div className="space-y-2">
            <label htmlFor="habit-quantity-input" className="text-xs font-medium text-slate-400">
              Quantity value
            </label>
            <input
              id="habit-quantity-input"
              type="number"
              min="0"
              value={quantityValue}
              onChange={(event) => setQuantityValue(event.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 focus:border-violet-500 focus:outline-none"
              placeholder="Enter amount"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={handleComplete}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            Complete
          </button>
          <button
            type="button"
            onClick={handleSkip}
            disabled={loading || habit.status === 'COMPLETED'}
            className="w-full py-2.5 rounded-xl bg-amber-500/90 hover:bg-amber-500 text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            Skip
          </button>
        </div>
      </div>
    </Modal>
  )
}
