import { Injectable, Logger } from '@nestjs/common';
import { Agent, run, user } from '@openai/agents';
import { ConfigService } from '@nestjs/config';
import { ChatMessage } from '@/generated/prisma';
import { ChatImageService } from '@/assistant/images/chat-image.service';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { NotesRetrievalService } from '@/assistant/retrieval/notes-retrieval.service';
import { createToolRegistry } from '@/assistant/tools/tool-registry';
import { ASSISTANT_SYSTEM_PROMPT } from '@/assistant/prompts/system-prompt';
import { AssistantToolContext } from '@/assistant/tools/tool-context.interface';
import { AssistantConfig } from './config/assistant.config';
import { AssistantRunResult } from './interfaces/assistant-run.interface';
import { historyToAgentInput } from './utils/history-to-agent-input.utils';
import { extractToolTrace } from './utils/extract-tool-trace.utils';
import { extractGeneratedImages } from './utils/extract-generated-images.utils';

@Injectable()
export class AssistantOrchestratorService {
    private readonly logger = new Logger(AssistantOrchestratorService.name);

    constructor(
        private readonly notesRetrieval: NotesRetrievalService,
        private readonly expensesRetrieval: ExpensesRetrievalService,
        private readonly chatImageService: ChatImageService,
        private readonly assistantConfig: AssistantConfig,
        private readonly configService: ConfigService,
    ) {
        const apiKey = this.configService.get<string>('OPENAI_API_KEY');
        if (apiKey) {
            process.env.OPENAI_API_KEY = apiKey;
        }
    }

    async run(
        user_uuid: string,
        history: ChatMessage[],
        userMessage: string,
        conversationUuid: string,
    ): Promise<AssistantRunResult> {
        const tools = createToolRegistry({
            notesRetrieval: this.notesRetrieval,
            expensesRetrieval: this.expensesRetrieval,
            chatImageService: this.chatImageService,
            assistantConfig: this.assistantConfig,
        });

        const todayIso = new Date().toISOString().split('T')[0];

        const agent = new Agent<AssistantToolContext>({
            name: 'LifeHub Assistant',
            instructions: `${ASSISTANT_SYSTEM_PROMPT}\nToday's date: ${todayIso}.`,
            model: this.assistantConfig.model,
            tools,
        });

        const input = [...historyToAgentInput(history), user(userMessage)];

        const result = await run(agent, input, {
            context: { user_uuid },
            maxTurns: 10,
        });

        const assistantText = this.resolveFinalOutput(result.finalOutput);
        const toolTrace = extractToolTrace(result.newItems);
        const images = extractGeneratedImages(result.newItems);

        return { assistantText, toolTrace, images };
    }

    private resolveFinalOutput(finalOutput: unknown): string {
        if (typeof finalOutput === 'string') {
            return finalOutput;
        }

        if (finalOutput === undefined || finalOutput === null) {
            return 'I was unable to generate a response. Please try again.';
        }

        return String(finalOutput);
    }
}
