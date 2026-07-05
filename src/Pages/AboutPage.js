import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';
import Title from '../Components/Title';
import { MainLayout } from '../styles/Layouts';
import DownloadIcon from '@mui/icons-material/Download';
import professionalPortrait from '../img/profile/vaibhav-professional.jpeg';
import graduationPortrait from '../img/profile/vaibhav-graduation.png';

const section = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function AboutPage() {
    usePageTitle('About');
    return (
        <MainLayout>
            <AboutStyled>
                <Title title={'About Me'} span={'about'} />

                <motion.div
                    className="chapter intro-grid"
                    variants={section}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <motion.figure className="portrait-frame" variants={item}>
                        <img src={professionalPortrait} alt="Vaibhav Bansal in professional attire" />
                        <figcaption className="mono">
                            <span>calm mind</span>
                            <span>curious engineer</span>
                            <span>impact driven</span>
                        </figcaption>
                    </motion.figure>

                    <div className="intro-copy">
                        <motion.p className="term-line mono" variants={item}>
                            <span className="prompt">~ $</span> cat ./about.md
                        </motion.p>
                        <motion.h2 variants={item}>
                            I turn <span className="gradient-text">complex problems</span> into
                            scalable software — and I've been doing it for{' '}
                            <span className="gradient-text">5+ years</span> across full-stack,
                            data engineering, and <span className="gradient-text">machine learning</span>.
                        </motion.h2>
                        <motion.p className="intro-note" variants={item}>
                            I work where product thinking, reliable software, and applied
                            intelligence meet—taking ideas from ambiguous first sketch to
                            production systems people can trust.
                        </motion.p>
                        <motion.div variants={item}>
                            <a
                                className="resume-btn mono"
                                href="https://drive.google.com/file/d/1XkLsenUxv9C_qr54YeOaRR4PuCUJAXYc/view?usp=sharing"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <DownloadIcon /> resume.pdf
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="chapter numbers"
                    variants={section}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <motion.div className="num" variants={item}>
                        <h3 className="mono">5+</h3>
                        <p>years engineering software at Dashclicks, Wipro, JK Tyre &amp; Smart Controls</p>
                    </motion.div>
                    <motion.div className="num" variants={item}>
                        <h3 className="mono">M.S.</h3>
                        <p>Data Science — State University of New York (SUNY) at Buffalo</p>
                    </motion.div>
                    <motion.div className="num" variants={item}>
                        <h3 className="mono">40+</h3>
                        <p>projects shipped — apps, pipelines, ML systems, npm packages</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="chapter education-feature"
                    variants={section}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div className="education-copy">
                        <motion.p className="label mono" variants={item}>## education milestone</motion.p>
                        <motion.h3 variants={item}>
                            M.S. in Data Science,{' '}
                            <span className="gradient-text">University at Buffalo</span>.
                        </motion.h3>
                        <motion.p className="prose" variants={item}>
                            Graduate study deepened my foundation in machine learning,
                            statistics, data systems, and the discipline of turning research
                            into usable software.
                        </motion.p>
                    </div>
                    <motion.figure className="graduation-frame" variants={item}>
                        <img src={graduationPortrait} alt="Vaibhav Bansal at his University at Buffalo graduation" />
                        <figcaption className="mono">buffalo, ny · data science · graduated</figcaption>
                    </motion.figure>
                </motion.div>

                <motion.div
                    className="chapter journey"
                    variants={section}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <motion.p className="label mono" variants={item}>## the work</motion.p>
                    <motion.p className="prose" variants={item}>
                        I've architected and deployed scalable full-stack applications and
                        data-engineering pipelines using Python, R, React, Node, SQL, Spark,
                        Docker, AWS, and Kubernetes. At Dashclicks and Wipro I sharpened
                        software development, ML engineering, MLOps automation, and CI/CD
                        workflows — always aimed at measurable business impact.
                    </motion.p>
                    <motion.p className="label mono second" variants={item}>## off duty</motion.p>
                    <motion.p className="prose" variants={item}>
                        Adventure-sports enthusiast, tennis player, and a compulsive reader
                        of tech blogs and community forums. English · Hindi · French.
                        Based in Buffalo, NY — roots in India.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="chapter feature"
                    variants={section}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div className="feature-copy">
                        <motion.p className="label mono" variants={item}>## featured — times square, nyc</motion.p>
                        <motion.h3 variants={item}>
                            An ML project that ended up on a{' '}
                            <span className="gradient-text">New York billboard</span>.
                        </motion.h3>
                        <motion.p className="prose" variants={item}>
                            Hospital efficiency with XGBoost — cleaning, modeling,
                            predictions. Ranked #1 and featured in Times Square.
                        </motion.p>
                    </div>
                    <motion.div className="feature-media" variants={item}>
                        <video
                            src="https://res.cloudinary.com/vaibhav-codexpress/video/upload/v1717225096/VaibhavBansal_TimeSquare_h3gbbc.mp4"
                            autoPlay
                            muted
                            loop
                            controls
                            playsInline
                        />
                    </motion.div>
                </motion.div>
            </AboutStyled>
        </MainLayout>
    );
}

