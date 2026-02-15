export function formatAccountBalance(balance: string | number) {
  const numericBalance = typeof balance === 'string' ? parseFloat(balance) : balance
  const isNegative = numericBalance < 0
  const absoluteValue = Math.abs(numericBalance)

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absoluteValue)

  return {
    formatted: isNegative ? `-${formatted}` : formatted,
    isNegative,
    numeric: numericBalance,
  }
}
