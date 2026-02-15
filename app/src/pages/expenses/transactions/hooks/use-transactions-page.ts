import { useState } from 'react'

export function useTransactionsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  return {
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    currentPage,
    setCurrentPage,
  }
}
