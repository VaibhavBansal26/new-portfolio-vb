import React from 'react';
import styled from 'styled-components';

function Button({filter, button}) {
    return (
        <ButtonsStyled>
            {
                button.map((but, i) =>{
                    return <ButtonStyled key={`${i}-${but}`} onClick={() => filter(but)}>
                        {but}
                    </ButtonStyled>
                })
            }
        </ButtonsStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: 1px solid var(--border-color);
    background-color: var(--background-dark-grey);
    padding: .45rem 1.2rem;
    font-size: .9rem;
    font-weight: 600;
    color: var(--font-light-color);
    cursor: pointer;
    transition: all .25s ease-in-out;
    margin-bottom: .6rem;
    border-radius: 2rem;
    &:active, &:focus{
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--on-primary);
    }
    &:hover{
        border-color: var(--primary-color);
        color: var(--primary-color);
        transform: translateY(-1px);
    }

    &:not(:last-child){
        margin-right: .6rem;
    }
`;
const ButtonsStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 80%;
    margin: 2.4rem auto;
`;
export default Button;
