import { useState, useMemo, useCallback } from "react"
import { useSpendingPerStore } from "../../../features/receipts/expense-receipt-item/hooks/use-expense-receipt-item"
import { formatDateForQuery } from "../utils/analytics.utils"

export function useStorePurchasesFilters() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const queryParams = useMemo(() => {
    const params: { from_date?: string; to_date?: string } = {}
    if (fromDate) {
      params.from_date = formatDateForQuery(new Date(fromDate))
    }
    if (toDate) {
      const endDate = new Date(toDate)
      endDate.setHours(23, 59, 59, 999)
      params.to_date = formatDateForQuery(endDate)
    }
    return params
  }, [fromDate, toDate])

  const { data: spendingData, isLoading: isSpendingLoading } =
    useSpendingPerStore(queryParams)

  const handleFromDateChange = useCallback((date: string) => {
    setFromDate(date)
  }, [])

  const handleToDateChange = useCallback((date: string) => {
    setToDate(date)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFromDate("")
    setToDate("")
  }, [])

  return {
    fromDate,
    toDate,
    spendingData,
    isSpendingLoading,
    handleFromDateChange,
    handleToDateChange,
    handleClearFilters,
  }
}
