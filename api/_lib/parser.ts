import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { query } = parse(req.url || '/', true);
    const {
        authorImage,
        authorName,
        authorUsername,
        perlerImage,
        perlerName,
        perlerUsername,
        excerpt
    } = (query || {});

    const parsedRequest: ParsedRequest = {
        fileType: 'jpeg',
        perlerImage: perlerImage!,
        perlerName: perlerName!,
        perlerUsername: perlerUsername!,
        authorImage: authorImage!,
        authorName: authorName!,
        authorUsername: authorUsername!,
        excerpt: excerpt!,
    };

    return parsedRequest;
}
