import type { Activity } from '../interfaces/activities.interface'

export function getActivityColor(activities: Activity[], activityName: string): string {
  const normalized = activityName.toLowerCase().split(',')[0].trim()
  const found = activities.find((a) => a.name.toLowerCase() === normalized)
  return found?.color ?? '#64748b'
}

export function getActivityColorMap(activities: Activity[]): Record<string, string> {
  const map: Record<string, string> = {}
  for (const activity of activities) {
    map[activity.name] = activity.color
  }
  return map
}

export function findActivityByName(activities: Activity[], name: string): Activity | undefined {
  const normalized = name.toLowerCase().trim()
  return activities.find((a) => a.name.toLowerCase() === normalized)
}

export function findActivityByUuid(activities: Activity[], uuid: string): Activity | undefined {
  return activities.find((a) => a.uuid === uuid)
}
