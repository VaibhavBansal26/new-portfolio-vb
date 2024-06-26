import React from 'react'
import styled from 'styled-components';

function PrimaryButton({title}) {
    return (
        <PrimaryButtonStyled>
            <a href="https://drive.google.com/file/d/1h9ZCBj3HZy2XSi5jyVRv6stemZ5Q4RWi/view?usp=drive_link" download="VaibhavBansal_Resume.pdf">{title}</a>
        </PrimaryButtonStyled>
    )
}

const PrimaryButtonStyled = styled.div`
    background-color: var(--primary-color);
    padding: .8rem 2.5rem;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: inherit;
    text-transform: uppercase;
    position: relative;
    transition: all .4s ease-in-out;
    &::after{
        content: "";
        position: absolute;
        width: 0;
        height: .2rem;
        transition: all .4s ease-in-out;
        left: 0;
        bottom: 0;
        opacity: .7;
    }
    &:hover::after{
        width: 100%;
        background-color: var(--white-color);
    }
`;
export default PrimaryButton;
