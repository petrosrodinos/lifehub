import type { ActivityHabitItem } from '../../../activities/interfaces/activities.interface'
import type { OccurrenceStatus } from '../interfaces/activity-occurrences.interface'

type OccurrencePatch = {
  occurrenceUuid: string
  status: OccurrenceStatus
}

export function patchOccurrenceStatus(
  items: ActivityHabitItem[] | undefined,
  patch: OccurrencePatch,
): ActivityHabitItem[] | undefined {
  if (!items) return items
  return items.map((item) =>
    item.occurrence_uuid === patch.occurrenceUuid ? { ...item, status: patch.status } : item,
  )
}
