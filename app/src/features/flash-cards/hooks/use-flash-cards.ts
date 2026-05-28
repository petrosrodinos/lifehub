import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
    createFlashCardGroup,
    deleteFlashCard,
    deleteFlashCardGroup,
    getFlashCardGroup,
    getFlashCardGroups,
    updateFlashCardGroup,
} from '../services/flash-cards';
import type { CreateFlashCardGroupDto, UpdateFlashCardGroupDto } from '../interfaces/flash-cards.interface';
import { isGroupProcessing } from '../interfaces/flash-cards.interface';

export const FLASH_CARDS_KEY = {
    all: ['flash-card-groups'] as const,
    group: (uuid: string) => ['flash-card-groups', uuid] as const,
};

export function useFlashCardGroups() {
    return useQuery({
        queryKey: FLASH_CARDS_KEY.all,
        queryFn: getFlashCardGroups,
        refetchInterval: (query) => {
            const groups = query.state.data;
            const hasProcessing = groups?.some((g) => isGroupProcessing(g.status));
            return hasProcessing ? 3000 : false;
        },
    });
}

export function useFlashCardGroup(uuid: string) {
    return useQuery({
        queryKey: FLASH_CARDS_KEY.group(uuid),
        queryFn: () => getFlashCardGroup(uuid),
        enabled: !!uuid,
        refetchInterval: (query) => {
            const data = query.state.data;
            return data && isGroupProcessing(data.status) ? 3000 : false;
        },
    });
}

export function useCreateFlashCardGroup() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateFlashCardGroupDto) => createFlashCardGroup(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FLASH_CARDS_KEY.all });
            toast.success('Generating flash cards…', { duration: 3000 });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create flash cards', { duration: 3000 });
        },
    });
}

export function useUpdateFlashCardGroup(uuid: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateFlashCardGroupDto) => updateFlashCardGroup(uuid, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FLASH_CARDS_KEY.all });
            queryClient.invalidateQueries({ queryKey: FLASH_CARDS_KEY.group(uuid) });
            toast.success('Title updated', { duration: 2000 });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update', { duration: 3000 });
        },
    });
}

export function useDeleteFlashCardGroup() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (uuid: string) => deleteFlashCardGroup(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FLASH_CARDS_KEY.all });
            toast.success('Flash card group deleted', { duration: 2000 });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete', { duration: 3000 });
        },
    });
}

export function useDeleteFlashCard(groupUuid: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cardUuid: string) => deleteFlashCard(groupUuid, cardUuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: FLASH_CARDS_KEY.group(groupUuid) });
            toast.success('Card deleted', { duration: 2000 });
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete card', { duration: 3000 });
        },
    });
}
