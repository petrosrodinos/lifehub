import { DollarSign } from "lucide-react";

export function ExpensesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Expenses</h1>
          <p className="text-slate-400 mt-1 text-sm">Track your spending</p>
        </header>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-12 text-center border border-slate-700/50">
          <div className="text-amber-400/60 mb-6">
            <DollarSign className="w-20 h-20 mx-auto" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold text-slate-200 mb-3">Track Your Expenses</h2>
          <p className="text-slate-400 text-sm">This feature is coming soon. Manage your budget and analyze spending patterns.</p>
        </div>
      </div>
    </div>
  );
}
