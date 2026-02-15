import { useNavigate } from "react-router-dom";
import { Wallet, TrendingDown } from "lucide-react";

export function ExpensesPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Accounts",
      description: "Manage your financial accounts and track balances",
      icon: Wallet,
      color: "from-violet-500 to-blue-500",
      route: "/dashboard/expenses/accounts",
    },
    {
      title: "Transactions",
      description: "Record and categorize your expense entries",
      icon: TrendingDown,
      color: "from-emerald-500 to-teal-500",
      route: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Expenses
          </h1>
          <p className="text-slate-400 text-base">
            Track your spending and manage your finances
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isAvailable = feature.route !== null;

            return (
              <button
                key={feature.title}
                onClick={() => isAvailable && navigate(feature.route)}
                disabled={!isAvailable}
                className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 text-left transition-all duration-300 ${
                  isAvailable
                    ? "hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
                {!isAvailable && (
                  <span className="absolute top-4 right-4 text-xs text-slate-500 bg-slate-700/50 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
