import { useCallback } from "react";
import {
  AMOUNT_CALCULATOR_ACTIONS,
  AMOUNT_CALCULATOR_CONTROL_OPTIONS,
  AMOUNT_CALCULATOR_OPERATOR_OPTIONS,
  type AmountCalculatorAction,
} from "../../../../config/constants/dropdowns/amount-calculator-actions";
import {
  appendCalculatorOperator,
  evaluateAmountExpression,
  sanitizeAmountInput,
} from "../utils/amount-calculator.helper";

type AmountCalculatorFieldProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function AmountCalculatorField({ value, onChange, disabled = false }: AmountCalculatorFieldProps) {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(sanitizeAmountInput(event.target.value));
    },
    [onChange],
  );

  const handleActionClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const action = event.currentTarget.dataset.action as AmountCalculatorAction | undefined;
      if (!action) return;

      if (action === AMOUNT_CALCULATOR_ACTIONS.CLEAR) {
        onChange("");
        return;
      }

      if (action === AMOUNT_CALCULATOR_ACTIONS.EQUALS) {
        const result = evaluateAmountExpression(value);
        if (result !== null) onChange(result);
        return;
      }

      onChange(appendCalculatorOperator(value, action));
    },
    [onChange, value],
  );

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleInputChange}
        placeholder="0.00"
        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
        disabled={disabled}
        required
        autoComplete="off"
      />
      <div className="mt-2 grid grid-cols-6 gap-2">
        {AMOUNT_CALCULATOR_OPERATOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            data-action={option.value}
            onClick={handleActionClick}
            disabled={disabled}
            className="px-2 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {option.label}
          </button>
        ))}
        {AMOUNT_CALCULATOR_CONTROL_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            data-action={option.value}
            onClick={handleActionClick}
            disabled={disabled}
            className={`px-2 py-2 rounded-lg text-sm font-medium border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              option.value === AMOUNT_CALCULATOR_ACTIONS.EQUALS
                ? "bg-violet-600 text-white hover:bg-violet-700 border-violet-600"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
