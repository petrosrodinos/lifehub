export interface BusinessSettings {
  vat_payment_category_uuid: string | null
  vat_payment_subcategory_uuid: string | null
}

export interface UpdateBusinessSettingsDto {
  vat_payment_category_uuid: string | null
  vat_payment_subcategory_uuid: string | null
}
