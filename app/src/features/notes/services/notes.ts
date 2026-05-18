import axiosInstance from '../../../config/api/axios'
import { ApiRoutes } from '../../../config/api/routes'
import type { Note, CreateNoteDto, UpdateNoteDto } from '../interfaces/note.interface'

export const getNotes = async (): Promise<Note[]> => {
    const response = await axiosInstance.get(ApiRoutes.notes.list)
    return response.data
}

export const getNote = async (uuid: string): Promise<Note> => {
    const response = await axiosInstance.get(ApiRoutes.notes.get(uuid))
    return response.data
}

export const createNote = async (data: CreateNoteDto): Promise<Note> => {
    const response = await axiosInstance.post(ApiRoutes.notes.create, data)
    return response.data
}

export const updateNote = async (uuid: string, data: UpdateNoteDto): Promise<Note> => {
    const response = await axiosInstance.patch(ApiRoutes.notes.update(uuid), data)
    return response.data
}

export const deleteNote = async (uuid: string): Promise<Note> => {
    const response = await axiosInstance.delete(ApiRoutes.notes.delete(uuid))
    return response.data
}

export const summarizeNote = async (uuid: string): Promise<{ summary: string }> => {
    const response = await axiosInstance.post(ApiRoutes.notes.summarize(uuid))
    return response.data
}
