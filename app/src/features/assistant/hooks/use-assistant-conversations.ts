import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
    createConversation,
    deleteConversation,
    getConversations,
    updateConversation,
} from '../services/assistant-chat'
import type { CreateConversationDto, UpdateConversationDto } from '../interfaces/chat.interface'

export const CONVERSATIONS_KEY = ['assistant', 'conversations'] as const

export function useAssistantConversations() {
    return useQuery({
        queryKey: CONVERSATIONS_KEY,
        queryFn: getConversations,
    })
}

export function useCreateConversation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dto?: CreateConversationDto) => createConversation(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create chat', { duration: 3000 })
        },
    })
}

export function useUpdateConversation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ uuid, data }: { uuid: string; data: UpdateConversationDto }) =>
            updateConversation(uuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY })
            toast.success('Chat renamed', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to rename chat', { duration: 3000 })
        },
    })
}

export function useDeleteConversation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (uuid: string) => deleteConversation(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY })
            toast.success('Chat deleted', { duration: 2000 })
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete chat', { duration: 3000 })
        },
    })
}
