import { useState } from "react";
import { Lock, Check, X, Delete } from "lucide-react";
import { hashPin, validatePinFormat } from "../../utils/pin.utils";
import { useAuthStore } from "../../store/auth-store";
import toast from "react-hot-toast";

interface PinSetupProps {
  onComplete: () => void;
  onSkip?: () => void;
  onCancel?: () => void;
}

const PIN_LENGTH = 4;

export function PinSetup({ onComplete, onSkip, onCancel }: PinSetupProps) {
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const { setPinHash } = useAuthStore();

  const currentValue = step === "create" ? pin : confirmPin;
  const setCurrentValue = step === "create" ? setPin : setConfirmPin;

  const handleNumberClick = (num: string) => {
    if (currentValue.length < PIN_LENGTH) {
      const newValue = currentValue + num;
      setCurrentValue(newValue);
      setError("");

      if (newValue.length === PIN_LENGTH) {
        if (step === "create") {
          handlePinCreate(newValue);
        } else {
          handlePinConfirm(newValue);
        }
      }
    }
  };

  const handleDelete = () => {
    setCurrentValue(currentValue.slice(0, -1));
    setError("");
  };

  const handlePinCreate = async (value: string) => {
    if (!validatePinFormat(value)) {
      setError("PIN must contain only digits");
      setPin("");
      return;
    }
    setError("");
    setTimeout(() => setStep("confirm"), 300);
  };

  const handlePinConfirm = async (value: string) => {
    if (value === pin) {
      const hashedPin = await hashPin(value);
      setPinHash(hashedPin);
      toast.success("PIN created successfully");
      onComplete();
    } else {
      setError("PINs do not match");
      setConfirmPin("");
      setTimeout(() => {
        setStep("create");
        setPin("");
        setError("");
      }, 1500);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl mb-3 shadow-lg shadow-violet-500/20">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{step === "create" ? "Create Your PIN" : "Confirm Your PIN"}</h2>
          <p className="text-slate-400 text-sm">{step === "create" ? "Enter a 4-digit PIN to secure your app" : "Enter your PIN again to confirm"}</p>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          {Array.from({ length: PIN_LENGTH }).map((_, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all
                ${error ? "border-red-500 bg-red-500/10" : currentValue.length > index ? "border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20" : "border-slate-600 bg-slate-800/30"}
              `}
            >
              {currentValue[index] && <div className={`w-2.5 h-2.5 rounded-full ${error ? "bg-red-400" : "bg-violet-400"}`} />}
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm justify-center mb-4">
            <X className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {!error && confirmPin.length === PIN_LENGTH && step === "confirm" && (
          <div className="flex items-center gap-2 text-green-400 text-sm justify-center mb-4">
            <Check className="w-4 h-4" />
            <span>Looking good!</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleNumberClick(num.toString())} disabled={currentValue.length >= PIN_LENGTH} className="h-14 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-violet-500/50 text-white text-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
              {num}
            </button>
          ))}
          <div />
          <button onClick={() => handleNumberClick("0")} disabled={currentValue.length >= PIN_LENGTH} className="h-14 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-violet-500/50 text-white text-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
            0
          </button>
          <button onClick={handleDelete} disabled={currentValue.length === 0} className="h-14 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-red-500/50 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center">
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {step === "create" && (
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-2.5 text-sm text-violet-200 mb-4">
            <p className="font-medium mb-0.5">Remember this PIN</p>
            <p className="text-violet-300/70 text-xs">You'll need it every time you open the app</p>
          </div>
        )}

        <div className="flex gap-3">
          {(onCancel || onSkip) && (
            <button onClick={handleCancel} className="flex-1 py-2.5 text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors border border-slate-700 hover:border-slate-600 rounded-lg">
              Cancel
            </button>
          )}
          {step === "create" && onSkip && currentValue.length === 0 && (
            <button onClick={onSkip} className="flex-1 py-2.5 text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors border border-slate-700 hover:border-slate-600 rounded-lg">
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
