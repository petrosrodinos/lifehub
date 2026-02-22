import { useState, useCallback } from 'react'
import {
    useUpdateActivitySchedule,
    useDeleteActivitySchedule,
} from '../../../../../features/habbits/activity-schedules/hooks/use-activity-schedules'
import type {
    ActivitySchedule,
    UpdateActivityScheduleDto,
} from '../../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'

export function useScheduleCard(schedule: ActivitySchedule) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const updateMutation = useUpdateActivitySchedule()
    const deleteMutation = useDeleteActivitySchedule()

    const toggleEdit = useCallback(() => {
        setIsEditOpen((prev) => !prev)
    }, [])

    const closeEdit = useCallback(() => {
        setIsEditOpen(false)
    }, [])

    const saveSchedule = useCallback(
        (data: UpdateActivityScheduleDto) => {
            updateMutation.mutate(
                { uuid: schedule.uuid, data, activityUuid: schedule.activity_uuid },
                { onSuccess: () => setIsEditOpen(false) },
            )
        },
        [updateMutation, schedule.uuid, schedule.activity_uuid],
    )

    const openDeleteConfirmation = useCallback(() => {
        setIsDeleteOpen(true)
    }, [])

    const closeDeleteConfirmation = useCallback(() => {
        setIsDeleteOpen(false)
    }, [])

    const confirmDelete = useCallback(() => {
        deleteMutation.mutate(
            { schedule_uuid: schedule.uuid, activity_uuid: schedule.activity_uuid },
            { onSuccess: () => setIsDeleteOpen(false) },
        )
    }, [deleteMutation, schedule.uuid, schedule.activity_uuid])

    return {
        isEditOpen,
        toggleEdit,
        closeEdit,
        saveSchedule,
        isUpdating: updateMutation.isPending,
        isDeleteOpen,
        openDeleteConfirmation,
        closeDeleteConfirmation,
        confirmDelete,
        isDeleting: deleteMutation.isPending,
    }
}
