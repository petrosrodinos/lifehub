import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { ScheduleDay, ScheduleSlot } from "../../../../features/routine/interfaces/routine.interface";
import { useActivities } from "../../../../features/activities/hooks/use-activities";
import { useCreateScheduleSlot, useUpdateScheduleSlot, useDeleteScheduleSlot } from "../../../../features/routine/hooks/use-routine";
import { formatTimeForInput } from "../../utils/time.utils";
import { ConfirmationModal } from "../../../../components/ui/ConfirmationModal";

export type SlotEditModalProps = {
  day: ScheduleDay;
  slot?: ScheduleSlot;
  onClose: () => void;
  mode: "edit" | "add";
};

const TIME_PATTERN = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export function SlotEditModal({ day, slot, onClose, mode }: SlotEditModalProps) {
  const { data: activities = [] } = useActivities();
  const createSlot = useCreateScheduleSlot();
  const updateSlot = useUpdateScheduleSlot();
  const deleteSlot = useDeleteScheduleSlot();

  const [startTime, setStartTime] = useState(slot?.start_time ?? "09:00");
  const [endTime, setEndTime] = useState(slot?.end_time ?? "10:00");
  const [activityUuid, setActivityUuid] = useState(slot?.activity_uuid ?? activities[0]?.uuid ?? "");
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const startNorm = formatTimeForInput(startTime);
    const endNorm = formatTimeForInput(endTime);

    if (!TIME_PATTERN.test(startNorm) || !TIME_PATTERN.test(endNorm)) {
      setError("Use HH:mm format (e.g. 09:00)");
      return;
    }

    const [sH, sM] = startNorm.split(":").map(Number);
    const [eH, eM] = endNorm.split(":").map(Number);
    const startMin = sH * 60 + sM;
    const endMin = eH * 60 + eM;

    if (endMin <= startMin) {
      setError("End time must be after start time");
      return;
    }

    if (!activityUuid) {
      setError("Activity is required");
      return;
    }

    if (mode === "add") {
      createSlot.mutate(
        {
          day,
          start_time: startNorm,
          end_time: endNorm,
          activity_uuid: activityUuid,
        },
        {
          onSuccess: () => onClose(),
        },
      );
    } else if (slot) {
      updateSlot.mutate(
        {
          uuid: slot.uuid,
          data: {
            day,
            start_time: startNorm,
            end_time: endNorm,
            activity_uuid: activityUuid,
          },
        },
        {
          onSuccess: () => onClose(),
        },
      );
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (slot) {
      deleteSlot.mutate(slot.uuid, {
        onSuccess: () => {
          setShowDeleteConfirm(false);
          onClose();
        },
      });
    }
  };

  const selectedActivity = activities.find((a) => a.uuid === slot?.activity_uuid);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50 p-6" role="dialog" aria-label="Edit time slot">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            {mode === "add" ? "Add slot" : "Edit slot"} – {day}
          </h2>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Start</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">End</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Activity</label>
            <select value={activityUuid} onChange={(e) => setActivityUuid(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 capitalize">
              {activities.length === 0 ? (
                <option value="">No activities available</option>
              ) : (
                activities.map((activity) => (
                  <option key={activity.uuid} value={activity.uuid}>
                    {activity.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={createSlot.isPending || updateSlot.isPending || activities.length === 0} className="flex-1 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {(createSlot.isPending || updateSlot.isPending) && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "add" ? "Add" : "Save"}
            </button>
            {mode === "edit" && (
              <button type="button" onClick={handleDeleteClick} className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                Delete
              </button>
            )}
          </div>
        </form>
      </div>

      <ConfirmationModal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} onConfirm={handleDeleteConfirm} title="Delete Time Slot" description={`Are you sure you want to delete the ${selectedActivity?.name || "activity"} slot on ${day} from ${slot?.start_time} to ${slot?.end_time}?`} confirmText="Delete" cancelText="Cancel" variant="danger" isPending={deleteSlot.isPending} />
    </>
  );
}
