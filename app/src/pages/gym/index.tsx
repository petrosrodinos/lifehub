import { useState } from "react";
import { GymHeader } from "./components/GymHeader";
import { GymCategoriesMenu } from "./components/exercises/GymCategoriesMenu";
import { WorkoutsList } from "./components/workouts/WorkoutsList";
import { CreateWorkoutModal } from "./components/workouts/CreateWorkoutModal";

export const GymPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [createWorkoutModalOpen, setCreateWorkoutModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      <GymCategoriesMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <CreateWorkoutModal
        isOpen={createWorkoutModalOpen}
        onClose={() => setCreateWorkoutModalOpen(false)}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_40%)] -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvZz48L3N2Zz4=')] opacity-20 -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
        <GymHeader
          onOpenMenu={() => setMenuOpen(true)}
          onCreateWorkout={() => setCreateWorkoutModalOpen(true)}
        />

        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Recent Workouts</h2>
          <WorkoutsList />
        </section>
      </div>
    </div>
  );
};
