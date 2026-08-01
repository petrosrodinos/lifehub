import { useState } from "react";
import { Smartphone, CheckCircle2, ChevronDown } from "lucide-react";
import { useInstallApp } from "../../../hooks/use-install-app";
import {
  INSTALL_PLATFORMS,
  INSTALL_STEPS,
  type InstallPlatform,
} from "../config/install-app.config";

export function InstallAppSettings() {
  const { canPromptInstall, isInstalled, promptInstall } = useInstallApp();
  const [showDirections, setShowDirections] = useState(false);
  const [activePlatform, setActivePlatform] = useState<InstallPlatform>(INSTALL_PLATFORMS.ANDROID);

  const handleButtonClick = async () => {
    if (canPromptInstall && !showDirections) {
      const accepted = await promptInstall();
      if (accepted) {
        return;
      }
    }
    setShowDirections((previous) => !previous);
  };

  const handleSelectAndroid = () => {
    setActivePlatform(INSTALL_PLATFORMS.ANDROID);
  };

  const handleSelectIos = () => {
    setActivePlatform(INSTALL_PLATFORMS.IOS);
  };

  if (isInstalled) {
    return (
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-xl bg-green-500/10">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Installed on this device</h3>
            <p className="text-sm text-slate-400">
              LifeHub is already added to your home screen. Open it from there anytime.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="p-3 rounded-xl bg-violet-500/10">
            <Smartphone className="w-6 h-6 text-violet-400" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">Add to Home Screen</h3>
          <p className="text-sm text-slate-400 mb-4">
            Install LifeHub as a shortcut on your Android or iPhone for quick access like a native app.
          </p>
          <button
            type="button"
            onClick={handleButtonClick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium transition-colors"
          >
            {canPromptInstall && !showDirections ? "Install App" : "Directions"}
            <ChevronDown className={`w-4 h-4 transition-transform ${showDirections ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {showDirections && (
        <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSelectAndroid}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePlatform === INSTALL_PLATFORMS.ANDROID
                  ? "bg-violet-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Android
            </button>
            <button
              type="button"
              onClick={handleSelectIos}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePlatform === INSTALL_PLATFORMS.IOS
                  ? "bg-violet-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              iPhone / iPad
            </button>
          </div>

          <ol className="space-y-3">
            {INSTALL_STEPS[activePlatform].map((step, index) => (
              <li key={step} className="flex gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <p className="text-xs text-slate-500">
            {activePlatform === INSTALL_PLATFORMS.IOS
              ? "Safari is required on iOS. Chrome and other browsers cannot add LifeHub to the home screen."
              : "Works best in Chrome. After installing, LifeHub opens full-screen without the browser bar."}
          </p>
        </div>
      )}
    </div>
  );
}
