import { useState } from 'react'
import { useAllActivitySchedules } from '../../../../features/habbits/activity-schedules/hooks/use-activity-schedules'

export function useHabitsActivitySchedules() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedScheduleUuid, setSelectedScheduleUuid] = useState<string | null>(null)

  const schedulesQuery = useAllActivitySchedules(isDrawerOpen)

  function openDrawer() {
    setIsDrawerOpen(true)
  }

  function closeDrawer() {
    setIsDrawerOpen(false)
    setSelectedScheduleUuid(null)
    setIsCreateOpen(false)
  }

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    isCreateOpen,
    setIsCreateOpen,
    selectedScheduleUuid,
    setSelectedScheduleUuid,
    schedules: schedulesQuery.data ?? [],
    isLoading: schedulesQuery.isLoading,
  }
}
