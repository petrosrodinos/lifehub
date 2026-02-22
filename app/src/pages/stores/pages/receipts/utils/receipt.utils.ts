export const formatReceiptDate = (value: string): string => {
    const date = new Date(value)

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date)
}

export const formatReceiptAmount = (value: string | number): string => {
    const amount = typeof value === "string" ? parseFloat(value) : value

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount)
}

export const parseNumericValue = (value: string | number): number => {
    return typeof value === "string" ? parseFloat(value) : value
}
