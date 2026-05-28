import axiosInstance from '../../../config/api/axios';
import { ApiRoutes } from '../../../config/api/routes';
import type {
    CreateFlashCardGroupDto,
    FlashCardGroup,
    FlashCardGroupListItem,
    UpdateFlashCardGroupDto,
} from '../interfaces/flash-cards.interface';

export const getFlashCardGroups = async (): Promise<FlashCardGroupListItem[]> => {
    const response = await axiosInstance.get(ApiRoutes.flashCards.groups.list);
    return response.data;
};

export const getFlashCardGroup = async (uuid: string): Promise<FlashCardGroup> => {
    const response = await axiosInstance.get(ApiRoutes.flashCards.groups.get(uuid));
    return response.data;
};

export const createFlashCardGroup = async (
    data: CreateFlashCardGroupDto,
): Promise<FlashCardGroup> => {
    const response = await axiosInstance.post(ApiRoutes.flashCards.groups.create, data);
    return response.data;
};

export const updateFlashCardGroup = async (
    uuid: string,
    data: UpdateFlashCardGroupDto,
): Promise<FlashCardGroup> => {
    const response = await axiosInstance.patch(ApiRoutes.flashCards.groups.update(uuid), data);
    return response.data;
};

export const deleteFlashCardGroup = async (uuid: string): Promise<void> => {
    await axiosInstance.delete(ApiRoutes.flashCards.groups.delete(uuid));
};

export const deleteFlashCard = async (groupUuid: string, cardUuid: string): Promise<void> => {
    await axiosInstance.delete(ApiRoutes.flashCards.cards.delete(groupUuid, cardUuid));
};
