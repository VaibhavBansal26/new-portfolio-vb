import React from 'react'
import styled from 'styled-components';

function Title({title, span}) {
    return (
        <TitleStyled>
            <p className="eyebrow">{span}</p>
            <h2>{title}</h2>
        </TitleStyled>
    )
}

const TitleStyled = styled.div`
    position: relative;
    padding-bottom: 1rem;

    .eyebrow{
        display: inline-flex;
        align-items: center;
        gap: .5rem;
        font-size: .8rem;
        font-weight: 600;
        letter-spacing: .18em;
        text-transform: uppercase;
        color: var(--primary-color);
        margin-bottom: .6rem;
        &::before{
            content: "";
            display: inline-block;
            width: 2rem;
            height: 2px;
            border-radius: 2px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-2));
        }
    }

    h2{
        color: var(--white-color);
        font-size: clamp(2.1rem, 4vw, 3rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        line-height: 1.1;
    }
`;

export default Title;
