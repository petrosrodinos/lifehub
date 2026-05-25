import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type { NoteTag, CreateNoteTagDto, UpdateNoteTagDto } from '../interfaces/note.interface'

export const getNoteTags = async (): Promise<NoteTag[]> => {
    const response = await axiosInstance.get(ApiRoutes.notes.tags.list)
    return response.data
}

export const getNoteTag = async (uuid: string): Promise<NoteTag> => {
    const response = await axiosInstance.get(ApiRoutes.notes.tags.get(uuid))
    return response.data
}

export const createNoteTag = async (data: CreateNoteTagDto): Promise<NoteTag> => {
    const response = await axiosInstance.post(ApiRoutes.notes.tags.create, data)
    return response.data
}

export const updateNoteTag = async (uuid: string, data: UpdateNoteTagDto): Promise<NoteTag> => {
    const response = await axiosInstance.patch(ApiRoutes.notes.tags.update(uuid), data)
    return response.data
}

export const deleteNoteTag = async (uuid: string): Promise<void> => {
    await axiosInstance.delete(ApiRoutes.notes.tags.delete(uuid))
}
