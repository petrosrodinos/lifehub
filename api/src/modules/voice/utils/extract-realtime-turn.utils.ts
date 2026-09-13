import type { RealtimeItem } from '@openai/agents/realtime';
import {
  AssistantGeneratedImage,
  AssistantToolTraceEntry,
} from '@/integrations/assistant/interfaces/assistant-run.interface';

export interface ExtractedRealtimeTurn {
  userContent: string;
  assistantContent: string;
  toolTrace: AssistantToolTraceEntry[];
  images: AssistantGeneratedImage[];
}

interface CreateImageToolOutput {
  url?: string;
  prompt?: string;
  error?: string;
}

function parseCreateImageOutput(
  value: string,
): CreateImageToolOutput | undefined {
  try {
    return JSON.parse(value) as CreateImageToolOutput;
  } catch {
    return undefined;
  }
}

/**
 * Derives a completed voice turn (both sides of the exchange, tool trace, generated images)
 * directly from the RealtimeSession's history once a given assistant message item has finished.
 * Walking history rather than accumulating agent_tool_start/end events avoids the fact that
 * agent_end fires once per model response round (once per tool call, plus once for the final
 * text), not once per logical conversational turn.
 */
export function extractCompletedTurn(
  history: RealtimeItem[],
  assistantItemId: string,
): ExtractedRealtimeTurn | null {
  const assistantIndex = history.findIndex(
    (item) => item.itemId === assistantItemId,
  );

  if (assistantIndex === -1) {
    return null;
  }

  const assistantItem = history[assistantIndex];

  if (assistantItem.type !== 'message' || assistantItem.role !== 'assistant') {
    return null;
  }

  const assistantContent = assistantItem.content
    .map((part) =>
      part.type === 'output_text' ? part.text : (part.transcript ?? ''),
    )
    .join(' ')
    .trim();

  let userIndex = -1;

  for (let i = assistantIndex - 1; i >= 0; i--) {
    const item = history[i];

    if (item.type === 'message' && item.role === 'user') {
      userIndex = i;
      break;
    }
  }

  if (userIndex === -1) {
    return null;
  }

  const userItem = history[userIndex];

  if (userItem.type !== 'message' || userItem.role !== 'user') {
    return null;
  }

  const userContent = userItem.content
    .map((part) =>
      part.type === 'input_text' ? part.text : (part.transcript ?? ''),
    )
    .join(' ')
    .trim();

  const toolTrace: AssistantToolTraceEntry[] = [];
  const images: AssistantGeneratedImage[] = [];

  for (let i = userIndex + 1; i < assistantIndex; i++) {
    const item = history[i];

    if (item.type !== 'function_call') {
      continue;
    }

    const entry: AssistantToolTraceEntry = { name: item.name };

    if (item.output) {
      entry.resultSummary = item.output.slice(0, 200);
    }

    toolTrace.push(entry);

    if (item.name === 'create_image' && item.output) {
      const parsed = parseCreateImageOutput(item.output);

      if (parsed?.url && parsed.prompt && !parsed.error) {
        images.push({ url: parsed.url, prompt: parsed.prompt });
      }
    }
  }

  return { userContent, assistantContent, toolTrace, images };
}
