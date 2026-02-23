import type { ExpenseCategory } from '../../../expenses/expense-categories/interfaces/expense-categories.interfaces'
import type { ExpenseSubcategory } from '../../../expenses/expense-subcategories/interfaces/expense-subcategories.interfaces'

export interface ExpenseProduct {
    id?: number
    uuid: string
    user_uuid?: string
    name: string
    brand?: string
    unit?: string
    size?: string | number
    category_uuid?: string
    subcategory_uuid?: string
    created_at?: string
    updated_at?: string
    category?: ExpenseCategory
    subcategory?: ExpenseSubcategory
}

export interface CreateExpenseProductDto {
    name: string
    brand?: string
    unit?: string
    size?: number
    category_uuid?: string
    subcategory_uuid?: string
}

export interface UpdateExpenseProductDto {
    name?: string
    brand?: string
    unit?: string
    size?: number
    category_uuid?: string
    subcategory_uuid?: string
}
