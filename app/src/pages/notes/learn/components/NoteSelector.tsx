import { Search, X, Check } from 'lucide-react';
import { useNotes } from '../../../../features/notes/hooks/use-notes';
import { useNoteTags } from '../../../../features/notes/hooks/use-note-tags';
import { useNotesFilter } from '../../hooks/use-notes-filter';
import { NOTE_TYPES, NOTE_TYPE_MAP } from '../../../../features/notes/constants';
import type { Note } from '../../../../features/notes/interfaces/note.interface';

interface Props {
    selectedUuids: string[];
    onToggle: (uuid: string) => void;
}

export function NoteSelector({ selectedUuids, onToggle }: Props) {
    const { data: notes = [], isLoading } = useNotes();
    const { data: tags = [] } = useNoteTags();
    const filter = useNotesFilter(notes, tags);

    if (isLoading) {
        return (
            <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-slate-800 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 min-h-0">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search notes…"
                    value={filter.searchText}
                    onChange={(e) => filter.setSearchText(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700/50 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                />
                {filter.searchText && (
                    <button
                        onClick={() => filter.setSearchText('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-1.5">
                {NOTE_TYPES.map((t) => (
                    <button
                        key={t.type}
                        onClick={() => filter.toggleTypeFilter(t.type)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                            filter.filterTypes.includes(t.type)
                                ? `${t.bg} ${t.color} ${t.border}`
                                : 'bg-slate-800 text-slate-400 border-slate-700/50 hover:border-slate-600'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
                {tags.map((tag) => (
                    <button
                        key={tag.uuid}
                        onClick={() => filter.toggleTagFilter(tag.uuid)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                            filter.filterTagUuids.includes(tag.uuid)
                                ? 'text-white border-transparent'
                                : 'bg-slate-800 text-slate-400 border-slate-700/50 hover:border-slate-600'
                        }`}
                        style={
                            filter.filterTagUuids.includes(tag.uuid)
                                ? { backgroundColor: tag.color + '40', borderColor: tag.color + '80', color: tag.color }
                                : undefined
                        }
                    >
                        {tag.title}
                    </button>
                ))}
            </div>

            <div className="text-xs text-slate-500">
                {selectedUuids.length > 0 && (
                    <span className="text-violet-400 font-medium">{selectedUuids.length} selected · </span>
                )}
                {filter.filteredNotes.length} notes
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 max-h-72 pr-1">
                {filter.filteredNotes.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-8">No notes found</p>
                ) : (
                    filter.filteredNotes.map((note) => (
                        <SelectableNoteCard
                            key={note.uuid}
                            note={note}
                            selected={selectedUuids.includes(note.uuid)}
                            onToggle={() => onToggle(note.uuid)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function SelectableNoteCard({
    note,
    selected,
    onToggle,
}: {
    note: Note;
    selected: boolean;
    onToggle: () => void;
}) {
    const t = NOTE_TYPE_MAP[note.type];
    const Icon = t.Icon;

    return (
        <button
            onClick={onToggle}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                selected
                    ? 'bg-violet-900/20 border-violet-600/50'
                    : 'bg-slate-800/50 border-slate-700/40 hover:border-slate-600/60'
            }`}
        >
            <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${t.bg} border ${t.border}`}
            >
                <Icon className={`w-3.5 h-3.5 ${t.color}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-100 truncate">{note.title}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                    {note.content.slice(0, 80)}
                </p>
            </div>
            <div
                className={`w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-colors ${
                    selected
                        ? 'bg-violet-600 border-violet-500'
                        : 'border-slate-600'
                }`}
            >
                {selected && <Check className="w-3 h-3 text-white" />}
            </div>
        </button>
    );
}
