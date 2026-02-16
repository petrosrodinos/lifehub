import { Copy } from "lucide-react";
import type { ScheduleSlot } from "../../../../features/routine/interfaces/routine.interface";
import { formatTimeDisplay } from "../../utils/time.utils";

export type SlotBlockProps = {
  slot: ScheduleSlot;
  topPx: number;
  heightPx: number;
  onEdit: () => void;
  onDuplicate: () => void;
};

export function SlotBlock({ slot, topPx, heightPx, onEdit, onDuplicate }: SlotBlockProps) {
  const backgroundColor = slot.activity?.color ?? "#64748b";

  return (
    <div
      className="absolute left-2 right-2 rounded-lg flex flex-col justify-center px-2 py-1 text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:z-10 border-2 border-slate-900 group"
      style={{
        top: `${topPx}px`,
        height: `${heightPx}px`,
        backgroundColor,
      }}
    >
      <button type="button" onClick={onEdit} className="absolute inset-0 rounded-lg text-left cursor-pointer" title={`${formatTimeDisplay(slot.start_time)} - ${formatTimeDisplay(slot.end_time)} (click to edit)`} />
      <span className="text-[10px] font-mono opacity-90 relative z-10 pointer-events-none">
        {slot.start_time}–{slot.end_time}
      </span>
      <span className="text-xs font-medium truncate capitalize relative z-10 pointer-events-none">{slot.activity?.name}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDuplicate();
        }}
        className="absolute top-1 right-1 p-1 bg-black/30 hover:bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20"
        title="Duplicate slot"
      >
        <Copy className="w-3 h-3" />
      </button>
    </div>
  );
}
