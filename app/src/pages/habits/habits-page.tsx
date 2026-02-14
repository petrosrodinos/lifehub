import { CheckCircle } from "lucide-react";

export function HabitsPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Habits</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <CheckCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Build Better Habits</h2>
          <p className="text-gray-500">This feature is coming soon</p>
        </div>
      </div>
    </div>
  );
}
