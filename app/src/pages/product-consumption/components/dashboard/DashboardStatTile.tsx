type DashboardStatTileProps = {
  label: string;
  value: string;
  color: "green" | "red" | "violet" | "amber";
  icon: string;
  hint?: string;
};

const COLOR_CLASSES = {
  green: "from-green-600/20 to-green-600/5 border-green-600/30",
  red: "from-red-600/20 to-red-600/5 border-red-600/30",
  violet: "from-violet-600/20 to-violet-600/5 border-violet-600/30",
  amber: "from-amber-600/20 to-amber-600/5 border-amber-600/30",
};

const TEXT_COLOR_CLASSES = {
  green: "text-green-400",
  red: "text-red-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
};

export function DashboardStatTile({ label, value, color, icon, hint }: DashboardStatTileProps) {
  return (
    <div className={`bg-gradient-to-br ${COLOR_CLASSES[color]} backdrop-blur-sm rounded-xl border p-6`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-2xl font-bold ${TEXT_COLOR_CLASSES[color]}`}>{value}</span>
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}
