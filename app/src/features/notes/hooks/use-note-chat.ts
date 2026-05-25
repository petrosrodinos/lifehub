import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getNoteConversation, sendNoteMessage } from '../services/note-chat'
import type { ChatMessage } from '../../assistant/interfaces/chat.interface'
import type { NoteConversationData, SendNoteMessageResponse } from '../services/note-chat'

export const noteConversationKey = (noteUuid: string) =>
    ['notes', 'conversation', noteUuid] as const

export function useNoteConversation(noteUuid: string) {
    return useQuery({
        queryKey: noteConversationKey(noteUuid),
        queryFn: () => getNoteConversation(noteUuid),
        enabled: !!noteUuid,
        staleTime: 30_000,
    })
}

export function useSendNoteMessage(noteUuid: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (content: string) => sendNoteMessage(noteUuid, content),
        onMutate: async (content) => {
            await queryClient.cancelQueries({ queryKey: noteConversationKey(noteUuid) })

            const previous = queryClient.getQueryData<NoteConversationData | null>(
                noteConversationKey(noteUuid),
            )

            const optimisticUser: ChatMessage = {
                uuid: `pending-user-${Date.now()}`,
                conversation_uuid: '',
                role: 'USER',
                content,
                created_at: new Date().toISOString(),
            }
            const optimisticAssistant: ChatMessage = {
                uuid: `pending-assistant-${Date.now()}`,
                conversation_uuid: '',
                role: 'ASSISTANT',
                content: '',
                created_at: new Date().toISOString(),
            }

            queryClient.setQueryData<NoteConversationData>(noteConversationKey(noteUuid), (old) => {
                const existingMessages = old?.messages ?? []
                return {
                    conversation: old?.conversation ?? {
                        uuid: '',
                        user_uuid: '',
                        title: '',
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    },
                    messages: [...existingMessages, optimisticUser, optimisticAssistant],
                }
            })

            return {
                previous,
                optimisticUserUuid: optimisticUser.uuid,
                optimisticAssistantUuid: optimisticAssistant.uuid,
            }
        },
        onSuccess: (data: SendNoteMessageResponse, _content, context) => {
            if (!context) return

            queryClient.setQueryData<NoteConversationData>(noteConversationKey(noteUuid), (old) => {
                const baseMessages = old?.messages ?? []
                const withoutPending = baseMessages.filter(
                    (m) =>
                        m.uuid !== context.optimisticUserUuid &&
                        m.uuid !== context.optimisticAssistantUuid,
                )
                return {
                    // Persist the real conversation UUID from the response
                    conversation: old?.conversation?.uuid
                        ? old.conversation
                        : {
                              uuid: data.conversationUuid,
                              user_uuid: '',
                              title: '',
                              created_at: new Date().toISOString(),
                              updated_at: new Date().toISOString(),
                          },
                    messages: [...withoutPending, data.userMessage, data.assistantMessage],
                }
            })

            // Invalidate to get fresh conversation metadata (title, etc.)
            queryClient.invalidateQueries({ queryKey: noteConversationKey(noteUuid) })
        },
        onError: (error: Error, _content, context) => {
            if (context?.previous !== undefined) {
                queryClient.setQueryData(noteConversationKey(noteUuid), context.previous)
            }
            toast.error(error.message || 'Failed to send message', { duration: 3000 })
        },
    })
}
