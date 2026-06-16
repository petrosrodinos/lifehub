import type { Tool } from '@openai/agents';
import { ChatImageService } from '@/assistant/images/chat-image.service';
import { ExpensesRetrievalService } from '@/assistant/retrieval/expenses-retrieval.service';
import { GymRetrievalService } from '@/assistant/retrieval/gym-retrieval.service';
import { NotesRetrievalService } from '@/assistant/retrieval/notes-retrieval.service';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { createGetExpenseSummaryTool } from './expenses/get-expense-summary.tool';
import { createGetSpendingBreakdownTool } from './expenses/get-spending-breakdown.tool';
import { createListExpenseAccountsTool } from './expenses/list-expense-accounts.tool';
import { createListExpenseCategoriesTool } from './expenses/list-expense-categories.tool';
import { createListExpenseEntriesTool } from './expenses/list-expense-entries.tool';
import { createListExpenseTagsTool } from './expenses/list-expense-tags.tool';
import { createGetExerciseAnalyticsTool } from './gym/get-exercise-analytics.tool';
import { createListExercisesTool } from './gym/list-exercises.tool';
import { createListMuscleGroupsTool } from './gym/list-muscle-groups.tool';
import { createListWorkoutEntriesTool } from './gym/list-workout-entries.tool';
import { createListWorkoutsTool } from './gym/list-workouts.tool';
import { createCreateImageTool } from './images/create-image.tool';
import { createSearchNotesTool } from './notes/search-notes.tool';

export interface ToolRegistryDeps {
    notesRetrieval: NotesRetrievalService;
    expensesRetrieval: ExpensesRetrievalService;
    gymRetrieval: GymRetrievalService;
    chatImageService: ChatImageService;
    assistantConfig: AssistantConfig;
}

export function createToolRegistry(deps: ToolRegistryDeps): Tool[] {
    return [
        createSearchNotesTool(deps.notesRetrieval, deps.assistantConfig),
        createCreateImageTool(deps.chatImageService, deps.assistantConfig),
        createListExpenseEntriesTool(deps.expensesRetrieval, deps.assistantConfig),
        createGetExpenseSummaryTool(deps.expensesRetrieval, deps.assistantConfig),
        createGetSpendingBreakdownTool(deps.expensesRetrieval, deps.assistantConfig),
        createListExpenseAccountsTool(deps.expensesRetrieval, deps.assistantConfig),
        createListExpenseCategoriesTool(deps.expensesRetrieval, deps.assistantConfig),
        createListExpenseTagsTool(deps.expensesRetrieval, deps.assistantConfig),
        createListWorkoutsTool(deps.gymRetrieval, deps.assistantConfig),
        createListExercisesTool(deps.gymRetrieval, deps.assistantConfig),
        createListMuscleGroupsTool(deps.gymRetrieval, deps.assistantConfig),
        createGetExerciseAnalyticsTool(deps.gymRetrieval, deps.assistantConfig),
        createListWorkoutEntriesTool(deps.gymRetrieval, deps.assistantConfig),
    ];
}
