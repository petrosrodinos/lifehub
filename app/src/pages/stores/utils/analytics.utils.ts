export const formatPriceEvolutionDate = (isoDate: string): string => {
    const date = new Date(isoDate)

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
    })
}

export const formatDateForQuery = (date: Date): string => {
    return date.toISOString()
}
