import { CalendarDays, Plus } from 'lucide-react'
import type { ActivitySchedule, UpdateActivityScheduleDto } from '../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import { ScheduleCard } from './ScheduleCard'
import { ScheduleCardSkeleton } from './ScheduleCardSkeleton'

type ScheduleDrawerContentProps = {
  schedules: ActivitySchedule[]
  isLoading: boolean
  isUpdating: boolean
  editingScheduleUuid: string | null
  onToggleEdit: (uuid: string) => void
  onSave: (schedule: ActivitySchedule, data: UpdateActivityScheduleDto) => void
  onDelete: (schedule: ActivitySchedule) => void
  onCreateOpen: () => void
}

export function ScheduleDrawerContent({
  schedules,
  isLoading,
  isUpdating,
  editingScheduleUuid,
  onToggleEdit,
  onSave,
  onDelete,
  onCreateOpen,
}: ScheduleDrawerContentProps) {
  if (isLoading) {
    return <ScheduleCardSkeleton count={4} />
  }

  if (schedules.length === 0) {
    return (
      <div className="text-center py-16">
        <CalendarDays className="w-10 h-10 text-slate-600 mx-auto mb-3" />
        <p className="text-sm text-slate-400 mb-4">No schedules found.</p>
        <button
          type="button"
          onClick={onCreateOpen}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create first schedule
        </button>
      </div>
    )
  }

  return (
    <>
      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.uuid}
          schedule={schedule}
          isEditOpen={editingScheduleUuid === schedule.uuid}
          onToggleEdit={() => onToggleEdit(schedule.uuid)}
          onSave={(data) => onSave(schedule, data)}
          onDelete={() => onDelete(schedule)}
          isUpdating={isUpdating}
        />
      ))}
    </>
  )
}
