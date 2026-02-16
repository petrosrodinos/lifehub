import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { ScheduleDay, ScheduleSlot } from "../../../../features/routine/interfaces/routine.interface";
import { SCHEDULE_DAYS } from "../../../../features/routine/interfaces/routine.interface";
import { useDuplicateSlot } from "../../../../features/routine/hooks/use-routine";

export type DuplicateSlotModalProps = {
  slot: ScheduleSlot;
  onClose: () => void;
};

export function DuplicateSlotModal({ slot, onClose }: DuplicateSlotModalProps) {
  const duplicateSlot = useDuplicateSlot();
  const [selectedDays, setSelectedDays] = useState<ScheduleDay[]>([]);

  const availableDays = SCHEDULE_DAYS.filter((day) => day !== slot.day);

  const toggleDay = (day: ScheduleDay) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDays.length === 0) return;

    duplicateSlot.mutate({ slot_uuid: slot.uuid, target_days: selectedDays }, { onSuccess: () => onClose() });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 border border-slate-600 rounded-xl shadow-xl z-50 p-6" role="dialog" aria-label="Duplicate slot">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Duplicate Slot</h2>
          <button type="button" onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400 mb-1">Duplicating</p>
            <p className="text-sm text-white font-medium capitalize">{slot.activity?.name}</p>
            <p className="text-xs text-slate-400">
              {slot.start_time} – {slot.end_time}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Target Days</label>
            <div className="space-y-2">
              {availableDays.map((day) => (
                <label key={day} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors">
                  <input type="checkbox" checked={selectedDays.includes(day)} onChange={() => toggleDay(day)} className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-2 focus:ring-amber-500/50" />
                  <span className="text-sm text-slate-300 capitalize">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={duplicateSlot.isPending || selectedDays.length === 0} className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {duplicateSlot.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Duplicate
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
