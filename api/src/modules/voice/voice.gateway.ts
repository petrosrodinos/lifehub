import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import type { IncomingMessage } from 'http';
import type { RealtimeSession } from '@openai/agents/realtime';
import type { WebSocket } from 'ws';
import { CreateJwtService } from '@/shared/utils/jwt/jwt.service';
import { ChatService } from '@/modules/chat/chat.service';
import { AssistantToolContext } from '@/assistant/tools/tool-context.interface';
import { VoiceSessionService } from './voice-session.service';
import { extractCompletedTurn } from './utils/extract-realtime-turn.utils';
import {
  VoiceClientMessage,
  VoiceServerMessage,
} from './interfaces/voice-protocol.interface';

interface ConnectionState {
  user_uuid: string;
  conversationUuid: string | null;
  sampleRateHz: number;
  session: RealtimeSession<AssistantToolContext> | null;
  persistedItemIds: Set<string>;
}

const DEFAULT_SAMPLE_RATE_HZ = 24000;

@WebSocketGateway({ path: '/voice' })
export class VoiceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(VoiceGateway.name);
  private readonly connections = new Map<WebSocket, ConnectionState>();

  constructor(
    private readonly voiceSessionService: VoiceSessionService,
    private readonly chatService: ChatService,
    private readonly jwtService: CreateJwtService,
  ) {}

  async handleConnection(
    client: WebSocket,
    request: IncomingMessage,
  ): Promise<void> {
    try {
      const url = new URL(request.url ?? '', 'http://localhost');
      const token = url.searchParams.get('token');

      if (!token) {
        client.close(4001, 'Missing token');
        return;
      }

      const payload = await this.jwtService.verifyToken(token);

      if (!payload?.user_uuid) {
        client.close(4001, 'Invalid token');
        return;
      }

      this.connections.set(client, {
        user_uuid: payload.user_uuid,
        conversationUuid: null,
        sampleRateHz: DEFAULT_SAMPLE_RATE_HZ,
        session: null,
        persistedItemIds: new Set(),
      });

      client.on('message', (data: Buffer, isBinary: boolean) => {
        void this.handleMessage(client, data, isBinary);
      });
    } catch (error) {
      this.logger.warn(
        `Voice connection rejected: ${error instanceof Error ? error.message : String(error)}`,
      );
      client.close(4001, 'Unauthorized');
    }
  }

  handleDisconnect(client: WebSocket): void {
    const state = this.connections.get(client);
    state?.session?.close();
    this.connections.delete(client);
  }

  private async handleMessage(
    client: WebSocket,
    data: Buffer,
    isBinary: boolean,
  ): Promise<void> {
    const state = this.connections.get(client);

    if (!state) {
      return;
    }

    if (isBinary) {
      state.session?.sendAudio(bufferToArrayBuffer(data));
      return;
    }

    let message: VoiceClientMessage;

    try {
      message = JSON.parse(data.toString('utf-8'));
    } catch {
      return;
    }

    switch (message.type) {
      case 'start':
        await this.handleStart(
          client,
          state,
          message.conversationUuid,
          message.sampleRateHz,
        );
        break;
      case 'mute':
        state.session?.mute(message.muted);
        break;
      case 'interrupt':
        state.session?.interrupt();
        break;
      case 'end':
        state.session?.close();
        this.send(client, { type: 'ended' });
        client.close(1000, 'Client ended call');
        break;
    }
  }

  private async handleStart(
    client: WebSocket,
    state: ConnectionState,
    conversationUuid: string | null,
    sampleRateHz: number,
  ): Promise<void> {
    state.sampleRateHz = sampleRateHz || DEFAULT_SAMPLE_RATE_HZ;

    if (conversationUuid) {
      await this.chatService.findOneConversation(
        state.user_uuid,
        conversationUuid,
      );
      state.conversationUuid = conversationUuid;
      this.send(client, { type: 'conversation', conversationUuid });
    }

    try {
      const session = await this.voiceSessionService.createConnectedSession(
        state.user_uuid,
        state.sampleRateHz,
      );
      state.session = session;
      this.wireSessionEvents(client, state, session);
      this.send(client, { type: 'state', value: 'listening' });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to start voice session: ${message}`);
      this.send(client, {
        type: 'error',
        code: 'session_start_failed',
        message: `Failed to start voice session: ${message}`,
      });
    }
  }

  private wireSessionEvents(
    client: WebSocket,
    state: ConnectionState,
    session: RealtimeSession<AssistantToolContext>,
  ): void {
    session.on('audio', (event) => {
      if (client.readyState === client.OPEN) {
        client.send(event.data);
      }
    });

    session.on('audio_start', () => {
      this.send(client, { type: 'state', value: 'speaking' });
    });

    session.on('audio_stopped', () => {
      this.send(client, { type: 'state', value: 'listening' });
    });

    session.on('agent_start', () => {
      this.send(client, { type: 'state', value: 'thinking' });
    });

    session.on('history_updated', (history) => {
      void this.handleHistoryUpdated(client, state, history);
    });

    session.on('error', (event) => {
      this.logger.error(
        `Realtime session error: ${JSON.stringify(event.error)}`,
      );
      this.send(client, {
        type: 'error',
        code: 'session_error',
        message: extractErrorMessage(event.error),
      });
    });
  }

  private async handleHistoryUpdated(
    client: WebSocket,
    state: ConnectionState,
    history: RealtimeSession<AssistantToolContext>['history'],
  ): Promise<void> {
    const lastUser = [...history]
      .reverse()
      .find((item) => item.type === 'message' && item.role === 'user');
    const lastAssistant = [...history]
      .reverse()
      .find((item) => item.type === 'message' && item.role === 'assistant');

    if (lastUser && lastUser.type === 'message') {
      const text = lastUser.content
        .map((part) =>
          part.type === 'input_text' ? part.text : (part.transcript ?? ''),
        )
        .join(' ')
        .trim();
      if (text) {
        this.send(client, {
          type: 'caption',
          role: 'user',
          text,
          final: lastUser.status === 'completed',
        });
      }
    }

    if (lastAssistant && lastAssistant.type === 'message') {
      const text = lastAssistant.content
        .map((part) =>
          part.type === 'output_text' ? part.text : (part.transcript ?? ''),
        )
        .join(' ')
        .trim();
      const isFinal = lastAssistant.status === 'completed';

      if (text) {
        this.send(client, {
          type: 'caption',
          role: 'assistant',
          text,
          final: isFinal,
        });
      }

      if (
        isFinal &&
        !state.persistedItemIds.has(lastAssistant.itemId) &&
        text
      ) {
        state.persistedItemIds.add(lastAssistant.itemId);
        await this.persistTurn(client, state, history, lastAssistant.itemId);
      }
    }
  }

  private async persistTurn(
    client: WebSocket,
    state: ConnectionState,
    history: RealtimeSession<AssistantToolContext>['history'],
    assistantItemId: string,
  ): Promise<void> {
    const turn = extractCompletedTurn(history, assistantItemId);

    if (!turn || !turn.assistantContent) {
      return;
    }

    try {
      if (!state.conversationUuid) {
        const conversation = await this.chatService.createConversation(
          state.user_uuid,
          {},
        );
        state.conversationUuid = conversation.uuid;
        this.send(client, {
          type: 'conversation',
          conversationUuid: conversation.uuid,
        });
      }

      const { userMessage, assistantMessage } =
        await this.chatService.persistVoiceTurn(
          state.user_uuid,
          state.conversationUuid,
          turn.userContent || '[voice input]',
          turn.assistantContent,
          turn.toolTrace,
          turn.images,
        );

      this.send(client, {
        type: 'turn_persisted',
        userMessage,
        assistantMessage,
      });
    } catch (error) {
      this.logger.error(
        `Failed to persist voice turn: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  private send(client: WebSocket, message: VoiceServerMessage): void {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  }
}

function bufferToArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

function extractErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    const candidate = error as {
      message?: unknown;
      error?: { message?: unknown };
    };

    if (typeof candidate.message === 'string') {
      return candidate.message;
    }

    if (typeof candidate.error?.message === 'string') {
      return candidate.error.message;
    }
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Voice session error';
}
