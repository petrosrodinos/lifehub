import { useDashboardSummary } from "../../../../features/product-consumption/product-purchases/hooks/use-product-purchases";
import { formatCurrency } from "../../../../utils/format-currency.utils";
import { DashboardStatTile } from "./DashboardStatTile";
import { FinishingSoonList } from "./FinishingSoonList";

export function DashboardSection() {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl border border-slate-800/50 bg-slate-900/40 animate-pulse" />
        ))}
      </div>
    );
  }

  const hasProvisional = (data?.provisional_count ?? 0) > 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStatTile label="Active Products" value={String(data?.active_products ?? 0)} color="violet" icon="📦" />
        <DashboardStatTile
          label="Daily Cost"
          value={formatCurrency(data?.total_daily_cost ?? 0)}
          color="red"
          icon="📅"
          hint={hasProvisional ? `Includes ${data?.provisional_count} in-progress estimate${data?.provisional_count === 1 ? "" : "s"}` : undefined}
        />
        <DashboardStatTile label="Monthly Cost" value={formatCurrency(data?.total_monthly_cost ?? 0)} color="amber" icon="🗓️" />
        <DashboardStatTile label="Annual Cost" value={formatCurrency(data?.total_annual_cost ?? 0)} color="green" icon="📈" />
      </div>

      <FinishingSoonList purchases={data?.finishing_soon ?? []} />
    </div>
  );
}
