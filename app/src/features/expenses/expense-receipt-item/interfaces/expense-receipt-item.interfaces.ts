import type { ExpenseReceipt } from '../../expense-receipt/interfaces/expense-receipt.interfaces'

export interface ExpenseReceiptItem {
    id?: number
    uuid: string
    receipt_uuid: string
    product_uuid?: string
    name: string
    quantity: string | number
    unit_price: string | number
    total_price: string | number
    created_at?: string
    updated_at?: string
    receipt?: ExpenseReceipt
}

export interface CreateExpenseReceiptItemDto {
    receipt_uuid: string
    name: string
    quantity?: number
    unit_price: number
    total_price: number
    product_uuid?: string
}

export interface UpdateExpenseReceiptItemDto {
    name?: string
    quantity?: number
    unit_price?: number
    total_price?: number
    product_uuid?: string
}
