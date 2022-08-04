
import { readFileSync } from 'fs';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        width: 100vw;
        height: 100vh;
        font-family: 'Inter', sans-serif;
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .heading {
        font-size: 100px;
        font-style: normal;
        color: black;
        line-height: 1.8;
    }

    .header {
        display: flex;
        align-items: center;
        padding-left: 80px;
        padding-right: 140px;
        margin-top: 50px;
        justify-content: space-between;
    }

    .header-logo {
        display: flex;
        align-items: center;
    }

    .btn {
        font-size: 60px;
        padding: 10px 20px;
        border-color: black;
        border-width: 5px;
        border-style: solid;
        border-radius: 20px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    }

    .body {
        font-family: 'Inter', sans-serif;
        padding: 50px 50px;
        margin: 0 80px;
        border: 0;
        border-color: #F0F0F0;
        border-width: 4px;
        border-style: solid;
    }

    .excerpt {
        font-size: 40px;
        line-height: 60px;
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .about-author-text {
        width: 100%;
    }

    .about-author {
        display: flex;
        align-items: center;
        margin-bottom: 50px;
        width: 100%;
    }

    .about-author-img {
        width: 150px;
        border-radius: 100px;
        margin-right: 20px;
    }

    .author-name {
        font-size: 50px;
        max-width: 60%;
        font-weight: 700;
    }

    .author-username {
        font-size: 40px;
        color: #A6A6A6;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .perl-points {
        display: flex;
        align-items: center;
    }

    .perl-points-number {
        margin-left: 10px;
        font-size: 32px;
    }

    .perl-points-img {
        width: 32px;
    }

    .body-header {
        display: flex;
        justify-content: space-between;
    }

    .farcaster-img {
        width: 32px;
    }

    .via {
        display: flex;
        align-items: center;
        width: 290px;
        align-self: start;
    }

    .via-text {
        font-size: 32px;
        margin-right: 16px;
    }

    .clam-anchor-img {
        width: 300px;
    }

    .clam-anchor-container {
        position: absolute;
        bottom: 0;
        right: 40px;
    }

    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const {
        excerpt,
        authorName,
        authorUsername,
        authorImage,
        perlerImage,
        perlerName,
        perlerUsername
    } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="header">
            <div class="about-author">
                <img class="about-author-img" src="${perlerImage}"></img>
                <div class="about-author-text">
                    <div class="author-name">
                        ${emojify(perlerName.toString())}
                    </div>
                    <div class="author-username">
                        @${perlerUsername}
                    </div>
                </div>
            </div>
            <div class="perl-points">
                <img class="perl-points-img" src="https://storage.googleapis.com/moon-lab/perl.png"></img>
                <div class="perl-points-number">1,869</div>
            </div>
        </div>
        <div class="body">
            <div class="body-header">
                <div class="about-author">
                    <img class="about-author-img" src="${authorImage}"></img>
                    <div class="about-author-text">
                        <div class="author-name">
                            ${emojify(authorName.toString())}
                        </div>
                        <div class="author-username">
                            @${authorUsername}
                        </div>
                    </div>
                </div>
                <div class="via">
                    <div class="via-text">via Farcaster</div>
                    <img class="farcaster-img" src="https://storage.googleapis.com/moon-lab/farcaster-logo.png"></img>
                </div>
            </div>
            <div class="excerpt">${emojify(excerpt.toString())}</div>
        </div>
        <div class="clam-anchor-container">
            <img class="clam-anchor-img" src="https://storage.googleapis.com/moon-lab/perl-clam.png"></img>
        </div>
    </body>
</html>`;
}
