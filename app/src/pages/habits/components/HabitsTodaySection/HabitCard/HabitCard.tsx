import { CheckCircle2, CircleDashed, CircleX, Clock3, Flame, MinusCircle } from "lucide-react";
import { DateTime } from "luxon";
import { useRef } from "react";
import type { ActivityTodayItem } from "../../../interfaces/habbits-tab.interface";
import { OccurrenceStatuses } from "../../../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface";
import { ActivityTargetTypes } from "../../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface";

type HabitCardProps = {
  item: ActivityTodayItem;
  isBusy: boolean;
  onSelect: () => void;
  onOpenActions: () => void;
  onSwipeComplete: () => void;
  onSwipeSkip: () => void;
};

const statusStyles: Record<ActivityTodayItem["status"], string> = {
  PENDING: "bg-slate-700/70 text-slate-200 border-slate-600/60",
  COMPLETED: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
  SKIPPED: "bg-amber-500/20 text-amber-300 border-amber-500/50",
  FAILED: "bg-rose-500/20 text-rose-300 border-rose-500/50",
};

function getStatusIcon(status: ActivityTodayItem["status"]) {
  if (status === OccurrenceStatuses.COMPLETED) return <CheckCircle2 className="w-4 h-4" />;
  if (status === OccurrenceStatuses.SKIPPED) return <MinusCircle className="w-4 h-4" />;
  if (status === OccurrenceStatuses.FAILED) return <CircleX className="w-4 h-4" />;
  return <CircleDashed className="w-4 h-4" />;
}

function formatTargetSummary(item: ActivityTodayItem) {
  if (item.schedule?.target_type !== ActivityTargetTypes.QUANTITY) return "Mark as done";
  const value = item.quantity_value ?? 0;
  const target = item.schedule.target_value ?? 0;
  const unit = item.schedule.target_unit_label ?? item.schedule.target_unit?.toLowerCase() ?? "units";
  return `${value} / ${target} ${unit}`;
}

function formatTime(timeOfDay?: string | null) {
  if (!timeOfDay) return "Anytime";
  const parsed = DateTime.fromFormat(timeOfDay, "HH:mm:ss");
  if (!parsed.isValid) return "Anytime";
  return parsed.toFormat("h:mm a");
}

export function HabitCard({ item, isBusy, onSelect, onOpenActions, onSwipeComplete, onSwipeSkip }: HabitCardProps) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  function onTouchStart(clientX: number) {
    touchStartX.current = clientX;
    touchEndX.current = null;
  }

  function onTouchMove(clientX: number) {
    touchEndX.current = clientX;
  }

  function onTouchFinish() {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) < 70) return;

    if (deltaX > 0) {
      onSwipeComplete();
      return;
    }
    onSwipeSkip();
  }

  return (
    <button
      type="button"
      onClick={() => {
        onSelect();
        onOpenActions();
      }}
      onTouchStart={(event) => onTouchStart(event.touches[0].clientX)}
      onTouchMove={(event) => onTouchMove(event.touches[0].clientX)}
      onTouchEnd={onTouchFinish}
      disabled={isBusy}
      className={`w-full text-left rounded-2xl border transition-all duration-200 border-slate-700/60 bg-slate-900/60 hover:border-slate-500/70 hover:bg-slate-800/60 ${isBusy ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl grid place-items-center text-sm font-semibold border border-white/10" style={{ backgroundColor: `${item.activity.color ?? "#8b5cf6"}30`, color: item.activity.color ?? "#c4b5fd" }}>
              {item.activity.icon ?? item.activity.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-semibold text-white truncate">{item.activity.name}</p>
              <p className="text-xs text-slate-300 mt-1 truncate">{formatTargetSummary(item)}</p>
            </div>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${statusStyles[item.status]}`}>
            {getStatusIcon(item.status)}
            <span>{item.status.toLowerCase()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="inline-flex items-center gap-1.5">
            <Clock3 className="w-3.5 h-3.5" />
            <span>{formatTime(item.schedule?.time_of_day)}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-violet-200">
            <Flame className="w-3.5 h-3.5" />
            <span>Quick actions</span>
          </div>
        </div>
      </div>
    </button>
  );
}
