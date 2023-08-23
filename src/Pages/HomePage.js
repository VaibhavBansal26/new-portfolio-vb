import React from 'react'
import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import GithubIcon from '@mui/icons-material/GitHub';
import YoutubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Particle from '../Components/Particle';
import iconRS from '../img/icons8-researchgate.svg';

function HomePage(props) {
    const {theme} = props;
    return (
        <HomePageStyled>
            <div className="particle-con">
                <Particle theme={theme}/>
            </div>
            <div className="typography">
                <h1>Hi, I'm <span>Vaibhav Bansal</span></h1>
                <p>
                    I am an Indian based Software developer and Data Science enthusiast. Currently working as Front-end Developer @ Dashclicks India Ltd.
                </p>
                <div className="icons">
                    <a href="https://www.facebook.com/vaibhavcoo" className="icon i-facebook">
                        <FacebookIcon />
                    </a>
                    <a href="https://github.com/VaibhavBansal26" className="icon i-github">
                        <GithubIcon />
                    </a>
                    <a href="https://www.youtube.com/channel/UCj5oKvqzKkYzPbXYbodKetQ" className="icon i-youtube">
                        <YoutubeIcon />
                    </a>
                    <a href="https://www.linkedin.com/in/vaibhav-bansal-1a41bab1/" className="icon i-linkedin">
                        <LinkedInIcon />
                    </a>
                    <a href="https://www.instagram.com/vaibhav.bansal945/" className="icon i-instagram">
                        <InstagramIcon />
                    </a>
                    <a href="https://www.researchgate.net/profile/Vaibhav-Bansal-6" className="icon i-researchgate">
                    <img src={iconRS} alt='reasearch gate' title='reasearch gate'/>
                    </a>
                </div>
            </div>
        </HomePageStyled>
    )
}

const HomePageStyled = styled.header`
    width: 100%;
    height: 100vh;
    position: relative;
   
    .typography{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 80%;

        .icons{
            display: flex;
            justify-content: center;
            margin-top: 1rem;
            .icon{
                border: 2px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all .4s ease-in-out;
                cursor: pointer;
                &:hover{
                    border: 2px solid var(--primary-color);
                    color: var(--primary-color);
                }
                &:not(:last-child){
                    margin-right: 1rem;
                }
                svg{
                    margin: .5rem;
                }
            }

            .i-youtube{
                &:hover{
                    border: 2px solid red;
                    color: red;
                }
            }
            .i-github{
                &:hover{
                    border: 2px solid #5F4687;
                    color: #5F4687;
                }
            }
            .i-linkedin{
                &:hover{
                    border: 2px solid blue;
                    color: blue;
                }
            }
            .i-instagram{
                &:hover{
                    border: 2px solid #d63031;
                    color: #d63031;
                }
            }
            .i-researchgate{
                &:hover{
                    border: 2px solid #a4acc4;
                    color: #a4acc4;
                }
            }
        }
    }
`;

export default HomePage;
