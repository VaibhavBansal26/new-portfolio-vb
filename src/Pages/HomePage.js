import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import NeuralScene from '../Components/NeuralScene';
import SmokeSection from '../Components/SmokeSection';
import ParticleLogo from '../Components/ParticleLogo';
import TextScramble from '../Components/TextScramble';
import MagneticButton from '../Components/MagneticButton';
import RevealText from '../Components/RevealText';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';
import LaunchIcon from '@mui/icons-material/Launch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import iconRS from '../img/icons8-researchgate.svg';
import gpacImage from '../img/portImages/gpac.png';
import chatImage from '../img/portImages/chat.png';
import naturalImage from '../img/portImages/natural-disaster.png';

const explorationTracks = [
    {
        icon: <AutoAwesomeIcon />,
        index: '01',
        title: 'Agentic systems',
        copy: 'Designing reliable multi-step AI workflows with tools, memory, and human checkpoints.',
        tags: ['LangGraph', 'Agents', 'Evaluation'],
    },
    {
        icon: <PsychologyIcon />,
        index: '02',
        title: 'Retrieval & RAG',
        copy: 'Turning scattered knowledge into grounded, useful answers with measurable relevance.',
        tags: ['Embeddings', 'Vector DB', 'Reranking'],
    },
    {
        icon: <StorageIcon />,
        index: '03',
        title: 'Production AI',
        copy: 'Shipping observable AI systems with robust data paths, guardrails, and cloud infrastructure.',
        tags: ['MLOps', 'AWS', 'Monitoring'],
    },
];

const selectedProjects = [
    {
        index: '01',
        title: 'GrapesJS Advanced Components',
        category: 'Product engineering',
        image: gpacImage,
        copy: 'A component system for richer visual editing experiences, built for speed and extensibility.',
        stack: ['React', 'GrapesJS', 'JavaScript'],
        href: 'https://github.com/VaibhavBansal26',
    },
    {
        index: '02',
        title: 'Real-time Chat Application',
        category: 'Full-stack systems',
        image: chatImage,
        copy: 'A responsive messaging experience focused on clear interaction states and reliable real-time updates.',
        stack: ['React', 'Firebase', 'Realtime'],
        href: 'https://github.com/VaibhavBansal26/React-chat-app',
    },
    {
        index: '03',
        title: 'Natural Disaster Intelligence',
        category: 'Applied machine learning',
        image: naturalImage,
        copy: 'Prediction and management tooling that turns complex environmental data into actionable signals.',
        stack: ['Python', 'Flask', 'Machine Learning'],
        href: 'https://github.com/VaibhavBansal26/Capstone-2020-Natural-Disaster-Prediction',
    },
];

