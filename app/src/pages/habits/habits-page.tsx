import { CheckCircle } from "lucide-react";

export function HabitsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Habits</h1>
          <p className="text-slate-400 mt-1 text-sm">Build better routines</p>
        </header>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-12 text-center border border-slate-700/50">
          <div className="text-amber-400/60 mb-6">
            <CheckCircle className="w-20 h-20 mx-auto" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-slate-200 mb-3">Build Better Habits</h2>
          <p className="text-slate-400 text-sm">This feature is coming soon. Track daily habits and build positive routines.</p>
        </div>
      </div>
    </div>
  );
}
