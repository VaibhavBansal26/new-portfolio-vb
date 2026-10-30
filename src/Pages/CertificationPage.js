import React from 'react';
import styled from 'styled-components';
import usePageTitle from '../hooks/usePageTitle';
import certificates from '../data/certification';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

function CertificationPage() {
  usePageTitle('Credentials');
  return (
    <CredentialsStyled className="page-shell">
      <header className="page-hero"><p className="kicker">06 / credentials</p><h1>Proof of learning.<br /><span>Momentum for building.</span></h1><p className="lead">Selected credentials spanning cloud data engineering, machine learning, distributed systems, and product development.</p></header>
      <section className="credential-grid">
        {certificates.map((cert, index) => <article key={`${cert.id}-${index}`} className="paper-card"><div className="image-frame"><img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" decoding="async" /></div><div className="credential-body"><span className="mono">{String(index + 1).padStart(2, '0')} / {cert.by || 'Credential'}</span><h2>{cert.title}</h2><p>{cert.month} {cert.date}</p><a className="text-link" href={cert.link} target="_blank" rel="noreferrer">Verify credential <ArrowOutwardRoundedIcon /></a></div></article>)}
      </section>
    </CredentialsStyled>
  );
}

const CredentialsStyled = styled.div`
  .credential-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 40px; }
  .credential-grid article { min-width: 0; }
  .credential-grid .image-frame { height: 230px; border-bottom: 1px solid var(--soft-line); }
  .credential-grid img { object-fit: contain; padding: 14px; background: white; }
  .credential-body { padding: 20px; }
  .credential-body > span { display: block; min-height: 30px; color: var(--blue); font-size: 9px; text-transform: uppercase; }
  .credential-body h2 { min-height: 66px; margin-top: 10px; font-family: var(--display); font-size: 18px; line-height: 1.18; }
  .credential-body p { margin-top: 10px; color: var(--muted); font-size: 12px; }
  .credential-body .text-link { margin-top: 15px; font-size: 12px; }
  .credential-body svg { font-size: 14px; }
  @media (max-width: 1020px) { .credential-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 620px) { .credential-grid { grid-template-columns: 1fr; } }
`;
export default CertificationPage;
