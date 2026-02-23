import type { ExpenseStore } from '../../expense-store/interfaces/expense-store.interfaces'
import type { ExpenseReceiptItem } from '../../expense-receipt-item/interfaces/expense-receipt-item.interfaces'
import type { ExpenseEntry } from '../../../expenses/expense-entries/interfaces/expense-entries.interfaces'

export interface ExpenseReceipt {
    id?: number
    uuid: string
    user_uuid: string
    store_uuid?: string
    expense_entry_uuid: string
    receipt_date: string
    total_amount: string | number
    created_at?: string
    updated_at?: string
    store?: ExpenseStore
    expense_entry?: ExpenseEntry
    items?: ExpenseReceiptItem[]
}

export interface CreateExpenseReceiptDto {
    expense_entry_uuid: string
    store_uuid?: string
    receipt_date?: string
    total_amount: number
}

export interface UpdateExpenseReceiptDto {
    store_uuid?: string
    receipt_date?: string
    total_amount?: number
}

export interface UploadReceiptDto {
    from_account_uuid: string
}

export interface UploadReceiptPayload {
    file: File
    from_account_uuid: string
}

export interface ExpenseReceiptsQueryParams {
    store_uuid?: string
}
