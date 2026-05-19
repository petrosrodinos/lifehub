export interface GetVideoTranscriptRequest {
    youtube_url: string;
    language?: string;
    include_transcript_text?: boolean;
}

export interface GetChannelTranscriptsRequest {
    channel_url: string;
    language?: string;
    max_videos?: number;
    start_date?: string;
    end_date?: string;
    include_transcript_text?: boolean;
}

export type YoutubeScraperInput =
    | GetVideoTranscriptRequest
    | GetChannelTranscriptsRequest;

export interface TranscriptSegment {
    text: string;
    start: number;
    duration: number;
}

export interface YoutubeVideoResult {
    videoId: string;
    title: string;
    description: string;
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    url: string;
    transcript: TranscriptSegment[];
    transcript_text?: string;
}
