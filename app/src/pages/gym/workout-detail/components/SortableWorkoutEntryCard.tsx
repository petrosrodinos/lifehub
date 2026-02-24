import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import type { WorkoutEntry } from "../../../../features/gym/workout-entries/interfaces/workout-entries.interface";
import type { SortableItemRenderProps } from "../../../../components/ui/ReorderableList";
import { SetCard } from "./SetCard";
import type { WorkoutSet } from "../../../../features/gym/workout-sets/interfaces/workout-sets.interface";

interface SortableWorkoutEntryCardProps {
  entry: WorkoutEntry;
  sortableProps: SortableItemRenderProps;
}

export function SortableWorkoutEntryCard({ entry, sortableProps }: SortableWorkoutEntryCardProps) {
  const navigate = useNavigate();
  const { setNodeRef, attributes, listeners, style, isDragging } = sortableProps;
  const [showSets, setShowSets] = useState(true);

  const setCount = entry.sets?.length ?? 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/80 p-6 ${isDragging ? "opacity-60 shadow-lg z-10" : ""}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <button
          type="button"
          className="mt-1 p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 cursor-grab active:cursor-grabbing touch-none"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => navigate(`/dashboard/gym/workout-entry/${entry.uuid}`)}
          className="flex-1 flex items-center justify-between text-left group/header min-w-0"
        >
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-white group-hover/header:text-violet-300 transition-colors truncate">
              {entry.exercise?.name || "Unknown Exercise"}
            </h2>
            {entry.exercise?.description && (
              <p className="text-sm text-slate-400 mt-1 line-clamp-2">{entry.exercise.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowSets((prev) => !prev);
              }}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors"
              aria-label={showSets ? "Hide sets" : "Show sets"}
            >
              {showSets ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <span className="text-sm text-slate-500 bg-slate-800 px-3 py-1 rounded-lg">
              {setCount} {setCount === 1 ? "set" : "sets"}
            </span>
            <ChevronRight className="w-5 h-5 text-slate-600 group-hover/header:text-violet-400 transition-colors" />
          </div>
        </button>
      </div>

      {showSets && (
        <div className="space-y-3">
          {entry.sets?.map((set: WorkoutSet, index: number) => (
            <SetCard key={set.uuid} set={set} setNumber={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
