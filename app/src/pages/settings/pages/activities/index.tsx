import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, Eye, EyeOff } from "lucide-react";
import { useActivities } from "../../../../features/activities/hooks/use-activities";
import { useHiddenActivities, useCreateHiddenActivity, useDeleteHiddenActivity } from "../../../../features/habbits/hidden-activities/hooks/use-hidden-activities";
import { useMemo, useState } from "react";

export function ActivitiesSettingsPage() {
  const navigate = useNavigate();
  const { data: activities = [], isLoading: activitiesLoading } = useActivities();
  const { data: hiddenActivities = [], isLoading: hiddenActivitiesLoading } = useHiddenActivities();
  const createHiddenActivity = useCreateHiddenActivity();
  const deleteHiddenActivity = useDeleteHiddenActivity();

  const [selectedActivityUuid, setSelectedActivityUuid] = useState("");

  const activityByUuid = useMemo(() => {
    const map = new Map<string, { name: string }>();
    activities.forEach((a) => map.set(a.uuid, { name: a.name }));
    return map;
  }, [activities]);

  const hiddenActivityUuids = useMemo(() => new Set(hiddenActivities.map((h) => h.activity_uuid)), [hiddenActivities]);
  const activitiesNotHidden = useMemo(() => activities.filter((a) => !hiddenActivityUuids.has(a.uuid)), [activities, hiddenActivityUuids]);

  const handleBack = () => navigate("/dashboard/settings/security");

  const handleHideActivity = () => {
    if (!selectedActivityUuid) return;
    createHiddenActivity.mutate({ activity_uuid: selectedActivityUuid }, { onSuccess: () => setSelectedActivityUuid("") });
  };

  const loading = activitiesLoading || hiddenActivitiesLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Settings
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-violet-400" />
            Activities visibility
          </h1>
          <p className="text-slate-400">Hide activities from habit and routine views</p>
        </div>

        {loading ? (
          <div className="text-slate-400">Loading…</div>
        ) : (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-violet-400" />
                Hidden activities
              </h2>
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 space-y-4">
                {activitiesNotHidden.length > 0 && (
                  <div className="pb-4 border-b border-slate-700/50 flex flex-wrap items-end gap-2">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs text-slate-400 mb-1">Hide an activity</label>
                      <select value={selectedActivityUuid} onChange={(e) => setSelectedActivityUuid(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                        <option value="">Select activity</option>
                        {activitiesNotHidden.map((a) => (
                          <option key={a.uuid} value={a.uuid}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="button" onClick={handleHideActivity} disabled={!selectedActivityUuid || createHiddenActivity.isPending} className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors">
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </button>
                  </div>
                )}
                {hiddenActivities.length === 0 ? (
                  <p className="text-slate-400 text-sm">No hidden activities</p>
                ) : (
                  <ul className="space-y-2">
                    {hiddenActivities.map((h) => (
                      <li key={h.uuid} className="flex items-center justify-between gap-3 py-2 border-b border-slate-700/50 last:border-0">
                        <span className="text-white">{activityByUuid.get(h.activity_uuid)?.name ?? h.activity_uuid}</span>
                        <button type="button" onClick={() => deleteHiddenActivity.mutate(h.uuid)} disabled={deleteHiddenActivity.isPending} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                          Show
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
