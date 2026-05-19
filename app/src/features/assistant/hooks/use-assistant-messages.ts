import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getMessages, sendMessage } from '../services/assistant-chat'
import type { ChatMessage, SendMessageDto } from '../interfaces/chat.interface'
import { CONVERSATIONS_KEY } from './use-assistant-conversations'

export const messagesKey = (conversationUuid: string) =>
    ['assistant', 'messages', conversationUuid] as const

export function useAssistantMessages(conversationUuid: string | null) {
    return useQuery({
        queryKey: messagesKey(conversationUuid ?? ''),
        queryFn: () => getMessages(conversationUuid!),
        enabled: !!conversationUuid,
    })
}

export function useSendAssistantMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            conversationUuid,
            dto,
        }: {
            conversationUuid: string
            dto: SendMessageDto
        }) => sendMessage(conversationUuid, dto),
        onMutate: async ({ conversationUuid, dto }) => {
            await queryClient.cancelQueries({ queryKey: messagesKey(conversationUuid) })

            const previous = queryClient.getQueryData<ChatMessage[]>(messagesKey(conversationUuid))

            const optimisticUser: ChatMessage = {
                uuid: `pending-user-${Date.now()}`,
                conversation_uuid: conversationUuid,
                role: 'USER',
                content: dto.content,
                created_at: new Date().toISOString(),
            }

            const optimisticAssistant: ChatMessage = {
                uuid: `pending-assistant-${Date.now()}`,
                conversation_uuid: conversationUuid,
                role: 'ASSISTANT',
                content: '',
                created_at: new Date().toISOString(),
            }

            queryClient.setQueryData<ChatMessage[]>(messagesKey(conversationUuid), (old) => [
                ...(old ?? []),
                optimisticUser,
                optimisticAssistant,
            ])

            return { previous, optimisticUserUuid: optimisticUser.uuid, optimisticAssistantUuid: optimisticAssistant.uuid }
        },
        onSuccess: (data, { conversationUuid }, context) => {
            if (!context) return

            queryClient.setQueryData<ChatMessage[]>(messagesKey(conversationUuid), (old) => {
                const withoutPending = (old ?? []).filter(
                    (m) =>
                        m.uuid !== context.optimisticUserUuid &&
                        m.uuid !== context.optimisticAssistantUuid,
                )
                return [...withoutPending, data.userMessage, data.assistantMessage]
            })

            queryClient.invalidateQueries({ queryKey: CONVERSATIONS_KEY })
        },
        onError: (error: Error, { conversationUuid }, context) => {
            if (context?.previous) {
                queryClient.setQueryData(messagesKey(conversationUuid), context.previous)
            }
            toast.error(error.message || 'Failed to send message', { duration: 3000 })
        },
    })
}
