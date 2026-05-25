import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type { ChatConversation, ChatMessage, SendMessageResponse } from '../../assistant/interfaces/chat.interface'

export interface NoteConversationData {
    conversation: ChatConversation
    messages: ChatMessage[]
}

export async function getNoteConversation(noteUuid: string): Promise<NoteConversationData | null> {
    const { data } = await axiosInstance.get<NoteConversationData | null>(
        ApiRoutes.assistant.noteConversations.get(noteUuid),
    )
    return data
}

export type SendNoteMessageResponse = SendMessageResponse & { conversationUuid: string }

export async function sendNoteMessage(noteUuid: string, content: string): Promise<SendNoteMessageResponse> {
    const { data } = await axiosInstance.post<SendNoteMessageResponse>(
        ApiRoutes.assistant.noteConversations.sendMessage(noteUuid),
        { content },
    )
    return data
}
