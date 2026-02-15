export const formatDate = (value: string) => {
    const date = new Date(value);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);

}

export const formatAmount = (value: any) => {
    const amount = typeof value === "string" ? parseFloat(value) : value;

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Math.abs(amount));
}