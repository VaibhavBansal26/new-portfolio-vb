import React from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';

function ResumeItem({year, title, subTitle, text, link,css}) {
    return (
        <ResumeItemStyled
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="left-content left">
                <p>{year}</p>
            </div>
            <div className={`right-content right${css}`}>
                <h5>{title}</h5>
                <a href={link} target='_blank' rel='noreferrer'><h6>{subTitle}</h6></a>
                <p>{text}</p>
            </div>
        </ResumeItemStyled>
    )
}

const ResumeItemStyled = styled(motion.div)`
    display: flex;
    @media screen and (max-width: 421px){
        p, h5, h6{
            font-size: 80%;
        }
    }
    &:not(:last-child){
        padding-bottom: 2.2rem;
    }
    .left-content{
        padding-left: 20px;
        padding-right: 20px;
        position: relative;
        &::before{
            content: "";
            position: absolute;
            left: -10px;
            top: 5px;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            border: 2px solid var(--primary-color);
            background-color: var(--background-dark-color);
            box-shadow: 0 0 8px var(--primary-glow);
        }
        p{
            display: inline-block;
            font-family: var(--font-mono);
            font-size: .78rem;
            letter-spacing: .04em;
            color: var(--primary-color);
            white-space: nowrap;
        }
    }
    @media screen and (max-width: 640px){
        .left-content{
            display: none;
        }
        .right-content, .right1{
            margin-left: 0 !important;
        }
    }
    .right0 {
        flex:1;
    }
    .right-content{
        position: relative;
        margin-left: 2.4rem;
        flex: 1;
        padding: 1.3rem 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--glass-border);
        background: var(--glass-bg);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: border-color .25s ease, transform .25s ease, box-shadow .25s ease;

        &:hover{
            border-color: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, .18);
        }

        h5{
            color: var(--white-color);
            font-size: 1.25rem;
            font-weight: 700;
            letter-spacing: -0.015em;
            padding-bottom: .25rem;
        }
        h6{
            padding-bottom: .6rem;
            font-size: .92rem;
            font-weight: 600;
            color: var(--primary-color);
        }
        p{
            font-size: .9rem;
            line-height: 1.75;
            max-width: 46rem;
        }
        @media screen and (max-width: 640px){
            margin-left: 1.4rem;
            padding: 1.1rem 1.2rem;
        }
    }
    .right1 {
        margin-left: 2.4rem;
        @media screen and (max-width: 640px){
            margin-left: 1.4rem;
        }
    }
    @media screen and (max-width: 421px){
        .right-content{
            padding:1rem 1rem;
            &::before{
                content: "";
                position: absolute;
                left: 0;
                top: 15px;
                height: 2px;
                width: 0rem;
                background-color: var(--border-color);
            }
        }
    }
`;
export default ResumeItem;

// width: 50%; in left content