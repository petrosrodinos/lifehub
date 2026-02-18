import { useState, useEffect } from 'react';
import { Lock, AlertCircle, LogOut, Delete } from 'lucide-react';
import { verifyPin } from '../../utils/pin.utils';
import { useAuthStore } from '../../store/auth-store';
import { PIN_CONFIG } from '../../config/pin.config';
import toast from 'react-hot-toast';

const PIN_LENGTH = 4;

export function PinLock() {
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [error, setError] = useState('');
  const { pinHash, unlockApp, logout, full_name } = useAuthStore();

  useEffect(() => {
    if (lockoutTime) {
      const interval = setInterval(() => {
        const remaining = lockoutTime - Date.now();
        if (remaining <= 0) {
          setIsLocked(false);
          setLockoutTime(null);
          setAttempts(0);
          setError('');
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTime]);

  const getRemainingTime = () => {
    if (!lockoutTime) return '';
    const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNumberClick = (num: string) => {
    if (isLocked || pin.length >= PIN_LENGTH) return;
    
    const newPin = pin + num;
    setPin(newPin);
    setError('');

    if (newPin.length === PIN_LENGTH) {
      handlePinComplete(newPin);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  const handlePinComplete = async (value: string) => {
    if (isLocked || !pinHash) return;

    const isValid = await verifyPin(value, pinHash);

    if (isValid) {
      setError('');
      setAttempts(0);
      toast.success('Welcome back!');
      unlockApp();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= PIN_CONFIG.MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockoutTime(Date.now() + PIN_CONFIG.LOCKOUT_DURATION_MS);
        setError(`Too many attempts. Locked for 5 minutes.`);
        toast.error('Too many failed attempts');
      } else {
        const remaining = PIN_CONFIG.MAX_ATTEMPTS - newAttempts;
        setError(`Incorrect PIN. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.`);
      }

      setPin('');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_50%)]" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl mb-6 shadow-lg shadow-violet-500/20">
            <Lock className="w-10 h-10 text-white" />
          </div>
          {full_name && (
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {full_name.split(' ')[0]}</h1>
          )}
          <h2 className="text-xl font-semibold text-white mb-2">
            {isLocked ? 'Account Locked' : 'Enter Your PIN'}
          </h2>
          <p className="text-slate-400 text-sm">
            {isLocked 
              ? `Try again in ${getRemainingTime()}`
              : 'Enter your security PIN to unlock'
            }
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-8">
          <div className="flex gap-4 justify-center mb-8">
            {Array.from({ length: PIN_LENGTH }).map((_, index) => (
              <div
                key={index}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all
                  ${error 
                    ? 'border-red-500 bg-red-500/10' 
                    : pin.length > index
                      ? 'border-violet-500 bg-violet-500/20 shadow-lg shadow-violet-500/20' 
                      : 'border-slate-600 bg-slate-800/30'
                  }
                  ${isLocked ? 'opacity-50' : ''}
                `}
              >
                {pin[index] && (
                  <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-400' : 'bg-violet-400'}`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm justify-center bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isLocked && attempts > 0 && !error && (
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-violet-500 transition-all duration-300"
                style={{ width: `${(attempts / PIN_CONFIG.MAX_ATTEMPTS) * 100}%` }}
              />
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                disabled={isLocked || pin.length >= PIN_LENGTH}
                className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-violet-500/50 text-white text-2xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {num}
              </button>
            ))}
            <div />
            <button
              onClick={() => handleNumberClick('0')}
              disabled={isLocked || pin.length >= PIN_LENGTH}
              className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-violet-500/50 text-white text-2xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              disabled={isLocked || pin.length === 0}
              className="h-16 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-600 hover:border-red-500/50 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>

          <div className="pt-6 border-t border-slate-700/50">
            <button
              onClick={handleLogout}
              disabled={isLocked}
              className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Forgot your PIN? Sign out and sign back in.
        </p>
      </div>
    </div>
  );
}
