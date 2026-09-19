export type VatPeriod = {
  year: number;
  month: number;
};

export const getPreviousMonthPeriod = (datetimeLocalValue: string): VatPeriod => {
  const parsed = new Date(datetimeLocalValue);
  const date = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  const monthIndex = date.getMonth();

  if (monthIndex === 0) {
    return { year: date.getFullYear() - 1, month: 12 };
  }

  return { year: date.getFullYear(), month: monthIndex };
};

export const formatVatPeriod = (year: number, month: number): string =>
  new Date(year, month - 1).toLocaleString("en-US", { month: "short", year: "numeric" });
