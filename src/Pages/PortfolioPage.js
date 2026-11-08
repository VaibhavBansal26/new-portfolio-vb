import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import AnimatedNumber from '../Components/AnimatedNumber';
import portfolios from '../data/portfolios';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import projectSlug from '../utils/projectSlug';

const categories = ['All', ...new Set(portfolios.map(item => item.category))];

const archiveCardMotion = {
  hidden: { opacity: 0, y: 36, scale: .97 },
  show: index => ({ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 112, damping: 18, delay: Math.min(index, 8) * .045 } }),
  hover: { y: -8, transition: { type: 'spring', stiffness: 320, damping: 22 } },
  exit: { opacity: 0, scale: .96, transition: { duration: .18 } },
};

function PortfolioPage() {
  usePageTitle('Projects');
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const visible = useMemo(() => portfolios.filter(item => {
    const categoryMatch = category === 'All' || item.category === category;
    const haystack = `${item.title} ${item.text} ${item.category}`.toLowerCase();
    return categoryMatch && haystack.includes(query.toLowerCase());
  }), [query, category]);

  return (
    <ProjectsStyled className="page-shell">
      <header className="page-hero">
        <div>
          <p className="kicker">04 / projects</p>
          <h1>Systems, products,<br /><span>and experiments.</span></h1>
          <p className="lead">A growing archive of full-stack products, data platforms, AI systems, developer tools, and hands-on explorations.</p>
        </div>
        <motion.div className="archive-total" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .55 }}>
          <AnimatedNumber value={portfolios.length} duration={1.05} />
          <strong>projects<br />in the archive</strong>
          <small className="mono">Updates from portfolio data</small>
        </motion.div>
      </header>
      <section className="project-controls" aria-label="Project filters">
        <label className="search"><SearchRoundedIcon /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects, technology, or category" /></label>
        <select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category">{categories.map(item => <option key={item}>{item}</option>)}</select>
        <span className="mono live-count"><AnimatedNumber value={visible.length} /> of {portfolios.length} projects</span>
      </section>
      <motion.section className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
        {visible.map((project, index) => (
          <motion.article className="project-card" layout key={`${project.title}-${project.link1 || index}`} custom={index} variants={reduceMotion ? undefined : archiveCardMotion} initial={reduceMotion ? false : 'hidden'} animate={reduceMotion ? undefined : 'show'} exit={reduceMotion ? undefined : 'exit'} whileHover={reduceMotion ? undefined : 'hover'}>
            <motion.div className="image-frame" variants={reduceMotion ? undefined : { hover: { scale: .985 } }}>
              <Link to={`/projects/${projectSlug(project)}`} aria-label={`Read ${project.title} project details`}>
              <motion.img src={project.image} alt={`${project.title} project`} loading="lazy" decoding="async" variants={reduceMotion ? undefined : { hover: { scale: 1.065 } }} />
              <span className="project-index mono">{String(index + 1).padStart(2, '0')}</span>
              </Link>
            </motion.div>
            <div className="project-meta"><span className="mono">{project.category}</span></div>
            <h2><Link to={`/projects/${projectSlug(project)}`}>{project.title}</Link></h2>
            <p>{project.text}</p>
            <div className="project-links">
              {project.link1 && <a className="text-link" href={project.link1} target="_blank" rel="noreferrer">Source <ArrowOutwardRoundedIcon /></a>}
              {project.link3 && <a className="text-link" href={project.link3} target="_blank" rel="noreferrer">Live project <ArrowOutwardRoundedIcon /></a>}
              {project.link2 && <a className="text-link" href={project.link2} target="_blank" rel="noreferrer">Demo <ArrowOutwardRoundedIcon /></a>}
            </div>
          </motion.article>
        ))}
        </AnimatePresence>
      </motion.section>
      {visible.length === 0 && <div className="empty"><h2>No matching projects.</h2><button className="btn" onClick={() => { setQuery(''); setCategory('All'); }}>Reset filters</button></div>}
    </ProjectsStyled>
  );
}

