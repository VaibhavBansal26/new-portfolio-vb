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
                                width={'80%'}
                                text={'80%'}
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
                                width={'75%'}
                                text={'75%'}
                            />
                            </div>
                        </InnerLayoutSingle>
                    </div>
                    <SkillSphere theme={theme}/>
                </div>
                <InnerLayout>
                    {/* <div className="skills">
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
                            title={'AI/ML'}
                            width={'70%'}
                            text={'70%'}
                        />
                    </div> */}
                    <div>
                        {/* <br/> <br/> */}
                        <div>
                            <span className="seo-heading">Other Skills:</span><br/>
                            <p className="seo-link"><br/>
                                MongoDB, Docker, Artificial Intelligence / Machine Learning, MySQL, PostgreSQL JAVA, C++, Adobe Photoshop, Firebase, NPM, Git
                                SQLite3, Streamlit, Mlflow, DagsHub, Apache Cassandra, Airflow, ETL Pipelines, System Design, AWS Athena, AWS Glue, S3, AWS Redshift, 
                                JIRA, Redis, Apache Kafka, Snowflake, Python, Zookeeper, Apache Spark, Kubernetes.
                            </p><br/>
                            <span className="seo-heading">Third Party Libraries:</span><br/><br/>
                            <p className="seo-link">
                                React-Bootstrap, Material UI, Styled Components, Tailwind CSS, Grapes JS, Formio JS
                            </p><br/>
                            <div>
                            <p className="seo-heading">Published NPM Package:</p><br/>
                            <p>
                                <a href="https://www.npmjs.com/package/grapesjs-advance-components" className="seo-link">
                                Grapesjs Advance Components
                                </a>
                                <br/>
                                {/* <br/>
                                <i className="seo-note seo-link" style={{fontSize:'12px',border:'1px solid white',padding:'10px',marginTop:'10px'}}>
                                npm install grapesjs-advance-components
                                </i> */}
                            </p><br/>
                            <p className="seo-heading">Published Research Paper:</p><br/>
                            <p>
                                <a href="https://link.springer.com/article/10.1007/s42452-020-2815-z" className="seo-link">
                                Obstacle Avoidance Using Stereo Vision and Depth Maps for Visual Aid Devices
                                </a>
                                <br />
                                <i className="seo-note seo-link">
                                Springer Natural Applied Sciences, Switzerland AG 2020 |{' '}
                                <a href="https://doi.org/10.1007/s42452-020-2815-z" className="seo-note seo-link">
                                    https://doi.org/10.1007/s42452-020-2815-z
                                </a>
                                </i>
                                {/* <br/>
                                <br/> */}
                                {/* <PrimaryButton title={'Download Paper'} /> */}
                            </p><br/>
                            <p className="seo-heading">LeetCode Profile:</p><br/>
                            <p>
                                <a href="https://leetcode.com/vaibhav_bansal26/" className="seo-link">
                                <img src={`https://leetcard.jacoblin.cool/vaibhav_bansal26?theme=${theme === 'light-theme' ? 'light' : 'dark'}&font=Gowun%20Batang&ext=heatmap&border=0`} alt="leetcode"/>
                                </a>
                                <br />
                            </p>
                            </div>
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
