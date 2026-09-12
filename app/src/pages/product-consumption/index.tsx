import { useState } from "react";
import { DashboardSection } from "./components/dashboard/DashboardSection";
import { ProductsSection } from "./components/products/ProductsSection";
import { ComparisonSection } from "./components/comparison/ComparisonSection";

const TAB_OPTIONS = {
  DASHBOARD: "dashboard",
  PRODUCTS: "products",
  COMPARISON: "comparison",
} as const;

type TabOption = (typeof TAB_OPTIONS)[keyof typeof TAB_OPTIONS];

const TABS: { value: TabOption; label: string }[] = [
  { value: TAB_OPTIONS.DASHBOARD, label: "Dashboard" },
  { value: TAB_OPTIONS.PRODUCTS, label: "Products" },
  { value: TAB_OPTIONS.COMPARISON, label: "Comparison" },
];

export function ProductConsumptionPage() {
  const [activeTab, setActiveTab] = useState<TabOption>(TAB_OPTIONS.DASHBOARD);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)] -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Products</h1>
          <p className="text-sm text-slate-400 mt-1">What each purchase actually costs you while you use it.</p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-1 md:w-auto md:inline-flex">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 md:flex-initial px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.value ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === TAB_OPTIONS.DASHBOARD && <DashboardSection />}
          {activeTab === TAB_OPTIONS.PRODUCTS && <ProductsSection />}
          {activeTab === TAB_OPTIONS.COMPARISON && <ComparisonSection />}
        </div>
      </div>
    </div>
  );
}
