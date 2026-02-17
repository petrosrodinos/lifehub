import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateTime } from "luxon";
import { useWorkouts } from "../../../../features/workout/hooks/use-workout";
import { WorkoutsLoading } from "./WorkoutsLoading";
import type { Workout } from "../../../../features/workout/interfaces/workout.interface";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function WorkoutsCalendar() {
  const navigate = useNavigate();
  const { data, isLoading } = useWorkouts({ all: true });
  const [currentMonth, setCurrentMonth] = useState(DateTime.now().startOf("month"));

  const workouts = Array.isArray(data) ? data : [];

  const workoutsByDate = useMemo(() => {
    const grouped = new Map<string, Workout[]>();

    workouts.forEach((workout) => {
      if (workout.started_at) {
        const date = DateTime.fromISO(workout.started_at).toISODate();
        if (date) {
          if (!grouped.has(date)) {
            grouped.set(date, []);
          }
          grouped.get(date)?.push(workout);
        }
      }
    });

    return grouped;
  }, [workouts]);

  const calendarDays = useMemo(() => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDay = startOfMonth.weekday % 7;
    const daysInMonth = endOfMonth.day;

    const days: Array<{ date: DateTime | null; isCurrentMonth: boolean }> = [];

    for (let i = 0; i < startDay; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: currentMonth.set({ day }),
        isCurrentMonth: true,
      });
    }

    return days;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.minus({ months: 1 }));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.plus({ months: 1 }));
  };

  const handleToday = () => {
    setCurrentMonth(DateTime.now().startOf("month"));
  };

  const isToday = (date: DateTime | null) => {
    if (!date) return false;
    return date.hasSame(DateTime.now(), "day");
  };

  if (isLoading) {
    return <WorkoutsLoading />;
  }

  if (workouts.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-slate-700 rounded-xl">
        <p className="text-slate-300 font-medium">No workouts yet</p>
        <p className="text-sm text-slate-500 mt-1">Start tracking your workouts to see them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {MONTHS[currentMonth.month - 1]} {currentMonth.year}
        </h3>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleToday} className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
            Today
          </button>
          <button type="button" onClick={handlePrevMonth} className="p-2 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={handleNextMonth} className="p-2 text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-xs sm:text-sm font-medium text-slate-400 py-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const dateStr = day.date?.toISODate();
          const dayWorkouts = dateStr ? workoutsByDate.get(dateStr) || [] : [];
          const hasWorkouts = dayWorkouts.length > 0;
          const isTodayDate = isToday(day.date);

          return (
            <div key={index} className={`min-h-20 sm:min-h-24 p-1 sm:p-2 rounded-lg border ${day.isCurrentMonth ? "bg-slate-900/40 border-slate-800/50" : "bg-slate-900/20 border-slate-800/20"} ${isTodayDate ? "ring-2 ring-violet-500/50" : ""}`}>
              {day.date && (
                <>
                  <div className={`text-xs sm:text-sm font-medium mb-1 ${isTodayDate ? "text-violet-400" : day.isCurrentMonth ? "text-slate-300" : "text-slate-600"}`}>{day.date.day}</div>
                  {hasWorkouts && (
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      {dayWorkouts.map((workout) => (
                        <button key={workout.uuid} type="button" className="text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 rounded text-violet-300 truncate cursor-pointer transition-colors w-full text-left" onClick={() => navigate(`/dashboard/gym/workout/${workout.uuid}`)}>
                          {workout.name || "Workout"}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
