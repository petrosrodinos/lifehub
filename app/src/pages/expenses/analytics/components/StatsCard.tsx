type StatsCardProps = {
  label: string;
  value: number;
  color: "green" | "red" | "violet";
  icon: string;
};

export function StatsCard({ label, value, color, icon }: StatsCardProps) {
  const colorClasses = {
    green: "from-green-600/20 to-green-600/5 border-green-600/30",
    red: "from-red-600/20 to-red-600/5 border-red-600/30",
    violet: "from-violet-600/20 to-violet-600/5 border-violet-600/30",
  };

  const textColorClasses = {
    green: "text-green-400",
    red: "text-red-400",
    violet: "text-violet-400",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm rounded-xl border p-6`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-2xl font-bold ${textColorClasses[color]}`}>
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
