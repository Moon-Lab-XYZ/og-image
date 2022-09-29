
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

export function getHtml(parsedReq: ParsedRequest) {
    const {
    } = parsedReq;
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
                        <img class="rounded-full object-cover h-[55px] w-[55px] mr-2" src="https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://img.seadn.io/files/06496571b614d3a4b424f2b1f2402a8f.png?h=1024&w=1024&auto=format"/>
                        <div>
                            <div class="text-xl font-bold">Peter Kim</div>
                            <div class="opacity-60">@peter</div>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center mt-1">
                            <Image width="14px" height="14px" src="https://storage.googleapis.com/moon-lab/perl-small.png" />
                            <div class="ml-2 mr-6">23</div>
                        </div>
                    </div>
                </div>
                <div class="mb-6">
                    web3 founder fellow @ South Park Commons | Previously SBLY.com, Stripe | peter-kim.com
                </div>
                <div class="mb-4 bg-perl-gray py-2 px-4 mr-5 flex items-center w-full">
                    <Image width="13px" height="13px" src="https://storage.googleapis.com/moon-lab/search.png"/>
                    <input id="search" class="bg-perl-gray ml-2 w-full" placeholder="Search Peter Kim's perls"></input>
                </div>
                <div class="border-2 border-perl-gray p-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <img class="rounded-full w-[55px] h-[55px] object-cover" src="https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://img.seadn.io/files/06496571b614d3a4b424f2b1f2402a8f.png?h=1024&w=1024&auto=format"/>
                            <div class="ml-2">
                                <div class="font-bold">Peter Kim</div>
                                <div class="opacity-60">@peter</div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="mr-2 text-xs sm:text-sm opacity-80">via Farcaster</div>
                                <Image width="14px" height="14px" src="https://storage.googleapis.com/moon-lab/farcaster.png" />
                            </div>
                        </div>
                        <div class="mb-4 overflow-clip whitespace-pre-line break-words">
                            i personally was very impressed by Evan Spiegel’s vision for Snap in just a few words.

                            “Snap is a camera company.”

                            you open the app, and guess what you see - a camera.

                            he told it with his persona & product at the same time
                        </div>
                </div>
            </div>
            <div>
                <div class="w-[540px] h-[35vh]">
                    <div class="w-[540px] h-[50px] bg-perl-purple px-4 flex items-center">
                        <div class="font-bungee uppercase text-white text-3xl flex items-center">Recent Collectors</div>
                    </div>
                    <div class="flex gap-x-4 w-full items-center py-6">
                        <div class="flex gap-x-4 w-[90px] h-[90px] items-center justify-center rounded-full bg-white">
                            <img class="rounded-full w-[80px] h-[80px]" src="https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://img.seadn.io/files/06496571b614d3a4b424f2b1f2402a8f.png?h=1024&w=1024&auto=format"></img>
                        </div>
                        <div class="flex gap-x-4 w-[90px] h-[90px] items-center justify-center rounded-full bg-white">
                            <img class="rounded-full w-[80px] h-[80px]" src="https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://img.seadn.io/files/06496571b614d3a4b424f2b1f2402a8f.png?h=1024&w=1024&auto=format"></img>
                        </div>
                        <div class="flex gap-x-4 w-[90px] h-[90px] items-center justify-center rounded-full bg-white">
                            <img class="rounded-full w-[80px] h-[80px]" src="https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://img.seadn.io/files/06496571b614d3a4b424f2b1f2402a8f.png?h=1024&w=1024&auto=format"></img>
                        </div>
                        <div class="flex gap-x-4 w-[90px] h-[90px] items-center justify-center rounded-full bg-white">
                            <img class="rounded-full w-[80px] h-[80px]" src="https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://img.seadn.io/files/06496571b614d3a4b424f2b1f2402a8f.png?h=1024&w=1024&auto=format"></img>
                        </div>
                        <div class="font-bungee text-3xl text-perl-light-gray">+42</div>
                    </div>
                </div>
                <div class="w-[540px] h-[50vh]">
                    <div class="w-[540px] h-[50px] bg-perl-purple px-4 flex items-center">
                        <div class="font-bungee uppercase text-white text-3xl flex items-center">Badges</div>
                    </div>
                    <div class="flex gap-x-4 w-full items-center">
                        <img class="ml-[-30px] w-[150px] h-[150px]" src="https://storage.googleapis.com/moon-lab/clam-56.png"></img>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}