const ProjectsStyled = styled.div`
  .page-hero { display: grid; grid-template-columns: minmax(0, 1fr) 210px; gap: 42px; align-items: end; }
  .archive-total { display: grid; align-content: end; padding: 22px 0 4px 22px; border-left: 1px solid var(--line); }
  .archive-total > span { font-family: var(--display); color: var(--blue); font-size: clamp(68px, 8vw, 112px); font-weight: 700; line-height: .72; letter-spacing: -.075em; }
  .archive-total strong { margin-top: 18px; font-family: var(--display); font-size: 17px; line-height: 1.05; }
  .archive-total small { margin-top: 12px; color: var(--muted); font-size: 8px; text-transform: uppercase; }
  .project-controls { position: sticky; top: 0; z-index: 5; display: grid; grid-template-columns: minmax(260px, 1fr) 260px auto; gap: 14px; align-items: center; padding: 18px 0; background: color-mix(in srgb, var(--paper) 94%, transparent); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
  .search { min-height: 48px; display: flex; align-items: center; gap: 10px; padding: 0 14px; background: var(--paper-strong); border: 1px solid var(--line); }
  .search svg { color: var(--blue); }
  .search input { width: 100%; border: 0; outline: 0; background: transparent; font-size: 14px; }
  select { min-height: 48px; padding: 0 12px; border: 1px solid var(--line); background: var(--paper-strong); }
  .project-controls > span { color: var(--muted); font-size: 11px; text-transform: uppercase; }
  .live-count { display: inline-flex; justify-content: flex-end; align-items: baseline; gap: 4px; white-space: nowrap; }
  .live-count > span { color: var(--blue); font-family: var(--display); font-size: 24px; font-weight: 700; }
  .projects-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 46px 24px; padding-top: 34px; }
  .project-card { padding: 0 0 22px; background: var(--project-surface); border-bottom: 1px solid var(--line); transform-origin: 50% 100%; will-change: transform; transition: background .35s ease, box-shadow .25s ease; }
  .project-card:hover { box-shadow: 0 22px 54px rgba(15,18,29,.11); }
  .project-card .image-frame { position: relative; display: block; height: 255px; overflow: hidden; border: 1px solid var(--line); will-change: transform; }
  .project-card .image-frame > a { display: block; width: 100%; height: 100%; }
  .project-card .image-frame img { will-change: transform; }
  .project-index { position: absolute; left: 12px; top: 12px; padding: 6px 8px; background: var(--paper-strong); font-size: 10px; }
  .project-meta { margin: 16px 16px 0; color: var(--blue); font-size: 10px; text-transform: uppercase; }
  .project-card h2 { margin: 7px 16px 0; font-family: var(--display); font-size: 23px; line-height: 1.08; letter-spacing: -.035em; }
  .project-card > p { min-height: 58px; margin: 10px 16px 0; color: var(--muted); font-size: 13px; line-height: 1.5; }
  .project-links { display: flex; flex-wrap: wrap; gap: 16px; margin: 14px 16px 0; }
  .project-links a { font-size: 12px; }
  .project-links svg { font-size: 14px; }
  .empty { padding: 90px 0; text-align: center; }
  .empty .btn { width: auto; margin-top: 20px; }
  @media (max-width: 1060px) { .page-hero { grid-template-columns: 1fr 170px; } .projects-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 680px) { .page-hero { grid-template-columns: 1fr; } .archive-total { grid-template-columns: auto 1fr; gap: 14px; align-items: end; padding: 20px 0 0; border-left: 0; border-top: 1px solid var(--line); } .archive-total > span { font-size: 70px; } .archive-total strong { margin: 0; } .archive-total small { grid-column: 1 / -1; margin-top: 0; } .project-controls { position: static; grid-template-columns: 1fr; } .live-count { justify-content: flex-start; } .projects-grid { grid-template-columns: 1fr; } .project-card .image-frame { height: 250px; } }
`;

export default PortfolioPage;
