import { ProductPurchaseStatuses, type ProductPurchaseStatus } from "../../../features/product-consumption/product-purchases/interfaces/product-purchases.interfaces";

export const formatDate = (value?: string | null) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

export const STATUS_LABELS: Record<ProductPurchaseStatus, string> = {
  [ProductPurchaseStatuses.NOT_STARTED]: "Not started",
  [ProductPurchaseStatuses.ACTIVE]: "Active",
  [ProductPurchaseStatuses.FINISHED]: "Finished",
  [ProductPurchaseStatuses.PAUSED]: "Paused",
  [ProductPurchaseStatuses.DISCARDED]: "Discarded",
};

export const STATUS_BADGE_CLASSES: Record<ProductPurchaseStatus, string> = {
  [ProductPurchaseStatuses.NOT_STARTED]: "text-slate-400 bg-slate-500/10 border-slate-500/30",
  [ProductPurchaseStatuses.ACTIVE]: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  [ProductPurchaseStatuses.FINISHED]: "text-slate-400 bg-slate-500/10 border-slate-500/30",
  [ProductPurchaseStatuses.PAUSED]: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  [ProductPurchaseStatuses.DISCARDED]: "text-red-400 bg-red-500/10 border-red-500/30",
};

export const formatRemainingDays = (days: number | null) => {
  if (days === null) return null;
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Due today";
  return `${days}d left`;
};
