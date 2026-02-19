import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, Minus, MinusCircle, Plus } from 'lucide-react'
import { Modal } from '../../../../../components/ui/Modal'
import type { ActivityTodayItem } from '../../../interfaces/habbits-tab.interface'
import { ActivityTargetTypes } from '../../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import { OccurrenceStatuses } from '../../../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'

type HabitCompletionActionsProps = {
  isOpen: boolean
  item: ActivityTodayItem | null
  loading: boolean
  onClose: () => void
  onComplete: (value?: number) => Promise<void>
  onSkip: () => Promise<void>
}

function deriveStep(target: number): number {
  if (target >= 200) return 10
  if (target >= 50) return 5
  return 1
}

function buildPresets(target: number): number[] {
  if (target <= 0) return []
  const quarter = Math.round(target * 0.25)
  const half = Math.round(target * 0.5)
  const threeQ = Math.round(target * 0.75)
  return [...new Set([quarter, half, threeQ, target].filter((v) => v > 0))]
}

function resolveUnitLabel(schedule: ActivityTodayItem['schedule']): string {
  return schedule?.target_unit_label ?? schedule?.target_unit?.toLowerCase() ?? 'units'
}

export function HabitCompletionActions({ isOpen, item, loading, onClose, onComplete, onSkip }: HabitCompletionActionsProps) {
  const [quantity, setQuantity] = useState(0)

  const isQuantity = item?.schedule?.target_type === ActivityTargetTypes.QUANTITY
  const isPending = item?.status === OccurrenceStatuses.PENDING

  useEffect(() => {
    if (!item) return
    setQuantity(item.schedule?.target_value ?? 0)
  }, [item?.occurrence_uuid])

  if (!item) return null

  const currentStatus = item.status
  const targetValue = item.schedule?.target_value ?? 0
  const unitLabel = resolveUnitLabel(item.schedule)
  const step = deriveStep(targetValue)
  const presets = buildPresets(targetValue)
  const progressPct = targetValue > 0 ? Math.min(100, (quantity / targetValue) * 100) : 0

  function increment() {
    setQuantity((v) => v + step)
  }

  function decrement() {
    setQuantity((v) => Math.max(0, v - step))
  }

  async function handleComplete() {
    if (!isPending) {
      toast(`Cannot complete an occurrence with status ${currentStatus.toLowerCase()}`)
      return
    }
    if (isQuantity) {
      if (quantity < 0) {
        toast.error('Enter a valid quantity')
        return
      }
      await onComplete(quantity)
      onClose()
      return
    }
    await onComplete()
    onClose()
  }

  async function handleSkip() {
    if (!isPending) {
      toast(`Cannot skip an occurrence with status ${currentStatus.toLowerCase()}`)
      return
    }
    await onSkip()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.activity.name} size="sm">
      <div className="space-y-5">
        {!isPending ? (
          <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-center">
            <p className="text-sm text-slate-400">
              This occurrence is already{' '}
              <span className="font-medium text-slate-200">{item.status.toLowerCase()}</span>.
            </p>
          </div>
        ) : null}

        {isQuantity ? (
          <>
            <div className="rounded-2xl bg-slate-800/40 border border-slate-700/50 p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={decrement}
                  disabled={quantity <= 0 || loading || !isPending}
                  className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:border-slate-600 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="flex-1 text-center">
                  <p className="text-6xl font-bold tabular-nums text-white leading-none tracking-tight">
                    {quantity}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 uppercase tracking-wide">{unitLabel}</p>
                </div>

                <button
                  type="button"
                  onClick={increment}
                  disabled={loading || !isPending}
                  className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:border-slate-600 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-150"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>0</span>
                  <span>Target: {targetValue} {unitLabel}</span>
                </div>
              </div>
            </div>

            {presets.length > 0 ? (
              <div className="flex gap-2 justify-center flex-wrap">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    disabled={loading || !isPending}
                    className={`px-4 py-1.5 rounded-xl text-sm font-medium border transition-all disabled:opacity-40 ${
                      quantity === preset
                        ? 'bg-violet-600 border-violet-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-slate-400 text-center">Mark this occurrence as done or skip it.</p>
        )}

        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleComplete}
            disabled={loading || !isPending}
            className="w-full py-3 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isQuantity ? `Complete — ${quantity} ${unitLabel}` : 'Complete'}
          </button>
          <button
            type="button"
            onClick={handleSkip}
            disabled={loading || !isPending}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            <MinusCircle className="w-4 h-4" />
            Skip
          </button>
        </div>
      </div>
    </Modal>
  )
}
