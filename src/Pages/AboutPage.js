import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import avatar from '../img/avatar-new.webp';
import graduation from '../img/profile/vaibhav-graduation.webp';

function AboutPage() {
  usePageTitle('About');
  return (
    <AboutStyled className="page-shell compact">
      <header className="page-hero">
        <p className="kicker">02 / about</p>
        <h1>Engineer by craft.<br /><span>Curious by nature.</span></h1>
        <p className="lead">I build at the intersection of software, data, and applied intelligence—turning ambiguous ideas into dependable products people can actually use.</p>
      </header>

      <section className="story-grid">
        <motion.figure className="portrait image-frame" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <img src={avatar} alt="Vaibhav Bansal" width="721" height="1124" loading="lazy" decoding="async" />
        </motion.figure>
        <div className="story-copy">
          <p className="section-index">01 / the story</p>
          <h2 className="section-title">Complex systems should still feel simple.</h2>
          <p>I’m an AI software engineer with 5+ years of experience across full-stack products, data engineering, machine learning, and cloud infrastructure. I enjoy the work between disciplines: finding the right problem, making the architecture practical, and shipping an experience that feels clear.</p>
          <p>At DashClicks and Wipro, I sharpened product engineering, ML workflows, MLOps automation, and CI/CD practices. Today I’m focused on useful AI systems—grounded, observable, and designed with real people in the loop.</p>
          <div className="principles">
            <span>Build for clarity</span><span>Measure the outcome</span><span>Share what works</span>
          </div>
        </div>
      </section>

      <section className="education">
        <div>
          <p className="section-index">02 / education</p>
          <h2 className="section-title">Data science, grounded in engineering.</h2>
          <p>My M.S. in Data Science at the University at Buffalo deepened my foundation in statistics, machine learning, and data systems—and reinforced the discipline of turning research into working software.</p>
          <a className="text-link" href="https://www.buffalo.edu/" target="_blank" rel="noreferrer">University at Buffalo <ArrowForwardRoundedIcon /></a>
        </div>
        <figure className="graduation image-frame">
          <img src={graduation} alt="Vaibhav Bansal at his University at Buffalo graduation" width="1086" height="1448" loading="lazy" decoding="async" />
          <figcaption className="mono">Buffalo, NY · M.S. Data Science</figcaption>
        </figure>
      </section>

      <section className="outside">
        <p className="section-index">03 / beyond the screen</p>
        <div className="outside-grid">
          <h2 className="section-title">Learn widely.<br />Build deliberately.</h2>
          <div><p>Away from code, I’m an adventure-sports enthusiast, tennis player, and compulsive reader of technology writing and community forums.</p><p>English · Hindi · French<br />Based in Buffalo, NY · roots in India</p></div>
        </div>
      </section>
    </AboutStyled>
  );
}

const AboutStyled = styled.div`
  .story-grid, .education { display: grid; grid-template-columns: .78fr 1.22fr; gap: clamp(36px, 7vw, 90px); align-items: center; padding: 78px 0; border-bottom: 1px solid var(--line); }
  .portrait { height: 620px; }
  .portrait img { object-position: center 18%; }
  .story-copy > p:not(.section-index), .education p, .outside p { margin-top: 20px; color: var(--muted); font-size: 17px; line-height: 1.75; }
  .principles { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
  .principles span { padding: 8px 12px; background: var(--mint); font-family: var(--mono); font-size: 11px; }
  .education { grid-template-columns: 1fr .8fr; }
  .education .text-link { margin-top: 24px; }
  .graduation { position: relative; height: 600px; }
  .graduation img { object-position: center 18%; }
  .graduation figcaption { position: absolute; left: 14px; bottom: 14px; padding: 8px 10px; color: white; background: var(--rail); font-size: 10px; }
  .outside { padding: 78px 0 30px; }
  .outside-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; }
  @media (max-width: 800px) { .story-grid, .education, .outside-grid { grid-template-columns: 1fr; } .portrait, .graduation { height: min(650px, 120vw); } }
`;

export default AboutPage;
