import type { ExpenseProduct } from '../../expense-products/interfaces/expense-products.interfaces'
import type { ExpenseReceipt } from '../../expense-receipt/interfaces/expense-receipt.interfaces'

export interface ExpenseReceiptItem {
    id?: number
    uuid: string
    receipt_uuid: string
    product_uuid?: string
    quantity: string | number
    unit_price: string | number
    total_price: string | number
    created_at?: string
    updated_at?: string
    receipt?: ExpenseReceipt
    product?: ExpenseProduct
}

export interface CreateExpenseReceiptItemDto {
    receipt_uuid: string
    quantity?: number
    unit_price: number
    total_price: number
    product_uuid?: string
}

export interface UpdateExpenseReceiptItemDto {
    quantity?: number
    unit_price?: number
    total_price?: number
    product_uuid?: string
}
