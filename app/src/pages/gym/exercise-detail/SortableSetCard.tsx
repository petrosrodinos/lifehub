import { GripVertical } from "lucide-react";
import type { WorkoutSet } from "../../../features/gym/workout-sets/interfaces/workout-sets.interface";
import type { SortableItemRenderProps } from "../../../components/ui/ReorderableList";
import { SetCard } from "../workout-detail/components/SetCard";

interface SortableSetCardProps {
  set: WorkoutSet;
  setNumber: number;
  sortableProps: SortableItemRenderProps;
  onSelect?: () => void;
}

export function SortableSetCard(props: SortableSetCardProps) {
  const { set, setNumber, sortableProps, onSelect } = props;
  const { setNodeRef, attributes, listeners, style, isDragging } = sortableProps;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2 ${isDragging ? "opacity-60 z-10" : ""}`}
    >
      <button
        type="button"
        className="mt-2.5 p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 cursor-grab active:cursor-grabbing touch-none shrink-0"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          const clickedButton = (e.target as HTMLElement).closest("button");
          if (clickedButton && clickedButton !== e.currentTarget) return;
          onSelect?.();
        }}
        className="flex-1 min-w-0 text-left rounded-lg border border-transparent hover:border-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-colors"
      >
        <SetCard set={set} setNumber={setNumber} />
      </button>
    </div>
  );
}
