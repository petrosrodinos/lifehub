import { BarChart3, CalendarDays, CheckCircle2, CircleX, Flame, Gauge, MinusCircle, TrendingUp } from "lucide-react";
import type { ActivityHabbitsQuery } from "../../../../features/activities/interfaces/activities.interface";
import { useActivityProgressSummary } from "../../../../features/activities/hooks/use-activities";
import { CompletionHeatmaps } from "./CompletionHeatmaps";

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

interface HabitsProgressSectionProps {
  filter: ActivityHabbitsQuery;
}

export function HabitsProgressSection({ filter }: HabitsProgressSectionProps) {
  const { data } = useActivityProgressSummary(filter);
  const hasFrequency = data?.frequency_success_rate != null;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-white">Progress Summary</h3>
          <BarChart3 className="w-4 h-4 text-violet-400" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-700/30">
        <div className="bg-slate-900/60 p-4 flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />7 days
          </p>
          <p className="text-2xl font-bold tabular-nums text-emerald-300">{formatPercent(data?.completion_rate_7d ?? 0)}</p>
          <p className="text-[11px] text-slate-500">completion rate</p>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {data?.progress_7d.total_completed ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <MinusCircle className="w-3 h-3 text-amber-500" />
              {data?.progress_7d.total_skipped ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <CircleX className="w-3 h-3 text-rose-500" />
              {data?.progress_7d.total_failed ?? 0}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/60 p-4 flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            30 days
          </p>
          <p className="text-2xl font-bold tabular-nums text-violet-300">{formatPercent(data?.completion_rate_30d ?? 0)}</p>
          <p className="text-[11px] text-slate-500">completion rate</p>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {data?.progress_30d.total_completed ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <MinusCircle className="w-3 h-3 text-amber-500" />
              {data?.progress_30d.total_skipped ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <CircleX className="w-3 h-3 text-rose-500" />
              {data?.progress_30d.total_failed ?? 0}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/60 p-4 flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            Streak
          </p>
          <p className="text-2xl font-bold tabular-nums text-orange-300">{data?.progress_30d.streak.currentStreak ?? 0}</p>
          <p className="text-[11px] text-slate-500">current streak</p>
          <p className="mt-1 text-[11px] text-slate-500">best {data?.progress_30d.streak.longestStreak ?? 0}</p>
        </div>

        <div className="bg-slate-900/60 p-4 flex flex-col gap-1.5">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            {hasFrequency ? <BarChart3 className="w-3.5 h-3.5" /> : <Gauge className="w-3.5 h-3.5" />}
            {hasFrequency ? "Frequency" : "Quantity"}
          </p>
          {hasFrequency ? (
            <>
              <p className="text-2xl font-bold tabular-nums text-cyan-300">{formatPercent(data?.frequency_success_rate as number)}</p>
              <p className="text-[11px] text-slate-500">target success rate</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold tabular-nums text-slate-100">{data?.quantity_total_30d ?? 0}</p>
              <p className="text-[11px] text-slate-500">total last 30d</p>
            </>
          )}
        </div>
        </div>

        <div className="border-t border-slate-700/60 bg-slate-900/60 p-4 space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            <MinusCircle className="w-3.5 h-3.5" />
            Most skipped (30d)
          </p>
          {data?.most_skipped_activity ? (
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-200 truncate">{data.most_skipped_activity.name}</p>
              <span className="ml-3 shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 tabular-nums">{data.most_skipped_activity.skipped_count} skips</span>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No skips</p>
          )}
        </div>
      </div>

      <CompletionHeatmaps />
    </div>
  );
}
