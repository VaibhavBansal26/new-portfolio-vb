import React from 'react'
import styled from 'styled-components';

function SecondaryButton({title,onClick}) {
    return (
        <PrimaryButtonStyled onClick={onClick}>
            {title}
        </PrimaryButtonStyled>
    )
}

const PrimaryButtonStyled = styled.button`
    background-color: var(--primary-color);
    border: none;
    padding: .8rem 2.2rem;
    color: var(--on-primary);
    cursor: pointer;
    display: inline-block;
    border-radius: 8px;
    font-size: .95rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    position: relative;
    transition: transform .2s ease-in-out, box-shadow .25s ease-in-out, background-color .25s ease-in-out;
    &:hover{
        transform: translateY(-2px);
        box-shadow: 0 8px 25px var(--primary-glow);
        background-color: var(--primary-color-light);
    }
    &:active{
        transform: translateY(0);
    }
`;
export default SecondaryButton;
