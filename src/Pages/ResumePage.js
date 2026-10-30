import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';

const roles = [
  {
    years: 'Jan — May 2025',
    category: 'Academic · AI at scale',
    title: 'Graduate Student Assistant',
    company: 'University at Buffalo, SUNY',
    href: 'https://www.buffalo.edu/',
    copy: 'Supported Applied Machine Learning at Scale for a 90+ student cohort, helping teams move from Python notebooks to reproducible data and MLOps workflows.',
    achievements: ['90+ students supported', 'Cloud + MLOps guidance', 'Production-minded ML labs'],
    tags: ['Python', 'SQL', 'Spark', 'Kafka', 'AWS', 'Docker', 'Hopsworks'],
  },
  {
    years: 'Aug 2024 — Jan 2025',
    category: 'Academic · Teaching',
    title: 'Graduate Teaching Assistant',
    company: 'University at Buffalo, SUNY',
    href: 'https://www.buffalo.edu/',
    copy: 'Led 20+ practical lab sessions for Python for Data Science and supported more than 130 students across programming, SQL, machine learning, and Docker fundamentals.',
    achievements: ['130+ student cohort', '20+ lab sessions', 'Hands-on technical mentoring'],
    tags: ['Python', 'SQL', 'Machine Learning', 'Docker'],
  },
  {
    years: 'Sep 2021 — Jan 2024',
    category: 'Product engineering',
    title: 'Software Engineer',
    company: 'DashClicks India Ltd.',
    href: 'https://www.dashclicks.com/',
    copy: 'Built a GrapesJS and React website builder, reusable visual components, payment experiences, form-builder extensions, and real-time support tooling for a marketing technology platform.',
    achievements: ['200k+ lines shipped in two months', 'Published grapesjs-advance-components', 'Sockets, Draft.js and Form.io systems'],
    tags: ['React', 'GrapesJS', 'JavaScript', 'Form.io', 'Sockets', 'Draft.js'],
  },
  {
    years: 'Aug 2020 — Sep 2021',
    category: 'Enterprise engineering',
    title: 'Software Engineer',
    company: 'Wipro Technologies India Ltd.',
    href: 'https://www.wipro.com/',
    copy: 'Developed payment and productivity tooling including Vantiv and EMV parsers, a JIRA worklog application, and software supporting MX payment terminals.',
    achievements: ['Python + Flask utilities', 'Payment-terminal workflows', 'Enterprise delivery across teams'],
    tags: ['Python', 'Flask', 'C++', 'AWS', 'Payments'],
  },
];

const earlyChapters = [
  ['2018 & 2019', 'Front-end Industrial Intern', 'Smart Software Solutions', 'Barcode integration and industrial web applications.', 'https://smartcontrols.in/'],
  ['Jun 2018', 'Industrial Intern', 'J.K. Tyre India', 'Oracle training and data-management foundations.', 'https://www.jktyre.com/'],
  ['Jun 2017', 'Web Development Intern', 'E-Biz Technocrats', 'Online newspaper and blog-management products across the full web stack.', 'https://ebiztechnocrats.com/'],
];

const skillGroups = [
  [CodeRoundedIcon, 'Product engineering', 'React, Node.js, JavaScript, TypeScript, REST APIs, real-time systems'],
  [AutoGraphRoundedIcon, 'AI & data systems', 'Python, RAG, scikit-learn, model evaluation, Spark, Kafka, Airflow'],
  [GroupsRoundedIcon, 'Technical leadership', 'Mentoring, lab instruction, cross-functional delivery, reusable systems'],
  [SchoolRoundedIcon, 'Cloud & delivery', 'AWS, Azure, Docker, Kubernetes, Terraform, CI/CD and observability'],
];

