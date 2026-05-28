import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
    completeQuizAttempt,
    createQuizGroup,
    deleteQuizGroup,
    deleteQuizQuestion,
    getQuizAttempt,
    getQuizGroup,
    getQuizGroups,
    startQuizAttempt,
    submitQuizAnswer,
    updateQuizGroup,
} from '../services/quiz-groups';
import type {
    CompleteAttemptResponse,
    CreateQuizGroupDto,
    StartAttemptResponse,
    SubmitAnswerDto,
    SubmitAnswerResponse,
    UpdateQuizGroupDto,
} from '../interfaces/quiz.interface';
import { isQuizGroupProcessing } from '../interfaces/quiz.interface';
import { POLL_INTERVAL_MS } from '../constants';

export const QUIZ_KEY = {
    all: ['quiz-groups'] as const,
    group: (uuid: string) => ['quiz-groups', uuid] as const,
    attempt: (uuid: string) => ['quiz-attempts', uuid] as const,
};

export function useQuizGroups() {
    return useQuery({
        queryKey: QUIZ_KEY.all,
        queryFn: getQuizGroups,
        refetchInterval: (query) => {
            const groups = query.state.data;
            const hasProcessing = groups?.some((g) => isQuizGroupProcessing(g.status));
            return hasProcessing ? POLL_INTERVAL_MS : false;
        },
    });
}

export function useQuizGroup(uuid: string) {
    return useQuery({
        queryKey: QUIZ_KEY.group(uuid),
        queryFn: () => getQuizGroup(uuid),
        enabled: !!uuid,
        refetchInterval: (query) => {
            const data = query.state.data;
            return data && isQuizGroupProcessing(data.status) ? POLL_INTERVAL_MS : false;
        },
    });
}

export function useQuizAttempt(uuid: string, enabled = true) {
    return useQuery({
        queryKey: QUIZ_KEY.attempt(uuid),
        queryFn: () => getQuizAttempt(uuid),
        enabled: !!uuid && enabled,
    });
}

export function useCreateQuizGroup() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateQuizGroupDto) => createQuizGroup(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUIZ_KEY.all });
            toast.success('Generating quiz…', { duration: 3000 });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create quiz', { duration: 3000 });
        },
    });
}

export function useUpdateQuizGroup(uuid: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateQuizGroupDto) => updateQuizGroup(uuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUIZ_KEY.all });
            queryClient.invalidateQueries({ queryKey: QUIZ_KEY.group(uuid) });
            toast.success('Title updated', { duration: 2000 });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update', { duration: 3000 });
        },
    });
}

export function useDeleteQuizGroup() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) => deleteQuizGroup(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUIZ_KEY.all });
            toast.success('Quiz deleted', { duration: 2000 });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete', { duration: 3000 });
        },
    });
}

export function useDeleteQuizQuestion(groupUuid: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (questionUuid: string) => deleteQuizQuestion(groupUuid, questionUuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUIZ_KEY.group(groupUuid) });
            toast.success('Question deleted', { duration: 2000 });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete question', { duration: 3000 });
        },
    });
}

export function useStartQuizAttempt() {
    return useMutation<StartAttemptResponse, Error, string>({
        mutationFn: (groupUuid: string) => startQuizAttempt(groupUuid),
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to start quiz', { duration: 3000 });
        },
    });
}

export function useSubmitQuizAnswer() {
    return useMutation<SubmitAnswerResponse, Error, { attemptUuid: string; data: SubmitAnswerDto }>({
        mutationFn: ({ attemptUuid, data }) => submitQuizAnswer(attemptUuid, data),
    });
}

export function useCompleteQuizAttempt() {
    const queryClient = useQueryClient();
    return useMutation<CompleteAttemptResponse, Error, { attemptUuid: string; timeSpent: number; groupUuid: string }>({
        mutationFn: ({ attemptUuid, timeSpent }) => completeQuizAttempt(attemptUuid, timeSpent),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUIZ_KEY.group(variables.groupUuid) });
            queryClient.invalidateQueries({ queryKey: QUIZ_KEY.all });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to complete quiz', { duration: 3000 });
        },
    });
}
