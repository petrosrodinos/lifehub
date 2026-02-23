export interface PriceEvolutionPoint {
    date: string
    unit_price: number
    store_name: string | null
}

export interface PriceEvolutionQuery {
    product_uuid: string
    from_date?: string
    to_date?: string
}
