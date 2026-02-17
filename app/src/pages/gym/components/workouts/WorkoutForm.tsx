import { useState } from "react";
import { Loader2 } from "lucide-react";
import { DateTime } from "luxon";
import type { CreateWorkoutDto, UpdateWorkoutDto } from "../../../../features/workout/interfaces/workout.interface";

type WorkoutFormProps = {
  onSubmit: (data: CreateWorkoutDto | UpdateWorkoutDto) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending?: boolean;
  initialData?: {
    name?: string;
    notes?: string;
    started_at?: string;
    finished_at?: string;
  };
};

export function WorkoutForm({
  onSubmit,
  onCancel,
  submitLabel,
  isPending = false,
  initialData,
}: WorkoutFormProps) {
  const getDefaultStartTime = () => {
    return DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm");
  };

  const getDefaultEndTime = () => {
    return DateTime.now().plus({ hours: 1 }).toFormat("yyyy-MM-dd'T'HH:mm");
  };

  const formatDateTimeLocal = (dateString: string) => {
    return DateTime.fromISO(dateString).toFormat("yyyy-MM-dd'T'HH:mm");
  };

  const [name, setName] = useState(initialData?.name || "");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [startedAt, setStartedAt] = useState(
    initialData?.started_at
      ? formatDateTimeLocal(initialData.started_at)
      : getDefaultStartTime()
  );
  const [finishedAt, setFinishedAt] = useState(
    initialData?.finished_at
      ? formatDateTimeLocal(initialData.finished_at)
      : getDefaultEndTime()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: CreateWorkoutDto | UpdateWorkoutDto = {};
    
    if (name.trim()) {
      data.name = name.trim();
    }
    
    if (notes.trim()) {
      data.notes = notes.trim();
    }
    
    if (startedAt) {
      data.started_at = DateTime.fromISO(startedAt).toUTC().toISO() ?? undefined;
    }
    
    if (finishedAt) {
      data.finished_at = DateTime.fromISO(finishedAt).toUTC().toISO() ?? undefined;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Workout Name (optional)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Morning Push Day"
          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          disabled={isPending}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any workout notes..."
          rows={3}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
          disabled={isPending}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Started At (optional)
          </label>
          <input
            type="datetime-local"
            value={startedAt}
            onChange={(e) => setStartedAt(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Finished At (optional)
          </label>
          <input
            type="datetime-local"
            value={finishedAt}
            onChange={(e) => setFinishedAt(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            disabled={isPending}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-4 py-2.5 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
