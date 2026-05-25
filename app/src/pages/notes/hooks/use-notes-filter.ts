import { useMemo, useState } from 'react'
import type { Note, NoteTag, NoteType } from '../../../features/notes/interfaces/note.interface'

export interface NotesFilterState {
    showFilters: boolean
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
    searchText: string
    setSearchText: (v: string) => void
    filterTypes: NoteType[]
    filterTagUuids: string[]
    hasActiveFilters: boolean
    toggleTypeFilter: (type: NoteType) => void
    toggleTagFilter: (uuid: string) => void
    clearFilters: () => void
    closeFilters: () => void
    filteredNotes: Note[]
}

export function useNotesFilter(notes: Note[], _allTags: NoteTag[]): NotesFilterState {
    const [showFilters, setShowFilters] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [filterTypes, setFilterTypes] = useState<NoteType[]>([])
    const [filterTagUuids, setFilterTagUuids] = useState<string[]>([])

    function toggleTypeFilter(type: NoteType) {
        setFilterTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
        )
    }

    function toggleTagFilter(uuid: string) {
        setFilterTagUuids((prev) =>
            prev.includes(uuid) ? prev.filter((u) => u !== uuid) : [...prev, uuid],
        )
    }

    function clearFilters() {
        setSearchText('')
        setFilterTypes([])
        setFilterTagUuids([])
    }

    function closeFilters() {
        clearFilters()
        setShowFilters(false)
    }

    const hasActiveFilters = searchText.trim() !== '' || filterTypes.length > 0 || filterTagUuids.length > 0

    const filteredNotes = useMemo(() => {
        let result = notes
        const q = searchText.trim().toLowerCase()
        if (q) {
            result = result.filter(
                (n) =>
                    n.title.toLowerCase().includes(q) ||
                    n.content.toLowerCase().includes(q),
            )
        }
        if (filterTypes.length > 0) {
            result = result.filter((n) => filterTypes.includes(n.type))
        }
        if (filterTagUuids.length > 0) {
            result = result.filter((n) =>
                n.tags.some((t) => filterTagUuids.includes(t.uuid)),
            )
        }
        return result
    }, [notes, searchText, filterTypes, filterTagUuids])

    return {
        showFilters,
        setShowFilters,
        searchText,
        setSearchText,
        filterTypes,
        filterTagUuids,
        hasActiveFilters,
        toggleTypeFilter,
        toggleTagFilter,
        clearFilters,
        closeFilters,
        filteredNotes,
    }
}
