import { BookOpen, Lightbulb, StickyNote, Video, Newspaper } from 'lucide-react'
import type { NoteType } from './interfaces/note.interface'

export interface NoteTypeConfig {
    type: NoteType
    label: string
    Icon: typeof BookOpen
    color: string
    bg: string
    border: string
    hex: string
}

export const NOTE_TYPES: NoteTypeConfig[] = [
    { type: 'BOOK',    label: 'Book',    Icon: BookOpen,   color: 'text-amber-400',  bg: 'bg-amber-400/10',  border: 'border-amber-400/30',  hex: '#fbbf24' },
    { type: 'IDEA',    label: 'Idea',    Icon: Lightbulb,  color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', hex: '#facc15' },
    { type: 'NOTE',    label: 'Note',    Icon: StickyNote, color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/30', hex: '#a78bfa' },
    { type: 'VIDEO',   label: 'Video',   Icon: Video,      color: 'text-rose-400',   bg: 'bg-rose-400/10',   border: 'border-rose-400/30',   hex: '#fb7185' },
    { type: 'ARTICLE', label: 'Article', Icon: Newspaper,  color: 'text-cyan-400',   bg: 'bg-cyan-400/10',   border: 'border-cyan-400/30',   hex: '#22d3ee' },
]

export const NOTE_TYPE_MAP = Object.fromEntries(NOTE_TYPES.map((t) => [t.type, t])) as Record<NoteType, NoteTypeConfig>
