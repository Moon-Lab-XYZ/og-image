
import { readFileSync } from 'fs';
import got from 'got'
import * as dotenv from 'dotenv';
import twemoji from 'twemoji';

import { ParsedRequest } from './types';

const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const bungee = readFileSync(`${__dirname}/../_fonts/Bungee-Regular.woff2`).toString('base64');

dotenv.config()

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
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bungee}) format('woff2');
    }

    html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        width: 100vw;
        height: 100vh;
        font-family: 'Inter', sans-serif;
    }
    `;
}

export async function getHtml(parsedReq: ParsedRequest) {
    const {
        userId,
        perlId,
    } = parsedReq;

    const ogImageMetadata: any = await got(`${process.env.API_BASE_URL}user-og-image-metadata?userId=${userId}&perlId=${perlId}`).json();

    const user = ogImageMetadata.user;
    const lastPerlPayload = ogImageMetadata.lastPerl.payload;
    const collectors = ogImageMetadata.collectors;

    let collectorsHtml = '';
    let previouslyAddedCollectors: any[] = [];

    //let badgesHtml = '';

    for (const collector of collectors) {
        if (previouslyAddedCollectors.includes(collector.farcaster_username)) {
            continue;
        }
        previouslyAddedCollectors.push(collector.farcaster_username);
        collectorsHtml = collectorsHtml.concat(`
            <div class="flex w-[90px] h-[90px] items-center justify-center rounded-full bg-white">
                <img class="rounded-full w-[80px] h-[80px]" src="${collector.farcaster_avatar}"></img>
            </div>
        `)
    }

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    'bungee': ['Bungee'],
                },
                colors: {
                    'perl-purple': '#9059C4',
                    'perl-gray': '#F2F2F2',
                    'perl-light-gray': '#474747',
                }
            }
        }
        }
    </script>
    <body class="bg-cover bg-[url('https://storage.googleapis.com/moon-lab/perl-bg.png')]">
        <div class="grid px-12 py-8 grid-cols-2 grid-rows-1 gap-x-8">
            <div class="bg-white w-[100%] h-[90vh] p-4">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center">
                        <img class="rounded-full object-cover h-[55px] w-[55px] mr-2" src="${user.farcaster_avatar}"/>
                        <div>
                            <div class="text-xl font-bold">${emojify(user.farcaster_display_name)}</div>
                            <div class="opacity-60">@${emojify(user.username ? user.username : user.farcaster_username)}</div>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center mt-1">
                            <Image width="14px" height="14px" src="https://storage.googleapis.com/moon-lab/perl-small.png" />
                            <div class="ml-2 mr-6">${user.perl_points}</div>
                        </div>
                    </div>
                </div>
                <div class="mb-6">${emojify(user.farcaster_bio)}</div>
                <div class="mb-4 bg-perl-gray py-2 px-4 mr-5 flex items-center w-full">
                    <Image width="13px" height="13px" src="https://storage.googleapis.com/moon-lab/search.png"/>
                    <input id="search" class="bg-perl-gray ml-2 w-full" placeholder="Search ${emojify(user.farcaster_display_name)}'s perls"></input>
                </div>
                <div class="border-2 border-perl-gray p-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <img class="rounded-full w-[55px] h-[55px] object-cover" src="${lastPerlPayload.meta.avatar}"/>
                            <div class="ml-2">
                                <div class="font-bold">${emojify(lastPerlPayload.meta.displayName)}</div>
                                <div class="opacity-60">@${emojify(lastPerlPayload.body.username)}</div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="mr-2 text-xs sm:text-sm opacity-80">via Farcaster</div>
                                <Image width="14px" height="14px" src="https://storage.googleapis.com/moon-lab/farcaster.png" />
                            </div>
                        </div>
                        <div class="mt-4 mb-4 overflow-clip whitespace-pre-line break-words">${emojify(lastPerlPayload.body.data.text)}</div>
                </div>
            </div>
            <div>
                <div class="w-[540px] h-[35vh]">
                    <div class="w-[540px] h-[50px] bg-perl-purple px-4 flex items-center">
                        <div class="font-bungee uppercase text-white text-3xl flex items-center">@${emojify(user.username ? user.username : user.farcaster_username)}'s collectors</div>
                    </div>
                    <div class="flex gap-x-5 w-full items-center py-6">${collectorsHtml}</div>
                </div>
                <div class="w-[540px] h-[50vh]">
                    <div class="w-[540px] h-[50px] bg-perl-purple px-4 flex items-center">
                        <div class="font-bungee uppercase text-white text-3xl flex items-center">@${emojify(user.username ? user.username : user.farcaster_username)}'s Badges</div>
                    </div>
                    <div class="grid grid-cols-5 grid-rows-2 w-full items-center py-6 gap-x-2 gap-y-8">
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/clam-badges/56.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                        <img class="w-[90px] h-[90px]" src="https://storage.googleapis.com/moon-lab/badge-placeholder.png"></img>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}
