import React, { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import usePageTitle from '../hooks/usePageTitle';
import portfolios from '../data/portfolios';
import projectDetails from '../data/projectDetails.json';
import projectSlug from '../utils/projectSlug';

const SITE_URL = 'https://vaibhavbansal.in';

function ProjectDetailPage() {
  const { slug } = useParams();
  const reduceMotion = useReducedMotion();
  const project = useMemo(() => portfolios.find(item => projectSlug(item) === slug), [slug]);
  const related = useMemo(() => project
    ? portfolios.filter(item => item.id !== project.id && item.category === project.category).slice(0, 3)
    : [], [project]);
  const repository = projectDetails.projects?.[slug] || null;
  const description = project?.featured?.copy || project?.text || '';
  const technologies = [...new Set([
    ...(project?.featured?.tags || project?.text?.split(',').map(item => item.trim()).filter(Boolean).slice(0, 12) || []),
    repository?.primaryLanguage,
    ...(repository?.topics || []),
  ].filter(Boolean))];
  const repositoryOverview = repository?.overview && repository.overview !== description ? repository.overview : null;
  const demoAssets = repository?.demoAssets || [];
  const architectureLabel = repository?.architectureSource === 'documentation' ? 'Documented architecture / workflow' : 'Architecture inferred from repository structure';
  const evidenceLabel = source => ({ documentation: 'Documentation asset', 'repository-file': 'Repository asset', portfolio: 'Portfolio evidence', repository: 'Source evidence' }[source] || 'Project evidence');

  usePageTitle('Project', project ? {
    title: `${project.title} — Vaibhav Bansal`,
    description,
    path: `/projects/${slug}`,
    type: 'SoftwareSourceCode',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description,
      url: `${SITE_URL}/projects/${slug}`,
      codeRepository: project.link1 || undefined,
      programmingLanguage: technologies,
      keywords: repository?.topics?.length ? repository.topics : technologies,
      dateModified: repository?.updatedAt,
      sameAs: demoAssets.map(item => item.url),
      author: { '@id': `${SITE_URL}/#person` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  } : null);

  if (!project) return <Navigate to="/portfolios" replace />;

  return (
    <ProjectStyled className="page-shell compact">
      <Link className="back-link mono" to="/portfolios"><ArrowBackRoundedIcon /> All projects</Link>
      <header className="project-hero">
        <div>
          <p className="kicker">Project / {project.category}</p>
          <h1>{project.title}</h1>
          <p className="lead">{description}</p>
          <div className="project-actions">
            {project.link1 && <a className="btn primary" href={project.link1} target="_blank" rel="noreferrer"><GitHubIcon /> View source</a>}
            {project.link3 && <a className="btn" href={project.link3} target="_blank" rel="noreferrer">Open live project <ArrowOutwardRoundedIcon /></a>}
            {project.link2 && <a className="text-link" href={project.link2} target="_blank" rel="noreferrer">Watch demo <ArrowOutwardRoundedIcon /></a>}
          </div>
        </div>
        <motion.figure className="project-visual image-frame" initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: 1.2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: .6, ease: [.22, 1, .36, 1] }}>
          <img src={project.image} alt={`${project.title} interface`} decoding="async" />
        </motion.figure>
      </header>

      <section className="project-facts">
        <div><span className="mono">Category</span><strong>{project.category}</strong></div>
        <div><span className="mono">Stack</span><strong>{technologies.slice(0, 4).join(' · ')}</strong></div>
        <div><span className="mono">Repository</span><strong>{repository ? `${repository.stars} stars · ${repository.forks} forks` : `Project ${project.id}`}</strong></div>
      </section>

      <section className="project-story">
        <div>
          <p className="section-index">01 / what it is</p>
          <h2>A working system,<br /><span>not just a screenshot.</span></h2>
        </div>
        <div>
          <p>{description}</p>
          {repositoryOverview && <p>{repositoryOverview}</p>}
          <p>{project.text}</p>
          <div className="technology-list" aria-label="Technologies used">{technologies.map(item => <span key={item}>{item}</span>)}</div>
          {repository?.readmeUrl && <a className="readme-link text-link" href={repository.readmeUrl} target="_blank" rel="noreferrer">Read the source README <ArrowOutwardRoundedIcon /></a>}
        </div>
      </section>

      {(repository?.features?.length > 0 || repository?.architecture) && <section className="readme-evidence">
        <div>
          <p className="section-index">02 / repository evidence</p>
          <h2>Project details,<br /><span>with sources.</span></h2>
          {repository?.updatedAt && <p className="snapshot mono">README + repository scan · {new Date(repository.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>}
        </div>
        <div>
          {repository?.features?.length > 0 && <ul>{repository.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
          {repository?.architecture && <div className="architecture-note"><span className="mono">{architectureLabel}</span><p>{repository.architecture}</p></div>}
        </div>
      </section>}

      {demoAssets.length > 0 && <section className="demo-assets">
        <p className="section-index">03 / demos and evidence</p>
        <div>{demoAssets.map(asset => <a href={asset.url} target="_blank" rel="noreferrer" key={asset.url}><span className="mono">{evidenceLabel(asset.source)}</span><strong>{asset.label}</strong><ArrowOutwardRoundedIcon /></a>)}</div>
      </section>}

      {project.featured?.signals?.length > 0 && <section className="signal-grid" aria-label="Project signals">
        {project.featured.signals.map(signal => <div key={`${signal.value}-${signal.label}`}><strong>{signal.value}</strong><span className="mono">{signal.label}</span></div>)}
      </section>}

      {related.length > 0 && <section className="related-projects">
        <p className="section-index">04 / related work</p>
        <div>{related.map(item => <Link key={item.id} to={`/projects/${projectSlug(item)}`}><span className="mono">{item.category}</span><strong>{item.title}</strong><ArrowOutwardRoundedIcon /></Link>)}</div>
      </section>}
    </ProjectStyled>
  );
}

const ProjectStyled = styled.div`
  .back-link { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 34px; color: var(--muted); font-size: 10px; text-transform: uppercase; }
  .back-link svg { font-size: 16px; }
  .project-hero { display: grid; grid-template-columns: minmax(0, .92fr) minmax(420px, 1.08fr); gap: clamp(38px, 6vw, 88px); align-items: center; padding-bottom: 72px; border-bottom: 1px solid var(--line); }
  .project-hero h1 { max-width: 780px; margin-top: 18px; font-family: var(--display); font-size: clamp(48px, 7vw, 94px); line-height: .92; letter-spacing: -.065em; }
  .project-hero .lead { max-width: 720px; margin-top: 26px; }
  .project-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; margin-top: 30px; }
  .project-actions .btn { width: auto; }
  .project-visual { min-height: 470px; max-height: 650px; background: var(--paper-strong); box-shadow: 18px 22px 0 color-mix(in srgb, var(--blue) 12%, transparent); }
  .project-visual img { width: 100%; height: 100%; min-height: 470px; object-fit: cover; }
  .project-facts { display: grid; grid-template-columns: .75fr 1.5fr .55fr; border-bottom: 1px solid var(--line); }
  .project-facts div { min-height: 120px; padding: 28px; border-left: 1px solid var(--line); }
  .project-facts div:first-child { padding-left: 0; border-left: 0; }
  .project-facts span { display: block; color: var(--muted); font-size: 9px; text-transform: uppercase; }
  .project-facts strong { display: block; margin-top: 12px; font-family: var(--display); font-size: 20px; line-height: 1.25; }
  .project-story { display: grid; grid-template-columns: .85fr 1.15fr; gap: clamp(40px, 8vw, 120px); padding: 82px 0; border-bottom: 1px solid var(--line); }
  .project-story h2 { margin-top: 18px; font-family: var(--display); font-size: clamp(38px, 5vw, 68px); line-height: .96; letter-spacing: -.055em; }
  .project-story h2 span { color: var(--blue); }
  .project-story > div:last-child > p { margin-top: 18px; color: var(--muted); font-size: 17px; line-height: 1.75; }
  .readme-link { margin-top: 24px; }
  .technology-list { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 28px; }
  .technology-list span { padding: 8px 12px; border-radius: 999px; background: var(--mint); font-family: var(--mono); font-size: 10px; }
  .signal-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-bottom: 1px solid var(--line); }
  .signal-grid div { min-height: 150px; padding: 34px 0; border-left: 1px solid var(--line); }
  .signal-grid div + div { padding-left: 34px; }
  .signal-grid strong { display: block; color: var(--blue); font-family: var(--display); font-size: clamp(34px, 5vw, 64px); }
  .signal-grid span { color: var(--muted); font-size: 10px; text-transform: uppercase; }
  .readme-evidence { display: grid; grid-template-columns: .75fr 1.25fr; gap: clamp(40px, 8vw, 120px); padding: 82px 0; border-bottom: 1px solid var(--line); }
  .readme-evidence h2 { margin-top: 18px; font-family: var(--display); font-size: clamp(38px, 5vw, 68px); line-height: .96; letter-spacing: -.055em; }
  .readme-evidence h2 span { color: var(--blue); }
  .snapshot { margin-top: 18px; color: var(--muted); font-size: 9px; text-transform: uppercase; }
  .readme-evidence ul { display: grid; gap: 0; list-style: none; border-top: 1px solid var(--line); }
  .readme-evidence li { position: relative; padding: 17px 0 17px 28px; color: var(--muted); line-height: 1.55; border-bottom: 1px solid var(--line); }
  .readme-evidence li::before { content: '↗'; position: absolute; left: 0; color: var(--blue); font-weight: 700; }
  .architecture-note { margin-top: 28px; padding: 24px; background: color-mix(in srgb, var(--mint) 62%, var(--paper)); border-left: 3px solid var(--blue); }
  .architecture-note span { color: var(--blue); font-size: 9px; text-transform: uppercase; }
  .architecture-note p { margin-top: 12px; color: var(--muted); line-height: 1.7; }
  .demo-assets { padding: 76px 0; border-bottom: 1px solid var(--line); }
  .demo-assets > div { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 24px; border-top: 1px solid var(--line); }
  .demo-assets a { position: relative; min-height: 150px; padding: 24px 46px 24px 0; border-bottom: 1px solid var(--line); }
  .demo-assets a + a { padding-left: 24px; border-left: 1px solid var(--line); }
  .demo-assets span { color: var(--blue); font-size: 9px; text-transform: uppercase; }
  .demo-assets strong { display: block; margin-top: 11px; font-family: var(--display); font-size: 21px; line-height: 1.15; }
  .demo-assets svg { position: absolute; right: 16px; bottom: 22px; color: var(--blue); }
  .related-projects { padding: 76px 0 20px; }
  .related-projects > div { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 24px; border-top: 1px solid var(--line); }
  .related-projects a { position: relative; min-height: 180px; padding: 26px 48px 26px 0; border-bottom: 1px solid var(--line); }
  .related-projects a + a { padding-left: 24px; border-left: 1px solid var(--line); }
  .related-projects span { color: var(--blue); font-size: 9px; text-transform: uppercase; }
  .related-projects strong { display: block; margin-top: 12px; font-family: var(--display); font-size: 22px; line-height: 1.1; }
  .related-projects svg { position: absolute; right: 16px; bottom: 24px; color: var(--blue); }
  @media (max-width: 900px) { .project-hero, .project-story, .readme-evidence { grid-template-columns: 1fr; } .project-visual { min-height: 380px; } .project-facts { grid-template-columns: 1fr; } .project-facts div, .project-facts div:first-child { min-height: auto; padding: 22px 0; border-left: 0; border-top: 1px solid var(--line); } .related-projects > div, .demo-assets > div { grid-template-columns: 1fr; } .related-projects a + a, .demo-assets a + a { padding-left: 0; border-left: 0; } }
  @media (max-width: 600px) { .project-visual, .project-visual img { min-height: 280px; } .signal-grid { grid-template-columns: 1fr; } .signal-grid div + div { padding-left: 0; border-left: 0; } }
`;

export default ProjectDetailPage;
