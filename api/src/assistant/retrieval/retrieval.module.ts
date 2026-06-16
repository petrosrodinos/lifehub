import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { PineconeModule } from '@/integrations/vector-db/pinecone.module';
import { AssistantConfig } from '@/integrations/assistant/config/assistant.config';
import { ExpenseAccountsModule } from '@/modules/expenses/expense-accounts/expense-accounts.module';
import { ExpenseCategoriesModule } from '@/modules/expenses/expense-categories/expense-categories.module';
import { ExpenseEntriesModule } from '@/modules/expenses/expense-entries/expense-entries.module';
import { ExpenseSubcategoriesModule } from '@/modules/expenses/expense-subcategories/expense-subcategories.module';
import { ExpenseTagsModule } from '@/modules/expenses/expense-tags/expense-tags.module';
import { ExercisesModule } from '@/modules/gym/exercises/exercises.module';
import { MuscleGroupsModule } from '@/modules/gym/muscle-groups/muscle-groups.module';
import { WorkoutEntriesModule } from '@/modules/gym/workout-entries/workout-entries.module';
import { WorkoutsModule } from '@/modules/gym/workouts/workouts.module';
import { ExpensesRetrievalService } from './expenses-retrieval.service';
import { GymRetrievalService } from './gym-retrieval.service';
import { NotesRetrievalService } from './notes-retrieval.service';

@Module({
    imports: [
        PrismaModule,
        AiIntegrationModule,
        PineconeModule,
        ExpenseEntriesModule,
        ExpenseAccountsModule,
        ExpenseCategoriesModule,
        ExpenseSubcategoriesModule,
        ExpenseTagsModule,
        WorkoutsModule,
        ExercisesModule,
        WorkoutEntriesModule,
        MuscleGroupsModule,
    ],
    providers: [AssistantConfig, NotesRetrievalService, ExpensesRetrievalService, GymRetrievalService],
    exports: [NotesRetrievalService, ExpensesRetrievalService, GymRetrievalService],
})
export class RetrievalModule {}
