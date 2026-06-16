import { formatCurrency } from '../../../utils/format-currency.utils'

export function formatAccountBalance(balance: string | number) {
  const numericBalance = typeof balance === 'string' ? parseFloat(balance) : balance
  const isNegative = numericBalance < 0
  const formatted = formatCurrency(Math.abs(numericBalance))

  return {
    formatted: isNegative ? `-${formatted}` : formatted,
    isNegative,
    numeric: numericBalance,
  }
}
