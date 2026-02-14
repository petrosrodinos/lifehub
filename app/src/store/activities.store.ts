import { create } from 'zustand'
import { loadActivities, saveActivities } from '../utils/storage.utils'
import { DEFAULT_ACTIVITIES } from '../config/activities.config'
import type { Activity } from '../config/activities.config'

type ActivitiesState = {
  activities: Activity[]
  addActivity: (name: string, color: string) => void
  updateActivity: (id: string, updates: Partial<Pick<Activity, 'name' | 'color'>>) => void
  removeActivity: (id: string) => void
  resetToDefault: () => void
  getColor: (name: string) => string
  getColorMap: () => Record<string, string>
}

function generateId(): string {
  return crypto.randomUUID().slice(0, 8)
}

export const useActivitiesStore = create<ActivitiesState>((set, get) => ({
  activities: loadActivities(),

  addActivity: (name: string, color: string) => {
    const trimmed = name.trim().toLowerCase()
    if (!trimmed) return
    const activities = get().activities
    if (activities.some((a) => a.name.toLowerCase() === trimmed)) return
    const next: Activity[] = [
      ...activities,
      { id: generateId(), name: trimmed, color },
    ]
    set({ activities: next })
    saveActivities(next)
  },

  updateActivity: (id: string, updates: Partial<Pick<Activity, 'name' | 'color'>>) => {
    const next = get().activities.map((a) =>
      a.id === id
        ? {
            ...a,
            ...(updates.name !== undefined && { name: updates.name.trim().toLowerCase() }),
            ...(updates.color !== undefined && { color: updates.color }),
          }
        : a
    )
    set({ activities: next })
    saveActivities(next)
  },

  removeActivity: (id: string) => {
    const next = get().activities.filter((a) => a.id !== id)
    set({ activities: next })
    saveActivities(next)
  },

  resetToDefault: () => {
    const next = structuredClone(DEFAULT_ACTIVITIES)
    set({ activities: next })
    saveActivities(next)
  },

  getColor: (name: string) => {
    const normalized = name.toLowerCase().split(',')[0].trim()
    const found = get().activities.find((a) => a.name === normalized)
    return found?.color ?? '#64748b'
  },

  getColorMap: () => {
    const map: Record<string, string> = {}
    for (const a of get().activities) {
      map[a.name] = a.color
    }
    return map
  },
}))
