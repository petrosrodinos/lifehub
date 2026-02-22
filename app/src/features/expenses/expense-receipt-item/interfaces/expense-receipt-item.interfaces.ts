import type { ExpenseReceipt } from '../../expense-receipt/interfaces/expense-receipt.interfaces'
import type { ExpenseCategory } from '../../../expense-categories/interfaces/expense-categories.interfaces'
import type { ExpenseSubcategory } from '../../../expense-subcategories/interfaces/expense-subcategories.interfaces'

export interface ExpenseReceiptItem {
    id?: number
    uuid: string
    receipt_uuid: string
    name: string
    quantity: string | number
    unit_price: string | number
    total_price: string | number
    category_uuid?: string
    subcategory_uuid?: string
    created_at?: string
    updated_at?: string
    receipt?: ExpenseReceipt
    category?: ExpenseCategory
    subcategory?: ExpenseSubcategory
}

export interface CreateExpenseReceiptItemDto {
    receipt_uuid: string
    name: string
    quantity?: number
    unit_price: number
    total_price: number
    category_uuid?: string
    subcategory_uuid?: string
}

export interface UpdateExpenseReceiptItemDto {
    name?: string
    quantity?: number
    unit_price?: number
    total_price?: number
    category_uuid?: string
    subcategory_uuid?: string
}
