export type FlashCardGroupStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'PARTIAL';

export interface FlashCardImage {
    uuid: string;
    card_uuid: string;
    url: string;
    gcs_path: string;
    gcs_bucket: string;
    filename: string;
    size: number;
    content_type: string;
    created_at: string;
    updated_at: string;
}

export interface FlashCard {
    uuid: string;
    group_uuid: string;
    front: string;
    back: string;
    keywords: string[];
    ai_image_prompt: string | null;
    order_index: number;
    image: FlashCardImage | null;
    created_at: string;
    updated_at: string;
}

export interface FlashCardGroup {
    uuid: string;
    user_uuid: string;
    user_title: string | null;
    ai_title: string | null;
    status: FlashCardGroupStatus;
    source_note_uuids: string[];
    total_cards: number;
    completed_cards: number;
    failed_cards: number;
    input_tokens: number;
    output_tokens: number;
    total_cost_usd: string;
    error_message: string | null;
    cards: FlashCard[];
    created_at: string;
    updated_at: string;
}

export interface FlashCardGroupListItem extends FlashCardGroup {
    _count: { cards: number };
}

export interface CreateFlashCardGroupDto {
    note_uuids: string[];
    user_title?: string;
    cards_per_note?: number;
}

export interface UpdateFlashCardGroupDto {
    user_title?: string;
}

export function getGroupTitle(group: Pick<FlashCardGroup, 'user_title' | 'ai_title'>): string {
    return group.user_title || group.ai_title || 'Flash Card Group';
}

export function isGroupProcessing(status: FlashCardGroupStatus): boolean {
    return status === 'PENDING' || status === 'PROCESSING';
}
