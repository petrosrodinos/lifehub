import { useState } from "react";
import { ListChecks, ChevronLeft, ChevronRight, SlidersHorizontal, CalendarDays } from "lucide-react";
import { useActivityScheduleDetails } from "../../../../features/habbits/activity-schedules/hooks/use-activity-schedules";
import { Modal } from "../../../../components/ui/Modal";
import { ScheduleCard } from "../HabitsActivitySchedules/ScheduleCard";
import { HabitCard } from "./HabitCard/HabitCard";
import { HabitCompletionActions } from "./HabitCompletionActions/HabitCompletionActions";
import { HabitsFilters } from "../Filters/habbits";
import { useHabitsToday } from "./use-habits-today";

function SkeletonCard() {
  return <div className="h-32 rounded-2xl border border-slate-700/60 bg-slate-800/50 animate-pulse" />;
}

export function HabitsTodaySection() {
  const [scheduleModalUuid, setScheduleModalUuid] = useState<string | null>(null);
  const scheduleDetailsQuery = useActivityScheduleDetails(scheduleModalUuid, !!scheduleModalUuid);
  const { todayHabits, tomorrowHabits, showTomorrow, isLoading, hasError, isActionPending, setSelectedActivityUuid, activeActionItem, setActiveActionItem, completeOccurrence, skipOccurrence, activeDateLabel, goToPreviousDay, goToNextDay, isFiltersOpen, setIsFiltersOpen, setFilter } = useHabitsToday();

  const emptyStateMessage = hasError ? "Could not load habits right now. Try again in a moment." : todayHabits.length === 0 ? `No occurrences scheduled for ${activeDateLabel.toLowerCase()}.` : null;

  return (
    <>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold inline-flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-violet-300" />
              {activeDateLabel}
            </h2>
            <div className="flex items-center gap-0.5">
              <button onClick={goToPreviousDay} className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition-colors" aria-label="Previous day">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={goToNextDay} className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition-colors" aria-label="Next day">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsFiltersOpen(!isFiltersOpen)} className={`p-1.5 rounded-lg transition-colors ${isFiltersOpen ? "text-violet-300 bg-violet-500/20 hover:bg-violet-500/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"}`} aria-label="Toggle filters">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isFiltersOpen && <HabitsFilters onFilterChange={setFilter} />}

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
          <div className="space-y-2">
            {todayHabits.map((item) => (
              <HabitCard key={item.occurrence_uuid} item={item} isBusy={isActionPending} onSelect={() => setSelectedActivityUuid(item.activity.uuid)} onOpenActions={() => setActiveActionItem(item)} onViewSchedule={setScheduleModalUuid} />
            ))}
          </div>
        )}
      </section>

      {showTomorrow && (
        <section className="space-y-3 pt-6 border-t border-slate-700/60">
          <h2 className="text-base sm:text-lg font-semibold inline-flex items-center gap-2 text-slate-400">
            <CalendarDays className="w-4 h-4" />
            Tomorrow
          </h2>
          {tomorrowHabits.length === 0 ? (
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 text-center">
              <p className="text-slate-400 text-sm">No occurrences scheduled for tomorrow.</p>
            </div>
          ) : (
            <div className="space-y-2 opacity-90">
              {tomorrowHabits.map((item) => (
                <HabitCard key={item.occurrence_uuid} item={item} isBusy={isActionPending} onSelect={() => setSelectedActivityUuid(item.activity.uuid)} onOpenActions={() => setActiveActionItem(item)} onViewSchedule={setScheduleModalUuid} />
              ))}
            </div>
          )}
        </section>
      )}

      <Modal isOpen={!!scheduleModalUuid} onClose={() => setScheduleModalUuid(null)} title="Schedule" size="md">
        {scheduleDetailsQuery.isLoading && <div className="h-32 rounded-xl bg-slate-700/30 animate-pulse" />}
        {scheduleDetailsQuery.isError && <p className="text-sm text-slate-400">Could not load schedule.</p>}
        {scheduleDetailsQuery.data && <ScheduleCard schedule={scheduleDetailsQuery.data} onSelect={() => setScheduleModalUuid(null)} />}
      </Modal>

      <HabitCompletionActions
        isOpen={!!activeActionItem}
        item={activeActionItem}
        loading={isActionPending}
        onClose={() => setActiveActionItem(null)}
        onComplete={async (value) => {
          if (!activeActionItem) return;
          await completeOccurrence(activeActionItem.occurrence_uuid, activeActionItem.status, value, activeActionItem.activity.uuid);
        }}
        onSkip={async () => {
          if (!activeActionItem) return;
          await skipOccurrence(activeActionItem.occurrence_uuid, activeActionItem.status, activeActionItem.activity.uuid);
        }}
      />
    </>
  );
}
