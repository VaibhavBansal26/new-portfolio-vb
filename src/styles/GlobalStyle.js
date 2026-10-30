import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --ink: #0a0d14;
    --on-ink: #ffffff;
    --muted: #5d626d;
    --paper: #fbfaf6;
    --paper-strong: #ffffff;
    --rail: #172554;
    --blue: #5b5bd6;
    --blue-deep: #4242ae;
    --sky: #78a9ff;
    --mint: #c4f1d8;
    --mint-strong: #39bd82;
    --amber: #f0aa61;
    --note-bg: #c4f1d8;
    --note-ink: #172554;
    --note-accent: #596172;
    --photo-filter: saturate(1.02) contrast(1.01);
    --photo-shadow: rgba(23,37,84,.22);
    --ash-filter: grayscale(1) contrast(1.65) brightness(.44) drop-shadow(0 9px 12px rgba(4,7,13,.28));
    --package-surface: #ffffff;
    --project-surface: #ffffff;
    --line: #cbc9c2;
    --soft-line: #e4e0d8;
    --mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    --sans: 'Inter', Arial, sans-serif;
    --display: 'Space Grotesk', 'Inter', Arial, sans-serif;
    --hand: 'Caveat', 'Bradley Hand', cursive;
    --rail-width: 218px;
  }

  :root[data-theme='midnight'] {
    --ink: #f4f1e8;
    --on-ink: #0d1324;
    --muted: #a8b2c8;
    --paper: #0d1324;
    --paper-strong: #141d32;
    --rail: #070b15;
    --blue: #8f91ff;
    --blue-deep: #b4b5ff;
    --sky: #6cb7ff;
    --mint: #203c39;
    --mint-strong: #58dcb0;
    --amber: #f3ae6f;
    --note-bg: #28504d;
    --note-ink: #f4fff9;
    --note-accent: #8fdcc5;
    --photo-filter: brightness(.88) saturate(1.16) hue-rotate(8deg);
    --photo-shadow: rgba(112,117,255,.34);
    --ash-filter: grayscale(1) contrast(1.2) brightness(1.1) invert(.3) drop-shadow(0 8px 12px rgba(0,0,0,.45));
    --package-surface: #172239;
    --project-surface: #141d32;
    --line: #374158;
    --soft-line: #283249;
  }

  :root[data-theme='clay'] {
    --ink: #2b211a;
    --muted: #75665a;
    --paper: #f2e8da;
    --paper-strong: #fffaf2;
    --rail: #3f2d24;
    --blue: #c2553f;
    --blue-deep: #943929;
    --sky: #dc8d69;
    --mint: #dbe7c3;
    --mint-strong: #5b9667;
    --amber: #d9903d;
    --note-bg: #efc29f;
    --note-ink: #3f2d24;
    --note-accent: #a64e38;
    --photo-filter: sepia(.10) saturate(.9) hue-rotate(-7deg) contrast(1.02);
    --photo-shadow: rgba(148,57,41,.28);
    --package-surface: #fff6e9;
    --project-surface: #fffaf2;
    --line: #c8b8a6;
    --soft-line: #dfd1c2;
  }

  :root[data-theme='arctic'] {
    --ink: #10282b;
    --muted: #567075;
    --paper: #eef7f6;
    --paper-strong: #ffffff;
    --rail: #12383b;
    --blue: #147d91;
    --blue-deep: #0f5c6b;
    --sky: #5aa9c1;
    --mint: #c8eee3;
    --mint-strong: #27a17d;
    --amber: #e29b57;
    --note-bg: #bde7e5;
    --note-ink: #12383b;
    --note-accent: #147d91;
    --photo-filter: saturate(.86) hue-rotate(14deg) contrast(1.03);
    --photo-shadow: rgba(20,125,145,.28);
    --package-surface: #f8fdfc;
    --project-surface: #ffffff;
    --line: #b8cdca;
    --soft-line: #d6e5e3;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    min-width: 320px;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    transition: background .3s ease, color .3s ease;
  }
  body, button, input, textarea { font-family: var(--sans); }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; }
  button { color: inherit; }
  ::selection { background: var(--mint); color: var(--ink); }
  :focus-visible { outline: 3px solid var(--mint-strong); outline-offset: 3px; }

  .app-main { margin-left: var(--rail-width); min-height: 100vh; }
  .route-loading { min-height: 55vh; display: grid; place-items: center; color: var(--muted); font-family: var(--mono); font-size: 12px; text-transform: uppercase; letter-spacing: .12em; }
  .page-shell { width: min(100%, 1440px); margin: 0 auto; padding: 44px 34px 84px; }
  .page-shell.compact { max-width: 1220px; }
  .mono { font-family: var(--mono); }
  .hand { font-family: var(--hand); }
  .kicker {
    display: flex; align-items: center; gap: 12px;
    color: var(--muted); font-family: var(--mono); font-size: 12px;
    letter-spacing: .12em; text-transform: uppercase;
  }
  .kicker::before { content: ''; width: 40px; height: 1px; background: #9ca0a8; }
  .page-hero { padding: 58px 0 48px; border-bottom: 1px solid var(--line); }
  .page-hero h1 {
    max-width: 900px; margin-top: 22px; font-family: var(--display);
    font-size: clamp(54px, 8vw, 110px); line-height: .94; letter-spacing: -.065em;
  }
  .page-hero h1 span { color: var(--blue); }
  .page-hero .lead { max-width: 680px; margin-top: 22px; color: var(--muted); font-size: 18px; }
  .section-index {
    display: flex; align-items: center; gap: 12px; color: var(--muted);
    font-family: var(--mono); font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
  }
  .section-index::after { content: ''; height: 1px; flex: 1; background: var(--line); }
  .section-title {
    margin-top: 18px; font-family: var(--display); font-size: clamp(34px, 5vw, 68px);
    line-height: 1.02; letter-spacing: -.05em;
  }
  .btn {
    min-height: 52px; display: inline-flex; align-items: center; justify-content: center;
    gap: 12px; padding: 0 24px; border: 1px solid var(--ink); background: transparent;
    color: var(--ink); font-size: 15px; font-weight: 700; cursor: pointer;
    transition: transform .2s ease, background .2s ease, color .2s ease;
  }
  .btn:hover { transform: translateY(-2px); background: var(--ink); color: var(--on-ink); }
  .btn.primary { background: var(--ink); color: var(--on-ink); }
  .btn.primary:hover { background: var(--blue); border-color: var(--blue); }
  .text-link {
    display: inline-flex; align-items: center; gap: 8px; color: var(--blue);
    font-weight: 700; border-bottom: 1px solid transparent;
  }
  .text-link:hover { border-bottom-color: var(--blue); }
  .pill {
    display: inline-flex; align-items: center; min-height: 28px; padding: 4px 11px;
    border-radius: 999px; background: var(--mint); font-family: var(--mono); font-size: 11px;
  }
  .paper-card { background: var(--paper-strong); border: 1px solid var(--soft-line); }
  .image-frame { overflow: hidden; background: #e8e8e3; }
  .image-frame img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
  .image-frame:hover img { transform: scale(1.025); }
  .grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }

  @media (max-width: 980px) {
    :root { --rail-width: 0px; }
    .app-main { margin-left: 0; padding-top: 72px; }
    .page-shell { padding: 32px 24px 64px; }
    .grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 680px) {
    .page-shell { padding-inline: 18px; }
    .page-hero { padding-top: 34px; }
    .page-hero h1 { font-size: clamp(48px, 17vw, 74px); }
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .btn { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  }
`;

export default GlobalStyle;
