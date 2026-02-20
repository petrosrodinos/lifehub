import { useState } from 'react'
import {
  useAllActivitySchedules,
  useDeleteActivitySchedule,
  useUpdateActivitySchedule,
} from '../../../../features/habbits/activity-schedules/hooks/use-activity-schedules'
import type {
  ActivitySchedule,
  UpdateActivityScheduleDto,
} from '../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'

export function useHabitsActivitySchedules() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingScheduleUuid, setEditingScheduleUuid] = useState<string | null>(null)
  const [deletingSchedule, setDeletingSchedule] = useState<ActivitySchedule | null>(null)
  const [selectedScheduleUuid, setSelectedScheduleUuid] = useState<string | null>(null)

  const schedulesQuery = useAllActivitySchedules(isDrawerOpen)
  const updateMutation = useUpdateActivitySchedule()
  const deleteMutation = useDeleteActivitySchedule()

  function openDrawer() {
    setIsDrawerOpen(true)
  }

  function closeDrawer() {
    setIsDrawerOpen(false)
    setEditingScheduleUuid(null)
    setSelectedScheduleUuid(null)
    setIsCreateOpen(false)
    setDeletingSchedule(null)
  }

  function updateSchedule(schedule: ActivitySchedule, data: UpdateActivityScheduleDto) {
    updateMutation.mutate(
      { uuid: schedule.uuid, data, activityUuid: schedule.activity_uuid },
      { onSuccess: () => setEditingScheduleUuid(null) },
    )
  }

  function confirmDelete() {
    if (!deletingSchedule) return
    deleteMutation.mutate(
      { schedule_uuid: deletingSchedule.uuid, activity_uuid: deletingSchedule.activity_uuid },
      { onSuccess: () => setDeletingSchedule(null) },
    )
  }

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    isCreateOpen,
    setIsCreateOpen,
    editingScheduleUuid,
    setEditingScheduleUuid,
    selectedScheduleUuid,
    setSelectedScheduleUuid,
    deletingSchedule,
    setDeletingSchedule,
    schedules: schedulesQuery.data ?? [],
    isLoading: schedulesQuery.isLoading,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    updateSchedule,
    confirmDelete,
  }
}
