import { useState } from "react";
import { Calendar } from "lucide-react";
import type { ScheduleDay, ScheduleSlot } from "../../../../features/routine/interfaces/routine.interface";
import { useActivities } from "../../../../features/activities/hooks/use-activities";
import { useScheduleSlots } from "../../../../features/routine/hooks/use-routine";
import { SCHEDULE_DAYS } from "../../../../features/routine/interfaces/routine.interface";
import { ActivitiesMenu } from "../ActivitiesMenu";
import { ScheduleSkeleton } from "../ScheduleSkeleton";
import { DayColumn } from "./DayColumn";
import { SlotEditModal } from "./SlotEditModal";
import { DuplicateDayModal } from "./DuplicateDayModal";
import { DuplicateSlotModal } from "./DuplicateSlotModal";
import { DaySlotsModal } from "./DaySlotsModal";

export function WeeklySlotBoard() {
  const { data: activities = [], isLoading: isLoadingActivities } = useActivities();
  const { data: allSlots = [], isLoading: isLoadingSlots } = useScheduleSlots();
  const [showActivitiesMenu, setShowActivitiesMenu] = useState(false);

  const [editing, setEditing] = useState<{
    day: ScheduleDay;
    slot?: ScheduleSlot;
    mode: "edit" | "add";
  } | null>(null);

  const [duplicatingDay, setDuplicatingDay] = useState<ScheduleDay | null>(null);
  const [duplicatingSlot, setDuplicatingSlot] = useState<ScheduleSlot | null>(null);
  const [daySlotsModalDay, setDaySlotsModalDay] = useState<ScheduleDay | null>(null);

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
              <DayColumn key={day} day={day} slots={[]} onEditSlot={(slot) => setEditing({ day, slot, mode: "edit" })} onDuplicateSlot={(slot) => setDuplicatingSlot(slot)} onAddSlot={() => setEditing({ day, mode: "add" })} onDuplicateDay={() => setDuplicatingDay(day)} onDayClick={() => setDaySlotsModalDay(day)} />
            ))}
          </div>
          {editing && <SlotEditModal day={editing.day} slot={editing.slot} onClose={() => setEditing(null)} mode={editing.mode} />}
          {duplicatingDay && <DuplicateDayModal sourceDay={duplicatingDay} onClose={() => setDuplicatingDay(null)} />}
          {duplicatingSlot && <DuplicateSlotModal slot={duplicatingSlot} onClose={() => setDuplicatingSlot(null)} />}
          {daySlotsModalDay && <DaySlotsModal day={daySlotsModalDay} slots={slotsByDay[daySlotsModalDay] ?? []} onClose={() => setDaySlotsModalDay(null)} onEditSlot={(slot) => { setEditing({ day: daySlotsModalDay, slot, mode: "edit" }); setDaySlotsModalDay(null); }} />}
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
            <DayColumn key={day} day={day} slots={slotsByDay[day] ?? []} onEditSlot={(slot) => setEditing({ day, slot, mode: "edit" })} onDuplicateSlot={(slot) => setDuplicatingSlot(slot)} onAddSlot={() => setEditing({ day, mode: "add" })} onDuplicateDay={() => setDuplicatingDay(day)} onDayClick={() => setDaySlotsModalDay(day)} />
          ))}
        </div>
        {editing && <SlotEditModal day={editing.day} slot={editing.slot} onClose={() => setEditing(null)} mode={editing.mode} />}
        {duplicatingDay && <DuplicateDayModal sourceDay={duplicatingDay} onClose={() => setDuplicatingDay(null)} />}
        {duplicatingSlot && <DuplicateSlotModal slot={duplicatingSlot} onClose={() => setDuplicatingSlot(null)} />}
        {daySlotsModalDay && <DaySlotsModal day={daySlotsModalDay} slots={slotsByDay[daySlotsModalDay] ?? []} onClose={() => setDaySlotsModalDay(null)} onEditSlot={(slot) => { setEditing({ day: daySlotsModalDay, slot, mode: "edit" }); setDaySlotsModalDay(null); }} />}
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
