import { useState, useMemo, useCallback } from "react"
import { useExpenseStores } from "../../../features/receipts/expense-store/hooks/use-expense-store"
import { usePurchasedProducts } from "../../../features/receipts/expense-receipt-item/hooks/use-expense-receipt-item"
import { formatDateForQuery } from "../components/utils/analytics.utils"

export function usePurchasedProductsFilters() {
    const [selectedStoreUuid, setSelectedStoreUuid] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")

    const { data: stores, isLoading: isStoresLoading } = useExpenseStores()

    const queryParams = useMemo(() => {
        const params: {
            store_uuid?: string
            from_date?: string
            to_date?: string
        } = {}

        if (selectedStoreUuid) {
            params.store_uuid = selectedStoreUuid
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
    }, [selectedStoreUuid, fromDate, toDate])

    const { data: productsData, isLoading: isProductsLoading } =
        usePurchasedProducts(queryParams)

    const handleStoreChange = useCallback((uuid: string) => {
        setSelectedStoreUuid(uuid)
    }, [])

    const handleFromDateChange = useCallback((date: string) => {
        setFromDate(date)
    }, [])

    const handleToDateChange = useCallback((date: string) => {
        setToDate(date)
    }, [])

    const handleClearFilters = useCallback(() => {
        setSelectedStoreUuid("")
        setFromDate("")
        setToDate("")
    }, [])

    return {
        selectedStoreUuid,
        fromDate,
        toDate,
        stores,
        isStoresLoading,
        productsData,
        isProductsLoading,
        handleStoreChange,
        handleFromDateChange,
        handleToDateChange,
        handleClearFilters,
    }
}
