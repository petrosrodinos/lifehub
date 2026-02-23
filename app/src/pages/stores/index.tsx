import { useState } from "react";
import { CreateStoreModal } from "./components/store/CreateStoreModal";
import { AnalyticsSection } from "./components/analytics/AnalyticsSection";
import { useStoresPage } from "./hooks/use-stores-page";
import { ReceiptsHeader } from "./components/ReceiptsHeader";

const TAB_OPTIONS = {
  RECEIPTS: "receipts",
  ANALYTICS: "analytics",
} as const;

type TabOption = (typeof TAB_OPTIONS)[keyof typeof TAB_OPTIONS];

export function ReceiptsPage() {
  const { isCreateModalOpen, openCreateModal, closeCreateModal } = useStoresPage();
  const [activeTab, setActiveTab] = useState<TabOption>(TAB_OPTIONS.RECEIPTS);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)] -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-20 -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
        <ReceiptsHeader onCreateClick={openCreateModal} />

        <div className="space-y-6">
          <div className="flex gap-2 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-1 md:w-auto md:inline-flex">
            <button type="button" onClick={() => setActiveTab(TAB_OPTIONS.RECEIPTS)} className={`flex-1 md:flex-initial px-6 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === TAB_OPTIONS.RECEIPTS ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}>
              Receipts
            </button>

            <button type="button" onClick={() => setActiveTab(TAB_OPTIONS.ANALYTICS)} className={`flex-1 md:flex-initial px-6 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === TAB_OPTIONS.ANALYTICS ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}>
              Analytics
            </button>
          </div>

          {activeTab === TAB_OPTIONS.ANALYTICS && <AnalyticsSection />}
        </div>
      </div>

      <CreateStoreModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
    </div>
  );
}
