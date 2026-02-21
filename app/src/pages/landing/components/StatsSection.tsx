import { STATS } from "../constants/landing.constants";

export const StatsSection = () => {
  return (
    <section className="relative py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8 sm:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>

                <div className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
