import { useState, useMemo } from "react";
import { BarChart3, TrendingUp, Calendar, X } from "lucide-react";
import { DateTime } from "luxon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useExercises } from "../../../../features/exercises/hooks/use-exercises";
import { useWorkoutEntryAnalytics } from "../../../../features/workout-entries/hooks/use-workout-entries";
import type { WorkoutEntryAnalyticsParams } from "../../../../features/workout-entries/interfaces/workout-entries.interface";
import {
  ANALYTICS_METRICS,
  type AnalyticsMetricId,
} from "../../config/analytics-metrics.config";

interface GymAnalyticsProps {
  exerciseUuid?: string;
}

export function GymAnalytics({ exerciseUuid }: GymAnalyticsProps) {
  const { data: exercises = [], isLoading: exercisesLoading } = useExercises();
  const [selectedExerciseUuid, setSelectedExerciseUuid] = useState<string>(exerciseUuid ?? "");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedMetric, setSelectedMetric] =
    useState<AnalyticsMetricId>("max_weight");

  const selectedExercise = exercises.find(
    (e) => e.uuid === selectedExerciseUuid
  );

  const filteredMetrics = useMemo(() => {
    if (!selectedExercise) return ANALYTICS_METRICS;
    return ANALYTICS_METRICS.filter((m) =>
      m.exerciseTypes.includes(selectedExercise.type)
    );
  }, [selectedExercise]);

  const handleExerciseChange = (uuid: string) => {
    setSelectedExerciseUuid(uuid);
    const exercise = exercises.find((e) => e.uuid === uuid);
    if (!exercise) return;
    const available = ANALYTICS_METRICS.filter((m) =>
      m.exerciseTypes.includes(exercise.type)
    );
    const currentStillValid = available.some((m) => m.id === selectedMetric);
    if (!currentStillValid && available.length > 0) {
      setSelectedMetric(available[0].id);
    }
  };

  const analyticsParams = useMemo((): WorkoutEntryAnalyticsParams | null => {
    if (!selectedExerciseUuid) return null;

    return {
      exercise_uuid: selectedExerciseUuid,
      ...(startDate && {
        start_date: DateTime.fromISO(startDate).startOf("day").toISO()!,
      }),
      ...(endDate && {
        end_date: DateTime.fromISO(endDate).endOf("day").toISO()!,
      }),
    };
  }, [selectedExerciseUuid, startDate, endDate]);

  const { data: progressData = [], isLoading: analyticsLoading } =
    useWorkoutEntryAnalytics(analyticsParams);

  const activeMetricConfig = filteredMetrics.find(
    (m) => m.id === selectedMetric
  ) ?? filteredMetrics[0];

  const chartData = useMemo(() => {
    return progressData.map((point) => ({
      ...point,
      label: DateTime.fromISO(point.date).toFormat("MMM dd"),
    }));
  }, [progressData]);

  const hasDateFilters = startDate || endDate;

  const handleClearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {!exerciseUuid && (
          <div>
            <label
              htmlFor="exercise-select"
              className="block text-sm font-medium text-slate-400 mb-1.5"
            >
              Exercise
            </label>
            <select
              id="exercise-select"
              value={selectedExerciseUuid}
              onChange={(e) => handleExerciseChange(e.target.value)}
              disabled={exercisesLoading}
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-colors disabled:opacity-50"
            >
              <option value="">Select an exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.uuid} value={exercise.uuid}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-slate-400 mb-1.5"
            >
              From
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-colors [color-scheme:dark]"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-slate-400 mb-1.5"
            >
              To
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-colors [color-scheme:dark]"
            />
          </div>
          {hasDateFilters && (
            <button
              type="button"
              onClick={handleClearDates}
              className="p-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors sm:mb-0"
              title="Clear date filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {!selectedExerciseUuid && (
        <div className="text-center py-16 px-4 border border-dashed border-slate-700 rounded-xl">
          <BarChart3 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-300 font-medium">
            Select an exercise to view progress
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Choose from the dropdown above to see your performance over time.
          </p>
        </div>
      )}

      {selectedExerciseUuid && analyticsLoading && (
        <div className="space-y-4">
          <div className="h-10 bg-slate-800/60 rounded-lg animate-pulse" />
          <div className="h-72 bg-slate-800/40 rounded-xl animate-pulse" />
        </div>
      )}

      {selectedExerciseUuid && !analyticsLoading && chartData.length === 0 && (
        <div className="text-center py-16 px-4 border border-dashed border-slate-700 rounded-xl">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-300 font-medium">No data yet</p>
          <p className="text-sm text-slate-500 mt-1">
            Start logging sets for{" "}
            <span className="text-violet-400">
              {selectedExercise?.name ?? "this exercise"}
            </span>{" "}
            to see your progress chart.
          </p>
        </div>
      )}

      {selectedExerciseUuid && !analyticsLoading && chartData.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-1.5 flex-wrap">
            {filteredMetrics.map((metric) => (
              <button
                key={metric.id}
                type="button"
                onClick={() => setSelectedMetric(metric.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedMetric === metric.id
                    ? "text-white border"
                    : "text-slate-400 hover:text-slate-200 border border-transparent bg-slate-800/40 hover:bg-slate-800/60"
                }`}
                style={
                  selectedMetric === metric.id
                    ? {
                        backgroundColor: `${metric.color}20`,
                        borderColor: `${metric.color}50`,
                        color: metric.color,
                      }
                    : undefined
                }
              >
                {metric.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp
                className="w-4 h-4"
                style={{ color: activeMetricConfig.color }}
              />
              <h3 className="text-sm font-medium text-slate-300">
                {activeMetricConfig.label}
              </h3>
              <span className="text-xs text-slate-500 ml-auto">
                {chartData.length} session{chartData.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(148,163,184,0.08)"
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(148,163,184,0.15)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={{ stroke: "rgba(148,163,184,0.15)" }}
                    tickLine={false}
                    width={50}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid rgba(148,163,184,0.2)",
                      borderRadius: "8px",
                      fontSize: "13px",
                      color: "#e2e8f0",
                    }}
                    labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
                    formatter={(value: number | undefined) => [
                      value ?? 0,
                      activeMetricConfig.label,
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke={activeMetricConfig.color}
                    strokeWidth={2.5}
                    dot={{
                      fill: activeMetricConfig.color,
                      stroke: "#0a0a0f",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{
                      fill: activeMetricConfig.color,
                      stroke: "#0a0a0f",
                      strokeWidth: 2,
                      r: 6,
                    }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
