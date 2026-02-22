import { useState } from "react"

export function useStoresPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const openCreateModal = () => setIsCreateModalOpen(true)

    const closeCreateModal = () => setIsCreateModalOpen(false)

    return {
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
    }
}
