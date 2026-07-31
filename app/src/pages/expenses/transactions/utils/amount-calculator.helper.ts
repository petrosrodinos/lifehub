const OPERATOR_CHARS = new Set(['+', '-', '×', '÷', '*', '/'])
const DISPLAY_OPERATOR_MAP: Record<string, string> = {
  '*': '×',
  '/': '÷',
  '−': '-',
}
const EVAL_OPERATOR_MAP: Record<string, string> = {
  '×': '*',
  '÷': '/',
  '−': '-',
}

function normalizeExpression(expression: string): string {
  return expression
    .replace(/\s+/g, '')
    .replace(/[−]/g, '-')
    .replace(/[×*]/g, '×')
    .replace(/[÷/]/g, '÷')
}

function tokenize(expression: string): string[] | null {
  const normalized = normalizeExpression(expression)
  if (!normalized) return null

  const tokens: string[] = []
  let index = 0

  while (index < normalized.length) {
    const char = normalized[index]

    if (char === '+' || char === '×' || char === '÷') {
      if (tokens.length === 0 || OPERATOR_CHARS.has(tokens[tokens.length - 1])) {
        return null
      }
      tokens.push(char)
      index += 1
      continue
    }

    if (char === '-') {
      const isUnary =
        tokens.length === 0 || OPERATOR_CHARS.has(tokens[tokens.length - 1])

      if (isUnary) {
        let end = index + 1
        while (end < normalized.length && /[0-9.]/.test(normalized[end])) {
          end += 1
        }
        const numberToken = normalized.slice(index, end)
        if (!isValidNumberToken(numberToken)) return null
        tokens.push(numberToken)
        index = end
        continue
      }

      tokens.push(char)
      index += 1
      continue
    }

    if (/[0-9.]/.test(char)) {
      let end = index + 1
      while (end < normalized.length && /[0-9.]/.test(normalized[end])) {
        end += 1
      }
      const numberToken = normalized.slice(index, end)
      if (!isValidNumberToken(numberToken)) return null
      tokens.push(numberToken)
      index = end
      continue
    }

    return null
  }

  if (tokens.length === 0) return null
  if (OPERATOR_CHARS.has(tokens[tokens.length - 1])) return null

  return tokens
}

function isValidNumberToken(token: string): boolean {
  if (!token || token === '-' || token === '.') return false
  if ((token.match(/\./g) || []).length > 1) return false
  return /^-?\d*\.?\d+$/.test(token)
}

function applyOperation(left: number, operator: string, right: number): number | null {
  switch (operator) {
    case '+':
      return left + right
    case '-':
      return left - right
    case '*':
      return left * right
    case '/':
      if (right === 0) return null
      return left / right
    default:
      return null
  }
}

function evaluateTokens(tokens: string[]): number | null {
  const values: number[] = []
  const operators: string[] = []

  for (const token of tokens) {
    if (OPERATOR_CHARS.has(token)) {
      operators.push(EVAL_OPERATOR_MAP[token] ?? token)
      continue
    }

    const value = Number(token)
    if (!Number.isFinite(value)) return null
    values.push(value)
  }

  const multiplied: number[] = []
  const remainingOperators: string[] = []
  let current = values[0]

  for (let index = 0; index < operators.length; index += 1) {
    const operator = operators[index]
    const next = values[index + 1]

    if (operator === '*' || operator === '/') {
      const result = applyOperation(current, operator, next)
      if (result === null || !Number.isFinite(result)) return null
      current = result
      continue
    }

    multiplied.push(current)
    remainingOperators.push(operator)
    current = next
  }

  multiplied.push(current)

  let result = multiplied[0]
  for (let index = 0; index < remainingOperators.length; index += 1) {
    const nextResult = applyOperation(result, remainingOperators[index], multiplied[index + 1])
    if (nextResult === null || !Number.isFinite(nextResult)) return null
    result = nextResult
  }

  return result
}

function formatResult(value: number): string {
  const rounded = Math.round(value * 100) / 100
  return parseFloat(rounded.toFixed(2)).toString()
}

export function isNumericAmount(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  return /^-?\d+(\.\d+)?$/.test(trimmed) && Number.isFinite(Number(trimmed))
}

export function evaluateAmountExpression(expression: string): string | null {
  const tokens = tokenize(expression)
  if (!tokens) return null

  if (tokens.length === 1 && isNumericAmount(tokens[0])) {
    return formatResult(Number(tokens[0]))
  }

  const result = evaluateTokens(tokens)
  if (result === null) return null

  return formatResult(result)
}

export function appendCalculatorOperator(expression: string, operator: string): string {
  const displayOperator = DISPLAY_OPERATOR_MAP[operator] ?? operator
  const normalized = normalizeExpression(expression)

  if (!normalized) {
    if (displayOperator === '-') return '-'
    return ''
  }

  const lastChar = normalized[normalized.length - 1]
  if (OPERATOR_CHARS.has(lastChar)) {
    if (normalized.length === 1 && displayOperator === '-') return '-'
    return `${normalized.slice(0, -1)}${displayOperator}`
  }

  return `${normalized}${displayOperator}`
}

export function sanitizeAmountInput(value: string): string {
  return value
    .replace(/[^0-9+\-×÷*/.,]/g, '')
    .replace(/,/g, '.')
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
}
