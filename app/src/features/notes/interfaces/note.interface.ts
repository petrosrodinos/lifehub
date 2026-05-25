export type NoteType = 'BOOK' | 'IDEA' | 'NOTE' | 'VIDEO' | 'ARTICLE'

export interface NoteTag {
    uuid: string
    title: string
    color: string
    created_at: string
    updated_at: string
}

export interface Note {
    uuid: string
    title: string
    type: NoteType
    content: string
    summary: string | null
    vector_id: string | null
    tags: NoteTag[]
    created_at: string
    updated_at: string
}

export interface CreateNoteDto {
    title: string
    type: NoteType
    content: string
    tag_uuids?: string[]
}

export interface UpdateNoteDto {
    title?: string
    type?: NoteType
    content?: string
    tag_uuids?: string[]
}

export interface CreateNoteTagDto {
    title: string
    color?: string
}

export interface UpdateNoteTagDto {
    title?: string
    color?: string
}
