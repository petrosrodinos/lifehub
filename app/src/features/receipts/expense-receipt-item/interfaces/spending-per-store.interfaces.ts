export interface SpendingPerStorePoint {
  name: string
  total_amount: number
}

export interface SpendingPerStoreQuery {
  from_date?: string
  to_date?: string
}
