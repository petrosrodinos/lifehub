const CURRENCY_LOCALE = 'de-DE'
const CURRENCY_CODE = 'EUR'

type FormatCurrencyOptions = {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  absolute?: boolean
}

export function formatCurrency(
  value: string | number,
  options: FormatCurrencyOptions = {},
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    absolute = false,
  } = options

  const numericValue = typeof value === 'string' ? parseFloat(value) : value
  const amount = absolute ? Math.abs(numericValue) : numericValue

  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}
