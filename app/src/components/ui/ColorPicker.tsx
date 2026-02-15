import { useState } from 'react'
import { Plus } from 'lucide-react'

type ColorPickerProps = {
  value: string
  onChange: (color: string) => void
  presetColors: readonly string[]
  disabled?: boolean
}

export function ColorPicker({ value, onChange, presetColors, disabled = false }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState('#8B5CF6')
  const [showCustomColorInput, setShowCustomColorInput] = useState(false)
  const [customColors, setCustomColors] = useState<string[]>([])

  const allColors = [...presetColors, ...customColors]

  const handleCustomColorSubmit = () => {
    if (customColor) {
      if (!allColors.includes(customColor)) {
        setCustomColors((prev) => [...prev, customColor])
      }
      onChange(customColor)
      setShowCustomColorInput(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {allColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            disabled={disabled}
            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
              value === color ? 'border-white scale-110' : 'border-slate-600'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        
        <button
          type="button"
          onClick={() => setShowCustomColorInput(!showCustomColorInput)}
          disabled={disabled}
          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
            showCustomColorInput ? 'border-white scale-110' : 'border-slate-600 hover:border-violet-400'
          }`}
          style={{ backgroundColor: '#1e293b' }}
        >
          <Plus className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {showCustomColorInput && (
        <div className="flex gap-2 mt-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              disabled={disabled}
              className="w-12 h-8 rounded cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              placeholder="#000000"
              className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
              disabled={disabled}
              maxLength={7}
            />
          </div>
          <button
            type="button"
            onClick={handleCustomColorSubmit}
            disabled={disabled}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Use
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomColorInput(false)
              setCustomColor('#8B5CF6')
            }}
            disabled={disabled}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
