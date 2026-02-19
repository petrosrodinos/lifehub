import { HabitsPageProvider } from "./context/habits-page.context";
import { HabitsHeader } from "./components/HabitsHeader/HabitsHeader";
import { HabitsTodaySection } from "./components/HabitsTodaySection/HabitsTodaySection";
import { HabitsProgressSection } from "./components/HabitsProgressSection/HabitsProgressSection";
import { HabitsHistorySection } from "./components/HabitsHistorySection/HabitsHistorySection";
import { HabitsScheduleSection } from "./components/HabitsScheduleSection/HabitsScheduleSection";

export function HabitsPage() {
  return (
    <HabitsPageProvider>
      <div className="min-h-screen text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(99,102,241,0.14),transparent_45%),radial-gradient(circle_at_85%_78%,rgba(16,185,129,0.12),transparent_45%)] -z-10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHZpZXdCb3g9JzAgMCA2MCA2MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPjxwYXRoIGQ9J00zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMiAxMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnonIHN0cm9rZT0ncmdiYSgyNTUsMjU1LDI1NSwwLjAyNSknLz48L2c+PC9zdmc+')] opacity-20 -z-10" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-5">
          <HabitsHeader />
          <HabitsTodaySection />
          <HabitsProgressSection />
          <HabitsHistorySection />
          <HabitsScheduleSection />
        </div>
      </div>
    </HabitsPageProvider>
  );
}
