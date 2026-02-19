import { Modal } from '../../../../../components/ui/Modal'
import { useCreateActivitySchedule } from '../../../../../features/habbits/activity-schedules/hooks/use-activity-schedules'
import { useActivities } from '../../../../../features/activities/hooks/use-activities'
import type { CreateActivityScheduleDto } from '../../../../../features/habbits/activity-schedules/interfaces/activity-schedules.interface'
import { ActivityScheduleForm } from './ActivityScheduleForm'

type CreateActivityScheduleModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function CreateActivityScheduleModal({ isOpen, onClose }: CreateActivityScheduleModalProps) {
  const createSchedule = useCreateActivitySchedule()
  const activitiesQuery = useActivities()
  const activities = activitiesQuery.data ?? []

  function handleSubmit(activityUuid: string, data: CreateActivityScheduleDto) {
    createSchedule.mutate(
      { activity_uuid: activityUuid, data },
      { onSuccess: onClose },
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Schedule" scrollable>
      <ActivityScheduleForm
        activities={activities}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isPending={createSchedule.isPending}
      />
    </Modal>
  )
}
