import { Rocket } from "lucide-react";
import { useAppSettingsStore } from "../../../store/app-settings-store";
import toast from "react-hot-toast";

export function MobileModeSettings() {
  const { mobileMode, setMobileMode } = useAppSettingsStore();

  const handleToggle = () => {
    const next = !mobileMode;
    setMobileMode(next);
    toast.success(next ? "Mobile mode enabled" : "Mobile mode disabled");
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className={`p-3 rounded-xl ${mobileMode ? "bg-green-500/10" : "bg-slate-700/50"}`}>
            <Rocket className={`w-6 h-6 ${mobileMode ? "text-green-400" : "text-slate-400"}`} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white mb-1">Mobile Mode</h3>
            <button
              type="button"
              role="switch"
              aria-checked={mobileMode}
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                mobileMode ? "bg-violet-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  mobileMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-slate-400">
            Skip the landing page and open the app straight to your dashboard, or the sign-in screen if you're logged out.
          </p>
        </div>
      </div>
    </div>
  );
}
