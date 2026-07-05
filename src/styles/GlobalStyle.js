import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
.light-theme{
    --primary-color: #059669;
    --primary-color-light: #10B981;
    --primary-glow: rgba(5, 150, 105, .18);
    --accent-2: #0891B2;
    --accent-3: #7C3AED;
    --primary-btn-color: #FFFFFF;
    --primary-btn-border-color: #0B1220;
    --secondary-color: #4B5563;
    --background-dark-color: #F7F9FC;
    --background-dark-grey: rgba(15, 23, 42, .035);
    --glass-bg: rgba(255, 255, 255, .6);
    --glass-border: rgba(15, 23, 42, .1);
    --nav-bg: rgba(255, 255, 255, .65);
    --border-color: rgba(15, 23, 42, .1);
    --background-light-color: #EEF2F7;
    --background-light-color-2: rgba(5, 150, 105, .1);
    --white-color: #0B1220;
    --white-true-color: #fff;
    --font-light-color: #4B5563;
    --font-dark-color: #313131;
    --font-dark-color-2: #151515;
    --sidebar-dark-color: #FFFFFF;
    --scrollbar-bg-color: #E5EAF1;
    --scrollbar-thump-color: #9AA7B8;
    --scrollbar-track-color: #E5EAF1;
    --primary-code-color-property: #059669;
    --primary-code-color-keyword: #0369A1;
    --primary-code-color-function: #B45309;
    --primary-code-color-string: #15803D;
    --primary-code-color-bracket: #0B1220;
    --underlay-text-color: rgba(15, 23, 42, .05);
    --aurora-opacity: .16;
}
.dark-theme{
    --primary-color: #2DE0A5;
    --primary-color-light: #7CF0C9;
    --primary-glow: rgba(45, 224, 165, .32);
    --on-primary: #03130C;
    --accent-2: #38BDF8;
    --accent-3: #A78BFA;
    --primary-btn-color: #04060C;
    --primary-btn-border-color: #F2F5FA;
    --secondary-color: #9BA6B8;
    --background-dark-color: #04060C;
    --background-dark-grey: rgba(255, 255, 255, .045);
    --glass-bg: rgba(255, 255, 255, .05);
    --glass-border: rgba(255, 255, 255, .1);
    --nav-bg: rgba(7, 10, 18, .62);
    --border-color: rgba(255, 255, 255, .1);
    --background-light-color: rgba(255, 255, 255, .07);
    --background-light-color-2: rgba(45, 224, 165, .13);
    --white-color: #F4F7FB;
    --white-true-color: #fff;
    --font-light-color: #9FACC0;
    --font-dark-color: #313131;
    --font-dark-color-2: #151515;
    --sidebar-dark-color: #070A12;
    --scrollbar-bg-color: #0C1120;
    --scrollbar-thump-color: #2B3548;
    --scrollbar-track-color: #0C1120;
    --primary-code-color-property: #7CF0C9;
    --primary-code-color-keyword: #38BDF8;
    --primary-code-color-function: #FACC15;
    --primary-code-color-string: #86EFAC;
    --primary-code-color-bracket: #F4F7FB;
    --underlay-text-color: rgba(255, 255, 255, .04);
    --aurora-opacity: .38;
}

/* ---- Harry Potter: candlelit parchment gold on ink ---- */
.hp-theme{
    --primary-color: #D3A625;
    --primary-color-light: #EEC85A;
    --primary-glow: rgba(211, 166, 37, .32);
    --on-primary: #141002;
    --accent-2: #2A623D;
    --accent-3: #740001;
    --primary-btn-color: #0B0D08;
    --primary-btn-border-color: #F3EDD7;
    --secondary-color: #A8A288;
    --background-dark-color: #0B0D08;
    --background-dark-grey: rgba(211, 166, 37, .055);
    --glass-bg: rgba(211, 166, 37, .06);
    --glass-border: rgba(211, 166, 37, .16);
    --nav-bg: rgba(13, 15, 9, .66);
    --border-color: rgba(211, 166, 37, .16);
    --background-light-color: rgba(211, 166, 37, .09);
    --background-light-color-2: rgba(211, 166, 37, .14);
    --white-color: #F3EDD7;
    --white-true-color: #fff;
    --font-light-color: #B5AE8F;
    --font-dark-color: #313131;
    --font-dark-color-2: #151515;
    --sidebar-dark-color: #0D0F09;
    --scrollbar-bg-color: #14160D;
    --scrollbar-thump-color: #4A431F;
    --scrollbar-track-color: #14160D;
    --primary-code-color-property: #EEC85A;
    --primary-code-color-keyword: #9C4A4A;
    --primary-code-color-function: #D3A625;
    --primary-code-color-string: #7FA65C;
    --primary-code-color-bracket: #F3EDD7;
    --underlay-text-color: rgba(211, 166, 37, .05);
    --aurora-opacity: .3;
}

