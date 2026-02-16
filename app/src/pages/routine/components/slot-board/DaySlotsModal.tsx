import { X } from "lucide-react";
import type { ScheduleDay, ScheduleSlot } from "../../../../features/routine/interfaces/routine.interface";
import { formatTimeDisplay } from "../../utils/time.utils";

export type DaySlotsModalProps = {
  day: ScheduleDay;
  slots: ScheduleSlot[];
  onClose: () => void;
  onEditSlot: (slot: ScheduleSlot) => void;
};

export function DaySlotsModal({ day, slots, onClose, onEditSlot }: DaySlotsModalProps) {
  const sortedSlots = [...slots].sort((a, b) => a.start_time.localeCompare(b.start_time));

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[80vh] flex flex-col bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden" role="dialog" aria-label={`Slots for ${day}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white capitalize">{day}</h2>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto p-4 space-y-2">
          {sortedSlots.length === 0 ? (
            <li className="text-sm text-slate-400 py-4 text-center">No slots for this day</li>
          ) : (
            sortedSlots.map((slot) => {
              const color = slot.activity?.color ?? "#64748b";
              return (
                <li key={slot.uuid}>
                  <button
                    type="button"
                    onClick={() => onEditSlot(slot)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-600 bg-slate-900/50 hover:bg-slate-800/80 text-left transition-colors"
                  >
                    <span className="w-2 h-10 rounded shrink-0" style={{ backgroundColor: color }} />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-white capitalize block truncate">{slot.activity?.name ?? "—"}</span>
                      <span className="text-xs text-slate-400 font-mono">
                        {formatTimeDisplay(slot.start_time)} – {formatTimeDisplay(slot.end_time)}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}
