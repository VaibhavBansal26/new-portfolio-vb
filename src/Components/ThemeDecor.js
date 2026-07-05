import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import roboticsLab from '../img/themes/robotics-lab.png';
import roboticsGauntlet from '../img/themes/robotics-gauntlet-assembly.png';
import cinemaRibbons from '../img/themes/cinema-ribbons.png';
import winterThrone from '../img/themes/winter-throne.png';

/*
 * ThemeDecor — immersive, theme-specific background scenes.
 *  hp-theme       → castle skyline, wand + spell trail, candles, embers,
 *                   golden snitch, deathly hallows, cloak vignette
 *  ironman-theme  → outlined helmet, HUD brackets + scanline + telemetry,
 *                   arc reactor, rotating rings
 *  netflix-theme  → letterbox, film grain, spotlight sweep, ident ribbons,
 *                   "series" title card
 */

const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

function ThemeDecor({ theme }) {
    const { scrollY, scrollYProgress } = useScroll();
    const suitY = useTransform(scrollYProgress, [0, 0.55, 1], [0, -70, -115]);
    const suitScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.11]);
    const suitOpacity = useTransform(scrollY, [0, 420, 760], [.64, .38, 0]);
    const assemblyOpacity = useTransform(scrollY, [240, 620, 940], [0, .48, .72]);
    const assemblyScale = useTransform(scrollY, [240, 940], [1.08, 1.01]);
    const assemblyX = useTransform(scrollY, [240, 940], [35, 0]);
    const throneY = useTransform(scrollYProgress, [0, 0.6, 1], [0, -55, -95]);
    const throneScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.08]);

    if (theme === 'hp-theme') {
        return (
            <HPStyled aria-hidden="true">
                {/* castle skyline */}
                <svg className="castle" viewBox="0 0 1200 220" preserveAspectRatio="xMidYMax slice" fill="currentColor">
                    <path d="M0 220 L0 170 L40 170 L40 140 L60 140 L60 170 L100 170 L100 120 L112 96 L124 120 L124 170 L180 170 L180 150 L220 150 L220 170 L260 170 L260 100 L275 100 L275 84 L290 60 L305 84 L305 100 L320 100 L320 170 L380 170 L380 140 L420 140 L420 170 L470 170 L470 110 L484 110 L484 90 L500 62 L516 90 L516 110 L530 110 L530 170 L600 170 L600 150 L640 150 L640 170 L700 170 L700 96 L714 96 L714 76 L730 44 L746 76 L746 96 L760 96 L760 170 L820 170 L820 140 L860 140 L860 170 L910 170 L910 120 L922 96 L934 120 L934 170 L1000 170 L1000 150 L1040 150 L1040 170 L1080 170 L1080 130 L1095 104 L1110 130 L1110 170 L1160 170 L1160 145 L1200 145 L1200 220 Z" />
                    {/* lit windows */}
                    <rect className="win w1" x="286" y="112" width="7" height="11" rx="1.5" />
                    <rect className="win w2" x="496" y="118" width="7" height="11" rx="1.5" />
                    <rect className="win w3" x="726" y="104" width="7" height="11" rx="1.5" />
                    <rect className="win w1" x="918" y="132" width="7" height="11" rx="1.5" />
                </svg>

                {/* wand + spell trail */}
                <svg className="wand" viewBox="0 0 260 260" fill="none">
                    <path d="M28 232 L58 202 C64 196 70 196 76 202" stroke="currentColor" strokeWidth="9" strokeLinecap="round" opacity=".85" />
                    <path d="M42 218 L150 110" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
                    <path d="M150 110 L166 94" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path className="trail" d="M170 90 C 196 64 176 40 206 30 C 226 24 236 44 224 56" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 9" />
                    <circle className="tip" cx="170" cy="90" r="5" fill="currentColor" />
                    <g className="stars" fill="currentColor">
                        <path d="M196 52 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" />
                        <path d="M226 70 l2.4 4.8 4.8 2.4 -4.8 2.4 -2.4 4.8 -2.4 -4.8 -4.8 -2.4 4.8 -2.4 Z" opacity=".8" />
                        <path d="M182 30 l2 4 4 2 -4 2 -2 4 -2 -4 -4 -2 4 -2 Z" opacity=".7" />
                    </g>
                </svg>

                {/* floating candles */}
                {[14, 42, 74].map((left, i) => (
                    <div className="candle" key={i} style={{ left: `${left}%`, animationDelay: `${i * 1.3}s`, top: `${6 + i * 4}%` }}>
                        <span className="flame" />
                        <span className="body" />
                    </div>
                ))}

                {/* deathly hallows */}
                <svg className="hallows" viewBox="0 0 100 90" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M50 4 L96 86 L4 86 Z" />
                    <circle cx="50" cy="56" r="18" />
                    <line x1="50" y1="4" x2="50" y2="86" />
                </svg>

                {/* embers */}
                {Array.from({ length: 22 }).map((_, i) => (
                    <span
                        key={i}
                        className="spark"
                        style={{
                            left: `${(i * 37) % 96}%`,
                            top: `${20 + (i * 53) % 70}%`,
                            animationDelay: `${(i % 9) * 0.8}s`,
                            animationDuration: `${5 + (i % 6)}s`,
                        }}
                    />
                ))}

                <svg className="snitch" viewBox="0 0 60 24" fill="none">
                    <circle cx="30" cy="12" r="7" fill="currentColor" />
                    <path d="M22 12 C10 2 2 6 1 12 C2 18 10 22 22 12Z" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M38 12 C50 2 58 6 59 12 C58 18 50 22 38 12Z" stroke="currentColor" strokeWidth="1.4" />
                </svg>

                <div className="cloak" />
            </HPStyled>
        );
    }

    if (theme === 'ironman-theme') {
        return (
            <IMStyled aria-hidden="true">
                <motion.div
                    className="scene-image suit-state"
                    style={{ y: suitY, scale: suitScale, opacity: suitOpacity }}
                />
                <motion.div
                    className="scene-image assembly-state"
                    style={{ opacity: assemblyOpacity, scale: assemblyScale, x: assemblyX }}
                />
                <div className="state-label mono">
                    <span>SCROLL-LINKED ARMOR PROTOCOL</span>
                    <i>MARK // ASSEMBLY</i>
                </div>
                {/* CC0 Iron Man mask (svgrepo.com/svg/370318) used as a CSS mask so the theme recolors it */}
                <div className="helmet-wrap">
                    <div className="helmet-img" />
                    <span className="reticle r-out" />
                    <span className="reticle r-in" />
                </div>

                {/* HUD corner brackets */}
                <svg className="bracket tl" viewBox="0 0 80 80" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M2 26 L2 2 L26 2" /><path d="M10 34 L10 10 L34 10" opacity=".5" />
                </svg>
                <svg className="bracket br" viewBox="0 0 80 80" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M78 54 L78 78 L54 78" /><path d="M70 46 L70 70 L46 70" opacity=".5" />
                </svg>

                {/* telemetry readout */}
                <div className="telemetry mono">
                    <p className="jarvis">J.A.R.V.I.S // ONLINE</p>
                    <p><span>PWR</span> 98.4%</p>
                    <p><span>SYS</span> PORTFOLIO READY</p>
                    <p><span>TGT</span> HIRE::VB</p>
                    <p className="blink">▮ SUIT DIAGNOSTICS ACTIVE</p>
                </div>

                {/* scanline sweep */}
                <div className="scanline" />

                {/* red / gold light beams */}
                <span className="beam b1" />
                <span className="beam b2" />

                <div className="reactor">
                    <span className="core" />
                    <span className="ring r1" />
                    <span className="ring r2" />
                </div>

                <svg className="hud" viewBox="0 0 300 300" fill="none">
                    <circle cx="150" cy="150" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="6 14" />
                    <circle cx="150" cy="150" r="110" stroke="currentColor" strokeWidth="1" strokeDasharray="40 22" />
                    <circle cx="150" cy="150" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" />
                </svg>
            </IMStyled>
        );
    }

    if (theme === 'netflix-theme') {
        return (
            <NFStyled aria-hidden="true">
                <div className="scene-image" />
                <div className="bar top" />
                <div className="bar bottom" />
                <div className="grain" />
                <div className="spotlight" />

                {/* ident ribbons — N-style folded letter V */}
                <div className="ident">
                    <span className="ribbon left" />
                    <span className="ribbon right" />
                </div>

                <p className="series mono">A VAIBHAV BANSAL ORIGINAL</p>
            </NFStyled>
        );
    }

    if (theme === 'got-theme') {
        return (
            <GOTStyled aria-hidden="true">
                <motion.div className="scene-image" style={{ y: throneY, scale: throneScale }} />
                <div className="winter-vignette" />
                <p className="winter-line mono">WINTER IS CODED · SYSTEMS ENDURE</p>
                {Array.from({ length: 18 }).map((_, i) => (
                    <span
                        className="snow"
                        key={i}
                        style={{
                            left: `${(i * 31) % 98}%`,
                            animationDelay: `${(i % 7) * .75}s`,
                            animationDuration: `${7 + (i % 6)}s`,
                        }}
                    />
                ))}
            </GOTStyled>
        );
    }

    return null;
}

