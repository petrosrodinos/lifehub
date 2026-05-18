import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getNotes, getNote, createNote, updateNote, deleteNote, summarizeNote } from '../services/notes'
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
