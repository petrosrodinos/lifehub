import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { ExerciseType } from "../../../../features/exercises/interfaces/exercises.interface";

type ExerciseFormProps = {
  initialName: string;
  initialDescription: string;
  initialType: ExerciseType;
  onSubmit: (name: string, description: string, type: ExerciseType) => void;
  onCancel: () => void;
  submitLabel: string;
  isPending?: boolean;
};

export function ExerciseForm({
  initialName,
  initialDescription,
  initialType,
  onSubmit,
  onCancel,
  submitLabel,
  isPending = false,
}: ExerciseFormProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [type, setType] = useState<ExerciseType>(initialType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) {
      onSubmit(trimmed, description.trim(), type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Exercise name"
        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        autoFocus
        disabled={isPending}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
        disabled={isPending}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as ExerciseType)}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
        disabled={isPending}
      >
        <option value="REPS">Reps</option>
        <option value="TIME">Time</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 px-3 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
