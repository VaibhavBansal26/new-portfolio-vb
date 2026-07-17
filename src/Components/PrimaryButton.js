import React from 'react'
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';

function PrimaryButton({title}) {
    return (
        <PrimaryButtonStyled>
            <DownloadIcon />
            <a href="https://drive.google.com/file/d/16RVmz7PSKI6z7hhHtsfgoH-s3QkNuDU2/view?usp=sharing" download="VaibhavBansal_Resume.pdf">{title}</a>
        </PrimaryButtonStyled>
    )
}

const PrimaryButtonStyled = styled.div`
    background-color: var(--primary-color);
    padding: .8rem 2.2rem;
    color: var(--on-primary);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    border-radius: 8px;
    font-size: .95rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    position: relative;
    transition: transform .2s ease-in-out, box-shadow .25s ease-in-out, background-color .25s ease-in-out;
    a{
        color: var(--on-primary);
        font-weight: 700;
    }
    svg {
        vertical-align: middle;
    }
    &:hover{
        transform: translateY(-2px);
        box-shadow: 0 8px 25px var(--primary-glow);
        background-color: var(--primary-color-light);
    }
    &:active{
        transform: translateY(0);
    }
`;
export default PrimaryButton;
