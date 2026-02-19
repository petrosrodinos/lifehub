import { useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { Activity } from '../../../features/activities/interfaces/activities.interface'
import type { ActivityLog } from '../../../features/habbits/activity-logs/interfaces/activity-logs.interface'
import { OccurrenceStatuses, type OccurrenceStatus } from '../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import type { UpdateActivityScheduleDto } from '../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import { useActivityOccurrences, useActivityProgressSummary, useHabitOverview } from '../../../features/activities/hooks/use-activities'
import { useActivityLogs } from '../../../features/habbits/activity-logs/hooks/use-activity-logs'
import { completeActivityOccurrence, skipActivityOccurrence } from '../../../features/habbits/activity-occurrences/services/activity-occurrences'
import { updateActivitySchedule } from '../../../features/habbits/activity-schedules/services/activity-schedules'
import type {
  ActivityProgressSummaryData,
  ActivityTodayItem,
  GroupedActivityLogs,
  OccurrenceCompletionPayload,
  OccurrenceSkipPayload,
  ScheduleUpdatePayload,
} from '../interfaces/habbits-tab.interface'

const QUERY_KEYS = {
  activities: ['activities'],
  logs: ['habbits', 'activity-logs'],
  overview: ['habbits', 'analytics', 'overview'],
}

type OccurrencePatch = {
  activityUuid: string
  status: OccurrenceStatus
}

function patchOccurrenceStatus(
  activities: Activity[] | undefined,
  patch: OccurrencePatch,
): Activity[] | undefined {
  if (!activities) return activities

  return activities.map((activity) => {
    if (activity.uuid !== patch.activityUuid || !activity.today_occurrence) {
      return activity
    }
    return {
      ...activity,
      today_occurrence: {
        ...activity.today_occurrence,
        status: patch.status,
      },
    }
  })
}

function parseTimeOfDay(timeOfDay?: string | null): number {
  if (!timeOfDay) return Number.MAX_SAFE_INTEGER
  const parsed = DateTime.fromFormat(timeOfDay, 'HH:mm:ss')
  if (!parsed.isValid) return Number.MAX_SAFE_INTEGER
  return parsed.hour * 60 + parsed.minute
}

function groupLogsByDate(logs: ActivityLog[]): GroupedActivityLogs[] {
  const grouped = new Map<string, ActivityLog[]>()

  logs.forEach((log) => {
    const key = DateTime.fromISO(log.created_at).toFormat('yyyy-LL-dd')
    const current = grouped.get(key) ?? []
    current.push(log)
    grouped.set(key, current)
  })

  return Array.from(grouped.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, dateLogs]) => ({
      date,
      logs: dateLogs.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
    }))
}

