import React from 'react'
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';

function PrimaryButton({title}) {
    return (
        <PrimaryButtonStyled>
            <DownloadIcon />
            <a href="https://drive.google.com/file/d/10b3UnhI1tAdouk_Of5saq3f0EApTXVbk/view?usp=sharing" download="VaibhavBansal_Resume.pdf">{title}</a>
        </PrimaryButtonStyled>
    )
}

const PrimaryButtonStyled = styled.div`
    background-color: var(--primary-color);
    padding: .8rem 2.5rem;
    color: white;
    cursor: pointer;
    display: inline-block;
    border-radius: 4px;
    justify-content: center;
    font-size: inherit;
    text-transform: uppercase;
    position: relative;
    transition: all .4s ease-in-out;
    svg {
        vertical-align: middle;
    }
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
