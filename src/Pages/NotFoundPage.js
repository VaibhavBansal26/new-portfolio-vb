import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

function NotFoundPage() {
  usePageTitle('404');
  return <NotFoundStyled className="page-shell"><p className="mono">Error / 404</p><h1>Wrong turn.<br /><span>Useful way back.</span></h1><p>The page you’re looking for has moved or doesn’t exist.</p><Link className="btn primary" to="/">Return home <ArrowForwardRoundedIcon /></Link></NotFoundStyled>;
}
const NotFoundStyled = styled.section`
  min-height: 78vh; display: flex; flex-direction: column; justify-content: center;
  > p:first-child { color: var(--blue); font-size: 12px; text-transform: uppercase; }
  h1 { margin-top: 24px; font-family: var(--display); font-size: clamp(68px, 12vw, 150px); line-height: .8; letter-spacing: -.075em; }
  h1 span { color: var(--blue); }
  > p:not(:first-child) { margin-top: 34px; color: var(--muted); font-size: 18px; }
  .btn { align-self: flex-start; width: auto; margin-top: 28px; }
`;
export default NotFoundPage;
