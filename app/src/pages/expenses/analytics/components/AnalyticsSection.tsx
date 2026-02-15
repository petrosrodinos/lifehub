import { useState } from "react";
import { AccountOverview } from "./account-overview";
import { CategoryBreakdown } from "./category-breakdown";

const ANALYTICS_TAB_OPTIONS = {
  OVERVIEW: "overview",
  CATEGORIES: "categories",
} as const;

type AnalyticsTabOption = (typeof ANALYTICS_TAB_OPTIONS)[keyof typeof ANALYTICS_TAB_OPTIONS];

export function AnalyticsSection() {
  const [activeTab, setActiveTab] = useState<AnalyticsTabOption>(ANALYTICS_TAB_OPTIONS.OVERVIEW);

  return (
    <div className="space-y-6">
      <div className="flex gap-3 border-b border-slate-800/50 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab(ANALYTICS_TAB_OPTIONS.OVERVIEW)}
          className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
            activeTab === ANALYTICS_TAB_OPTIONS.OVERVIEW
              ? "text-violet-400 border-violet-400"
              : "text-slate-400 border-transparent hover:text-slate-300"
          }`}
        >
          Account Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(ANALYTICS_TAB_OPTIONS.CATEGORIES)}
          className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
            activeTab === ANALYTICS_TAB_OPTIONS.CATEGORIES
              ? "text-violet-400 border-violet-400"
              : "text-slate-400 border-transparent hover:text-slate-300"
          }`}
        >
          Category Breakdown
        </button>
      </div>

      {activeTab === ANALYTICS_TAB_OPTIONS.OVERVIEW && <AccountOverview />}

      {activeTab === ANALYTICS_TAB_OPTIONS.CATEGORIES && <CategoryBreakdown />}
    </div>
  );
}
