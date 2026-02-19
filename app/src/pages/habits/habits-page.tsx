import { useMemo, useState } from "react";
import { DateTime } from "luxon";
import { ChevronDown, ChevronUp, Flame, ListChecks, Plus } from "lucide-react";
import { HabitCard } from "./components/HabitCard/HabitCard";
import { HabitCompletionActions } from "./components/HabitCompletionActions/HabitCompletionActions";
import { HabitProgressSummary } from "./components/HabitProgressSummary/HabitProgressSummary";
import { HabitHistoryList } from "./components/HabitHistoryList/HabitHistoryList";
import { HabitScheduleCard } from "./components/HabitScheduleCard/HabitScheduleCard";
import { CreateActivityScheduleModal } from "./components/CreateActivityScheduleModal/CreateActivityScheduleModal";
import { useHabbitsTab } from "./hooks/use-habbits-tab";
import type { ActivityTodayItem } from "./interfaces/habbits-tab.interface";

type ExpandableSection = "progress" | "history" | "schedule";

function SkeletonCard() {
  return <div className="h-32 rounded-2xl border border-slate-700/60 bg-slate-800/50 animate-pulse" />;
}

export function HabitsPage() {
  const { todayHabits, selectedHabit, groupedSelectedLogs, progressSummary, completedToday, totalToday, overview, isLoading, isActionPending, isScheduleSaving, hasError, setSelectedActivityUuid, completeOccurrence, skipOccurrence, saveSchedule } = useHabbitsTab();

  const [activeActionItem, setActiveActionItem] = useState<ActivityTodayItem | null>(null);
  const [isCreateScheduleOpen, setIsCreateScheduleOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<ExpandableSection, boolean>>({
    progress: true,
    history: true,
    schedule: false,
  });

  const dateLabel = useMemo(() => DateTime.now().toFormat("EEEE, MMMM d"), []);

  const emptyStateMessage = hasError ? "Could not load habits right now. Try again in a moment." : todayHabits.length === 0 ? "No occurrences scheduled for today." : null;

  function toggleSection(section: ExpandableSection) {
    setExpandedSections((state) => ({
      ...state,
      [section]: !state[section],
    }));
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(99,102,241,0.14),transparent_45%),radial-gradient(circle_at_85%_78%,rgba(16,185,129,0.12),transparent_45%)] -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHZpZXdCb3g9JzAgMCA2MCA2MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPjxwYXRoIGQ9J00zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnonIHN0cm9rZT0ncmdiYSgyNTUsMjU1LDI1NSwwLjAyNSknLz48L2c+PC9zdmc+')] opacity-20 -z-10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-5">
        <header className="rounded-2xl border border-slate-700/60 bg-slate-900/65 backdrop-blur-sm px-4 sm:px-5 py-4">
          <p className="text-xs sm:text-sm text-slate-300">{dateLabel}</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Habbits</h1>
              <p className="text-sm text-slate-300 mt-1">
                {completedToday} of {totalToday} completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setIsCreateScheduleOpen(true)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 text-emerald-200 text-xs sm:text-sm hover:bg-emerald-500/20 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Schedule</span>
              </button>
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-violet-500/35 bg-violet-500/10 text-violet-200 text-xs sm:text-sm">
                <Flame className="w-4 h-4" />
                <span>{overview?.best_streak_activity?.current_streak ?? 0} day streak</span>
              </div>
            </div>
          </div>
        </header>

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
                  isActive={selectedHabit?.activity.uuid === item.activity.uuid}
                  onSelect={() => setSelectedActivityUuid(item.activity.uuid)}
                  onOpenActions={() => setActiveActionItem(item)}
                  onSwipeComplete={async () => {
                    if (!item.occurrenceUuid) return;
                    await completeOccurrence(item.occurrenceUuid, item.status, item.schedule?.target_type === "QUANTITY" ? (item.quantityValue ?? 0) : undefined);
                  }}
                  onSwipeSkip={async () => {
                    if (!item.occurrenceUuid) return;
                    await skipOccurrence(item.occurrenceUuid, item.status);
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <button type="button" onClick={() => toggleSection("progress")} className="w-full flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-left">
            <span className="text-sm sm:text-base font-semibold">Progress Summary</span>
            {expandedSections.progress ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
          </button>
          {expandedSections.progress ? <HabitProgressSummary progress={progressSummary} /> : null}
        </section>

        <section className="space-y-3">
          <button type="button" onClick={() => toggleSection("history")} className="w-full flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-left">
            <span className="text-sm sm:text-base font-semibold">Habit History</span>
            {expandedSections.history ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
          </button>
          {expandedSections.history ? <HabitHistoryList groupedLogs={groupedSelectedLogs} /> : null}
        </section>

        <section className="space-y-3">
          <button type="button" onClick={() => toggleSection("schedule")} className="w-full flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-left">
            <span className="text-sm sm:text-base font-semibold">Schedule Summary</span>
            {expandedSections.schedule ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
          </button>
          {expandedSections.schedule ? <HabitScheduleCard selectedHabit={selectedHabit} isSaving={isScheduleSaving} onSave={saveSchedule} /> : null}
        </section>
      </div>

      <HabitCompletionActions
        isOpen={!!activeActionItem}
        item={activeActionItem}
        loading={isActionPending}
        onClose={() => setActiveActionItem(null)}
        onComplete={async (value) => {
          if (!activeActionItem?.occurrenceUuid) return;
          await completeOccurrence(activeActionItem.occurrenceUuid, activeActionItem.status, value);
        }}
        onSkip={async () => {
          if (!activeActionItem?.occurrenceUuid) return;
          await skipOccurrence(activeActionItem.occurrenceUuid, activeActionItem.status);
        }}
      />

      <CreateActivityScheduleModal isOpen={isCreateScheduleOpen} onClose={() => setIsCreateScheduleOpen(false)} />
    </div>
  );
}
