import { CalendarRange, Plus } from 'lucide-react'
import { Drawer } from '../../../../components/ui/Drawer'
import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal'
import { ActivityScheduleForm } from './ActivityScheduleForm'
import { ScheduleDrawerContent } from './ScheduleDrawerContent'
import { useHabitsActivitySchedules } from './use-habits-activity-schedules'

export function HabitsActivitySchedulesSection() {
  const {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
    isCreateOpen,
    setIsCreateOpen,
    editingScheduleUuid,
    setEditingScheduleUuid,
    deletingSchedule,
    setDeletingSchedule,
    schedules,
    isLoading,
    isUpdating,
    isDeleting,
    updateSchedule,
    confirmDelete,
  } = useHabitsActivitySchedules()

  return (
    <>
      <button
        type="button"
        onClick={openDrawer}
        className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1.5 xs:py-2 rounded-xl border border-slate-600/50 bg-slate-800/60 text-slate-300 text-xs xs:text-sm hover:bg-slate-700/60 hover:text-white transition-colors"
      >
        <CalendarRange className="w-4 h-4 shrink-0" />
        <span className="hidden xs:inline">Schedules</span>
      </button>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="All Schedules"
        headerActions={
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline">New schedule</span>
          </button>
        }
      >
        <ScheduleDrawerContent
          schedules={schedules}
          isLoading={isLoading}
          isUpdating={isUpdating}
          editingScheduleUuid={editingScheduleUuid}
          onToggleEdit={(uuid) => setEditingScheduleUuid(editingScheduleUuid === uuid ? null : uuid)}
          onSave={updateSchedule}
          onDelete={setDeletingSchedule}
          onCreateOpen={() => setIsCreateOpen(true)}
        />
      </Drawer>

      <ActivityScheduleForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <ConfirmationModal
        isOpen={!!deletingSchedule}
        onClose={() => setDeletingSchedule(null)}
        onConfirm={confirmDelete}
        title="Deactivate schedule"
        description="This will deactivate the schedule and remove all pending future occurrences. Completed logs will not be affected."
        confirmText="Deactivate"
        isPending={isDeleting}
      />
    </>
  )
}
