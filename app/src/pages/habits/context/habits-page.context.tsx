import { createContext, useContext, useMemo, useState } from 'react'
import { useActivityHabbits } from '../../../features/activities/hooks/use-activities'

type HabitsPageContextValue = {
  selectedActivityUuid: string | null
  setSelectedActivityUuid: (uuid: string) => void
}

const HabitsPageContext = createContext<HabitsPageContextValue | null>(null)

export function HabitsPageProvider({ children }: { children: React.ReactNode }) {
  const [selectedActivityUuid, setSelectedActivityUuid] = useState<string | null>(null)
  const activitiesQuery = useActivityHabbits()
  const todayHabits = activitiesQuery.data ?? []

  const resolvedSelectedActivityUuid = useMemo(() => {
    if (
      selectedActivityUuid &&
      todayHabits.some((item) => item.activity.uuid === selectedActivityUuid)
    ) {
      return selectedActivityUuid
    }
    return todayHabits[0]?.activity.uuid ?? null
  }, [selectedActivityUuid, todayHabits])

  const value = useMemo<HabitsPageContextValue>(
    () => ({ selectedActivityUuid: resolvedSelectedActivityUuid, setSelectedActivityUuid }),
    [resolvedSelectedActivityUuid],
  )

  return <HabitsPageContext.Provider value={value}>{children}</HabitsPageContext.Provider>
}

export function useHabitsPageContext(): HabitsPageContextValue {
  const ctx = useContext(HabitsPageContext)
  if (!ctx) throw new Error('useHabitsPageContext must be used within HabitsPageProvider')
  return ctx
}
