export type ChatMessageRole = 'USER' | 'ASSISTANT' | 'TOOL'

export type MessageStatus = 'pending' | 'complete' | 'error'

export interface ChatConversation {
    uuid: string
    user_uuid: string
    title: string
    created_at: string
    updated_at: string
}

export interface ChatGeneratedImage {
    url: string
    prompt: string
}

export interface ChatMessageMetadata {
    toolTrace?: Array<{ name: string; resultSummary?: string }>
    images?: ChatGeneratedImage[]
}

export interface ChatMessage {
    uuid: string
    conversation_uuid: string
    role: ChatMessageRole
    content: string
    metadata?: ChatMessageMetadata | null
    created_at: string
}

export interface CreateConversationDto {
    title?: string
}

export interface UpdateConversationDto {
    title: string
}

export interface SendMessageDto {
    content: string
}

export interface SendMessageResponse {
    userMessage: ChatMessage
    assistantMessage: ChatMessage
}

export interface DisplayMessage extends ChatMessage {
    status?: MessageStatus
}
