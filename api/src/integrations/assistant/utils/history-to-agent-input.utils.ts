import { assistant, user, type AgentInputItem } from '@openai/agents';
import { ChatMessage, ChatMessageRole } from '@/generated/prisma';

export function historyToAgentInput(history: ChatMessage[]): AgentInputItem[] {
    const items: AgentInputItem[] = [];

    for (const message of history) {
        if (message.role === ChatMessageRole.USER) {
            items.push(user(message.content));
        } else if (message.role === ChatMessageRole.ASSISTANT) {
            items.push(assistant(message.content));
        }
    }

    return items;
}