function HomePage({ theme }) {
    usePageTitle(null);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const leftY = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const rightY = useTransform(scrollYProgress, [0, 1], [0, -240]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const heroBlur = useTransform(scrollYProgress, [0, 0.75], [0, 10]);
    const heroFilter = useTransform(heroBlur, (b) => `blur(${b}px)`);

    return (
        <HomePageStyled>
            <div className="hero" ref={heroRef}>
                <motion.div className="left" style={{ y: leftY, opacity: heroOpacity, filter: heroFilter }}>
                    <p className="eyebrow mono">
                        <span className="prompt">~ $</span> whoami
                    </p>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.05 }}
                    >
                        <motion.span
                            className="h1-word h1-name"
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        >
                            Vaibhav
                        </motion.span>{' '}
                        <motion.span
                            className="gradient-text h1-word"
                            initial={{ y: '100%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                        >
                            Bansal
                        </motion.span>
                    </motion.h1>

                    <p className="role mono">
                        <span className="tag">&lt;</span>{' '}
                        <TextScramble text="AI Software Engineer" delay={600} />
                        <span className="tag"> /&gt;</span>
                        <span className="caret" aria-hidden="true">_</span>
                    </p>

                    <p className="bio">
                        5+ years turning complex problems into scalable software and data
                        products — Python, React, AWS. M.S. in Data Science @ SUNY Buffalo.
                        Previously engineering at Dashclicks &amp; Wipro.
                    </p>

                    <div className="cta-row">
                        <MagneticButton strength={0.3}>
                            <Link to="/portfolios" className="btn btn-primary">
                                view my work <ArrowForwardIcon />
                            </Link>
                        </MagneticButton>
                        <MagneticButton strength={0.25}>
                            <a
                                href="https://drive.google.com/file/d/1XkLsenUxv9C_qr54YeOaRR4PuCUJAXYc/view?usp=sharing"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-glass mono"
                            >
                                <DownloadIcon /> resume.pdf
                            </a>
                        </MagneticButton>
                    </div>

                    <div className="socials">
                        <a href="https://github.com/VaibhavBansal26" aria-label="GitHub"><GithubIcon /></a>
                        <a href="https://www.linkedin.com/in/vaibhavbansal-profile/" aria-label="LinkedIn"><LinkedInIcon /></a>
                        <a href="https://www.researchgate.net/profile/Vaibhav-Bansal-6" aria-label="ResearchGate" className="rs">
                            <img src={iconRS} alt="ResearchGate" />
                        </a>
                        <a href="https://www.instagram.com/vaibhav.bansal945/" aria-label="Instagram"><InstagramIcon /></a>
                        <a href="https://www.facebook.com/vaibhavcoo" aria-label="Facebook"><FacebookIcon /></a>
                    </div>
                </motion.div>

                <motion.div className="right" style={{ y: rightY, opacity: heroOpacity, filter: heroFilter }}>
                    <div className="fx-stage">
                        <div className="glow" aria-hidden="true"></div>
                        <ParticleLogo theme={theme} text="<vb/>" />
                        <span className="chip mono c1">5+ yrs</span>
                        <span className="chip mono c2">python</span>
                        <span className="chip mono c3">react</span>
                        <span className="chip mono c4">aws · ml</span>
                        <p className="hint mono">{'// run your cursor through it'}</p>
                    </div>
                </motion.div>

                <motion.div className="scroll-cue mono" style={{ opacity: heroOpacity }}>
                    <span>scroll</span>
                    <KeyboardArrowDownIcon />
                </motion.div>
            </div>

            <section className="impact-section section-shell" aria-labelledby="impact-title">
                <motion.div
                    className="section-heading compact"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: .3 }}
                >
                    <p className="section-kicker mono"><span>01.</span> proof of work</p>
                    <h2 id="impact-title">Impact, measured in <span className="gradient-text">outcomes</span>.</h2>
                    <p>Product thinking, reliable engineering, and applied intelligence—working together.</p>
                </motion.div>

                <div className="impact-grid">
                    {[
                        ['5+', 'years', 'Building production software across product, data, and AI.'],
                        ['40+', 'projects', 'From fast prototypes to cloud-deployed systems.'],
                        ['M.S.', 'data science', 'University at Buffalo · machine learning and data systems.'],
                    ].map(([value, label, copy], index) => (
                        <motion.article
                            className="impact-card"
                            key={label}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * .08 }}
                            viewport={{ once: true, amount: .35 }}
                        >
                            <span className="impact-index mono">0{index + 1}</span>
                            <strong>{value}</strong>
                            <h3 className="mono">{label}</h3>
                            <p>{copy}</p>
                        </motion.article>
                    ))}
                </div>

                <div className="marquee-strip">
                    <div className="marquee-track mono">
                        {[...Array(2)].map((_, rep) => (
                            <React.Fragment key={rep}>
                                {['python', 'react', 'aws', 'machine learning', 'data engineering', 'docker', 'kubernetes', 'node.js', 'sql', 'spark'].map((s) => (
                                    <span key={`${s}-${rep}`}>{s}<i>&#x25C6;</i></span>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            <SmokeSection className="explore-section section-shell">
                <div className="section-heading">
                    <p className="section-kicker mono"><span>02.</span> currently exploring</p>
                    <h2>Building at the edge of <span className="gradient-text">useful AI</span>.</h2>
                    <p>Research threads I’m actively turning into dependable product experiences.</p>
                </div>

                <div className="explore-layout">
                    <div className="explore-list">
                        {explorationTracks.map((track, index) => (
                            <motion.article
                                className="explore-card"
                                key={track.title}
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * .1 }}
                                viewport={{ once: true, amount: .35 }}
                            >
                                <div className="explore-icon">{track.icon}</div>
                                <div>
                                    <span className="track-index mono">{track.index} / active</span>
                                    <h3>{track.title}</h3>
                                    <p>{track.copy}</p>
                                    <div className="track-tags mono">
                                        {track.tags.map((tag) => <span key={tag}>{tag}</span>)}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                    <div className="explore-visual">
                        <NeuralScene theme={theme} />
                        <div className="terminal-log mono">
                            <span><i>12:08:14</i> retrieval.eval <b>passed</b></span>
                            <span><i>12:08:18</i> agent.route <b>ready</b></span>
                            <span><i>12:08:21</i> production.guard <b>online</b></span>
                        </div>
                    </div>
                </div>
            </SmokeSection>

            <section className="work-section section-shell" aria-labelledby="work-title">
                <div className="work-heading">
                    <div className="section-heading">
                        <p className="section-kicker mono"><span>03.</span> selected work</p>
                        <h2 id="work-title">Selected systems, <span className="gradient-text">built to matter</span>.</h2>
                    </div>
                    <Link to="/portfolios" className="text-link mono">view all work <ArrowForwardIcon /></Link>
                </div>

                <div className="project-list">
                    {selectedProjects.map((project, index) => (
                        <motion.a
                            className="project-row"
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * .08 }}
                            viewport={{ once: true, amount: .25 }}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={`${project.title} interface`} />
                            </div>
                            <div className="project-copy">
                                <span className="project-meta mono">{project.index} · {project.category}</span>
                                <h3>{project.title}</h3>
                                <p>{project.copy}</p>
                                <div className="project-tags mono">
                                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                                </div>
                            </div>
                            <span className="project-launch" aria-hidden="true"><LaunchIcon /></span>
                        </motion.a>
                    ))}
                </div>
            </section>
        </HomePageStyled>
    );
}

const HomePageStyled = styled.header`
    width: 100%;

    .hero{
        max-width: 76rem;
        width: 100%;
        min-height: 100vh;
        margin: 0 auto;
        padding: 7.5rem clamp(1.2rem, 4vw, 3rem) 4rem;
        display: grid;
        grid-template-columns: 1.05fr .95fr;
        align-items: center;
        gap: clamp(2rem, 5vw, 4.5rem);
        position: relative;

        .left,
        .right{
            min-width: 0;
        }

        .right{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        @media screen and (max-width: 1020px){
            grid-template-columns: 1fr;
            .right{
                order: 2;
            }
        }
    }

    .scroll-cue{
        position: absolute;
        bottom: 1.8rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .1rem;
        font-size: .7rem;
        letter-spacing: .25em;
        text-transform: uppercase;
        color: var(--font-light-color);
        svg{
            color: var(--primary-color);
            animation: cue-bounce 1.8s ease-in-out infinite;
        }
    }

    @keyframes cue-bounce{
        0%, 100%{ transform: translateY(0); }
        50%{ transform: translateY(6px); }
    }

    .section-shell{
        max-width: 76rem;
        margin: 0 auto;
        padding: clamp(5rem, 10vw, 8rem) clamp(1.2rem, 4vw, 3rem);
    }

    .section-heading{
        max-width: 42rem;

        &.compact{
            max-width: 38rem;
        }

        .section-kicker{
            margin-bottom: 1rem;
            color: var(--font-light-color);
            font-size: .74rem;
            letter-spacing: .14em;
            text-transform: uppercase;
            span{ color: var(--primary-color); }
        }

        h2{
            color: var(--white-color);
            font-size: clamp(2rem, 4.5vw, 3.45rem);
            font-weight: 700;
            line-height: 1.08;
            letter-spacing: -.035em;
        }

        > p:last-child{
            margin-top: 1.15rem;
            max-width: 34rem;
        }
    }

    /* ---------- Impact ---------- */
    .impact-section{
        position: relative;
        border-top: 1px solid var(--glass-border);
    }

    .impact-grid{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        margin-top: 3.4rem;
        border: 1px solid var(--glass-border);
        border-radius: 18px;
        overflow: hidden;
        background: var(--glass-border);
    }

    .impact-card{
        position: relative;
        min-height: 19rem;
        padding: clamp(1.6rem, 3vw, 2.4rem);
        background: color-mix(in srgb, var(--background-dark-color) 91%, transparent);

        .impact-index{
            display: block;
            margin-bottom: 2.6rem;
            color: var(--font-light-color);
            font-size: .68rem;
            letter-spacing: .14em;
        }
        strong{
            display: block;
            color: var(--primary-color);
            font-family: 'Space Grotesk', 'Inter', sans-serif;
            font-size: clamp(2.8rem, 6vw, 4.8rem);
            font-weight: 700;
            line-height: .9;
            letter-spacing: -.055em;
        }
        h3{
            margin-top: 1rem;
            color: var(--white-color);
            font-size: .72rem;
            font-weight: 600;
            letter-spacing: .14em;
            text-transform: uppercase;
        }
        p{
            max-width: 16rem;
            margin-top: 1.15rem;
            font-size: .88rem;
            line-height: 1.6;
        }
    }

    .marquee-strip{
        overflow: hidden;
        white-space: nowrap;
        margin-top: 1.6rem;
        padding: .65rem 0;
        border-top: 1px solid var(--glass-border);
        mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);

        .marquee-track{
            display: inline-flex;
            align-items: center;
            animation: marquee-slide 36s linear infinite;
            will-change: transform;

            span{
                font-size: .72rem;
                letter-spacing: .12em;
                text-transform: uppercase;
                color: var(--font-light-color);
                i{
                    font-style: normal;
                    font-size: .48rem;
                    color: var(--primary-color);
                    opacity: .55;
                    margin: 0 1.1rem;
                }
            }
        }

        &:hover .marquee-track{
            animation-play-state: paused;
        }
    }

    @keyframes marquee-slide{
        to{ transform: translateX(-50%); }
    }

    /* ---------- Currently exploring ---------- */
    .explore-section{
        display: block;
    }

    .explore-layout{
        display: grid;
        grid-template-columns: .92fr 1.08fr;
        gap: clamp(2rem, 5vw, 4.5rem);
        align-items: center;
        margin-top: 3.5rem;
    }

    .explore-list{
        display: grid;
    }

    .explore-card{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        padding: 1.45rem 0;
        border-top: 1px solid var(--glass-border);
        &:last-child{ border-bottom: 1px solid var(--glass-border); }

        .explore-icon{
            display: grid;
            width: 2.7rem;
            height: 2.7rem;
            place-items: center;
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            color: var(--primary-color);
            background: var(--glass-bg);
            svg{ font-size: 1.25rem; }
        }
        .track-index{
            color: var(--primary-color);
            font-size: .62rem;
            letter-spacing: .1em;
            text-transform: uppercase;
        }
        h3{
            margin-top: .15rem;
            color: var(--white-color);
            font-size: 1.28rem;
        }
        p{
            max-width: 31rem;
            margin-top: .35rem;
            font-size: .86rem;
            line-height: 1.55;
        }
        .track-tags{
            display: flex;
            flex-wrap: wrap;
            gap: .45rem;
            margin-top: .75rem;
            span{
                padding: .18rem .55rem;
                border-radius: 999px;
                color: var(--font-light-color);
                background: var(--glass-bg);
                font-size: .6rem;
            }
        }
    }

    .explore-visual{
        position: relative;
        min-height: 33rem;
        overflow: hidden;
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        background: var(--glass-bg);
        box-shadow: 0 30px 80px rgba(0,0,0,.22);
        cursor: grab;
        &:active{ cursor: grabbing; }

        .terminal-log{
            position: absolute;
            right: 1rem;
            bottom: 1rem;
            left: 1rem;
            display: grid;
            gap: .35rem;
            padding: .8rem 1rem;
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            background: var(--nav-bg);
            backdrop-filter: blur(14px);
            font-size: .6rem;
            letter-spacing: .04em;
            span{ color: var(--font-light-color); }
            i{
                margin-right: .75rem;
                color: var(--accent-2);
                font-style: normal;
            }
            b{
                float: right;
                color: var(--primary-color);
                font-weight: 500;
            }
        }
    }

    /* ---------- Selected work ---------- */
    .work-section{
        padding-top: 4rem;
        border-top: 1px solid var(--glass-border);
    }

    .work-heading{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 2rem;
    }

    .text-link{
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        gap: .55rem;
        padding-bottom: .35rem;
        border-bottom: 1px solid var(--primary-color);
        color: var(--white-color);
        font-size: .75rem;
        svg{
            color: var(--primary-color);
            font-size: 1rem;
            transition: transform .2s ease;
        }
        &:hover svg{ transform: translateX(4px); }
    }

    .project-list{
        margin-top: 3.2rem;
        border-top: 1px solid var(--glass-border);
    }

    .project-row{
        display: grid;
        grid-template-columns: minmax(14rem, .8fr) 1.2fr auto;
        gap: clamp(1.4rem, 4vw, 3.5rem);
        align-items: center;
        padding: 1.7rem 0;
        border-bottom: 1px solid var(--glass-border);
        transition: background-color .25s ease, padding .25s ease;

        &:hover{
            padding-right: 1rem;
            padding-left: 1rem;
            background: var(--glass-bg);
            .project-image img{ transform: scale(1.035); }
            .project-launch{
                color: var(--background-dark-color);
                border-color: var(--primary-color);
                background: var(--primary-color);
                transform: rotate(0deg);
            }
        }
    }

    .project-image{
        aspect-ratio: 16 / 9;
        overflow: hidden;
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        background: var(--glass-bg);
        img{
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: top center;
            transition: transform .35s ease;
        }
    }

    .project-copy{
        min-width: 0;
        .project-meta{
            color: var(--primary-color);
            font-size: .65rem;
            letter-spacing: .1em;
            text-transform: uppercase;
        }
        h3{
            margin-top: .35rem;
            color: var(--white-color);
            font-size: clamp(1.35rem, 2.6vw, 2rem);
            line-height: 1.15;
        }
        > p{
            max-width: 32rem;
            margin-top: .65rem;
            font-size: .88rem;
            line-height: 1.55;
        }
    }

    .project-tags{
        display: flex;
        flex-wrap: wrap;
        gap: .7rem;
        margin-top: .8rem;
        span{
            color: var(--font-light-color);
            font-size: .61rem;
            &::before{
                content: '#';
                color: var(--primary-color);
            }
        }
    }

    .project-launch{
        display: grid;
        width: 2.9rem;
        height: 2.9rem;
        place-items: center;
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        color: var(--primary-color);
        transform: rotate(-12deg);
        transition: .25s ease;
        svg{ font-size: 1.1rem; }
    }

    .eyebrow{
        font-size: .9rem;
        color: var(--font-light-color);
        margin-bottom: 1.2rem;
        animation: fade-up .5s ease both;
        .prompt{
            color: var(--primary-color);
            font-family: var(--font-mono);
        }
    }

    h1{
        overflow: hidden;

        .h1-word{
            display: inline-block;
            will-change: transform, opacity;
        }

        .h1-name{
            color: var(--white-color);
        }
    }

    .role{
        margin-top: 1.1rem;
        font-size: clamp(.85rem, 1.6vw, 1.05rem);
        color: var(--white-color);
        animation: fade-up .5s ease .14s both;
        .tag{
            color: var(--primary-color);
            font-family: var(--font-mono);
        }
        .amp{
            color: var(--accent-3);
            font-family: var(--font-mono);
        }
        .caret{
            color: var(--primary-color);
            font-family: var(--font-mono);
            animation: caret-blink 1.1s step-end infinite;
            margin-left: .15rem;
        }
    }

    .bio{
        margin-top: 1.3rem;
        max-width: 34rem;
        animation: fade-up .5s ease .21s both;
    }

    .proof-row{
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        width: min(100%, 32rem);
        margin: 1.8rem 0 0;
        animation: fade-up .5s ease .25s both;

        > div{
            min-width: 0;
            padding-right: 1rem;
            &:not(:first-child){
                border-left: 1px solid var(--glass-border);
                padding-left: 1rem;
            }
        }

        strong{
            display: block;
            color: var(--primary-color);
            font-size: 1.25rem;
            line-height: 1.1;
        }

        span{
            display: block;
            margin-top: .35rem;
            color: var(--font-light-color);
            font-size: .68rem;
            line-height: 1.35;
            text-transform: uppercase;
            letter-spacing: .06em;
        }
    }

    .cta-row{
        display: flex;
        flex-wrap: wrap;
        gap: .9rem;
        margin-top: 2.2rem;
        animation: fade-up .5s ease .28s both;
    }

    .btn{
        display: inline-flex;
        align-items: center;
        gap: .5rem;
        padding: .8rem 1.6rem;
        border-radius: 10px;
        font-size: .92rem;
        font-weight: 600;
        transition: transform .2s ease, box-shadow .25s ease, border-color .25s ease;
        svg{
            font-size: 1.05rem;
            transition: transform .2s ease;
        }
        &:active{
            transform: translateY(0) scale(.98);
        }
    }

    .btn-primary{
        background: linear-gradient(120deg, var(--primary-color), var(--accent-2));
        color: var(--on-primary);
        box-shadow: 0 4px 24px var(--primary-glow);
        &:hover{
            transform: translateY(-2px);
            box-shadow: 0 10px 34px var(--primary-glow);
            svg{
                transform: translateX(3px);
            }
        }
    }

    .btn-glass{
        border: 1px solid var(--glass-border);
        background: var(--glass-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: var(--white-color);
        font-weight: 500;
        &:hover{
            transform: translateY(-2px);
            border-color: var(--primary-color);
            svg{
                color: var(--primary-color);
            }
        }
    }

    .socials{
        display: flex;
        gap: .35rem;
        margin-top: 2rem;
        animation: fade-up .5s ease .35s both;
        a{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 10px;
            color: var(--font-light-color);
            border: 1px solid transparent;
            transition: color .2s ease, border-color .2s ease, transform .2s ease, background-color .2s ease;
            svg{
                font-size: 1.2rem;
            }
            img{
                width: 1.2rem;
                height: 1.2rem;
                opacity: .75;
            }
            &:hover{
                color: var(--primary-color);
                border-color: var(--glass-border);
                background: var(--glass-bg);
                transform: translateY(-2px);
            }
        }
    }

    /* ---------- Particle logo stage ---------- */
    .fx-stage{
        position: relative;
        width: 100%;
        max-width: 30rem;
        height: clamp(300px, 42vh, 420px);
        margin: 0 auto;
        overflow: visible;
        animation: fade-up .6s ease .2s both;

        .glow{
            position: absolute;
            inset: 12% 8%;
            border-radius: 50%;
            background: radial-gradient(circle at center, var(--primary-glow), transparent 68%);
            filter: blur(36px);
            z-index: -1;
            animation: glow-breathe 4.5s ease-in-out infinite;
        }

        .chip{
            position: absolute;
            font-size: .7rem;
            font-weight: 600;
            color: var(--primary-color);
            border: 1px solid var(--glass-border);
            border-radius: 999px;
            padding: .32rem .8rem;
            background: var(--nav-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, .25);
            pointer-events: none;
            z-index: 2;
        }
        .c1{ top: 6%; left: -10%; animation: chip-float 5s ease-in-out infinite; }
        .c2{ top: 28%; right: -14%; animation: chip-float 6s ease-in-out infinite reverse; }
        .c3{ bottom: 30%; left: -14%; animation: chip-float 5.5s ease-in-out infinite .4s; }
        .c4{ bottom: 8%; right: -8%; animation: chip-float 6.5s ease-in-out infinite .8s; }

        .hint{
            position: absolute;
            bottom: .35rem;
            width: 100%;
            text-align: center;
            font-size: .72rem;
            color: var(--font-light-color);
            opacity: .7;
        }
    }

    @keyframes chip-float{
        0%, 100%{ transform: translateY(0); }
        50%{ transform: translateY(-9px); }
    }
    @keyframes glow-breathe{
        0%, 100%{ opacity: .8; }
        50%{ opacity: 1.15; }
    }

    @media screen and (max-width: 1020px){
        .hero{
            text-align: left;
            padding-top: 6rem;

            .left{
                align-self: auto;
                padding-top: 0;
            }
        }
        .fx-stage{
            max-width: 100%;
            height: clamp(240px, 34vh, 320px);
            .chip{ display: none; }
        }

        .explore-layout{
            grid-template-columns: 1fr;
        }

        .explore-visual{
            min-height: 28rem;
        }
    }

    @media screen and (max-width: 780px){
        .impact-grid{
            grid-template-columns: 1fr;
        }

        .impact-card{
            min-height: auto;
            .impact-index{ margin-bottom: 1.6rem; }
        }

        .work-heading{
            align-items: flex-start;
            flex-direction: column;
        }

        .project-row{
            grid-template-columns: 1fr auto;
            .project-image{
                grid-column: 1 / -1;
            }
        }
    }

    @media screen and (max-width: 640px){
        .hero{
            overflow: hidden;
        }

        h1{
            font-size: clamp(2.65rem, 14vw, 3.3rem);

            .gradient-text{
                display: block;
            }
        }

        .bio{
            max-width: 100%;
            overflow-wrap: anywhere;
        }

        .proof-row{
            grid-template-columns: 1fr;
            gap: .8rem;

            > div,
            > div:not(:first-child){
                border-left: 0;
                border-top: 1px solid var(--glass-border);
                padding: .8rem 0 0;
            }

            > div:first-child{
                border-top: 0;
                padding-top: 0;
            }
        }

        .fx-stage .stage-action{
            display: none;
        }

        .section-shell{
            padding-top: 4.5rem;
            padding-bottom: 4.5rem;
        }

        .explore-card{
            grid-template-columns: 1fr;
        }

        .explore-visual{
            min-height: 23rem;
        }

        .project-row{
            gap: 1rem;
            .project-copy{
                grid-column: 1 / -1;
            }
            .project-launch{
                position: absolute;
                right: 1rem;
                bottom: 1.3rem;
            }
            position: relative;
            padding-bottom: 4.7rem;
        }
    }
`;

export default HomePage;
