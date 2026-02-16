import { Plus, Copy } from "lucide-react";
import type { ScheduleDay, ScheduleSlot } from "../../../../features/routine/interfaces/routine.interface";
import { buildPositionedSlots, getTimelineHeightPx } from "../../utils/slot-layout.utils";
import { SlotBlock } from "./SlotBlock";

export type DayColumnProps = {
  day: ScheduleDay;
  slots: ScheduleSlot[];
  onEditSlot: (slot: ScheduleSlot) => void;
  onDuplicateSlot: (slot: ScheduleSlot) => void;
  onAddSlot: () => void;
  onDuplicateDay: () => void;
  onDayClick: () => void;
};

export function DayColumn({ day, slots, onEditSlot, onDuplicateSlot, onAddSlot, onDuplicateDay, onDayClick }: DayColumnProps) {
  const positionedSlots = buildPositionedSlots(slots);
  const timelineHeightPx = getTimelineHeightPx(positionedSlots);

  return (
    <div className="flex flex-col min-w-[140px] flex-1">
      <div className="flex items-center justify-between mb-3 px-2">
        <button type="button" onClick={onDayClick} className="text-sm font-semibold text-slate-300 uppercase tracking-widest text-center flex-1 hover:text-white transition-colors cursor-pointer">
          {day}
        </button>
        {slots.length > 0 && (
          <button type="button" onClick={onDuplicateDay} className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Duplicate entire day">
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <div className="relative flex-1 h-[620px] bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-y-auto overflow-x-hidden">
        <div className="relative w-full min-h-full" style={{ height: `${timelineHeightPx}px` }}>
          {positionedSlots.map(({ slot, topPx, heightPx }) => (
            <SlotBlock
              key={slot.uuid}
              slot={slot}
              topPx={topPx}
              heightPx={heightPx}
              onEdit={() => onEditSlot(slot)}
              onDuplicate={() => onDuplicateSlot(slot)}
            />
          ))}
        </div>
        <button type="button" onClick={onAddSlot} className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-600/80 hover:bg-slate-500/80 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-500/50 flex items-center gap-1 z-20">
          <Plus className="w-3 h-3" />
          Add slot
        </button>
      </div>
    </div>
  );
}
