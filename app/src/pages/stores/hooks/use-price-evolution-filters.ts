import { useState, useMemo, useCallback } from "react"
import { useExpenseProducts } from "../../../features/receipts/expense-products/hooks/use-expense-products"
import { usePriceEvolution } from "../../../features/receipts/expense-receipt-item/hooks/use-expense-receipt-item"
import { formatDateForQuery } from "../utils/analytics.utils"

export function usePriceEvolutionFilters() {
    const [selectedProductUuid, setSelectedProductUuid] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")

    const { data: products, isLoading: isProductsLoading } =
        useExpenseProducts()

    const queryParams = useMemo(() => {
        const params: {
            product_uuid: string
            from_date?: string
            to_date?: string
        } = {
            product_uuid: selectedProductUuid,
        }

        if (fromDate) {
            params.from_date = formatDateForQuery(new Date(fromDate))
        }

        if (toDate) {
            const endDate = new Date(toDate)
            endDate.setHours(23, 59, 59, 999)
            params.to_date = formatDateForQuery(endDate)
        }

        return params
    }, [selectedProductUuid, fromDate, toDate])

    const { data: priceData, isLoading: isPriceLoading } =
        usePriceEvolution(queryParams)

    const handleProductChange = useCallback((uuid: string) => {
        setSelectedProductUuid(uuid)
    }, [])

    const handleFromDateChange = useCallback((date: string) => {
        setFromDate(date)
    }, [])

    const handleToDateChange = useCallback((date: string) => {
        setToDate(date)
    }, [])

    const handleClearDates = useCallback(() => {
        setFromDate("")
        setToDate("")
    }, [])

    return {
        selectedProductUuid,
        fromDate,
        toDate,
        products,
        isProductsLoading,
        priceData,
        isPriceLoading,
        handleProductChange,
        handleFromDateChange,
        handleToDateChange,
        handleClearDates,
    }
}
