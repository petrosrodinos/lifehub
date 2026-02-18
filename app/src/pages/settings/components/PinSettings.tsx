import { useState } from "react";
import { Lock, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { PinSetup } from "../../../components/pin/PinSetup";
import { usePin } from "../../../hooks/use-pin";
import { useAuthStore } from "../../../store/auth-store";
import { ConfirmationModal } from "../../../components/ui/ConfirmationModal";
import toast from "react-hot-toast";

export function PinSettings() {
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const { hasPin } = usePin();
  const { setPinHash } = useAuthStore();

  const handleEnablePin = () => {
    setShowPinSetup(true);
  };

  const handlePinSetupComplete = () => {
    setShowPinSetup(false);
    toast.success("PIN security enabled");
  };

  const handlePinSetupCancel = () => {
    setShowPinSetup(false);
  };

  const handleRemovePin = () => {
    setShowRemoveConfirm(true);
  };

  const handleRemoveConfirm = () => {
    setPinHash("");
    setShowRemoveConfirm(false);
    toast.success("PIN lock removed");
  };

  if (showPinSetup) {
    return <PinSetup onComplete={handlePinSetupComplete} onCancel={handlePinSetupCancel} />;
  }

  return (
    <>
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-xl ${hasPin ? "bg-green-500/10" : "bg-slate-700/50"}`}>{hasPin ? <ShieldCheck className="w-6 h-6 text-green-400" /> : <ShieldOff className="w-6 h-6 text-slate-400" />}</div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">PIN Lock</h3>
            <p className="text-sm text-slate-400 mb-4">{hasPin ? "Your app is protected with a PIN code" : "Secure your app with a PIN code lock"}</p>

            {!hasPin && (
              <button onClick={handleEnablePin} className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg font-medium transition-colors">
                <Lock className="w-4 h-4" />
                Enable PIN Lock
              </button>
            )}

            {hasPin && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleEnablePin} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                  <Lock className="w-4 h-4" />
                  Change PIN
                </button>
                <button onClick={handleRemovePin} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Remove PIN
                </button>
              </div>
            )}
          </div>
        </div>

        {hasPin && (
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-500">Your PIN is securely encrypted and stored on your device. You'll be asked to enter it when you open the app or return from being away.</p>
          </div>
        )}
      </div>

      <ConfirmationModal isOpen={showRemoveConfirm} onClose={() => setShowRemoveConfirm(false)} onConfirm={handleRemoveConfirm} title="Remove PIN Lock" description="Are you sure you want to remove your PIN lock? Your app will no longer be protected." confirmText="Remove PIN" cancelText="Cancel" variant="danger" />
    </>
  );
}
