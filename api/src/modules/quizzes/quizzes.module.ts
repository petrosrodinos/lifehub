import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { QuizzesController } from './quizzes.controller';
import { QuizGroupsService } from './quiz-groups.service';
import { QuizGenerationService } from './quiz-generation.service';
import { QuizAttemptsService } from './quiz-attempts.service';
import { QuizScoringService } from './quiz-scoring.service';

@Module({
    imports: [PrismaModule, AiIntegrationModule],
    controllers: [QuizzesController],
    providers: [
        QuizGroupsService,
        QuizGenerationService,
        QuizAttemptsService,
        QuizScoringService,
    ],
})
export class QuizzesModule {}