/* ---------------- Harry Potter ---------------- */
const HPStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;

    .castle{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: clamp(90px, 18vh, 200px);
        color: #000;
        opacity: .55;
        filter: drop-shadow(0 -4px 30px rgba(211, 166, 37, .08));
        .win{
            fill: var(--primary-color);
            animation: window-flicker 3.2s ease-in-out infinite;
        }
        .w2{ animation-delay: 1.1s; }
        .w3{ animation-delay: 2.2s; }
    }

    .wand{
        position: absolute;
        bottom: 6%;
        left: 3%;
        width: clamp(150px, 19vw, 260px);
        color: var(--primary-color);
        opacity: .75;
        .tip{
            animation: lumos 2.6s ease-in-out infinite;
            filter: drop-shadow(0 0 10px currentColor);
        }
        .trail{
            animation: trail-flow 3.2s linear infinite;
            filter: drop-shadow(0 0 6px currentColor);
        }
        .stars path{
            animation: star-twinkle 2.4s ease-in-out infinite;
            transform-origin: center;
            &:nth-child(2){ animation-delay: .7s; }
            &:nth-child(3){ animation-delay: 1.3s; }
        }
        @media screen and (max-width: 700px){
            width: 120px;
            bottom: 3%;
        }
    }

    .candle{
        position: absolute;
        width: 10px;
        animation: candle-bob 6s ease-in-out infinite;
        .body{
            display: block;
            width: 9px;
            height: 30px;
            border-radius: 2px;
            background: linear-gradient(180deg, #F3EDD7, #CBC29E);
            opacity: .8;
        }
        .flame{
            display: block;
            width: 6px;
            height: 9px;
            margin: 0 auto 1px;
            border-radius: 50% 50% 45% 45%;
            background: radial-gradient(circle at 50% 35%, #FFF3B0, var(--primary-color));
            box-shadow: 0 0 14px var(--primary-color), 0 0 34px var(--primary-glow);
            animation: window-flicker 1.6s ease-in-out infinite;
        }
        @media screen and (max-width: 700px){
            &:nth-child(n+3){ display: none; }
        }
    }

    .hallows{
        position: absolute;
        top: 44%;
        left: 8%;
        width: clamp(60px, 7vw, 110px);
        color: var(--primary-color);
        opacity: .14;
        animation: hallows-spin 36s linear infinite;
    }

    .spark{
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--primary-color);
        box-shadow: 0 0 10px var(--primary-color), 0 0 22px var(--primary-glow);
        opacity: 0;
        animation: ember-rise linear infinite;
    }

    .snitch{
        position: absolute;
        top: 13%;
        right: 7%;
        width: 76px;
        color: var(--primary-color);
        opacity: .8;
        filter: drop-shadow(0 0 10px var(--primary-glow));
        animation: snitch-dart 13s ease-in-out infinite;
    }

    .cloak{
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse 75% 65% at 50% 42%, transparent 55%, rgba(0, 0, 0, .6) 100%);
    }

    @keyframes lumos{
        0%, 100%{ opacity: .55; }
        50%{ opacity: 1; }
    }
    @keyframes trail-flow{
        to{ stroke-dashoffset: -60; }
    }
    @keyframes star-twinkle{
        0%, 100%{ opacity: .25; transform: scale(.8); }
        50%{ opacity: 1; transform: scale(1.15); }
    }
    @keyframes window-flicker{
        0%, 100%{ opacity: .55; }
        50%{ opacity: 1; }
    }
    @keyframes candle-bob{
        0%, 100%{ transform: translateY(0); }
        50%{ transform: translateY(-14px); }
    }
    @keyframes hallows-spin{
        to{ transform: rotate(360deg); }
    }
    @keyframes ember-rise{
        0%{ transform: translateY(30px) scale(.6); opacity: 0; }
        18%{ opacity: .9; }
        80%{ opacity: .5; }
        100%{ transform: translateY(-55vh) scale(1.1); opacity: 0; }
    }
    @keyframes snitch-dart{
        0%, 100%{ transform: translate(0, 0) rotate(-6deg); }
        22%{ transform: translate(-16vw, 9vh) rotate(8deg); }
        48%{ transform: translate(-30vw, -4vh) rotate(-10deg); }
        74%{ transform: translate(-9vw, 13vh) rotate(6deg); }
    }
