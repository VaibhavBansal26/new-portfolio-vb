import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import { MainLayout } from '../styles/Layouts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function NotFoundPage() {
    usePageTitle('404');
    return (
        <MainLayout>
            <NotFoundStyled>
                <p className="code mono">404</p>
                <h2>Page not found.</h2>
                <p className="message">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="home-link mono">
                    back to home <ArrowForwardIcon />
                </Link>
            </NotFoundStyled>
        </MainLayout>
    );
}

const NotFoundStyled = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 50vh;
    padding: 4rem 1rem;

    .code {
        font-size: clamp(5rem, 15vw, 10rem);
        font-weight: 800;
        line-height: 1;
        background: linear-gradient(100deg, var(--primary-color), var(--accent-2));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    h2 {
        margin-top: 1rem;
        color: var(--white-color);
        font-size: clamp(1.5rem, 3vw, 2.2rem);
        font-weight: 700;
    }

    .message {
        margin-top: 0.8rem;
        max-width: 28rem;
        font-size: 1rem;
    }

    .home-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 2rem;
        padding: 0.75rem 1.5rem;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--on-primary);
        background: linear-gradient(120deg, var(--primary-color), var(--accent-2));
        box-shadow: 0 4px 24px var(--primary-glow);
        transition: transform 0.2s ease, box-shadow 0.25s ease;

        svg {
            font-size: 1rem;
            transition: transform 0.2s ease;
        }

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 34px var(--primary-glow);
            svg {
                transform: translateX(3px);
            }
        }
    }
`;

export default NotFoundPage;
