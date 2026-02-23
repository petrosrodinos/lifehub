export interface PurchasedProductPoint {
    name: string
    total_quantity: number
    total_amount: number
}

export interface PurchasedProductsQuery {
    store_uuid?: string
    from_date?: string
    to_date?: string
}
