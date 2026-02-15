import { useState } from 'react'
import { Plus } from 'lucide-react'

type EmojiPickerProps = {
  value: string
  onChange: (emoji: string) => void
  presetEmojis: readonly string[]
  disabled?: boolean
}

export function EmojiPicker({ value, onChange, presetEmojis, disabled = false }: EmojiPickerProps) {
  const [customEmoji, setCustomEmoji] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customEmojis, setCustomEmojis] = useState<string[]>([])

  const allEmojis = [...presetEmojis, ...customEmojis]

  const handleCustomEmojiSubmit = () => {
    if (customEmoji.trim()) {
      const newEmoji = customEmoji.trim()
      if (!allEmojis.includes(newEmoji)) {
        setCustomEmojis((prev) => [...prev, newEmoji])
      }
      onChange(newEmoji)
      setCustomEmoji('')
      setShowCustomInput(false)
    }
  }

  const handleCustomEmojiKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCustomEmojiSubmit()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {allEmojis.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onChange(emoji)}
            disabled={disabled}
            className={`w-10 h-10 text-xl rounded-lg border-2 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
              value === emoji ? 'border-violet-500 bg-violet-500/10 scale-110' : 'border-slate-600'
            }`}
          >
            {emoji}
          </button>
        ))}
        
        <button
          type="button"
          onClick={() => setShowCustomInput(!showCustomInput)}
          disabled={disabled}
          className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
            showCustomInput ? 'border-violet-500 bg-violet-500/10 scale-110' : 'border-slate-600 hover:border-violet-400'
          }`}
        >
          <Plus className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {showCustomInput && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customEmoji}
            onChange={(e) => setCustomEmoji(e.target.value)}
            onKeyDown={handleCustomEmojiKeyDown}
            placeholder="Type or paste emoji"
            className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-center text-xl"
            disabled={disabled}
            maxLength={4}
            autoFocus
          />
          <button
            type="button"
            onClick={handleCustomEmojiSubmit}
            disabled={disabled || !customEmoji.trim()}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            Use
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(false)
              setCustomEmoji('')
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
