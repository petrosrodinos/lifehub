import { useState } from 'react'
import type { ExpenseEntry } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'

export function useTransactionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [duplicateFrom, setDuplicateFrom] = useState<ExpenseEntry | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const openCreateModal = () => {
    setDuplicateFrom(null)
    setIsCreateModalOpen(true)
  }

  const openDuplicateModal = (transaction: ExpenseEntry) => {
    setDuplicateFrom(transaction)
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    setDuplicateFrom(null)
  }

  return {
    isCreateModalOpen,
    duplicateFrom,
    openCreateModal,
    openDuplicateModal,
    closeCreateModal,
    currentPage,
    setCurrentPage,
  }
}
