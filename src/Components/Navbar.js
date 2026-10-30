import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

const links = [
  ['/', 'Work', '01'],
  ['/about', 'About', '02'],
  ['/resume', 'Experience', '03'],
  ['/portfolios', 'Projects', '04'],
  ['/blogs', 'Writing', '05'],
  ['/certification', 'Credentials', '06'],
  ['/contact', 'Contact', '07'],
];

const themes = [
  ['porcelain', 'Porcelain', '#5b5bd6'],
  ['midnight', 'Midnight', '#8f91ff'],
  ['clay', 'Clay', '#c2553f'],
  ['arctic', 'Arctic', '#147d91'],
];

function ThemePicker({ theme, setTheme }) {
  return (
    <div className="theme-picker" role="group" aria-label="Choose color theme">
      <span className="mono">Theme</span>
      <div>
        {themes.map(([id, label, color]) => (
          <button
            key={id}
            type="button"
            className={theme === id ? 'active' : ''}
            style={{ '--swatch': color }}
            onClick={() => setTheme(id)}
            aria-label={`Use ${label} theme`}
            aria-pressed={theme === id}
            title={label}
          />
        ))}
      </div>
    </div>
  );
}

function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Rail>
        <div className="rail-top">
          <NavLink to="/" className="mark" aria-label="Vaibhav Bansal home">&lt;vb /&gt;</NavLink>
          <span className="edition mono">Portfolio · 2026</span>
        </div>
        <nav aria-label="Primary navigation">
          <div className="rail-heading">
            <span className="rail-label mono">Index</span>
            <span className="rail-count mono">07 pages</span>
          </div>
          {links.map(([to, label, no]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              <span className="nav-index mono">{no}</span>
              <span className="nav-label">{label}</span>
              <ArrowOutwardRoundedIcon />
            </NavLink>
          ))}
        </nav>
        <ThemePicker theme={theme} setTheme={setTheme} />
        <div className="rail-meta">
          <span className="availability"><i /> Available for work</span>
          <p className="mono">Buffalo, NY · worldwide</p>
          <a className="resume" href="https://drive.google.com/file/d/16RVmz7PSKI6z7hhHtsfgoH-s3QkNuDU2/view?usp=sharing" target="_blank" rel="noreferrer">
            <DownloadRoundedIcon /> résumé
          </a>
          <div className="socials">
            <a href="https://github.com/VaibhavBansal26" aria-label="GitHub"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/vaibhavbansal-profile/" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="mailto:vaibhav.bansal945@gmail.com" aria-label="Email"><MailOutlineIcon /></a>
          </div>
        </div>
      </Rail>

      <MobileBar>
        <NavLink to="/" className="mark" aria-label="Home">&lt;vb /&gt;</NavLink>
        <span className="availability"><i /> Available</span>
        <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </button>
      </MobileBar>
      <MobileMenu className={open ? 'open' : ''}>
        {links.map(([to, label], index) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
            <span className="mono">0{index + 1}</span>{label}
          </NavLink>
        ))}
        <ThemePicker theme={theme} setTheme={setTheme} />
      </MobileMenu>
    </>
  );
}

