import { useState } from "react";
import { X, Plus, Calendar, Loader2 } from "lucide-react";
import type { ScheduleDay, ScheduleSlot } from "../../../features/routine/interfaces/routine.interface";
import { useActivities } from "../../../features/activities/hooks/use-activities";
import { useScheduleSlots, useCreateScheduleSlot, useUpdateScheduleSlot, useDeleteScheduleSlot } from "../../../features/routine/hooks/use-routine";
import { timeToMinutes, slotDurationMinutes, formatTimeDisplay } from "../utils/time.utils";
import { SCHEDULE_DAYS } from "../../../features/routine/interfaces/routine.interface";
import { ActivitiesMenu } from "./ActivitiesMenu";
import { ScheduleSkeleton } from "./ScheduleSkeleton";
import { ConfirmationModal } from "../../../components/ui/ConfirmationModal";

const BOARD_START_MINUTES = 5 * 60;
const BOARD_END_MINUTES = 24 * 60;
const BOARD_TOTAL_MINUTES = BOARD_END_MINUTES - BOARD_START_MINUTES;
const MIN_SLOT_HEIGHT_PX = 36;

type SlotBlockProps = {
  slot: ScheduleSlot;
  onEdit: () => void;
};

function SlotBlock({ slot, onEdit }: SlotBlockProps) {
  const startMin = timeToMinutes(slot.start_time);
  const topOffset = ((startMin - BOARD_START_MINUTES) / BOARD_TOTAL_MINUTES) * 100;
  const heightPercent = (slotDurationMinutes(slot.start_time, slot.end_time) / BOARD_TOTAL_MINUTES) * 100;
  const backgroundColor = slot.activity?.color ?? "#64748b";

  return (
    <button
      type="button"
      onClick={onEdit}
      className="absolute left-2 right-2 mb-1 rounded-lg flex flex-col justify-center px-2 py-1 text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:z-10 border border-white/10 text-left cursor-pointer"
      style={{
        top: `${topOffset}%`,
        height: `max(${heightPercent}%, ${MIN_SLOT_HEIGHT_PX}px)`,
        backgroundColor,
      }}
      title={`${formatTimeDisplay(slot.start_time)} - ${formatTimeDisplay(slot.end_time)} (click to edit)`}
    >
      <span className="text-[10px] font-mono opacity-90">
        {slot.start_time}–{slot.end_time}
      </span>
      <span className="text-xs font-medium truncate capitalize">{slot.activity?.name}</span>
    </button>
  );
}

type DayColumnProps = {
  day: ScheduleDay;
  slots: ScheduleSlot[];
  onEditSlot: (slot: ScheduleSlot) => void;
  onAddSlot: () => void;
};

function DayColumn({ day, slots, onEditSlot, onAddSlot }: DayColumnProps) {
  return (
    <div className="flex flex-col min-w-[140px] flex-1">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-3 px-2 text-center">{day}</h3>
      <div className="relative flex-1 min-h-[320px] bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        {slots.map((slot) => (
          <SlotBlock key={slot.uuid} slot={slot} onEdit={() => onEditSlot(slot)} />
        ))}
        <button type="button" onClick={onAddSlot} className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-600/80 hover:bg-slate-500/80 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-500/50 flex items-center gap-1 z-20">
          <Plus className="w-3 h-3" />
          Add slot
        </button>
      </div>
    </div>
  );
}

type SlotEditModalProps = {
  day: ScheduleDay;
  slot?: ScheduleSlot;
  onClose: () => void;
  mode: "edit" | "add";
};

const TIME_PATTERN = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

function formatTimeForInput(value: string): string {
  const [h, m] = value.split(":").map(Number);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function SlotEditModal({ day, slot, onClose, mode }: SlotEditModalProps) {
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
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">End</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Activity</label>
            <select value={activityUuid} onChange={(e) => setActivityUuid(e.target.value)} className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 capitalize">
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
            <button type="submit" disabled={createSlot.isPending || updateSlot.isPending || activities.length === 0} className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
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

export function WeeklySlotBoard() {
  const { data: activities = [], isLoading: isLoadingActivities } = useActivities();
  const { data: allSlots = [], isLoading: isLoadingSlots } = useScheduleSlots();
  const [showActivitiesMenu, setShowActivitiesMenu] = useState(false);

  const [editing, setEditing] = useState<{
    day: ScheduleDay;
    slot?: ScheduleSlot;
    mode: "edit" | "add";
  } | null>(null);

  const slotsByDay = allSlots.reduce(
    (acc, slot) => {
      if (!acc[slot.day]) acc[slot.day] = [];
      acc[slot.day].push(slot);
      return acc;
    },
    {} as Record<ScheduleDay, ScheduleSlot[]>,
  );

  if (isLoadingSlots || isLoadingActivities) {
    return <ScheduleSkeleton />;
  }

  if (activities.length === 0) {
    return (
      <div className="text-slate-100 p-6 md:p-10 flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <svg className="w-20 h-20 mx-auto text-slate-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-3">No Activities Yet</h2>
          <p className="text-slate-400 mb-6">Create your first activity to start building your weekly schedule</p>
          <button type="button" onClick={() => setShowActivitiesMenu(true)} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors">
            Create Your First Activity
          </button>
        </div>
        <ActivitiesMenu isOpen={showActivitiesMenu} onClose={() => setShowActivitiesMenu(false)} />
      </div>
    );
  }

  if (allSlots.length === 0) {
    return (
      <div className="text-slate-100 pb-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Weekly Schedule</h1>
          </header>
          <div className="text-center max-w-md mx-auto py-12 mb-8">
            <Calendar className="w-20 h-20 mx-auto text-slate-600 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-3">Empty Schedule</h2>
            <p className="text-slate-400 mb-6">Add time slots to your schedule to start planning your week</p>
            <p className="text-sm text-slate-500 mb-6">Click "+ Add slot" button in any day column to get started</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {SCHEDULE_DAYS.map((day) => (
              <DayColumn key={day} day={day} slots={[]} onEditSlot={(slot) => setEditing({ day, slot, mode: "edit" })} onAddSlot={() => setEditing({ day, mode: "add" })} />
            ))}
          </div>
          {editing && <SlotEditModal day={editing.day} slot={editing.slot} onClose={() => setEditing(null)} mode={editing.mode} />}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {activities.map((activity) => (
              <span key={activity.uuid} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white capitalize" style={{ backgroundColor: activity.color }}>
                {activity.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-slate-100 pb-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Weekly Schedule</h1>
        </header>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {SCHEDULE_DAYS.map((day) => (
            <DayColumn key={day} day={day} slots={slotsByDay[day] ?? []} onEditSlot={(slot) => setEditing({ day, slot, mode: "edit" })} onAddSlot={() => setEditing({ day, mode: "add" })} />
          ))}
        </div>
        {editing && <SlotEditModal day={editing.day} slot={editing.slot} onClose={() => setEditing(null)} mode={editing.mode} />}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {activities.map((activity) => (
            <span key={activity.uuid} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white capitalize" style={{ backgroundColor: activity.color }}>
              {activity.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
