import { create } from 'zustand'
import { loadSchedule, saveSchedule } from '../utils/storage.utils'
import { DEFAULT_SCHEDULE } from '../config/schedule.config'
import type { ScheduleDay, ScheduleSlot } from '../config/schedule.config'

type ScheduleState = {
  schedule: Record<ScheduleDay, ScheduleSlot[]>
  getSlotsForDay: (day: ScheduleDay) => ScheduleSlot[]
  updateSlot: (day: ScheduleDay, slotIndex: number, updates: Partial<ScheduleSlot>) => void
  addSlot: (day: ScheduleDay, slot: ScheduleSlot) => void
  removeSlot: (day: ScheduleDay, slotIndex: number) => void
  resetToDefault: () => void
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  schedule: loadSchedule(),

  getSlotsForDay: (day: ScheduleDay) => get().schedule[day] ?? [],

  updateSlot: (day: ScheduleDay, slotIndex: number, updates: Partial<ScheduleSlot>) => {
    const schedule = structuredClone(get().schedule)
    const slots = schedule[day]
    if (!slots || slotIndex < 0 || slotIndex >= slots.length) return
    slots[slotIndex] = { ...slots[slotIndex], ...updates }
    set({ schedule })
    saveSchedule(schedule)
  },

  addSlot: (day: ScheduleDay, slot: ScheduleSlot) => {
    const schedule = structuredClone(get().schedule)
    const slots = schedule[day] ?? []
    slots.push(slot)
    slots.sort((a, b) => {
      const [aH, aM] = a.start.split(':').map(Number)
      const [bH, bM] = b.start.split(':').map(Number)
      return aH * 60 + aM - (bH * 60 + bM)
    })
    schedule[day] = slots
    set({ schedule })
    saveSchedule(schedule)
  },

  removeSlot: (day: ScheduleDay, slotIndex: number) => {
    const schedule = structuredClone(get().schedule)
    const slots = schedule[day]
    if (!slots || slotIndex < 0 || slotIndex >= slots.length) return
    slots.splice(slotIndex, 1)
    set({ schedule })
    saveSchedule(schedule)
  },

  resetToDefault: () => {
    const schedule = structuredClone(DEFAULT_SCHEDULE)
    set({ schedule })
    saveSchedule(schedule)
  },
}))
