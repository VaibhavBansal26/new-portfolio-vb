import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { InnerLayout } from '../styles/Layouts';
import Title from '../Components/Title';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const fadeUp = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, ease: 'easeOut' },
};

const ticker = ['Python', 'React', 'AWS', 'Machine Learning', 'Node.js', 'Docker', 'Kubernetes', 'Spark', 'Next.js', 'SQL', 'Kafka', 'Airflow', 'MLflow', 'Snowflake', 'TypeScript'];

const groups = [
    { id: '01', name: 'languages', items: ['Python', 'JavaScript', 'Java', 'SQL', 'R', 'C++'] },
    { id: '02', name: 'frontend', items: ['React', 'Next.js', 'Redux', 'Tailwind CSS', 'Material UI', 'Styled Components'] },
    { id: '03', name: 'backend & cloud', items: ['Node.js', 'AWS', 'Docker', 'Kubernetes', 'Firebase', 'Redis', 'Kafka', 'CI/CD'] },
    { id: '04', name: 'data & ml', items: ['Machine Learning', 'Spark', 'Airflow', 'MLflow', 'ETL Pipelines', 'Snowflake', 'Streamlit'] },
    { id: '05', name: 'databases', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite3', 'Cassandra'] },
    { id: '06', name: 'tools', items: ['Git', 'JIRA', 'System Design', 'NPM', 'Zookeeper'] },
];

const highlights = [
    {
        label: 'npm package',
        title: 'grapesjs-advance-components',
        meta: 'published on npm',
        href: 'https://www.npmjs.com/package/grapesjs-advance-components',
    },
    {
        label: 'research paper',
        title: 'Obstacle Avoidance Using Stereo Vision & Depth Maps',
        meta: 'Springer Nature Applied Sciences · 2020',
        href: 'https://doi.org/10.1007/s42452-020-2815-z',
    },
    {
        label: 'leetcode',
        title: 'vaibhav_bansal26',
        meta: 'problem-solving stats & heatmap',
        href: 'https://leetcode.com/vaibhav_bansal26/',
    },
];

function Skills({ theme }) {
    return (
        <SkillsStyled>
            <Title title={'Skills'} span={'skills'} />

            {/* slim accent ticker */}
            <motion.div className="ticker-strip" {...fadeUp}>
                <div className="track mono">
                    {[...ticker, ...ticker].map((s, i) => (
                        <span key={`${s}-${i}`}>{s}<i>◆</i></span>
                    ))}
                </div>
            </motion.div>

            <InnerLayout>
                <div className="skills-layout">
                    <motion.aside className="intro" {...fadeUp}>
                        <p className="term-line mono">
                            <span className="prompt">~ $</span> ls ./skills
                        </p>
                        <h3>A full-stack toolkit,<br />sharpened over <span className="gradient-text">5+ years</span>.</h3>
                        <p className="blurb">
                            From pixel to pipeline — frontend interfaces, cloud
                            infrastructure, and machine-learning systems that ship.
                        </p>
                    </motion.aside>

                    <div className="domains">
                        {groups.map((g, gi) => (
                            <motion.div
                                className="domain"
                                key={g.id}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, delay: gi * 0.06, ease: 'easeOut' }}
                            >
                                <div className="domain-head">
                                    <span className="idx mono">{g.id}</span>
                                    <h4 className="mono">{g.name}</h4>
                                    <span className="rule" />
                                </div>
                                <p className="items">
                                    {g.items.map((s, i) => (
                                        <span key={s} className="skill">
                                            {s}
                                            {i < g.items.length - 1 && <em> · </em>}
                                        </span>
                                    ))}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div {...fadeUp}>
                    <p className="term-line mono highlights-line">
                        <span className="prompt">~ $</span> cat ./highlights.md
                    </p>
                    <div className="index-list">
                        {highlights.map((h, i) => (
                            <a href={h.href} target="_blank" rel="noreferrer" className="row" key={h.title}>
                                <span className="idx mono">0{i + 1}</span>
                                <div className="row-main">
                                    <p className="row-label mono">{h.label}</p>
                                    <h5>{h.title}</h5>
                                </div>
                                <span className="row-meta">{h.meta}</span>
                                <ArrowOutwardIcon className="arrow" />
                            </a>
                        ))}
                    </div>

                    <a
                        className="lc-strip"
                        href="https://leetcode.com/vaibhav_bansal26/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={`https://leetcard.jacoblin.cool/vaibhav_bansal26?theme=${theme === 'light-theme' ? 'light' : 'dark'}&font=JetBrains%20Mono&ext=heatmap&border=0&radius=12`}
                            alt="LeetCode stats for vaibhav_bansal26"
                            loading="lazy"
                        />
                    </a>
                </motion.div>
            </InnerLayout>
        </SkillsStyled>
    );
}

const SkillsStyled = styled.section`
    .term-line{
        font-size: .85rem;
        color: var(--font-light-color);
        margin-bottom: 1.2rem;
        .prompt{
            color: var(--primary-color);
            font-family: var(--font-mono);
        }
    }

    /* ---------- slim ticker ---------- */
    .ticker-strip{
        overflow: hidden;
        white-space: nowrap;
        margin-top: 1.6rem;
        padding: .7rem 0;
        border-top: 1px solid var(--glass-border);
        border-bottom: 1px solid var(--glass-border);
        mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);

        .track{
            display: inline-flex;
            align-items: center;
            animation: strip-scroll 44s linear infinite;
            will-change: transform;
            span{
                font-family: var(--font-mono);
                font-size: .8rem;
                letter-spacing: .08em;
                text-transform: uppercase;
                color: var(--font-light-color);
                i{
                    font-style: normal;
                    font-size: .55rem;
                    color: var(--primary-color);
                    opacity: .6;
                    margin: 0 1.2rem;
                }
            }
        }
        &:hover .track{
            animation-play-state: paused;
        }
    }

    @keyframes strip-scroll{
        to{ transform: translateX(-50%); }
    }

    /* ---------- editorial domain layout ---------- */
    .skills-layout{
        display: grid;
        grid-template-columns: .85fr 1.15fr;
        gap: clamp(2rem, 5vw, 4.5rem);
        align-items: start;
        margin-bottom: 4.5rem;
        @media screen and (max-width: 900px){
            grid-template-columns: 1fr;
        }
    }

    .intro{
        position: sticky;
        top: 6.5rem;
        @media screen and (max-width: 900px){
            position: static;
        }
        h3{
            color: var(--white-color);
            font-size: clamp(1.5rem, 2.8vw, 2.2rem);
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.22;
        }
        .blurb{
            margin-top: 1rem;
            font-size: .95rem;
            max-width: 22rem;
        }
    }

    .domains{
        display: flex;
        flex-direction: column;
    }

    .domain{
        padding: 1.5rem 0;
        &:not(:last-child){
            border-bottom: 1px solid var(--glass-border);
        }

        .domain-head{
            display: flex;
            align-items: center;
            gap: .8rem;
            margin-bottom: .7rem;
            .idx{
                font-size: .68rem;
                color: var(--primary-color);
                opacity: .85;
            }
            h4{
                font-size: .82rem;
                font-weight: 600;
                letter-spacing: .16em;
                text-transform: uppercase;
                color: var(--white-color);
            }
            .rule{
                flex: 1;
                height: 1px;
                background: linear-gradient(90deg, var(--glass-border), transparent);
            }
        }

        .items{
            font-size: clamp(1rem, 1.8vw, 1.2rem);
            line-height: 1.9;
            color: var(--font-light-color);
            .skill{
                color: var(--font-light-color);
                transition: color .2s ease, text-shadow .2s ease;
                cursor: default;
                &:hover{
                    color: var(--primary-color);
                    text-shadow: 0 0 18px var(--primary-glow);
                }
                em{
                    font-style: normal;
                    color: var(--primary-color);
                    opacity: .45;
                }
            }
        }
    }

    /* ---------- highlights ---------- */
    .highlights-line{
        margin-top: .5rem;
    }

    .index-list{
        border-top: 1px solid var(--glass-border);

        .row{
            display: flex;
            align-items: center;
            gap: 1.4rem;
            padding: 1.4rem .4rem;
            border-bottom: 1px solid var(--glass-border);
            transition: padding-left .25s ease, background-color .25s ease;

            .idx{
                font-size: .8rem;
                color: var(--primary-color);
                opacity: .8;
            }

            .row-main{
                flex: 1;
                min-width: 0;
                .row-label{
                    font-size: .7rem;
                    text-transform: uppercase;
                    letter-spacing: .15em;
                    color: var(--font-light-color);
                    margin-bottom: .25rem;
                }
                h5{
                    color: var(--white-color);
                    font-size: clamp(1rem, 2vw, 1.3rem);
                    font-weight: 600;
                    transition: color .2s ease;
                }
            }

            .row-meta{
                font-size: .8rem;
                color: var(--font-light-color);
                @media screen and (max-width: 640px){
                    display: none;
                }
            }

            .arrow{
                font-size: 1.2rem;
                color: var(--font-light-color);
                transition: transform .25s ease, color .25s ease;
                flex-shrink: 0;
            }

            &:hover{
                padding-left: 1.2rem;
                background: var(--background-light-color-2);
                h5{ color: var(--primary-color); }
                .arrow{
                    color: var(--primary-color);
                    transform: translate(3px, -3px);
                }
            }
        }
    }

    .lc-strip{
        display: block;
        margin-top: 2.5rem;
        img{
            width: 100%;
            max-width: 36rem;
            border-radius: 14px;
            border: 1px solid var(--glass-border);
            display: block;
            transition: border-color .25s ease, transform .25s ease;
        }
        &:hover img{
            border-color: var(--primary-color);
            transform: translateY(-3px);
        }
    }
`;

export default Skills;
