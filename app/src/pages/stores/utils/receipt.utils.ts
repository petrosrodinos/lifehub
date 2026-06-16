import { formatCurrency } from "../../../utils/format-currency.utils"

export const formatReceiptDate = (value: string): string => {
    const date = new Date(value)

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date)
}

export const formatReceiptAmount = (value: string | number): string => {
    return formatCurrency(value)
}

export const parseNumericValue = (value: string | number): number => {
    return typeof value === "string" ? parseFloat(value) : value
}
