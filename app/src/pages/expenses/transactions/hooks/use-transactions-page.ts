import { useState } from 'react'
import type { ExpenseEntry } from '../../../../features/expenses/expense-entries/interfaces/expense-entries.interfaces'

export function useTransactionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false)
  const [duplicateFrom, setDuplicateFrom] = useState<ExpenseEntry | null>(null)
  const [presetFrom, setPresetFrom] = useState<ExpenseEntry | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const openCreateModal = () => {
    setDuplicateFrom(null)
    setIsCreateModalOpen(true)
  }

  const openDuplicateModal = (transaction: ExpenseEntry) => {
    setDuplicateFrom(transaction)
    setIsCreateModalOpen(true)
  }

  const openPresetModal = (transaction: ExpenseEntry) => {
    setPresetFrom(transaction)
    setIsPresetModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    setDuplicateFrom(null)
  }

  const closePresetModal = () => {
    setIsPresetModalOpen(false)
    setPresetFrom(null)
  }

  return {
    isCreateModalOpen,
    isPresetModalOpen,
    duplicateFrom,
    presetFrom,
    openCreateModal,
    openDuplicateModal,
    openPresetModal,
    closeCreateModal,
    closePresetModal,
    currentPage,
    setCurrentPage,
  }
}
