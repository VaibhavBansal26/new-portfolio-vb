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
    border: none;
    background-color: var(--background-light-color-2);
    padding: .4rem 1rem;
    font-size: inherit;
    color: var(--white-color);
    cursor: pointer;
    transition: all .4s ease-in-out;
    margin-bottom: .6rem;
    border-radius:5px;
    &:active ,&:focus{
        background-color: var(--primary-color);
    }
    &:hover{
        background-color: var(--primary-color);
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
