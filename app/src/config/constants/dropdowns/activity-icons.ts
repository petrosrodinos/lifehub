export const PRESET_EMOJIS = ["📋", "🏃", "📚", "💪", "🧘", "🎯", "✍️", "🎵", "🌱", "☀️"] as const;

export type PresetEmoji = typeof PRESET_EMOJIS[number];