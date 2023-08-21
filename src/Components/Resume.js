import React from 'react';
import styled from 'styled-components';
import {InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import SmallTitle from '../Components/SmallTitle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import ResumeItem from '../Components/ResumeItem';

function Resume() {
    const briefcase = <BusinessCenterIcon />
    const school = <SchoolIcon />
    return (
        <ResumeStyled>
            <Title title={'Resume'} span={'resume'} />
            <InnerLayout>
                <div className="small-title">
                    <SmallTitle icon={briefcase} title={'Working Experience'} />
                </div>
                <div className="resume-content">
                    <ResumeItem 
                        year={'Sep 2021 - Present'} 
                        title={'Front-end Developer'}
                        subTitle={'Dashclicks India Ltd.'}
                        text={`I am an experienced web developer who has undertaken a multitude of significant projects. One noteworthy achievement is the development of a dynamic website builder utilizing the power of Grapes.js and React.js. I spearheaded a dedicated team of three talented individuals, and together, we meticulously crafted over 200,000 lines of code in just two months.
                        One of our crowning achievements during this period was the creation of a public npm package called "grapesjs-advance-components." This package empowers users to effortlessly construct their own websites using drag-and-drop functionality combined with a collection of advanced components. For added customization, users have the ability to tailor blocks and even introduce new ones, enabling them to craft stunning websites or even design sales promotion funnels.
                        Furthermore, I took the initiative to develop a dedicated payment widget for our company, seamlessly integrating it as a customizable block for users aiming to incorporate payment options into their websites.
                        My expertise also extends to Formio.js, where I have made meaningful modifications to the core formio.min.js file. By customizing and introducing novel features, I have elevated the capabilities of the form builder, enhancing its utility and versatility.
                        Additionally, my contributions to our company's private UI kit have been instrumental in enhancing our overall UI components. This collaborative effort has not only streamlined our internal processes but has also led to a more polished user experience.
                        Lastly, I've also embraced the capabilities of Draft.js, utilizing it to develop a robust fallback feature within our platform's editor. This forward-thinking approach ensures a seamless experience for users, even in situations where connectivity may be limited.
                        In summary, my diverse skill set, collaborative spirit, and dedication to innovation have been pivotal in driving impactful projects and advancing the technological landscape.               
                        `} 
                    />
                    <ResumeItem 
                        year={'Aug 2020 - Sep 2021'} 
                        title={'Project Engineer'}
                        subTitle={'Wipro Technologies India Ltd.'}
                        text={'I have developed Vantiv  parser, EMV parser, JIRA Worklog Application using python and Flask and is currently working with MX Payment Terminals. I have done training in Python, C++ and AWS'} 
                    />
                    <ResumeItem 
                        year={'May 2018 && May 2019'} 
                        title={'Front End Designer Industrial Intern'}
                        subTitle={'Smart Software Solutions'}
                        text={'Learned Data Structure and Algorithms in training. Worked on Web Technologies and Software programs for industrial applications. Worked as a Front-end intern on a Barcode Integration System.'} 
                    />
                    <ResumeItem 
                        year={'June 2018'} 
                        title={'Industrial Intern'}
                        subTitle={'J.K Tyre'}
                        text={'Worked in the IT sector in the database and worked on Oracle for handling data. Learned to work on Oracle in early traning. I had recieved a tranining completion certficate from the organization '} 
                    />
                    <ResumeItem 
                        year={'June 2017'} 
                        title={'Industrial Intern'}
                        subTitle={'E-Biz Technocrats'}
                        text={'Worked and did training Web development.I have completed two projects using i.e. Online Newspaper and Blog management project using HTML,CSS AJAX, SQL, JAVASCRIPT, JQUERY and PHP'} 
                    />
                </div>
                <div className="small-title u-small-title-margin">
                    <SmallTitle icon={school} title={'Educational Qualifications'} />
                </div>
                <div className="resume-content ">
                    <ResumeItem 
                        year={'2016 - 2020'} 
                        title={'Computer Science Degree'}
                        subTitle={'VIT University India'}
                        text={'I had completed my B.Tech degree with CGPA - 8.62. '} 
                    />
                    <ResumeItem 
                        year={'2013 - 2015'} 
                        title={'Senior High School'}
                        subTitle={'Pragati Vidya Peeth'}
                        text={'I had completed my High School with 71% in 12th standard.'} 
                    />
                    <ResumeItem 
                        year={'2009 - 2012'} 
                        title={'High School'}
                        subTitle={'St. Pauls School'}
                        text={'I had completed my 10th standard with  CGPA - 9.6.'} 
                    />
                     <ResumeItem 
                        year={'1999 - 2008'} 
                        title={'Primary School'}
                        subTitle={'Wendy School Junior College'}
                        text={'I had consistently performed well in my academics.'} 
                    />
                </div>
            </InnerLayout>
        </ResumeStyled>    
    )
}

const ResumeStyled = styled.section`
    .small-title{
        padding-bottom: 3rem;
    }
    .u-small-title-margin{
        margin-top: 4rem;
    }

    .resume-content{
        border-left: 2px solid var(--border-color);
    }
`;
export default Resume
