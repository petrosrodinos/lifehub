import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type {
    ChatConversation,
    ChatMessage,
    CreateConversationDto,
    SendMessageDto,
    SendMessageResponse,
    UpdateConversationDto,
} from '../interfaces/chat.interface'

export async function getConversations(): Promise<ChatConversation[]> {
    const { data } = await axiosInstance.get<ChatConversation[]>(ApiRoutes.assistant.conversations.list)
    return data
}

export async function createConversation(dto?: CreateConversationDto): Promise<ChatConversation> {
    const { data } = await axiosInstance.post<ChatConversation>(
        ApiRoutes.assistant.conversations.create,
        dto ?? {},
    )
    return data
}

export async function updateConversation(uuid: string, dto: UpdateConversationDto): Promise<ChatConversation> {
    const { data } = await axiosInstance.patch<ChatConversation>(
        ApiRoutes.assistant.conversations.update(uuid),
        dto,
    )
    return data
}

export async function deleteConversation(uuid: string): Promise<ChatConversation> {
    const { data } = await axiosInstance.delete<ChatConversation>(
        ApiRoutes.assistant.conversations.delete(uuid),
    )
    return data
}

export async function getMessages(conversationUuid: string): Promise<ChatMessage[]> {
    const { data } = await axiosInstance.get<ChatMessage[]>(
        ApiRoutes.assistant.conversations.messages(conversationUuid),
    )
    return data
}

export async function sendMessage(
    conversationUuid: string,
    dto: SendMessageDto,
): Promise<SendMessageResponse> {
    const { data } = await axiosInstance.post<SendMessageResponse>(
        ApiRoutes.assistant.conversations.sendMessage(conversationUuid),
        dto,
    )
    return data
}
