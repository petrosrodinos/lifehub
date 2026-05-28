import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { QuizGroupsService } from './quiz-groups.service';
import { QuizAttemptsService } from './quiz-attempts.service';
import { CreateQuizGroupDto } from './dto/create-quiz-group.dto';
import { UpdateQuizGroupDto } from './dto/update-quiz-group.dto';
import { CompleteQuizAttemptDto, SubmitQuizAnswerDto } from './dto/submit-quiz-answer.dto';

@ApiTags('Quizzes')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller()
export class QuizzesController {
    constructor(
        private readonly groupsService: QuizGroupsService,
        private readonly attemptsService: QuizAttemptsService,
    ) {}

    // --- Quiz Groups ---

    @Post('quiz-groups')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a quiz group from notes (triggers async AI generation)' })
    createGroup(
        @CurrentUser('user_uuid') userUuid: string,
        @Body() dto: CreateQuizGroupDto,
    ) {
        return this.groupsService.create(userUuid, dto);
    }

    @Get('quiz-groups')
    @ApiOperation({ summary: 'List all quiz groups for the current user' })
    listGroups(@CurrentUser('user_uuid') userUuid: string) {
        return this.groupsService.findAll(userUuid);
    }

    @Get('quiz-groups/:uuid')
    @ApiOperation({ summary: 'Get a quiz group with all questions and recent attempts' })
    getGroup(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.groupsService.findOne(userUuid, uuid);
    }

    @Patch('quiz-groups/:uuid')
    @ApiOperation({ summary: 'Update quiz group title' })
    updateGroup(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') uuid: string,
        @Body() dto: UpdateQuizGroupDto,
    ) {
        return this.groupsService.update(userUuid, uuid, dto);
    }

    @Delete('quiz-groups/:uuid')
    @ApiOperation({ summary: 'Delete a quiz group and all its data' })
    removeGroup(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.groupsService.remove(userUuid, uuid);
    }

    @Delete('quiz-groups/:groupUuid/questions/:questionUuid')
    @ApiOperation({ summary: 'Delete a single quiz question' })
    removeQuestion(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('groupUuid') groupUuid: string,
        @Param('questionUuid') questionUuid: string,
    ) {
        return this.groupsService.removeQuestion(userUuid, groupUuid, questionUuid);
    }

    // --- Quiz Attempts ---

    @Post('quiz-groups/:uuid/attempts')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Start a new quiz attempt — returns attempt UUID + questions' })
    startAttempt(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') groupUuid: string,
    ) {
        return this.attemptsService.startAttempt(userUuid, groupUuid);
    }

    @Get('quiz-groups/:uuid/attempts')
    @ApiOperation({ summary: 'List all attempts for a quiz group' })
    listAttempts(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') groupUuid: string,
    ) {
        return this.attemptsService.listAttempts(userUuid, groupUuid);
    }

    @Post('quiz-attempts/:uuid/answers')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Submit an answer for a question in an attempt' })
    submitAnswer(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') attemptUuid: string,
        @Body() dto: SubmitQuizAnswerDto,
    ) {
        return this.attemptsService.submitAnswer(userUuid, attemptUuid, dto);
    }

    @Post('quiz-attempts/:uuid/complete')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Complete a quiz attempt and get final score' })
    completeAttempt(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') attemptUuid: string,
        @Body() dto: CompleteQuizAttemptDto,
    ) {
        return this.attemptsService.completeAttempt(userUuid, attemptUuid, dto);
    }

    @Get('quiz-attempts/:uuid')
    @ApiOperation({ summary: 'Get attempt details with all submitted answers' })
    getAttempt(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') attemptUuid: string,
    ) {
        return this.attemptsService.getAttempt(userUuid, attemptUuid);
    }
}
