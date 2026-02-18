import { OccurrenceStatus } from '@/generated/prisma'
import { toDayKey } from './habit-date.utils'

export type StreakOptions = {
  skipBreaksStreak: boolean
}

export type StreakResult = {
  currentStreak: number
  longestStreak: number
}

export const calculateStreakFromOccurrences = (
  occurrences: Array<{ scheduled_for: Date; status: OccurrenceStatus }>,
  options: StreakOptions,
): StreakResult => {
  const ordered = [...occurrences].sort((a, b) => a.scheduled_for.getTime() - b.scheduled_for.getTime())
  const dayStatus = new Map<string, OccurrenceStatus[]>()

  for (const occurrence of ordered) {
    const key = toDayKey(occurrence.scheduled_for)
    const statuses = dayStatus.get(key) ?? []
    statuses.push(occurrence.status)
    dayStatus.set(key, statuses)
  }

  const dayStates = Array.from(dayStatus.entries()).map(([day, statuses]) => {
    if (statuses.some((value) => value === OccurrenceStatus.FAILED)) {
      return { day, state: OccurrenceStatus.FAILED }
    }
    if (statuses.some((value) => value === OccurrenceStatus.COMPLETED)) {
      return { day, state: OccurrenceStatus.COMPLETED }
    }
    if (statuses.some((value) => value === OccurrenceStatus.SKIPPED)) {
      return { day, state: OccurrenceStatus.SKIPPED }
    }
    return { day, state: OccurrenceStatus.PENDING }
  })

  let running = 0
  let longest = 0

  for (const dayState of dayStates) {
    if (dayState.state === OccurrenceStatus.COMPLETED) {
      running += 1
      if (running > longest) {
        longest = running
      }
      continue
    }

    if (dayState.state === OccurrenceStatus.SKIPPED && !options.skipBreaksStreak) {
      continue
    }

    running = 0
  }

  let current = 0
  for (let index = dayStates.length - 1; index >= 0; index -= 1) {
    const dayState = dayStates[index]
    if (dayState.state === OccurrenceStatus.COMPLETED) {
      current += 1
      continue
    }
    if (dayState.state === OccurrenceStatus.SKIPPED && !options.skipBreaksStreak) {
      continue
    }
    break
  }

  return {
    currentStreak: current,
    longestStreak: longest,
  }
}
