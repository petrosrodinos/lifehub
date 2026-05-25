import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getNotes, getNote, createNote, updateNote, deleteNote, summarizeNote, autoTagNote, bulkAutoTagNotes } from '../services/notes'
import type { CreateNoteDto, Note, UpdateNoteDto } from '../interfaces/note.interface'
import { Routes } from '../../../routes/routes'

const NOTES_KEY = ['notes']

export function useNotes() {
    return useQuery({
        queryKey: NOTES_KEY,
        queryFn: getNotes,
    })
}

export function useNote(uuid: string) {
    return useQuery({
        queryKey: [...NOTES_KEY, uuid],
        queryFn: () => getNote(uuid),
        enabled: !!uuid,
    })
}

export function useCreateNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateNoteDto) => createNote(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTES_KEY })
            toast.success('Note created', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create note', { duration: 3000 })
        },
    })
}

export function useUpdateNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateNoteDto }) => updateNote(uuid, data),
        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: NOTES_KEY })
            queryClient.setQueryData([...NOTES_KEY, updated.uuid], updated)
            toast.success('Note updated', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update note', { duration: 3000 })
        },
    })
}

export function useDeleteNote() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (uuid: string) => deleteNote(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTES_KEY })
            toast.success('Note deleted', { duration: 2000 })
            navigate(Routes.notes.prefix)
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete note', { duration: 3000 })
        },
    })
}

export function useSummarizeNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (uuid: string) => summarizeNote(uuid),
        onSuccess: (result, uuid) => {
            queryClient.setQueryData([...NOTES_KEY, uuid], (prev: Note | undefined) =>
                prev ? { ...prev, summary: result.summary } : prev,
            )
            queryClient.invalidateQueries({ queryKey: NOTES_KEY })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to summarize note', { duration: 3000 })
        },
    })
}

export function useAutoTagNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (uuid: string) => autoTagNote(uuid),
        onSuccess: (updatedNote) => {
            queryClient.setQueryData([...NOTES_KEY, updatedNote.uuid], updatedNote)
            queryClient.invalidateQueries({ queryKey: NOTES_KEY })
            queryClient.invalidateQueries({ queryKey: ['note-tags'] })
        },
        onError: () => {
            // Silent — auto-tagging is a background enhancement, not user-initiated
        },
    })
}

export function useBulkAutoTagNotes() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: bulkAutoTagNotes,
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: NOTES_KEY })
            queryClient.invalidateQueries({ queryKey: ['note-tags'] })
            const { successfully_tagged, new_tags_created } = result
            if (successfully_tagged === 0) {
                toast.success('All notes already have tags', { duration: 3000 })
            } else {
                const tagMsg = new_tags_created > 0 ? ` · ${new_tags_created} new tag${new_tags_created > 1 ? 's' : ''} created` : ''
                toast.success(`Tagged ${successfully_tagged} note${successfully_tagged > 1 ? 's' : ''} with AI${tagMsg}`, { duration: 4000 })
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to auto-tag notes', { duration: 3000 })
        },
    })
}