export function useHabbitsTab() {
  const queryClient = useQueryClient()
  const [selectedActivityUuid, setSelectedActivityUuid] = useState<string | null>(null)

  const activitiesQuery = useActivityOccurrences()
  const overviewQuery = useHabitOverview()

  const activities = activitiesQuery.data ?? []

  const todayHabits = useMemo<ActivityTodayItem[]>(() => {
    return activities
      .filter((activity) => activity.visible && activity.today_occurrence)
      .map((activity) => {
        const occurrence = activity.today_occurrence!
        const schedule = activity.current_schedule ?? null

        return {
          activity,
          schedule,
          status: occurrence.status,
          occurrenceUuid: occurrence.uuid,
          quantityValue: occurrence.log?.value ?? null,
        }
      })
      .sort((a, b) => parseTimeOfDay(a.schedule?.time_of_day) - parseTimeOfDay(b.schedule?.time_of_day))
  }, [activities])

  const resolvedSelectedActivityUuid =
    selectedActivityUuid && todayHabits.some((item) => item.activity.uuid === selectedActivityUuid)
      ? selectedActivityUuid
      : todayHabits[0]?.activity.uuid ?? null

  const selectedHabit = useMemo(() => {
    if (!resolvedSelectedActivityUuid) return null
    return todayHabits.find((item) => item.activity.uuid === resolvedSelectedActivityUuid) ?? null
  }, [todayHabits, resolvedSelectedActivityUuid])

  const logsQuery = useActivityLogs(
    resolvedSelectedActivityUuid
      ? { activity_uuid: resolvedSelectedActivityUuid }
      : undefined,
  )
  const selectedLogs = logsQuery.data ?? []

  const groupedSelectedLogs = useMemo(() => groupLogsByDate(selectedLogs), [selectedLogs])

  const progressSummaryQuery = useActivityProgressSummary(resolvedSelectedActivityUuid)

  const selectedSchedule = selectedHabit?.schedule ?? null

  const progressSummary: ActivityProgressSummaryData = {
    completionRate7d: progressSummaryQuery.data?.completion_rate_7d ?? overviewQuery.data?.completion_rate_last_7_days ?? 0,
    completionRate30d: progressSummaryQuery.data?.completion_rate_30d ?? 0,
    quantityTotal30d: progressSummaryQuery.data?.quantity_total_30d ?? 0,
    frequencySuccessRate: progressSummaryQuery.data?.frequency_success_rate ?? null,
  }

  const completeMutation = useMutation({
    mutationFn: ({ occurrenceUuid, value }: OccurrenceCompletionPayload) =>
      completeActivityOccurrence(occurrenceUuid, value !== undefined ? { value } : {}),
    onMutate: async ({ occurrenceUuid }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.activities })
      const previousActivities = queryClient.getQueryData<Activity[]>(QUERY_KEYS.activities)
      const activityUuid =
        previousActivities?.find((activity) => activity.today_occurrence?.uuid === occurrenceUuid)?.uuid ?? null
      if (activityUuid) {
        queryClient.setQueryData<Activity[]>(
          QUERY_KEYS.activities,
          patchOccurrenceStatus(previousActivities, { activityUuid, status: OccurrenceStatuses.COMPLETED }),
        )
      }

      return { previousActivities }
    },
    onSuccess: () => {
      toast.success('Occurrence completed', { duration: 1600 })
    },
    onError: (error, _, context) => {
      if (context?.previousActivities) {
        queryClient.setQueryData(QUERY_KEYS.activities, context.previousActivities)
      }
      toast.error(error.message || 'Could not complete occurrence')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.logs })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overview })
      if (resolvedSelectedActivityUuid) {
        queryClient.invalidateQueries({ queryKey: ['habbits', 'activities', resolvedSelectedActivityUuid, 'progress-summary'] })
      }
    },
  })

  const skipMutation = useMutation({
    mutationFn: ({ occurrenceUuid, skipReason }: OccurrenceSkipPayload) =>
      skipActivityOccurrence(occurrenceUuid, skipReason ? { skip_reason: skipReason } : {}),
    onMutate: async ({ occurrenceUuid }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.activities })
      const previousActivities = queryClient.getQueryData<Activity[]>(QUERY_KEYS.activities)
      const activityUuid =
        previousActivities?.find((activity) => activity.today_occurrence?.uuid === occurrenceUuid)?.uuid ?? null
      if (activityUuid) {
        queryClient.setQueryData<Activity[]>(
          QUERY_KEYS.activities,
          patchOccurrenceStatus(previousActivities, { activityUuid, status: OccurrenceStatuses.SKIPPED }),
        )
      }

      return { previousActivities }
    },
    onSuccess: () => {
      toast.success('Occurrence skipped', { duration: 1600 })
    },
    onError: (error, _, context) => {
      if (context?.previousActivities) {
        queryClient.setQueryData(QUERY_KEYS.activities, context.previousActivities)
      }
      toast.error(error.message || 'Could not skip occurrence')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.logs })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overview })
      if (resolvedSelectedActivityUuid) {
        queryClient.invalidateQueries({ queryKey: ['habbits', 'activities', resolvedSelectedActivityUuid, 'progress-summary'] })
      }
    },
  })

  const updateScheduleMutation = useMutation({
    mutationFn: ({ scheduleUuid, data }: ScheduleUpdatePayload) => updateActivitySchedule(scheduleUuid, data),
    onSuccess: () => {
      toast.success('Schedule updated for future occurrences', { duration: 2000 })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Could not update schedule')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activities })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.logs })
      if (resolvedSelectedActivityUuid) {
        queryClient.invalidateQueries({ queryKey: ['habbits', 'activities', resolvedSelectedActivityUuid, 'progress-summary'] })
      }
    },
  })

  function canComplete(status: OccurrenceStatus) {
    return status === OccurrenceStatuses.PENDING
  }

  function canSkip(status: OccurrenceStatus) {
    return status === OccurrenceStatuses.PENDING
  }

  async function completeOccurrence(occurrenceUuid: string, status: OccurrenceStatus, value?: number) {
    if (!canComplete(status)) {
      toast('This occurrence is already completed')
      return
    }
    await completeMutation.mutateAsync({ occurrenceUuid, value })
  }

  async function skipOccurrence(occurrenceUuid: string, status: OccurrenceStatus) {
    if (!canSkip(status)) {
      toast('Skipping after completion is not allowed')
      return
    }
    await skipMutation.mutateAsync({ occurrenceUuid })
  }

  async function saveSchedule(scheduleUuid: string, data: UpdateActivityScheduleDto) {
    await updateScheduleMutation.mutateAsync({ scheduleUuid, data })
  }

  const completedToday = todayHabits.filter((habit) => habit.status === OccurrenceStatuses.COMPLETED).length
  const totalToday = todayHabits.length

  return {
    todayHabits,
    selectedHabit,
    selectedSchedule,
    selectedLogs,
    groupedSelectedLogs,
    progressSummary,
    overview: overviewQuery.data,
    completedToday,
    totalToday,
    isLoading: activitiesQuery.isLoading || overviewQuery.isLoading,
    isActionPending: completeMutation.isPending || skipMutation.isPending,
    isScheduleSaving: updateScheduleMutation.isPending,
    hasError: activitiesQuery.isError || overviewQuery.isError,
    setSelectedActivityUuid,
    completeOccurrence,
    skipOccurrence,
    saveSchedule,
  }
}