function ResumePage() {
  usePageTitle('Experience');
  const reduceMotion = useReducedMotion();

  return (
    <ResumeStyled className="page-shell compact">
      <header className="page-hero resume-hero">
        <div>
          <p className="kicker">03 / experience</p>
          <h1>A career built<br /><span>in working systems.</span></h1>
          <p className="lead">From enterprise payments to visual builders, applied ML, and teaching—each chapter sharpened a different part of how I turn complex ideas into useful products.</p>
        </div>
        <a className="btn primary" href="https://drive.google.com/file/d/16RVmz7PSKI6z7hhHtsfgoH-s3QkNuDU2/view?usp=sharing" target="_blank" rel="noreferrer"><DownloadRoundedIcon /> Download résumé</a>
      </header>

      <section className="impact-strip" aria-label="Career impact">
        <div><strong>5+</strong><span>years building</span></div>
        <div><strong>220+</strong><span>students supported</span></div>
        <div><strong>200k+</strong><span>lines shipped in one sprint</span></div>
        <div><strong>2</strong><span>degrees in computing &amp; data</span></div>
      </section>

      <section className="experience-section">
        <div className="section-heading">
          <p className="section-index">01 / selected experience</p>
          <h2>Four chapters.<br />One through-line: <span>make it useful.</span></h2>
        </div>
        <div className="career-map">
          {roles.map((role, index) => (
            <motion.article
              key={`${role.company}-${role.years}`}
              className="role-card"
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .22 }}
              transition={{ duration: .5, delay: index * .06, ease: [.22, 1, .36, 1] }}
            >
              <div className="role-rail">
                <span className="role-node" />
                <p className="years mono">{role.years}</p>
                <span className="role-no mono">0{index + 1}</span>
              </div>
              <div className="role-main">
                <p className="role-category mono">{role.category}</p>
                <h3>{role.title}</h3>
                <a href={role.href} target="_blank" rel="noreferrer">{role.company} <ArrowOutwardRoundedIcon /></a>
                <p className="role-copy">{role.copy}</p>
                <div className="achievement-list">
                  {role.achievements.map(item => <span key={item}>{item}</span>)}
                </div>
              </div>
              <div className="role-stack">
                <span className="mono">Toolkit</span>
                <div>{role.tags.map(tag => <em key={tag}>{tag}</em>)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="early-section">
        <p className="section-index">02 / early engineering chapters</p>
        <div className="early-grid">
          {earlyChapters.map(([years, title, company, copy, href], index) => (
            <a href={href} target="_blank" rel="noreferrer" key={company}>
              <span className="mono">0{index + 1} · {years}</span>
              <h3>{title}</h3>
              <strong>{company}</strong>
              <p>{copy}</p>
              <ArrowOutwardRoundedIcon />
            </a>
          ))}
        </div>
      </section>

      <section className="skills-section">
        <p className="section-index">03 / capabilities built along the way</p>
        <div className="skills-grid">
          {skillGroups.map(([Icon, title, skills], index) => (
            <article key={title}>
              <div><Icon /><span className="mono">0{index + 1}</span></div>
              <h3>{title}</h3>
              <p>{skills}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="education-strip">
        <div><span className="mono">2024 — 2025</span><h3>M.S. Data Science</h3><p>University at Buffalo, SUNY · GPA 3.833 / 4</p></div>
        <div><span className="mono">2016 — 2020</span><h3>B.Tech Computer Science</h3><p>VIT University · CGPA 8.62 / 10</p></div>
        <div><span className="mono">Now</span><h3>Building useful AI systems</h3><p>Agents, retrieval, evaluation, developer tools, and data products</p></div>
      </section>
    </ResumeStyled>
  );
}

const ResumeStyled = styled.div`
  .resume-hero { display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 44px; }
  .resume-hero .btn { margin-bottom: 8px; white-space: nowrap; }
  .impact-strip { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--line); }
  .impact-strip div { min-height: 124px; padding: 25px 22px; border-left: 1px solid var(--line); }
  .impact-strip div:first-child { padding-left: 0; border-left: 0; }
  .impact-strip strong { display: block; font-family: var(--display); color: var(--blue); font-size: clamp(32px, 4vw, 54px); line-height: 1; letter-spacing: -.05em; }
  .impact-strip span { display: block; max-width: 160px; margin-top: 10px; font-family: var(--mono); color: var(--muted); font-size: 9px; line-height: 1.45; text-transform: uppercase; }
  .experience-section, .early-section, .skills-section { padding: 72px 0; border-bottom: 1px solid var(--line); }
  .section-heading { display: grid; grid-template-columns: 280px 1fr; gap: 34px; align-items: end; margin-bottom: 36px; }
  .section-heading h2 { font-family: var(--display); font-size: clamp(34px, 4.8vw, 64px); line-height: .96; letter-spacing: -.055em; }
  .section-heading h2 span { color: var(--blue); }
  .career-map { border-top: 1px solid var(--line); }
  .role-card { display: grid; grid-template-columns: 174px minmax(0, 1fr) 220px; gap: 30px; padding: 0; border-bottom: 1px solid var(--line); transition: background .28s ease; }
  .role-card:hover { background: color-mix(in srgb, var(--paper-strong) 72%, var(--blue)); }
  .role-rail { position: relative; min-height: 254px; padding: 30px 24px 30px 30px; border-right: 1px solid var(--line); }
  .role-rail::before { content: ''; position: absolute; top: 0; bottom: 0; left: 6px; width: 1px; background: var(--line); }
  .role-node { position: absolute; top: 37px; left: 0; width: 13px; height: 13px; border: 3px solid var(--paper); border-radius: 50%; background: var(--blue); box-shadow: 0 0 0 1px var(--blue); }
  .years, .role-no { color: var(--muted); font-size: 10px; text-transform: uppercase; }
  .role-no { position: absolute; bottom: 27px; color: var(--blue); font-size: 24px; font-weight: 700; }
  .role-main { padding: 30px 0; }
  .role-category { color: var(--blue); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }
  .role-main h3 { margin-top: 11px; font-family: var(--display); font-size: clamp(26px, 3vw, 40px); line-height: 1; letter-spacing: -.045em; }
  .role-main > a { display: inline-flex; align-items: center; gap: 6px; margin-top: 7px; color: var(--blue); font-weight: 700; }
  .role-main > a svg { font-size: 16px; }
  .role-copy { max-width: 670px; margin-top: 17px; color: var(--muted); font-size: 14px; line-height: 1.65; }
  .achievement-list { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 20px; }
  .achievement-list span { padding: 6px 9px; background: var(--mint); font-family: var(--mono); font-size: 9px; }
  .role-stack { padding: 30px 24px 30px 0; }
  .role-stack > span { color: var(--muted); font-size: 8px; letter-spacing: .1em; text-transform: uppercase; }
  .role-stack > div { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
  .role-stack em { padding-bottom: 3px; border-bottom: 1px solid var(--line); color: var(--muted); font-family: var(--mono); font-size: 9px; font-style: normal; }
  .early-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 30px; }
  .early-grid a { position: relative; min-height: 250px; padding: 24px; overflow: hidden; background: var(--paper-strong); border: 1px solid var(--soft-line); transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
  .early-grid a:hover { transform: translateY(-7px) rotate(-.35deg); border-color: var(--blue); box-shadow: 0 22px 48px rgba(15,18,29,.1); }
  .early-grid span { color: var(--blue); font-size: 9px; text-transform: uppercase; }
  .early-grid h3 { margin-top: 38px; font-family: var(--display); font-size: 25px; line-height: 1; letter-spacing: -.035em; }
  .early-grid strong { display: block; margin-top: 8px; font-size: 13px; }
  .early-grid p { margin-top: 14px; color: var(--muted); font-size: 13px; }
  .early-grid svg { position: absolute; right: 20px; bottom: 20px; color: var(--blue); }
  .skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 32px; }
  .skills-grid article { padding: 24px; border-left: 1px solid var(--line); }
  .skills-grid article:first-child { padding-left: 0; border-left: 0; }
  .skills-grid article > div { display: flex; align-items: center; justify-content: space-between; color: var(--blue); }
  .skills-grid svg { font-size: 28px; }
  .skills-grid span { font-size: 9px; }
  .skills-grid h3 { margin-top: 36px; font-size: 18px; }
  .skills-grid p { margin-top: 10px; color: var(--muted); font-size: 13px; }
  .education-strip { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 68px; background: var(--rail); color: white; }
  .education-strip div { min-height: 190px; padding: 30px; border-left: 1px solid rgba(255,255,255,.18); }
  .education-strip div:first-child { border-left: 0; }
  .education-strip span { color: var(--mint); font-size: 9px; text-transform: uppercase; }
  .education-strip h3 { margin-top: 34px; font-family: var(--display); font-size: 23px; line-height: 1; }
  .education-strip p { margin-top: 10px; color: rgba(255,255,255,.62); font-size: 12px; }
  @media (max-width: 900px) { .resume-hero { grid-template-columns: 1fr; } .resume-hero .btn { justify-self: start; margin-top: 8px; } .impact-strip { grid-template-columns: repeat(2, 1fr); } .impact-strip div:nth-child(3) { border-left: 0; } .section-heading { grid-template-columns: 1fr; } .role-card { grid-template-columns: 130px 1fr; } .role-stack { grid-column: 2; padding: 0 22px 28px 0; } .early-grid, .education-strip { grid-template-columns: 1fr; } .early-grid a { min-height: 220px; } .skills-grid { grid-template-columns: repeat(2, 1fr); } .skills-grid article:nth-child(3) { border-left: 0; } .education-strip div { border-left: 0; border-top: 1px solid rgba(255,255,255,.18); } }
  @media (max-width: 600px) { .impact-strip div { min-height: 110px; padding: 21px 14px; } .role-card { grid-template-columns: 1fr; gap: 0; } .role-rail { min-height: auto; padding: 22px 20px 0 30px; border-right: 0; } .role-rail::before { bottom: -210px; } .role-no { right: 20px; bottom: auto; top: 20px; } .role-main { padding: 22px 20px 22px 30px; } .role-stack { grid-column: 1; padding: 0 20px 26px 30px; } .skills-grid { grid-template-columns: 1fr; } .skills-grid article { padding-inline: 0; border-left: 0; border-top: 1px solid var(--line); } }
`;

export default ResumePage;
