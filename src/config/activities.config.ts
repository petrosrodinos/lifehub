export const ACTIVITIES_STORAGE_KEY = 'tracker-activities' as const

export type Activity = {
  id: string
  name: string
  color: string
}

export const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'hustle', name: 'hustle', color: '#f59e0b' },
  { id: 'work', name: 'work', color: '#0284c7' },
  { id: 'gym', name: 'gym', color: '#10b981' },
  { id: 'meditation', name: 'meditation', color: '#8b5cf6' },
  { id: 'book', name: 'book', color: '#f43f5e' },
  { id: 'cook', name: 'cook', color: '#f97316' },
  { id: 'box', name: 'box', color: '#dc2626' },
]
