export const VatPaymentStatuses = {
  NOT_CONFIGURED: "NOT_CONFIGURED",
  NO_VAT_DUE: "NO_VAT_DUE",
  UNPAID: "UNPAID",
  PARTIALLY_PAID: "PARTIALLY_PAID",
  PAID: "PAID",
} as const;

export type VatPaymentStatus = (typeof VatPaymentStatuses)[keyof typeof VatPaymentStatuses];

const toCents = (value: number) => Math.round(value * 100);

export const getVatPaymentStatus = (input: {
  isConfigured: boolean;
  vatToPay: number;
  vatPaid: number;
}): VatPaymentStatus => {
  if (!input.isConfigured) {
    return VatPaymentStatuses.NOT_CONFIGURED;
  }

  const dueCents = toCents(input.vatToPay);
  const paidCents = toCents(input.vatPaid);

  if (paidCents <= 0) {
    return dueCents <= 0 ? VatPaymentStatuses.NO_VAT_DUE : VatPaymentStatuses.UNPAID;
  }

  return paidCents >= dueCents ? VatPaymentStatuses.PAID : VatPaymentStatuses.PARTIALLY_PAID;
};

export const VatPaymentStatusDisplay: Record<Exclude<VatPaymentStatus, "NOT_CONFIGURED">, { label: string; className: string }> = {
  NO_VAT_DUE: { label: "No VAT due", className: "bg-slate-800 text-slate-300" },
  UNPAID: { label: "Unpaid", className: "bg-red-500/15 text-red-400" },
  PARTIALLY_PAID: { label: "Partially paid", className: "bg-amber-500/15 text-amber-400" },
  PAID: { label: "Paid", className: "bg-emerald-500/15 text-emerald-400" },
};
