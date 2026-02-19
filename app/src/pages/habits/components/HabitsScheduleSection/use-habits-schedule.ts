import { useMemo } from 'react'
import { useActivityHabbits } from '../../../../features/activities/hooks/use-activities'
import { useUpdateActivitySchedule } from '../../../../features/habbits/activity-schedules/hooks/use-activity-schedules'
import { useHabitsPageContext } from '../../context/habits-page.context'
import type { ActivityTodayItem } from '../../interfaces/habbits-tab.interface'
import type { UpdateActivityScheduleDto } from '../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'

export function useHabitsSchedule() {
  const { selectedActivityUuid } = useHabitsPageContext()
  const activitiesQuery = useActivityHabbits()
  const todayHabits: ActivityTodayItem[] = activitiesQuery.data ?? []

  const selectedHabit = useMemo(
    () => todayHabits.find((item) => item.activity.uuid === selectedActivityUuid) ?? null,
    [todayHabits, selectedActivityUuid],
  )

  const updateScheduleMutation = useUpdateActivitySchedule()

  async function saveSchedule(scheduleUuid: string, data: UpdateActivityScheduleDto): Promise<void> {
    await updateScheduleMutation.mutateAsync({
      uuid: scheduleUuid,
      data,
      activityUuid: selectedActivityUuid ?? undefined,
    })
  }

  return {
    selectedHabit,
    isScheduleSaving: updateScheduleMutation.isPending,
    saveSchedule,
  }
}
