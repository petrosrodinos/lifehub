import type { ExpenseReceipt } from "../../expense-receipt/interfaces/expense-receipt.interfaces"

export interface ExpenseStore {
    id?: number
    uuid: string
    user_uuid?: string
    name: string
    created_at?: string
    updated_at?: string
    receipts?: ExpenseReceipt[]
}

export interface CreateExpenseStoreDto {
    name: string
}

export interface UpdateExpenseStoreDto {
    name?: string
}
