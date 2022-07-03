
import { readFileSync } from 'fs';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const bungee = readFileSync(`${__dirname}/../_fonts/Bungee-Regular.woff2`).toString('base64');

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

    @font-face {
        font-family: 'Bungee';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${bungee})  format("woff2");
    }

    body {
        width: 100vw;
        height: 100vh;
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
        font-family: 'Bungee', serif;
        font-size: 100px;
        font-style: normal;
        color: black;
        line-height: 1.8;
    }

    .header {
        display: flex;
        border: 0;
        border-color: #F0F0F0;
        border-bottom-width: 10px;
        border-style: solid;
        align-items: center;
        padding-left: 50px;
        padding-right: 80px;
        justify-content: space-between;
    }

    .header-logo {
        display: flex;
        align-items: center;
    }

    .btn {
        font-family: 'Inter', sans-serif;
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
        padding: 50px 80px;
    }

    .excerpt {
        font-size: 70px;
        line-height: 90px;
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .about-author {
        display: flex;
        align-items: center;
        margin-bottom: 50px
    }

    .about-author-img {
        width: 200px;
        border-radius: 20px;
        margin-right: 20px;
    }

    .author-name {
        font-size: 60px;
        font-family: 'Bungee', serif;
        max-width: 60%;
    }

    .author-username {
        font-size: 50px;
        color: #A6A6A6;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { excerpt, authorName, authorUsername, authorImage } = parsedReq;
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
            <div class="header-logo">
                <img src="https://storage.googleapis.com/moon-lab/pearl.svg"></img>
                <div class="heading">Bitpearl</div>
            </div>
            <div class="btn">Read on clean, ad-free page</div>
        </div>
        <div class="body">
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
            <div class="excerpt">${emojify(excerpt.toString())}</div>
        </div>
    </body>
</html>`;
}
