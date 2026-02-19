import {
  useActivityProgressSummary,
  useHabitOverview,
} from '../../../../features/activities/hooks/use-activities'
import { useHabitsPageContext } from '../../context/habits-page.context'
import type { ActivityProgressSummaryData } from '../../interfaces/habbits-tab.interface'

export function useHabitsProgress(): { progressSummary: ActivityProgressSummaryData } {
  const { selectedActivityUuid } = useHabitsPageContext()
  const progressSummaryQuery = useActivityProgressSummary(selectedActivityUuid)
  const overviewQuery = useHabitOverview()

  const progressSummary: ActivityProgressSummaryData = {
    completionRate7d:
      progressSummaryQuery.data?.completion_rate_7d ??
      overviewQuery.data?.completion_rate_last_7_days ??
      0,
    completionRate30d: progressSummaryQuery.data?.completion_rate_30d ?? 0,
    quantityTotal30d: progressSummaryQuery.data?.quantity_total_30d ?? 0,
    frequencySuccessRate: progressSummaryQuery.data?.frequency_success_rate ?? null,
  }

  return { progressSummary }
}
