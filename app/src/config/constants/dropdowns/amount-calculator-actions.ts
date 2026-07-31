export const AMOUNT_CALCULATOR_ACTIONS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '×',
  DIVIDE: '÷',
  EQUALS: '=',
  CLEAR: 'C',
} as const

export type AmountCalculatorAction =
  (typeof AMOUNT_CALCULATOR_ACTIONS)[keyof typeof AMOUNT_CALCULATOR_ACTIONS]

export const AMOUNT_CALCULATOR_OPERATOR_OPTIONS = [
  { value: AMOUNT_CALCULATOR_ACTIONS.ADD, label: '+' },
  { value: AMOUNT_CALCULATOR_ACTIONS.SUBTRACT, label: '−' },
  { value: AMOUNT_CALCULATOR_ACTIONS.MULTIPLY, label: '×' },
  { value: AMOUNT_CALCULATOR_ACTIONS.DIVIDE, label: '÷' },
] as const

export const AMOUNT_CALCULATOR_CONTROL_OPTIONS = [
  { value: AMOUNT_CALCULATOR_ACTIONS.CLEAR, label: 'C' },
  { value: AMOUNT_CALCULATOR_ACTIONS.EQUALS, label: '=' },
] as const
