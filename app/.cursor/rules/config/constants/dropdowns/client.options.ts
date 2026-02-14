import { EntityTypes, VatStatuses } from "@/features/clients/interfaces/clients.interfaces";

export const EntityTypeLabels = {
  [EntityTypes.SOLE_TRADER]: "Sole Trader",
  [EntityTypes.LIMITED_COMPANY]: "Limited Company",
  [EntityTypes.PARTNERSHIP]: "Partnership",
  [EntityTypes.LLP]: "LLP",
} as const;

export const VatStatusLabels = {
  [VatStatuses.REGISTERED]: "Registered",
  [VatStatuses.NOT_REGISTERED]: "Not Registered",
  [VatStatuses.EXEMPT]: "Exempt",
} as const;

export const EntityTypeOptions = [
  {
    label: EntityTypeLabels[EntityTypes.SOLE_TRADER],
    value: EntityTypes.SOLE_TRADER,
  },
  {
    label: EntityTypeLabels[EntityTypes.LIMITED_COMPANY],
    value: EntityTypes.LIMITED_COMPANY,
  },
  {
    label: EntityTypeLabels[EntityTypes.PARTNERSHIP],
    value: EntityTypes.PARTNERSHIP,
  },
  {
    label: EntityTypeLabels[EntityTypes.LLP],
    value: EntityTypes.LLP,
  },
] as const;

export const VatStatusOptions = [
  {
    label: VatStatusLabels[VatStatuses.REGISTERED],
    value: VatStatuses.REGISTERED,
  },
  {
    label: VatStatusLabels[VatStatuses.NOT_REGISTERED],
    value: VatStatuses.NOT_REGISTERED,
  },
  {
    label: VatStatusLabels[VatStatuses.EXEMPT],
    value: VatStatuses.EXEMPT,
  },
] as const;

export type EntityTypeLabel = (typeof EntityTypeLabels)[keyof typeof EntityTypeLabels];
export type VatStatusLabel = (typeof VatStatusLabels)[keyof typeof VatStatusLabels];