const AboutStyled = styled.section`
    .term-line{
        font-size: .85rem;
        color: var(--font-light-color);
        margin-bottom: 1.6rem;
        .prompt{
            color: var(--primary-color);
            font-family: var(--font-mono);
        }
    }

    .chapter{
        padding: clamp(2.6rem, 6vw, 4.5rem) 0;
        border-bottom: 1px solid var(--glass-border);
        &:last-child{
            border-bottom: none;
        }
    }

    .intro-grid{
        display: grid;
        grid-template-columns: minmax(250px, 22rem) minmax(0, 1fr);
        gap: clamp(2.5rem, 5vw, 4.5rem);
        align-items: center;
        padding-top: 2.5rem;

        @media screen and (max-width: 850px){
            grid-template-columns: 1fr;
        }

        .portrait-frame{
            position: relative;
            width: min(100%, 22rem);
            aspect-ratio: 1;
            margin: 0;
            align-self: center;

            &::before{
                content: "";
                position: absolute;
                inset: 8%;
                border-radius: 50%;
                background: var(--primary-glow);
                filter: blur(42px);
                opacity: .5;
            }

            img{
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                border-radius: 18px;
                filter: saturate(.9) contrast(1.03);
                -webkit-mask-image: radial-gradient(ellipse 72% 74% at 50% 46%, #000 62%, transparent 100%);
                mask-image: radial-gradient(ellipse 72% 74% at 50% 46%, #000 62%, transparent 100%);
            }

            figcaption{
                position: relative;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: .45rem;
                margin-top: .75rem;
                text-align: center;

                span{
                    color: var(--primary-color);
                    font-family: var(--font-mono);
                    font-size: .62rem;
                    letter-spacing: .07em;
                    text-transform: uppercase;

                    &:not(:last-child)::after{
                        content: " · ";
                        color: var(--font-light-color);
                    }
                }
            }

            @media screen and (max-width: 850px){
                width: min(75vw, 18rem);
                justify-self: center;
            }
        }

        .intro-copy{
            align-self: center;
        }

        h2{
            color: var(--white-color);
            font-size: clamp(1.8rem, 3vw, 2.65rem);
            font-weight: 600;
            line-height: 1.24;
            letter-spacing: -0.02em;
            max-width: 58rem;
        }

        .intro-note{
            max-width: 41rem;
            margin-top: 1.5rem;
            font-size: 1rem;
            line-height: 1.8;
        }

        .resume-btn{
            display: inline-flex;
            align-items: center;
            gap: .5rem;
            margin-top: 2rem;
            padding: .7rem 1.5rem;
            border-radius: 10px;
            border: 1px solid var(--glass-border);
            color: var(--white-color);
            font-size: .85rem;
            font-weight: 500;
            transition: border-color .2s ease, transform .2s ease;
            svg{
                font-size: 1rem;
                color: var(--primary-color);
            }
            &:hover{
                border-color: var(--primary-color);
                transform: translateY(-2px);
            }
        }
    }

    .numbers{
        display: flex;
        gap: clamp(1.5rem, 5vw, 4rem);
        @media screen and (max-width: 760px){
            flex-direction: column;
            gap: 2rem;
        }
        .num{
            flex: 1;
            &:not(:first-child){
                border-left: 1px solid var(--glass-border);
                padding-left: clamp(1.5rem, 4vw, 3rem);
                @media screen and (max-width: 760px){
                    border-left: none;
                    padding-left: 0;
                    border-top: 1px solid var(--glass-border);
                    padding-top: 2rem;
                }
            }
            h3{
                font-size: clamp(2.6rem, 5vw, 4rem);
                font-weight: 700;
                color: var(--primary-color);
                line-height: 1;
                margin-bottom: .8rem;
            }
            p{
                font-size: .9rem;
                max-width: 16rem;
            }
        }
    }

    .label{
        font-size: .75rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
        &.second{
            margin-top: 2.5rem;
        }
    }

    .prose{
        font-size: clamp(1rem, 1.6vw, 1.15rem);
        line-height: 1.8;
        max-width: 46rem;
    }

    .feature{
        display: grid;
        grid-template-columns: 1.05fr .95fr;
        gap: clamp(1.5rem, 4vw, 3.5rem);
        align-items: center;
        @media screen and (max-width: 860px){
            grid-template-columns: 1fr;
        }

        h3{
            color: var(--white-color);
            font-size: clamp(1.4rem, 2.6vw, 2rem);
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: .9rem;
            max-width: 30rem;
        }
        .prose{
            font-size: .95rem;
        }
        .feature-media{
            video{
                width: 100%;
                max-height: 300px;
                object-fit: cover;
                border-radius: 16px;
                border: 1px solid var(--glass-border);
                display: block;
                box-shadow: 0 16px 44px rgba(0, 0, 0, .3);
            }
        }
    }

    .education-feature{
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(280px, 30rem);
        gap: clamp(1.5rem, 5vw, 4.5rem);
        align-items: center;

        @media screen and (max-width: 850px){
            grid-template-columns: 1fr;
        }

        h3{
            color: var(--white-color);
            font-size: clamp(1.7rem, 3vw, 2.5rem);
            line-height: 1.2;
            letter-spacing: -.025em;
            margin-bottom: 1rem;
        }

        .graduation-frame{
            position: relative;
            width: 100%;
            margin: 0 0 0 auto;
            overflow: hidden;
            border: 1px solid var(--glass-border);
            background: var(--glass-bg);
            clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);

            img{
                width: 100%;
                height: auto;
                display: block;
                object-fit: contain;
            }

            figcaption{
                position: absolute;
                left: 1rem;
                bottom: 1rem;
                padding: .45rem .7rem;
                border: 1px solid var(--glass-border);
                background: var(--nav-bg);
                color: var(--primary-color);
                font-size: .64rem;
                letter-spacing: .07em;
                text-transform: uppercase;
            }
        }
    }
`;

export default AboutPage;
