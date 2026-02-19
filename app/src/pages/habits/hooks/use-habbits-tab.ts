import { useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type { ActivityHabitItem } from '../../../features/activities/interfaces/activities.interface'
import type { ActivityLog } from '../../../features/habbits/activity-logs/interfaces/activity-logs.interface'
import { OccurrenceStatuses, type OccurrenceStatus } from '../../../features/habbits/activity-occurrences/interfaces/activity-occurrences.interface'
import type { UpdateActivityScheduleDto } from '../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import { useActivityHabbits, useActivityProgressSummary, useHabitOverview } from '../../../features/activities/hooks/use-activities'
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
  habbits: ['habbits', 'activities', 'occurrences'],
  logs: ['habbits', 'activity-logs'],
  overview: ['habbits', 'analytics', 'overview'],
}

type OccurrencePatch = {
  occurrenceUuid: string
  status: OccurrenceStatus
}

function patchOccurrenceStatus(
  items: ActivityHabitItem[] | undefined,
  patch: OccurrencePatch,
): ActivityHabitItem[] | undefined {
  if (!items) return items
  return items.map((item) =>
    item.occurrence_uuid === patch.occurrenceUuid ? { ...item, status: patch.status } : item,
  )
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

  const activitiesQuery = useActivityHabbits()
  const overviewQuery = useHabitOverview()

  const todayHabits: ActivityTodayItem[] = activitiesQuery.data ?? []

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
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.habbits })
      const previousItems = queryClient.getQueryData<ActivityHabitItem[]>(QUERY_KEYS.habbits)
      queryClient.setQueryData<ActivityHabitItem[]>(
        QUERY_KEYS.habbits,
        patchOccurrenceStatus(previousItems, { occurrenceUuid, status: OccurrenceStatuses.COMPLETED }),
      )
      return { previousItems }
    },
    onSuccess: () => {
      toast.success('Occurrence completed', { duration: 1600 })
    },
    onError: (error, _, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(QUERY_KEYS.habbits, context.previousItems)
      }
      toast.error(error.message || 'Could not complete occurrence')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.habbits })
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
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.habbits })
      const previousItems = queryClient.getQueryData<ActivityHabitItem[]>(QUERY_KEYS.habbits)
      queryClient.setQueryData<ActivityHabitItem[]>(
        QUERY_KEYS.habbits,
        patchOccurrenceStatus(previousItems, { occurrenceUuid, status: OccurrenceStatuses.SKIPPED }),
      )
      return { previousItems }
    },
    onSuccess: () => {
      toast.success('Occurrence skipped', { duration: 1600 })
    },
    onError: (error, _, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(QUERY_KEYS.habbits, context.previousItems)
      }
      toast.error(error.message || 'Could not skip occurrence')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.habbits })
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.habbits })
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
