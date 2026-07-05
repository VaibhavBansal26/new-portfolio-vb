import React from 'react'
import styled from 'styled-components';

function ServiceCard({image, title, paragraph}) {
    return (
        <ServiceCardStyled >
            <div className="container">
                <img src={image} alt="image_name"/>
                <h4>{title}</h4>
                <p>{paragraph}</p>
            </div>
        </ServiceCardStyled >
    )
}

const ServiceCardStyled = styled.div`
    background-color: var(--background-dark-grey);
    border: 1px solid var(--border-color);
    border-top: 4px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    transition: transform .25s ease-in-out, border-color .25s ease-in-out, box-shadow .25s ease-in-out;
    &:hover{
        border-top-color: var(--primary-color);
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, .2);
    }
    .container{
        padding: 1.5rem;
        h4{
            color: var(--white-color);
            font-size: 1.4rem;
            font-weight: 700;
            padding: 1rem 0;
            position: relative;
            &::after{
                content: "";
                width: 3rem;
                background-color: var(--primary-color);
                height: 3px;
                position: absolute;
                left: 0;
                bottom: 0;
                border-radius: 10px;
            }
        }

        p{
            padding: .8rem 0;
            line-height: 1.7;
        }
    }
`;

export default ServiceCard;
