import { useState, useRef, useEffect, type KeyboardEvent } from 'react';

interface PinInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
}

export function PinInput({ length, value, onChange, onComplete, error = false, disabled = false }: PinInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[focusedIndex] && !disabled) {
      inputRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, disabled]);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleChange = (index: number, digit: string) => {
    if (disabled) return;

    if (digit && !/^\d$/.test(digit)) return;

    const newValue = value.split('');
    newValue[index] = digit;
    const updatedValue = newValue.join('');

    onChange(updatedValue);

    if (digit && index < length - 1) {
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      
      if (value[index]) {
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      } else if (index > 0) {
        const newValue = value.split('');
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        setFocusedIndex(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setFocusedIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (disabled) return;

    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);

    if (pastedData.length < length) {
      setFocusedIndex(pastedData.length);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          disabled={disabled}
          className={`w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all
            ${error 
              ? 'border-red-500 bg-red-500/10 text-red-400' 
              : focusedIndex === index 
                ? 'border-amber-500 bg-slate-800/50 text-white shadow-lg shadow-amber-500/20' 
                : 'border-slate-600 bg-slate-800/30 text-white'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-amber-400/50'}
            focus:outline-none focus:ring-2 focus:ring-amber-500/50
          `}
        />
      ))}
    </div>
  );
}
