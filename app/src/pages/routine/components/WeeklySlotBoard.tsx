import { useState } from "react";
import { useActivitiesStore } from "../stores/activities.store";
import { useScheduleStore } from "../stores/schedule.store";
import { SlotEditModal } from "./SlotEditModal";
import { timeToMinutes, slotDurationMinutes, formatTimeDisplay } from "../utils/time.utils";
import { SCHEDULE_DAYS, type ScheduleDay, type ScheduleSlot } from "../config/schedule.config";

const BOARD_START_MINUTES = 5 * 60;
const BOARD_END_MINUTES = 22 * 60;
const BOARD_TOTAL_MINUTES = BOARD_END_MINUTES - BOARD_START_MINUTES;

type SlotBlockProps = {
  slot: ScheduleSlot;
  getColor: (name: string) => string;
  onEdit: () => void;
};

function SlotBlock({ slot, getColor, onEdit }: SlotBlockProps) {
  const startMin = timeToMinutes(slot.start);
  const topOffset = ((startMin - BOARD_START_MINUTES) / BOARD_TOTAL_MINUTES) * 100;
  const heightPercent = (slotDurationMinutes(slot.start, slot.end) / BOARD_TOTAL_MINUTES) * 100;
  const primaryLabel = slot.label.toLowerCase().split(",")[0].trim();
  const backgroundColor = getColor(primaryLabel);

  return (
    <button
      type="button"
      onClick={onEdit}
      className="absolute left-1 right-1 rounded-lg flex flex-col justify-center px-2 py-1 text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:z-10 border border-white/10 text-left cursor-pointer"
      style={{
        top: `${topOffset}%`,
        height: `${heightPercent}%`,
        backgroundColor,
      }}
      title={`${formatTimeDisplay(slot.start)} - ${formatTimeDisplay(slot.end)} (click to edit)`}
    >
      <span className="text-[10px] font-mono opacity-90">
        {slot.start}–{slot.end}
      </span>
      <span className="text-xs font-medium truncate">{slot.label}</span>
    </button>
  );
}

type DayColumnProps = {
  day: ScheduleDay;
  slots: ScheduleSlot[];
  getColor: (name: string) => string;
  onEditSlot: (slotIndex: number) => void;
  onAddSlot: () => void;
};

function DayColumn({ day, slots, getColor, onEditSlot, onAddSlot }: DayColumnProps) {
  return (
    <div className="flex flex-col min-w-[140px] flex-1">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-3 px-2 text-center">{day}</h3>
      <div className="relative flex-1 min-h-[320px] bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        {slots.map((slot, i) => (
          <SlotBlock key={`${slot.start}-${slot.end}-${i}`} slot={slot} getColor={getColor} onEdit={() => onEditSlot(i)} />
        ))}
        <button type="button" onClick={onAddSlot} className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-600/80 hover:bg-slate-500/80 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-500/50">
          + Add slot
        </button>
      </div>
    </div>
  );
}

export function WeeklySlotBoard() {
  const activities = useActivitiesStore((s) => s.activities);
  const getColor = useActivitiesStore((s) => s.getColor);
  const schedule = useScheduleStore((s) => s.schedule);

  const [editing, setEditing] = useState<{
    day: ScheduleDay;
    slotIndex: number;
    mode: "edit" | "add";
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Weekly Schedule</h1>
          <p className="text-slate-400 mt-1 text-sm">05:00 – 22:00</p>
        </header>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {SCHEDULE_DAYS.map((day) => (
            <DayColumn key={day} day={day} slots={schedule[day] ?? []} getColor={getColor} onEditSlot={(slotIndex) => setEditing({ day, slotIndex, mode: "edit" })} onAddSlot={() => setEditing({ day, slotIndex: -1, mode: "add" })} />
          ))}
        </div>
        {editing && (
          <SlotEditModal
            day={editing.day}
            slotIndex={editing.slotIndex}
            initialSlot={
              editing.mode === "add"
                ? {
                    start: "09:00",
                    end: "10:00",
                    label: activities[0]?.name ?? "work",
                  }
                : schedule[editing.day][editing.slotIndex]
            }
            onClose={() => setEditing(null)}
            mode={editing.mode}
          />
        )}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {activities.map((activity) => (
            <span key={activity.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: activity.color }}>
              {activity.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
