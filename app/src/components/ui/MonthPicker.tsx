import { ChevronLeft, ChevronRight } from "lucide-react";

type MonthPickerProps = {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
  disabled?: boolean;
};

export function MonthPicker({ year, month, onChange, disabled = false }: MonthPickerProps) {
  const label = new Date(year, month - 1).toLocaleString("default", { month: "long", year: "numeric" });

  const handlePrevious = () => {
    if (month === 1) {
      onChange(year - 1, 12);
    } else {
      onChange(year, month - 1);
    }
  };

  const handleNext = () => {
    if (month === 12) {
      onChange(year + 1, 1);
    } else {
      onChange(year, month + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={disabled}
        className="p-1.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-sm font-medium text-slate-300 min-w-[9rem] text-center">{label}</span>
      <button
        type="button"
        onClick={handleNext}
        disabled={disabled}
        className="p-1.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
