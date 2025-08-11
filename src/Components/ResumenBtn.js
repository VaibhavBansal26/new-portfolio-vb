import React from 'react'
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';

function ResumeBtn({title}) {
    return (
        <ResumeButtonStyled>
            <DownloadIcon />
            <a href="https://drive.google.com/file/d/1hh1VZklc3sH2OXUOb6iNEx3Y49CkyuBR/view?usp=sharing" download="VaibhavBansal_Resume.pdf">{title}</a>
        </ResumeButtonStyled>
    )
}

const ResumeButtonStyled = styled.div`
    background-color: var(--primary-btn-color);
    padding: .8rem 3rem;
    color: var(--white-color);
    border: 2px solid var(--primary-btn-border-color);
    cursor: pointer;
    display: inline-block;
    border-radius: 4px;
    justify-content: space-between;
    font-size: inherit;
    font-weight: 900;
    text-transform: uppercase;
    position: relative;
    transition: all .4s ease-in-out;
    svg {
        vertical-align: middle;
        margin-right: 0 0.15rem;
    }
    a{
        font-weight: 900;
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
export default ResumeBtn;
