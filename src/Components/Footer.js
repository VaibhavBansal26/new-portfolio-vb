import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
    return (
        <FooterStyled>
            <div className="inner">
                <div className="cta">
                    <p className="mono eyebrow">
                        <span className="prompt">~ $</span> git commit -m <span className="st">"let's work together"</span>
                    </p>
                    <h4>Have an idea? Let's ship it.</h4>
                    <Link to="/contact" className="footer-btn">get in touch</Link>
                </div>
                <div className="meta">
                    <p className="mono logo">
                        <span className="tag">&lt;</span>vb<span className="tag">&nbsp;/&gt;</span>
                    </p>
                    <div className="social-row">
                        <a href="https://github.com/VaibhavBansal26" aria-label="GitHub"><GithubIcon /></a>
                        <a href="https://www.linkedin.com/in/vaibhavbansal-profile/" aria-label="LinkedIn"><LinkedInIcon /></a>
                        <a href="mailto:vaibhav.bansal945@gmail.com" aria-label="Email"><EmailIcon /></a>
                    </div>
                    <p className="mono note">
                        © {new Date().getFullYear()} Vaibhav Bansal · built with React + framer-motion
                    </p>
                </div>
            </div>
        </FooterStyled>
    );
}

const FooterStyled = styled.footer`
    border-top: 1px solid var(--glass-border);
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    margin-top: 4rem;

    .inner{
        max-width: 76rem;
        margin: 0 auto;
        padding: 3rem clamp(1.2rem, 4vw, 3rem);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;
        @media screen and (max-width: 700px){
            flex-direction: column;
            align-items: flex-start;
        }
    }

    .eyebrow{
        font-size: .8rem;
        color: var(--font-light-color);
        margin-bottom: .6rem;
        .prompt{
            color: var(--primary-color);
            font-family: var(--font-mono);
        }
        .st{
            color: var(--primary-code-color-string);
            font-family: var(--font-mono);
        }
    }

    h4{
        color: var(--white-color);
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .footer-btn{
        display: inline-flex;
        padding: .7rem 1.5rem;
        border-radius: 10px;
        font-size: .9rem;
        font-weight: 600;
        color: var(--on-primary);
        background: linear-gradient(120deg, var(--primary-color), var(--accent-2));
        box-shadow: 0 4px 24px var(--primary-glow);
        transition: transform .2s ease, box-shadow .25s ease;
        &:hover{
            transform: translateY(-2px);
            box-shadow: 0 10px 34px var(--primary-glow);
        }
    }

    .meta{
        text-align: right;
        @media screen and (max-width: 700px){
            text-align: left;
        }
        .logo{
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--white-color);
            .tag{
                color: var(--primary-color);
                font-family: var(--font-mono);
            }
        }
        .social-row{
            display: flex;
            gap: .3rem;
            justify-content: flex-end;
            margin: .7rem 0;
            @media screen and (max-width: 700px){
                justify-content: flex-start;
            }
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2.2rem;
                height: 2.2rem;
                border-radius: 8px;
                color: var(--font-light-color);
                transition: color .2s ease, background-color .2s ease;
                svg{
                    font-size: 1.1rem;
                }
                &:hover{
                    color: var(--primary-color);
                    background: var(--background-light-color-2);
                }
            }
        }
        .note{
            font-size: .72rem;
            color: var(--font-light-color);
        }
    }
`;

export default Footer;