/* ---- Iron Man: hot-rod red, gold & arc-reactor cyan ---- */
.ironman-theme{
    --primary-color: #E23636;
    --primary-color-light: #FF6B6B;
    --primary-glow: rgba(226, 54, 54, .35);
    --on-primary: #FFF4E8;
    --accent-2: #3BE8FF;
    --accent-3: #F5C518;
    --primary-btn-color: #0C0607;
    --primary-btn-border-color: #FFF4E8;
    --secondary-color: #B8A99A;
    --background-dark-color: #0C0607;
    --background-dark-grey: rgba(255, 255, 255, .05);
    --glass-bg: rgba(245, 197, 24, .05);
    --glass-border: rgba(245, 197, 24, .16);
    --nav-bg: rgba(14, 7, 8, .66);
    --border-color: rgba(245, 197, 24, .16);
    --background-light-color: rgba(226, 54, 54, .1);
    --background-light-color-2: rgba(226, 54, 54, .14);
    --white-color: #FFF4E8;
    --white-true-color: #fff;
    --font-light-color: #C0AB99;
    --font-dark-color: #313131;
    --font-dark-color-2: #151515;
    --sidebar-dark-color: #0E0708;
    --scrollbar-bg-color: #170B0D;
    --scrollbar-thump-color: #4E2A2A;
    --scrollbar-track-color: #170B0D;
    --primary-code-color-property: #F5C518;
    --primary-code-color-keyword: #3BE8FF;
    --primary-code-color-function: #FF6B6B;
    --primary-code-color-string: #FFD98A;
    --primary-code-color-bracket: #FFF4E8;
    --underlay-text-color: rgba(245, 197, 24, .05);
    --aurora-opacity: .32;
}

/* ---- Netflix: cinema black & signature red ---- */
.netflix-theme{
    --primary-color: #E50914;
    --primary-color-light: #F6323B;
    --primary-glow: rgba(229, 9, 20, .35);
    --on-primary: #FFFFFF;
    --accent-2: #B81D24;
    --accent-3: #564D4D;
    --primary-btn-color: #141414;
    --primary-btn-border-color: #FFFFFF;
    --secondary-color: #B3B3B3;
    --background-dark-color: #141414;
    --background-dark-grey: rgba(255, 255, 255, .055);
    --glass-bg: rgba(255, 255, 255, .05);
    --glass-border: rgba(255, 255, 255, .12);
    --nav-bg: rgba(15, 15, 15, .72);
    --border-color: rgba(255, 255, 255, .12);
    --background-light-color: rgba(255, 255, 255, .08);
    --background-light-color-2: rgba(229, 9, 20, .14);
    --white-color: #FFFFFF;
    --white-true-color: #fff;
    --font-light-color: #B3B3B3;
    --font-dark-color: #313131;
    --font-dark-color-2: #151515;
    --sidebar-dark-color: #101010;
    --scrollbar-bg-color: #1C1C1C;
    --scrollbar-thump-color: #4D4D4D;
    --scrollbar-track-color: #1C1C1C;
    --primary-code-color-property: #F6323B;
    --primary-code-color-keyword: #E50914;
    --primary-code-color-function: #FFFFFF;
    --primary-code-color-string: #B3B3B3;
    --primary-code-color-bracket: #FFFFFF;
    --underlay-text-color: rgba(255, 255, 255, .05);
    --aurora-opacity: .22;
}

/* ---- Game of Thrones: winter steel, ember and ancient obsidian ---- */
.got-theme{
    --primary-color: #A8D7E8;
    --primary-color-light: #D7F2F8;
    --primary-glow: rgba(168, 215, 232, .3);
    --on-primary: #071016;
    --accent-2: #E1783D;
    --accent-3: #8794A3;
    --primary-btn-color: #071016;
    --primary-btn-border-color: #E8F0F2;
    --secondary-color: #9AA7AF;
    --background-dark-color: #070B0E;
    --background-dark-grey: rgba(216, 235, 240, .04);
    --glass-bg: rgba(13, 21, 27, .62);
    --glass-border: rgba(168, 215, 232, .14);
    --nav-bg: rgba(7, 11, 14, .78);
    --border-color: rgba(168, 215, 232, .14);
    --background-light-color: rgba(168, 215, 232, .08);
    --background-light-color-2: rgba(168, 215, 232, .12);
    --white-color: #EDF4F5;
    --white-true-color: #fff;
    --font-light-color: #A5B1B7;
    --sidebar-dark-color: #080D10;
    --scrollbar-bg-color: #10171B;
    --scrollbar-thump-color: #394950;
    --scrollbar-track-color: #10171B;
    --primary-code-color-property: #D7F2F8;
    --primary-code-color-keyword: #E1783D;
    --primary-code-color-function: #A8D7E8;
    --primary-code-color-string: #C9D3C2;
    --primary-code-color-bracket: #EDF4F5;
    --underlay-text-color: rgba(168, 215, 232, .05);
    --aurora-opacity: .26;
}

