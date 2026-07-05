import React from 'react'
import styled from 'styled-components';

function ProgressBar({title, width, text}) {
    return (
        <ProgressBarStyled>
            <h6>{title}</h6>
            <div className="progress-bar">
                <p>{text}</p>
                <div className="progress">
                    <span style={{width: width}}></span>
                </div>
            </div>
        </ProgressBarStyled>
    )
}

const ProgressBarStyled = styled.div`
    .progress-bar{
        display: flex;
        align-items: center;
        p{
            padding-right: 1.1rem;
        }
        .progress{
            position: relative;
            width: 100%;
            height: .45rem;
            border-radius: 1rem;
            overflow: hidden;
            background-color: var(--border-color);
            span{
                position: absolute;
                left: 0;
                bottom: 0;
                height: 100%;
                border-radius: 1rem;
                background: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
                transition: width .8s ease-in-out;
            }
        }
    }
`;

export default ProgressBar;
