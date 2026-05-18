export type NoteType = 'BOOK' | 'IDEA' | 'NOTE' | 'VIDEO' | 'ARTICLE'

export interface Note {
    uuid: string
    title: string
    type: NoteType
    content: string
    summary: string | null
    vector_id: string | null
    created_at: string
    updated_at: string
}

export interface CreateNoteDto {
    title: string
    type: NoteType
    content: string
}

export interface UpdateNoteDto {
    title?: string
    type?: NoteType
    content?: string
}
