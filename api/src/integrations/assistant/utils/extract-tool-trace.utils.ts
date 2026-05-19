import type { RunItem } from '@openai/agents';
import { AssistantToolTraceEntry } from '../interfaces/assistant-run.interface';

export function extractToolTrace(newItems: RunItem[]): AssistantToolTraceEntry[] {
    const trace: AssistantToolTraceEntry[] = [];

    for (const item of newItems) {
        if (item.type === 'tool_call_item') {
            const raw = item.rawItem as { name?: string };
            trace.push({ name: raw?.name ?? 'unknown' });
        }
        if (item.type === 'tool_call_output_item') {
            const last = trace[trace.length - 1];
            if (last) {
                const output = item.output;
                if (typeof output === 'string') {
                    last.resultSummary = output.slice(0, 200);
                } else if (output !== undefined) {
                    last.resultSummary = JSON.stringify(output).slice(0, 200);
                }
            }
        }
    }

    return trace;
}
