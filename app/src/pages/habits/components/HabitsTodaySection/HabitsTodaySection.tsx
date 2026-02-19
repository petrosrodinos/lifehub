import { ListChecks } from 'lucide-react'
import { HabitCard } from './HabitCard/HabitCard'
import { HabitCompletionActions } from './HabitCompletionActions/HabitCompletionActions'
import { useHabitsToday } from './use-habits-today'

function SkeletonCard() {
  return <div className="h-32 rounded-2xl border border-slate-700/60 bg-slate-800/50 animate-pulse" />
}

export function HabitsTodaySection() {
  const {
    todayHabits,
    isLoading,
    hasError,
    isActionPending,
    selectedActivityUuid,
    setSelectedActivityUuid,
    activeActionItem,
    setActiveActionItem,
    completeOccurrence,
    skipOccurrence,
  } = useHabitsToday()

  const emptyStateMessage = hasError
    ? 'Could not load habits right now. Try again in a moment.'
    : todayHabits.length === 0
      ? 'No occurrences scheduled for today.'
      : null

  return (
    <>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold inline-flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-violet-300" />
            Today
          </h2>
          <p className="text-xs text-slate-400">Swipe right to complete, left to skip</p>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : emptyStateMessage ? (
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 text-center">
            <p className="text-slate-300 text-sm">{emptyStateMessage}</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-0.5">
            {todayHabits.map((item) => (
              <HabitCard
                key={item.activity.uuid}
                item={item}
                isBusy={isActionPending}
                isActive={selectedActivityUuid === item.activity.uuid}
                onSelect={() => setSelectedActivityUuid(item.activity.uuid)}
                onOpenActions={() => setActiveActionItem(item)}
                onSwipeComplete={async () => {
                  await completeOccurrence(
                    item.occurrence_uuid,
                    item.status,
                    item.schedule?.target_type === 'QUANTITY' ? (item.quantity_value ?? 0) : undefined,
                    item.activity.uuid,
                  )
                }}
                onSwipeSkip={async () => {
                  await skipOccurrence(item.occurrence_uuid, item.status, item.activity.uuid)
                }}
              />
            ))}
          </div>
        )}
      </section>

      <HabitCompletionActions
        isOpen={!!activeActionItem}
        item={activeActionItem}
        loading={isActionPending}
        onClose={() => setActiveActionItem(null)}
        onComplete={async (value) => {
          if (!activeActionItem) return
          await completeOccurrence(
            activeActionItem.occurrence_uuid,
            activeActionItem.status,
            value,
            activeActionItem.activity.uuid,
          )
        }}
        onSkip={async () => {
          if (!activeActionItem) return
          await skipOccurrence(
            activeActionItem.occurrence_uuid,
            activeActionItem.status,
            activeActionItem.activity.uuid,
          )
        }}
      />
    </>
  )
}
