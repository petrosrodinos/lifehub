import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime';
import { ChatImageService } from '@/assistant/images/chat-image.service';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { GymRetrievalService } from '@/assistant/retrieval/gym-retrieval.service';
import { NotesRetrievalService } from '@/assistant/retrieval/notes-retrieval.service';
import { ASSISTANT_SYSTEM_PROMPT } from '@/assistant/prompts/system-prompt';
import { createToolRegistry } from '@/assistant/tools/tool-registry';
import { AssistantToolContext } from '@/assistant/tools/tool-context.interface';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';

const MAX_INPUT_SAMPLE_RATE_HZ = 24000;

@Injectable()
export class VoiceSessionService {
  constructor(
    private readonly notesRetrieval: NotesRetrievalService,
    private readonly expensesRetrieval: ExpensesRetrievalService,
    private readonly gymRetrieval: GymRetrievalService,
    private readonly chatImageService: ChatImageService,
    private readonly assistantConfig: AssistantConfig,
    private readonly configService: ConfigService,
  ) {}

  async createConnectedSession(
    user_uuid: string,
    requestedInputSampleRateHz: number,
  ): Promise<RealtimeSession<AssistantToolContext>> {
    // OpenAI's Realtime API rejects an input rate above 24kHz. The client requests a 24kHz
    // AudioContext and this should already match, but clamp defensively in case a browser
    // doesn't honor that (or reports something unexpected) rather than failing the whole call.
    const inputSampleRateHz = Math.min(
      requestedInputSampleRateHz || MAX_INPUT_SAMPLE_RATE_HZ,
      MAX_INPUT_SAMPLE_RATE_HZ,
    );

    const tools = createToolRegistry({
      notesRetrieval: this.notesRetrieval,
      expensesRetrieval: this.expensesRetrieval,
      gymRetrieval: this.gymRetrieval,
      chatImageService: this.chatImageService,
      assistantConfig: this.assistantConfig,
    });

    const todayIso = new Date().toISOString().split('T')[0];

    const agent = new RealtimeAgent<AssistantToolContext>({
      name: 'LifeHub Assistant',
      instructions: `${ASSISTANT_SYSTEM_PROMPT}\nToday's date: ${todayIso}. You are in a live voice conversation: keep replies conversational and concise, since they will be spoken aloud. Speak in English unless the user is clearly speaking a different language — never switch language on your own.`,
      tools,
    });

    const apiKey = this.configService.get<string>('OPENAI_API_KEY') ?? '';

    const session = new RealtimeSession(agent, {
      apiKey,
      model: this.assistantConfig.realtimeModel,
      transport: 'websocket',
      context: { user_uuid },
      config: {
        voice: this.assistantConfig.realtimeVoice,
        audio: {
          input: {
            format: { type: 'audio/pcm', rate: inputSampleRateHz },
            turnDetection: { type: 'server_vad' },
          },
          output: {
            format: { type: 'audio/pcm', rate: 24000 },
          },
        },
      },
    });

    await session.connect({
      apiKey,
      model: this.assistantConfig.realtimeModel,
    });

    return session;
  }
}
