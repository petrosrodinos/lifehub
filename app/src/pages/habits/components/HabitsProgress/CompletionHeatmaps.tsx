import { CheckCircle2 } from "lucide-react";
import { DateTime } from "luxon";
import { useCompletionHeatmaps } from "../../../../features/activities/hooks/use-activities";

const DAYS_30 = Array.from(
  { length: 30 },
  (_, i) => DateTime.now().minus({ days: 29 - i }).toISODate() ?? "",
);

type DayCounts = { completed: number; skipped: number; failed: number };

function HeatmapCells({
  days,
  byDate,
  maxCompleted,
}: {
  days: string[];
  byDate: Record<string, DayCounts>;
  maxCompleted: number;
}) {
  return (
    <div className="flex flex-wrap gap-0.5">
      {days.map((day) => {
        const c = byDate[day] ?? { completed: 0, skipped: 0, failed: 0 };
        let bg: string;
        if (c.failed > 0) {
          bg = "bg-rose-500/90";
        } else if (c.skipped > 0) {
          bg = "bg-amber-400/90";
        } else if (c.completed > 0) {
          const intensity = Math.min(4, Math.ceil((c.completed / Math.max(1, maxCompleted)) * 4));
          bg = ["bg-emerald-900/60", "bg-emerald-700/70", "bg-emerald-500/80", "bg-emerald-400"][intensity - 1] ?? "bg-emerald-400";
        } else {
          bg = "bg-slate-700/40";
        }
        return (
          <div key={day} className="group relative">
            <div className={`w-[10px] h-[10px] rounded-sm ${bg} cursor-default`} aria-label={day} />
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 rounded bg-slate-800 text-white text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none transition-opacity z-20 border border-slate-600/80">
              {day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function CompletionHeatmaps() {
  const { data: heatmapsData } = useCompletionHeatmaps();
  const heatmap = heatmapsData?.daily_completion_heatmap ?? [];
  const maxCompleted = Math.max(1, ...heatmap.map((d) => d.completed));
  const heatmapByDate: Record<string, DayCounts> = Object.fromEntries(
    heatmap.map((d) => [d.date, { completed: d.completed, skipped: d.skipped, failed: d.failed }]),
  );

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 overflow-hidden">
      <div className="px-4 sm:px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-semibold text-white">Completion heatmaps</h3>
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      </div>
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 inline-flex items-center gap-1.5">
            Daily completions (30d)
          </p>
          <HeatmapCells days={DAYS_30} byDate={heatmapByDate} maxCompleted={maxCompleted} />
        </div>
        {heatmapsData?.activity_heatmaps && heatmapsData.activity_heatmaps.length > 0 && (
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Per-activity (30d)</p>
            <div className="space-y-4">
              {heatmapsData.activity_heatmaps.map(({ activity_uuid, name, heatmap: activityHeatmap }) => {
                const activityMaxCompleted = Math.max(1, ...activityHeatmap.map((d) => d.completed));
                const activityByDate: Record<string, DayCounts> = Object.fromEntries(
                  activityHeatmap.map((d) => [d.date, { completed: d.completed, skipped: d.skipped, failed: d.failed }]),
                );
                return (
                  <div key={activity_uuid} className="space-y-2">
                    <p className="text-sm font-medium text-slate-200 truncate">{name}</p>
                    <HeatmapCells days={DAYS_30} byDate={activityByDate} maxCompleted={activityMaxCompleted} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