`;

/* ---------------- Iron Man ---------------- */
const IMStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;

    .scene-image{
        position: absolute;
        inset: -8% -5%;
        will-change: transform, opacity;
    }

    .suit-state{
        background:
            linear-gradient(90deg, rgba(12, 6, 7, .94) 0%, rgba(12, 6, 7, .74) 48%, rgba(12, 6, 7, .08) 100%),
            url(${roboticsLab}) center / cover no-repeat;
        filter: saturate(.96);
    }

    .assembly-state{
        inset: -5% -3%;
        background:
            linear-gradient(90deg, rgba(12, 6, 7, .96) 0%, rgba(12, 6, 7, .76) 47%, rgba(12, 6, 7, .06) 100%),
            url(${roboticsGauntlet}) center / cover no-repeat;
        filter: saturate(1.06) contrast(1.04);
    }

    .state-label{
        position: absolute;
        right: 2.2rem;
        bottom: 1.6rem;
        display: grid;
        justify-items: end;
        font-size: .56rem;
        letter-spacing: .14em;
        opacity: .45;
        span{
            color: var(--accent-2);
            font-family: var(--font-mono);
        }
        i{
            color: var(--accent-3);
            font-family: var(--font-mono);
            font-style: normal;
        }
        @media screen and (max-width: 700px){
            display: none;
        }
    }

    .helmet-wrap{
        position: absolute;
        right: 2%;
        top: 50%;
        transform: translateY(-50%);
        width: min(46vh, 420px);
        height: min(46vh, 420px);
        @media screen and (max-width: 860px){
            width: 34vh;
            height: 34vh;
            right: -8%;
        }
    }

    .helmet-img{
        position: absolute;
        inset: 10%;
        background: linear-gradient(160deg, var(--accent-3) 35%, var(--primary-color) 75%);
        opacity: .22;
        filter: drop-shadow(0 0 30px var(--primary-glow));
        mask-image: url('https://www.svgrepo.com/show/370318/marvel-ironman-mask.svg');
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-image: url('https://www.svgrepo.com/show/370318/marvel-ironman-mask.svg');
        -webkit-mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        animation: helmet-glow 4.2s ease-in-out infinite;
    }

    .reticle{
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 1px dashed var(--accent-2);
        opacity: .3;
        &.r-out{
            animation: reactor-spin 26s linear infinite;
        }
        &.r-in{
            inset: 9%;
            border-style: dotted;
            animation: reactor-spin 18s linear infinite reverse;
        }
    }

    .beam{
        position: absolute;
        top: -20%;
        height: 140%;
        width: 10px;
        transform: rotate(24deg);
        opacity: .1;
        &.b1{
            left: 30%;
            background: linear-gradient(180deg, transparent, var(--primary-color), transparent);
        }
        &.b2{
            left: 38%;
            width: 6px;
            background: linear-gradient(180deg, transparent, var(--accent-3), transparent);
        }
    }

    @keyframes helmet-glow{
        0%, 100%{ opacity: .18; }
        50%{ opacity: .3; }
    }

    .bracket{
        position: absolute;
        width: clamp(48px, 6vw, 80px);
        color: var(--accent-2);
        opacity: .4;
        &.tl{ top: 5.2rem; left: 1.2rem; }
        &.br{ bottom: 1.2rem; right: 1.2rem; }
    }

    .telemetry{
        position: absolute;
        top: 6.4rem;
        left: 2.6rem;
        font-size: .62rem;
        letter-spacing: .12em;
        color: var(--accent-2);
        opacity: .55;
        p{
            font-family: var(--font-mono);
            line-height: 1.9;
            span{ color: var(--accent-3); }
        }
        .jarvis{
            margin-bottom: .45rem;
            padding-bottom: .45rem;
            border-bottom: 1px solid rgba(59, 232, 255, .25);
            color: var(--accent-2);
            letter-spacing: .16em;
        }
        .blink{ animation: eye-glow 1.4s step-end infinite; }
        @media screen and (max-width: 700px){
            display: none;
        }
    }

    .scanline{
        position: absolute;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--accent-2), transparent);
        opacity: .25;
        animation: scan-sweep 7s ease-in-out infinite;
    }

    .reactor{
        position: absolute;
        left: 6%;
        bottom: 8%;
        width: 90px;
        height: 90px;
        .core{
            position: absolute;
            inset: 32%;
            border-radius: 50%;
            background: var(--accent-2);
            box-shadow: 0 0 24px var(--accent-2), 0 0 70px var(--accent-2);
            animation: reactor-pulse 2.6s ease-in-out infinite;
        }
        .ring{
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 1px solid var(--accent-2);
            opacity: .5;
        }
        .r1{ animation: reactor-spin 9s linear infinite; border-style: dashed; }
        .r2{ inset: 14%; animation: reactor-spin 6s linear infinite reverse; border-style: dotted; }
        @media screen and (max-width: 700px){
            width: 60px; height: 60px; left: 4%; bottom: 5%;
        }
    }

    .hud{
        position: absolute;
        left: -80px;
        top: -80px;
        width: 340px;
        color: var(--primary-color);
        opacity: .14;
        animation: reactor-spin 40s linear infinite;
    }

    @keyframes eye-glow{
        0%, 100%{ opacity: .85; }
        50%{ opacity: .25; }
    }
    @keyframes reactor-pulse{
        0%, 100%{ transform: scale(1); opacity: .95; }
        50%{ transform: scale(.82); opacity: .65; }
    }
    @keyframes reactor-spin{
        to{ transform: rotate(360deg); }
    }
    @keyframes scan-sweep{
        0%{ top: 8%; }
        50%{ top: 88%; }
        100%{ top: 8%; }
    }
`;

