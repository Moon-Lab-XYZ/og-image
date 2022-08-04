export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    fileType: FileType;
    excerpt: string | string[];
    authorName: string | string[];
    authorUsername: string | string[];
    authorImage: string | string[];
    perlerName: string | string[];
    perlerUsername: string | string[];
    perlerImage: string | string[];
    perlPoints: string | string[];
}