:root{
    --font-mono: 'JetBrains Mono', 'Fira Mono', monospace;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
}

.mono{
    font-family: var(--font-mono);
}

@keyframes caret-blink{
    0%, 45%{ opacity: 1; }
    50%, 95%{ opacity: 0; }
    100%{ opacity: 1; }
}

html{
    scroll-behavior: smooth;
}

body{
    background-color: var(--background-dark-color);
    color: var(--font-light-color);
    font-size: 1rem;
    line-height: 1.65;
    transition: background-color .4s ease, color .4s ease;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}

::selection{
    background-color: var(--primary-color);
    color: var(--background-dark-color);
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible{
    outline: 2px solid var(--primary-color);
    outline-offset: 3px;
    border-radius: 6px;
}

@media (prefers-reduced-motion: reduce){
    *, *::before, *::after{
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

body::-webkit-scrollbar{
    width: 8px;
    background-color: var(--scrollbar-bg-color);
}
body::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: var(--scrollbar-thump-color);
}
body::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: var(--scrollbar-track-color);
}

/* ---------- Aurora background ---------- */
.aurora{
    position: fixed;
    inset: 0;
    z-index: -2;
    overflow: hidden;
    pointer-events: none;
    .blob{
        position: absolute;
        border-radius: 50%;
        filter: blur(110px);
        opacity: var(--aurora-opacity);
        transition: opacity .4s ease;
    }
    .blob-1{
        width: 42vw;
        height: 42vw;
        top: -12vw;
        left: -8vw;
        background: radial-gradient(circle at center, var(--accent-2), transparent 65%);
        animation: drift-1 24s ease-in-out infinite alternate;
    }
    .blob-2{
        width: 38vw;
        height: 38vw;
        top: 8vh;
        right: -10vw;
        background: radial-gradient(circle at center, var(--accent-3), transparent 65%);
        animation: drift-2 30s ease-in-out infinite alternate;
    }
    .blob-3{
        width: 36vw;
        height: 36vw;
        bottom: -14vw;
        left: 28vw;
        background: radial-gradient(circle at center, var(--primary-color), transparent 65%);
        animation: drift-3 27s ease-in-out infinite alternate;
    }
}
.grid-overlay{
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image:
        linear-gradient(var(--glass-border) 1px, transparent 1px),
        linear-gradient(90deg, var(--glass-border) 1px, transparent 1px);
    background-size: 72px 72px;
    opacity: .22;
    mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
}

@keyframes drift-1{
    to{ transform: translate(8vw, 6vh) scale(1.12); }
}
@keyframes drift-2{
    to{ transform: translate(-6vw, 10vh) scale(1.08); }
}
@keyframes drift-3{
    to{ transform: translate(-4vw, -8vh) scale(1.15); }
}

@keyframes fade-up{
    from{
        opacity: 0;
        transform: translateY(22px);
    }
    to{
        opacity: 1;
        transform: translateY(0);
    }
}

/* ---------- Typography ---------- */
a{
    font-family: inherit;
    color: inherit;
    font-size: 1rem;
    cursor: pointer;
}

h1{
    font-family: 'Space Grotesk', 'Inter', sans-serif;
    font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: var(--white-color);
    span{
        font-family: 'Space Grotesk', 'Inter', sans-serif;
        font-size: inherit;
        font-weight: inherit;
        letter-spacing: inherit;
    }
}

h2, h3, h4, h5{
    font-family: 'Space Grotesk', 'Inter', sans-serif;
    letter-spacing: -0.015em;
}

span{
    color: var(--primary-color);
}
h6{
    color: var(--white-color);
    font-size: 1.2rem;
    padding-bottom: .6rem;
}

.gradient-text{
    background: linear-gradient(100deg, var(--primary-color), var(--accent-2) 55%, var(--accent-3));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

//Utilities
.u-margin-bottom{
    margin-bottom: 4rem;
}
`;

export default GlobalStyle;
