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
                        year={'2020 - Present'} 
                        title={'Project Engineer'}
                        subTitle={'Wipro Tech India Ltd.'}
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
