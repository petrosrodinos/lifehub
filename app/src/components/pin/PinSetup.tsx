import { useState } from 'react';
import { Lock, Check, X, Delete } from 'lucide-react';
import { hashPin, validatePinFormat } from '../../utils/pin.utils';
import { useAuthStore } from '../../store/auth-store';
import toast from 'react-hot-toast';

interface PinSetupProps {
  onComplete: () => void;
  onSkip?: () => void;
}

const PIN_LENGTH = 4;

export function PinSetup({ onComplete, onSkip }: PinSetupProps) {
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const { setPinHash } = useAuthStore();

  const currentValue = step === 'create' ? pin : confirmPin;
  const setCurrentValue = step === 'create' ? setPin : setConfirmPin;

  const handleNumberClick = (num: string) => {
    if (currentValue.length < PIN_LENGTH) {
      const newValue = currentValue + num;
      setCurrentValue(newValue);
      setError('');

      if (newValue.length === PIN_LENGTH) {
        if (step === 'create') {
          handlePinCreate(newValue);
        } else {
          handlePinConfirm(newValue);
        }
      }
    }
  };

  const handleDelete = () => {
    setCurrentValue(currentValue.slice(0, -1));
    setError('');
  };

  const handlePinCreate = async (value: string) => {
    if (!validatePinFormat(value)) {
      setError('PIN must contain only digits');
      setPin('');
      return;
    }
    setError('');
    setTimeout(() => setStep('confirm'), 300);
  };

  const handlePinConfirm = async (value: string) => {
    if (value === pin) {
      const hashedPin = await hashPin(value);
      setPinHash(hashedPin);
      toast.success('PIN created successfully');
      onComplete();
    } else {
      setError('PINs do not match');
      setConfirmPin('');
      setTimeout(() => {
        setStep('create');
        setPin('');
        setError('');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-4 shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {step === 'create' ? 'Create Your PIN' : 'Confirm Your PIN'}
          </h2>
          <p className="text-slate-400 text-sm">
            {step === 'create' 
              ? 'Enter a 4-digit PIN to secure your app' 
              : 'Enter your PIN again to confirm'}
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          {Array.from({ length: PIN_LENGTH }).map((_, index) => (
            <div
              key={index}
              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all
                ${error 
                  ? 'border-red-500 bg-red-500/10' 
                  : currentValue.length > index
                    ? 'border-amber-500 bg-amber-500/20 shadow-lg shadow-amber-500/20' 
                    : 'border-slate-600 bg-slate-800/30'
                }
              `}
            >
              {currentValue[index] && (
                <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-400' : 'bg-amber-400'}`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm justify-center mb-6">
            <X className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {!error && confirmPin.length === PIN_LENGTH && step === 'confirm' && (
          <div className="flex items-center gap-2 text-green-400 text-sm justify-center mb-6">
            <Check className="w-4 h-4" />
            <span>Looking good!</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              disabled={currentValue.length >= PIN_LENGTH}
              className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-amber-500/50 text-white text-2xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleNumberClick('0')}
            disabled={currentValue.length >= PIN_LENGTH}
            className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-amber-500/50 text-white text-2xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            disabled={currentValue.length === 0}
            className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-red-500/50 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        {step === 'create' && currentValue.length === 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-sm text-amber-200 mb-6">
            <p className="font-medium mb-1">Remember this PIN</p>
            <p className="text-amber-300/70">You'll need it every time you open the app</p>
          </div>
        )}

        {step === 'create' && onSkip && currentValue.length === 0 && (
          <div className="pt-4 border-t border-slate-700/50">
            <button
              onClick={onSkip}
              className="w-full text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
