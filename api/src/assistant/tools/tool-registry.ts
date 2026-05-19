import type { Tool } from '@openai/agents';
import { ChatImageService } from '@/assistant/images/chat-image.service';
import { NotesRetrievalService } from '@/assistant/retrieval/notes-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { createCreateImageTool } from './images/create-image.tool';
import { createSearchNotesTool } from './notes/search-notes.tool';

export interface ToolRegistryDeps {
    notesRetrieval: NotesRetrievalService;
    chatImageService: ChatImageService;
    assistantConfig: AssistantConfig;
}

export function createToolRegistry(deps: ToolRegistryDeps): Tool[] {
    return [
        createSearchNotesTool(deps.notesRetrieval, deps.assistantConfig),
        createCreateImageTool(deps.chatImageService, deps.assistantConfig),
    ];
}
