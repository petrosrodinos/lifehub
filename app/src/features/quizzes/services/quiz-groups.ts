import axiosInstance from '../../../config/api/axios';
import { ApiRoutes } from '../../../config/api/routes';
import type {
    CompleteAttemptResponse,
    CreateQuizGroupDto,
    QuizAttempt,
    QuizGroup,
    QuizGroupListItem,
    StartAttemptResponse,
    SubmitAnswerDto,
    SubmitAnswerResponse,
    UpdateQuizGroupDto,
} from '../interfaces/quiz.interface';

export const getQuizGroups = async (): Promise<QuizGroupListItem[]> => {
    const res = await axiosInstance.get(ApiRoutes.quizzes.groups.list);
    return res.data;
};

export const getQuizGroup = async (uuid: string): Promise<QuizGroup> => {
    const res = await axiosInstance.get(ApiRoutes.quizzes.groups.get(uuid));
    return res.data;
};

export const createQuizGroup = async (data: CreateQuizGroupDto): Promise<QuizGroup> => {
    const res = await axiosInstance.post(ApiRoutes.quizzes.groups.create, data);
    return res.data;
};

export const updateQuizGroup = async (uuid: string, data: UpdateQuizGroupDto): Promise<QuizGroup> => {
    const res = await axiosInstance.patch(ApiRoutes.quizzes.groups.update(uuid), data);
    return res.data;
};

export const deleteQuizGroup = async (uuid: string): Promise<void> => {
    await axiosInstance.delete(ApiRoutes.quizzes.groups.delete(uuid));
};

export const deleteQuizQuestion = async (groupUuid: string, questionUuid: string): Promise<void> => {
    await axiosInstance.delete(ApiRoutes.quizzes.questions.delete(groupUuid, questionUuid));
};

export const startQuizAttempt = async (groupUuid: string): Promise<StartAttemptResponse> => {
    const res = await axiosInstance.post(ApiRoutes.quizzes.attempts.start(groupUuid));
    return res.data;
};

export const submitQuizAnswer = async (
    attemptUuid: string,
    data: SubmitAnswerDto,
): Promise<SubmitAnswerResponse> => {
    const res = await axiosInstance.post(ApiRoutes.quizzes.attempts.submitAnswer(attemptUuid), data);
    return res.data;
};

export const completeQuizAttempt = async (
    attemptUuid: string,
    time_spent_seconds: number,
): Promise<CompleteAttemptResponse> => {
    const res = await axiosInstance.post(ApiRoutes.quizzes.attempts.complete(attemptUuid), {
        time_spent_seconds,
    });
    return res.data;
};

export const getQuizAttempt = async (attemptUuid: string): Promise<QuizAttempt> => {
    const res = await axiosInstance.get(ApiRoutes.quizzes.attempts.get(attemptUuid));
    return res.data;
};

export const listQuizAttempts = async (groupUuid: string): Promise<QuizAttempt[]> => {
    const res = await axiosInstance.get(ApiRoutes.quizzes.attempts.list(groupUuid));
    return res.data;
};
