import React from 'react'
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';

function ResumeBtn({title}) {
    return (
        <ResumeButtonStyled>
            <DownloadIcon />
            <a href="https://drive.google.com/file/d/16RVmz7PSKI6z7hhHtsfgoH-s3QkNuDU2/view?usp=sharing" download="VaibhavBansal_Resume.pdf">{title}</a>
        </ResumeButtonStyled>
    )
}

const ResumeButtonStyled = styled.div`
    background-color: transparent;
    padding: .8rem 2.5rem;
    color: var(--white-color);
    border: 2px solid var(--primary-color);
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
    transition: transform .2s ease-in-out, box-shadow .25s ease-in-out, background-color .25s ease-in-out, color .25s ease-in-out;
    svg {
        vertical-align: middle;
        color: var(--primary-color);
        transition: color .25s ease-in-out;
    }
    a{
        font-weight: 700;
        transition: color .25s ease-in-out;
    }
    &:hover{
        background-color: var(--primary-color);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px var(--primary-glow);
        a, svg{
            color: var(--on-primary);
        }
    }
    &:active{
        transform: translateY(0);
    }
`;
export default ResumeBtn;
