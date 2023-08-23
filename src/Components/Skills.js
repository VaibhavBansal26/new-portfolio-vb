import React from 'react'
import styled from 'styled-components';
import {InnerLayout, InnerLayoutSingle} from '../styles/Layouts';
import Title from '../Components/Title';
import ProgressBar from './ProgressBar';
import SkillSphere from './SkillSphere';
import './styles.css'

function Skills({theme}) {
    return (
        <SkillsStyled>
            
                <Title title={'Skills'} span={'skills'} />
                <div style={{display:'flex'}} className='skillMain'>
                    <div style={{width:'40%'}} className="skillText">
                        <InnerLayoutSingle>
                        <div className='skillsSingle'>
                            <ProgressBar 
                                title={'React JS'}
                                width={'75%'}
                                text={'75%'}
                            />
                            <ProgressBar 
                                title={'PYTHON'}
                                width={'85%'}
                                text={'85%'}
                            />
                            <ProgressBar 
                                title={'AWS'}
                                width={'60%'}
                                text={'60%'}
                            />
                            <ProgressBar 
                                title={'Node JS'}
                                width={'65%'}
                                text={'65%'}
                            />
                              <ProgressBar 
                                title={'Next JS'}
                                width={'70%'}
                                text={'70%'}
                            />
                            </div>
                        </InnerLayoutSingle>
                    </div>
                    <SkillSphere theme={theme}/>
                </div>
                <InnerLayout>
                    <div className="skills">
                        <ProgressBar 
                            title={'HTML5'}
                            width={'90%'}
                            text={'90%'}
                        />
                        <ProgressBar 
                            title={'CSS3'}
                            width={'90%'}
                            text={'90%'}
                        />
                        <ProgressBar 
                            title={'JAVASCRIPT'}
                            width={'70%'}
                            text={'70%'}
                        />
                        <ProgressBar 
                            title={'Next JS'}
                            width={'70%'}
                            text={'70%'}
                        />
                    </div>
                    <div>
                        <br/> <br/>
                        <div>
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>Other Skills:</span><br/>
                            <span style={{ color: '#a4acc4' }}><br/>
                                MongoDB, Docker, Artificial Intelligence / Machine Learning, MySQL, JAVA, C++, Adobe Photoshop, Firebase, NPM, Git
                            </span><br/><br/>
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>Third Party Libraries:</span><br/><br/>
                            <span style={{ color: '#a4acc4' }}>
                                React-Bootstrap, Material UI, Styled Components, Tailwind CSS, Grapes JS, Formio JS
                            </span><br/><br/>
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>Published NPM Package:</span><br/><br/>
                            <span style={{ color: '#a4acc4' }}>
                               <a href='https://www.npmjs.com/package/grapesjs-advance-components' target='_blank' rel="noreferrer">Grapesjs Advance Components</a>
                            </span><br/><br/>
                            <span style={{ color: '#fff', fontWeight: 'bold' }}>Published Research Paper:</span><br/><br/>
                            <span style={{ color: '#a4acc4' }}>
                               <a href='https://link.springer.com/article/10.1007/s42452-020-2815-z' target='_blank' rel="noreferrer">Obstacle avoidance using stereo vision and depth maps for visual aid devices</a><br/>
                               <i style={{ fontSize: '14px' }}>Springer Natural Applied Sciences, Switzerland AG 2020 | https://doi.org/10.1007/s42452-020-2815-z</i>
                            </span><br/>
                        </div>
                    </div>
                </InnerLayout>
        </SkillsStyled>
    )
}

const SkillsStyled = styled.section`
    .skills{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-row-gap: 2rem;
        grid-column-gap: 3rem;
        @media screen and (max-width: 700px){
            grid-template-columns: repeat(1, 1fr);
        }
    }
    .skillsSingle{
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-row-gap: 2rem;
        grid-column-gap: 3rem;
        @media screen and (max-width: 700px){
            grid-template-columns: repeat(1, 1fr);
        }
    }
`;

export default Skills;
