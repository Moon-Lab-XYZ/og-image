import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { query } = parse(req.url || '/', true);
    const { authorImage, authorName, authorUsername, excerpt } = (query || {});

    const parsedRequest: ParsedRequest = {
        fileType: 'jpeg',
        authorImage: authorImage!,
        authorName: authorName!,
        authorUsername: authorUsername!,
        excerpt: excerpt!,
    };

    return parsedRequest;
}
