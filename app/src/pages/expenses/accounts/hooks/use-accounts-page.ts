import { useState } from 'react'

export function useAccountsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  return {
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
  }
}
