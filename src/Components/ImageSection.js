import React from 'react'
import styled from 'styled-components';
// import resume from '../img/resume.jpg';
// import resumeLight from '../img/vaibhavphoto.png';
import resumeSvg from '../img/vb.svg';
import resumeSvgDark from '../img/vb-main2.svg';
import PrimaryButton from './PrimaryButton';

function ImageSection({theme}) {
    return (
        <ImageSectionStyled>
            <div className="left-content">
                <img height="60%" width="100%" src={theme === 'light-theme' ? resumeSvg : resumeSvgDark} alt="profile_photo"/>
            </div>
            <div className="right-content">
                <h4>I am <span>Vaibhav Bansal</span></h4>
                <h2>Front-End Developer | 3+ Years of Experience</h2>
                <p className="paragraph">
                    I am Vaibhav Bansal, a dedicated Software Developer with over 3+ years of valuable experience. Currently, pursuing Master's in Engineering Science in Data Science in State UniversIty New York (SUNY) at Buffalo.   My professional journey includes significant experience at leading organizations like Dashclicks India Ltd , Wipro, JK Tyre, Smart Controls India, where I developed my expertise in software development. Throughout my journey, I've remained committed to continuous skill enhancement and professional growth. My confidence stems from the ability to generate innovative ideas that drive substantial organizational advancement. Beyond coding, I'm passionate about adventure sports, lawn tennis, and staying updated with the latest technology blogs.
                </p>
                
                <div className="about-info">
                    <div className="info-title">
                        <p>Full Name</p>
                        <p>Age</p>
                        <p>Nationality </p>
                        <p>Languages </p>
                        <p>Location</p>
                        <p>Profile</p>
                    </div>
                    <div className="info">
                        <p>: Vaibhav Bansal</p>
                        <p>: 27</p>
                        <p>: Indian </p>
                        <p>: English, Hindi, French </p>
                        <p>: Buffalo, New York, United States</p>
                        <p>: Aspiring Data Scientist | Software Developer</p>
                    </div>
                </div>
                <PrimaryButton title={'Download Cv'} />
            </div>
        </ImageSectionStyled>
    )
}


const ImageSectionStyled = styled.div`
    margin-top: 5rem;
    display: flex;
    @media screen and (max-width:1000px){
        flex-direction: column;
        .left-content{
            margin-bottom: 2rem;
        }
        .right-content{
            .paragraph{
                text-align:left;
            }
        }
    }
    .left-content{
        width: 100%;
        img{
            width: 95%;
            
        }
    }
    .right-content{
        width: 100%;
        h4{
            font-size: 2rem;
            color: var(--white-color);
            span{
                font-size: 2rem;
            }
        }
        .paragraph{
            padding: 1rem 0;
            text-align:justify;
        }
        .about-info{
            display: flex;
            padding-bottom: 1.4rem;
            .info-title{
                padding-right: 3rem;
                p{
                    font-weight: 600;
                }
            }
            .info-title, .info{
                p{
                    padding: .3rem 0;
                }
            }
        }
    }
`;
export default ImageSection;