/* ---------------- Netflix ---------------- */
const NFStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;

    .scene-image{
        position: absolute;
        inset: -8% -5%;
        background:
            linear-gradient(90deg, rgba(8, 8, 8, .95) 0%, rgba(8, 8, 8, .77) 52%, rgba(8, 8, 8, .08) 100%),
            url(${cinemaRibbons}) center / cover no-repeat;
        opacity: .66;
        animation: cinema-drift 18s ease-in-out infinite alternate;
    }

    .bar{
        position: absolute;
        left: 0;
        right: 0;
        height: clamp(14px, 2.6vh, 30px);
        background: #000;
        z-index: 2;
        &.top{ top: 0; }
        &.bottom{ bottom: 0; }
    }

    .grain{
        position: absolute;
        inset: -60px;
        background-image: ${GRAIN};
        opacity: .05;
        animation: grain-shift .45s steps(3) infinite;
    }

    .spotlight{
        position: absolute;
        top: -30%;
        left: -20%;
        width: 60vw;
        height: 160vh;
        background: radial-gradient(ellipse 45% 42% at 50% 50%, var(--primary-glow), transparent 70%);
        filter: blur(48px);
        animation: spotlight-sweep 14s ease-in-out infinite alternate;
    }

    .ident{
        position: absolute;
        bottom: 8%;
        right: 5%;
        width: clamp(70px, 9vw, 130px);
        aspect-ratio: 5 / 9;
        opacity: .2;
        transform: skewX(-4deg);
        .ribbon{
            position: absolute;
            top: 0;
            bottom: 0;
            width: 26%;
            background: linear-gradient(180deg, var(--primary-color), #7a060c);
            box-shadow: 0 0 30px var(--primary-glow);
        }
        .left{ left: 6%; }
        .right{
            right: 6%;
            background: linear-gradient(180deg, var(--primary-color-light), var(--primary-color));
        }
        &::after{
            content: "";
            position: absolute;
            left: 6%;
            top: 0;
            width: 26%;
            height: 100%;
            background: linear-gradient(180deg, var(--primary-color-light), var(--primary-color));
            transform-origin: top left;
            transform: skewX(38deg);
            box-shadow: 6px 0 24px rgba(0, 0, 0, .5);
        }
    }

    .series{
        position: absolute;
        bottom: calc(clamp(14px, 2.6vh, 30px) + 12px);
        left: 2rem;
        font-size: .64rem;
        letter-spacing: .42em;
        color: var(--primary-color);
        opacity: .75;
        text-shadow: 0 0 14px var(--primary-glow);
        @media screen and (max-width: 700px){
            font-size: .54rem;
            letter-spacing: .3em;
        }
    }

    @keyframes grain-shift{
        0%{ transform: translate(0, 0); }
        33%{ transform: translate(-22px, 14px); }
        66%{ transform: translate(16px, -18px); }
        100%{ transform: translate(0, 0); }
    }
    @keyframes spotlight-sweep{
        to{ transform: translateX(80vw); }
    }
    @keyframes cinema-drift{
        to{ transform: scale(1.035) translateX(-.7%); }
    }
`;

const GOTStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;

    .scene-image{
        position: absolute;
        inset: -8% -5%;
        background:
            linear-gradient(90deg, rgba(7, 11, 14, .95) 0%, rgba(7, 11, 14, .76) 48%, rgba(7, 11, 14, .12) 100%),
            url(${winterThrone}) center / cover no-repeat;
        opacity: .76;
        filter: contrast(1.05) saturate(.9);
    }

    .winter-vignette{
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at 78% 28%, rgba(168, 215, 232, .12), transparent 32%),
            linear-gradient(180deg, transparent 45%, rgba(7, 11, 14, .52));
    }

    .winter-line{
        position: absolute;
        right: 2rem;
        bottom: 1.6rem;
        color: var(--primary-color);
        font-size: .6rem;
        letter-spacing: .3em;
        opacity: .7;
    }

    .snow{
        position: absolute;
        top: -4%;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: rgba(215, 242, 248, .85);
        box-shadow: 0 0 8px rgba(168, 215, 232, .55);
        opacity: 0;
        animation: snow-fall linear infinite;
    }

    @keyframes snow-fall{
        0%{ transform: translate3d(0, -3vh, 0); opacity: 0; }
        12%{ opacity: .75; }
        100%{ transform: translate3d(7vw, 108vh, 0); opacity: 0; }
    }

    @media screen and (max-width: 760px){
        .scene-image{
            background-position: 68% center;
            opacity: .48;
        }
        .winter-line{
            display: none;
        }
    }
`;

export default ThemeDecor;
