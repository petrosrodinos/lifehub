import type { ScheduleSlot, ScheduleDay } from '../interfaces/routine.interface'

export function sortScheduleSlotsByTime(slots: ScheduleSlot[]): ScheduleSlot[] {
  return [...slots].sort((a, b) => {
    const [aH, aM] = a.start_time.split(':').map(Number)
    const [bH, bM] = b.start_time.split(':').map(Number)
    return aH * 60 + aM - (bH * 60 + bM)
  })
}

export function groupScheduleSlotsByDay(slots: ScheduleSlot[]): Record<ScheduleDay, ScheduleSlot[]> {
  const grouped = {} as Record<ScheduleDay, ScheduleSlot[]>
  
  for (const slot of slots) {
    if (!grouped[slot.day]) {
      grouped[slot.day] = []
    }
    grouped[slot.day].push(slot)
  }

  for (const day in grouped) {
    grouped[day as ScheduleDay] = sortScheduleSlotsByTime(grouped[day as ScheduleDay])
  }

  return grouped
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

export function calculateSlotDuration(startTime: string, endTime: string): number {
  return timeToMinutes(endTime) - timeToMinutes(startTime)
}
