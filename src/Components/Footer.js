import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

function Footer() {
  return (
    <FooterStyled>
      <div>
        <p className="mono">Have a useful problem to solve?</p>
        <h2>Let’s build something that matters.</h2>
      </div>
      <Link to="/contact">Start a conversation <ArrowOutwardRoundedIcon /></Link>
      <p className="copyright mono">© {new Date().getFullYear()} Vaibhav Bansal</p>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  min-height: 300px; display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 32px;
  padding: 56px 38px 34px; color: var(--on-ink); background: var(--ink);
  p { color: color-mix(in srgb, var(--on-ink) 58%, transparent); font-size: 12px; }
  h2 { max-width: 720px; margin-top: 12px; font-family: var(--display); font-size: clamp(38px, 6vw, 76px); line-height: .98; letter-spacing: -.055em; }
  a { display: inline-flex; align-items: center; gap: 9px; padding-bottom: 6px; border-bottom: 1px solid var(--on-ink); }
  .copyright { grid-column: 1 / -1; }
  @media (max-width: 680px) { grid-template-columns: 1fr; padding-inline: 20px; }
`;

export default Footer;
