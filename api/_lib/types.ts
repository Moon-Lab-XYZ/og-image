export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    fileType: FileType;
    userId: string | string[];
    perlId: string | string[];
}