const Rail = styled.aside`
  position: fixed; inset: 0 auto 0 0; width: var(--rail-width); z-index: 40;
  display: flex; flex-direction: column; color: white; background: var(--rail);
  padding: 28px 16px 22px;
  .rail-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 0 8px 18px; border-bottom: 1px solid rgba(255,255,255,.13); }
  .mark { font-family: var(--mono); font-weight: 700; font-size: 21px; letter-spacing: -.06em; }
  .edition { color: rgba(255,255,255,.45); font-size: 7px; letter-spacing: .05em; text-transform: uppercase; white-space: nowrap; }
  nav { display: flex; flex-direction: column; gap: 6px; margin-top: 28px; }
  .rail-heading { display: flex; align-items: center; justify-content: space-between; margin: 0 9px 9px; }
  .rail-label, .rail-count { color: rgba(255,255,255,.42); font-size: 8px; letter-spacing: .12em; text-transform: uppercase; }
  nav a { position: relative; display: grid; grid-template-columns: 25px 1fr 16px; align-items: center; min-height: 42px; padding: 0 10px; border: 1px solid transparent; color: rgba(255,255,255,.64); transition: color .2s ease, background .2s ease, border-color .2s ease, transform .2s ease; }
  nav a:hover { color: white; background: rgba(255,255,255,.055); transform: translateX(3px); }
  nav a.active { color: white; background: rgba(255,255,255,.09); border-color: rgba(255,255,255,.14); }
  .nav-index { color: rgba(255,255,255,.37); font-size: 8px; }
  .nav-label { font-size: 13px; font-weight: 600; letter-spacing: -.01em; }
  nav a svg { width: 15px; height: 15px; opacity: 0; transform: translate(-4px, 4px); transition: opacity .2s ease, transform .2s ease; }
  nav a:hover svg, nav a.active svg { opacity: 1; transform: translate(0, 0); }
  nav a.active .nav-index { color: var(--mint); }
  .theme-picker { margin-top: 24px; padding: 18px 8px 0; border-top: 1px solid rgba(255,255,255,.13); }
  .theme-picker > span { display: block; margin-bottom: 8px; color: rgba(255,255,255,.52); font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
  .theme-picker > div { display: flex; gap: 8px; }
  .theme-picker button { width: 19px; height: 19px; padding: 0; border: 2px solid transparent; border-radius: 50%; background: var(--swatch); cursor: pointer; box-shadow: 0 0 0 1px rgba(255,255,255,.34); transition: transform .2s ease, border-color .2s ease; }
  .theme-picker button:hover { transform: scale(1.14); }
  .theme-picker button.active { border-color: white; transform: scale(1.14); }
  .rail-meta { margin-top: auto; padding: 18px 8px 0; border-top: 1px solid rgba(255,255,255,.13); }
  .rail-meta > p { margin-top: 12px; color: rgba(255,255,255,.58); font-size: 8px; line-height: 1.5; }
  .availability { display: flex; align-items: center; gap: 7px; margin-top: 0; font-size: 11px; }
  .availability i { width: 8px; height: 8px; border-radius: 50%; background: var(--mint-strong); box-shadow: 0 0 0 4px rgba(57,189,130,.16); }
  .resume { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 16px; padding: 10px; border: 1px solid rgba(255,255,255,.28); font-size: 11px; transition: background .2s ease, border-color .2s ease; }
  .resume:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.55); }
  .resume svg { font-size: 16px; }
  .socials { display: flex; gap: 9px; margin-top: 18px; }
  .socials svg { font-size: 17px; }
  .socials a { color: rgba(255,255,255,.75); }
  .socials a:hover { color: var(--mint); }
  @media (max-width: 980px) { display: none; }
`;

const MobileBar = styled.header`
  display: none;
  @media (max-width: 980px) {
    position: fixed; inset: 0 0 auto; z-index: 55; height: 72px; padding: 0 20px;
    display: flex; align-items: center; justify-content: space-between; color: white; background: var(--rail);
    .mark { font-family: var(--mono); font-weight: 700; }
    button { display: grid; place-items: center; width: 42px; height: 42px; border: 1px solid rgba(255,255,255,.28); background: transparent; color: white; }
    .availability { display: flex; align-items: center; gap: 7px; font-size: 11px; }
    .availability i { width: 7px; height: 7px; border-radius: 50%; background: var(--mint-strong); }
  }
`;

const MobileMenu = styled.nav`
  display: none;
  @media (max-width: 980px) {
    position: fixed; inset: 72px 0 auto; z-index: 54; padding: 20px; background: var(--rail); transform: translateY(-120%); transition: transform .28s ease;
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px;
    &.open { transform: translateY(0); }
    a { display: flex; gap: 10px; padding: 12px; color: rgba(255,255,255,.7); }
    a.active { color: white; background: rgba(255,255,255,.08); }
    a span { color: var(--mint); font-size: 10px; }
    .theme-picker { grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; margin-top: 8px; padding: 14px 12px 4px; border-top: 1px solid rgba(255,255,255,.14); }
    .theme-picker > span { color: rgba(255,255,255,.65); font-size: 10px; text-transform: uppercase; letter-spacing: .1em; }
    .theme-picker > div { display: flex; gap: 12px; }
    .theme-picker button { width: 22px; height: 22px; padding: 0; border: 2px solid transparent; border-radius: 50%; background: var(--swatch); box-shadow: 0 0 0 1px rgba(255,255,255,.35); }
    .theme-picker button.active { border-color: white; }
  }
`;

export default Navbar;
