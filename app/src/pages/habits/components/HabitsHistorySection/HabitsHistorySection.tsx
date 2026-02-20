import { useMemo } from "react";
import { CalendarClock, CheckCircle2, CircleX, FileText, MinusCircle } from "lucide-react";
import { DateTime } from "luxon";
import type { ActivityLog } from "../../../../features/habbits/activity-logs/interfaces/activity-logs.interface";
import type { ActivityHabbitsQuery } from "../../../../features/activities/interfaces/activities.interface";
import { Pagination } from "../../../../components/ui/Pagination";
import { useHabitsHistory } from "./use-habits-history";

type LogStatus = "completed" | "skipped" | "failed";

function resolveStatus(log: ActivityLog): LogStatus {
  if (log.completed) return "completed";
  if (log.skipped) return "skipped";
  return "failed";
}

const STATUS_CONFIG: Record<LogStatus, { icon: React.ReactNode; label: string; classes: string }> = {
  completed: {
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    label: "Completed",
    classes: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
  },
  skipped: {
    icon: <MinusCircle className="w-3.5 h-3.5" />,
    label: "Skipped",
    classes: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  },
  failed: {
    icon: <CircleX className="w-3.5 h-3.5" />,
    label: "Failed",
    classes: "text-rose-300 bg-rose-500/10 border-rose-500/30",
  },
};

function formatQuantity(value?: number | null) {
  if (value === null || value === undefined) return null;
  return String(value);
}

interface HabitsHistorySectionProps {
  filter: ActivityHabbitsQuery;
  onPageChange?: (page: number) => void;
}

export function HabitsHistorySection({ filter, onPageChange }: HabitsHistorySectionProps) {
  const { groupedSelectedLogs, total, page, pageSize, totalPages } = useHabitsHistory(filter);

  const flattenedLogs = useMemo(
    () => groupedSelectedLogs.flatMap((group) => group.logs.map((log) => ({ date: group.date, log }))),
    [groupedSelectedLogs],
  );

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 overflow-hidden">
      <div className="px-4 sm:px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white">Habit History</h3>
        <CalendarClock className="w-4 h-4 text-violet-400" />
      </div>

      {flattenedLogs.length === 0 ? (
        <div className="px-4 sm:px-5 py-8 text-center">
          <CalendarClock className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No history yet for this activity.</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-slate-700/40">
            {flattenedLogs.map(({ date, log }) => {
              const status = resolveStatus(log);
              const config = STATUS_CONFIG[status];
              const quantity = formatQuantity(log.value);

              return (
                <div key={log.uuid} className="px-4 sm:px-5 py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium shrink-0 ${config.classes}`}>
                      {config.icon}
                      <span>{config.label}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-300 truncate">{log.activity?.name ?? log.activity_uuid}</p>
                    {log.skip_reason ? <p className="text-xs text-slate-500 truncate">{log.skip_reason}</p> : null}
                    {log.notes ? <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" /> : null}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-right">
                    {quantity ? <span className="text-sm font-semibold text-slate-200 tabular-nums">{quantity}</span> : null}
                    <p className="text-xs text-slate-500">{DateTime.fromISO(date).toFormat("EEE, MMM d")}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && onPageChange ? (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              totalItems={total}
              pageSize={pageSize}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
