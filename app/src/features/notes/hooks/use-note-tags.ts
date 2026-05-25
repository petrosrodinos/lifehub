import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getNoteTags, createNoteTag, updateNoteTag, deleteNoteTag } from '../services/note-tags'
import type { CreateNoteTagDto, UpdateNoteTagDto } from '../interfaces/note.interface'

export const NOTE_TAGS_KEY = ['note-tags']
const NOTES_KEY = ['notes']

export function useNoteTags() {
    return useQuery({
        queryKey: NOTE_TAGS_KEY,
        queryFn: getNoteTags,
    })
}

export function useCreateNoteTag() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateNoteTagDto) => createNoteTag(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTE_TAGS_KEY })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create tag', { duration: 3000 })
        },
    })
}

export function useUpdateNoteTag() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateNoteTagDto }) => updateNoteTag(uuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTE_TAGS_KEY })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update tag', { duration: 3000 })
        },
    })
}

export function useDeleteNoteTag() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (uuid: string) => deleteNoteTag(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTE_TAGS_KEY })
            queryClient.invalidateQueries({ queryKey: NOTES_KEY })
            toast.success('Tag deleted', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete tag', { duration: 3000 })
        },
    })
}
