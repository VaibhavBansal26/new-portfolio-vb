import React from 'react';
import usePageTitle from '../hooks/usePageTitle';
import Skills from '../Components/Skills';
import { MainLayout} from '../styles/Layouts';
import Resume from '../Components/Resume';

function ResumePage({theme}) {
    usePageTitle('Resume');
    return (
        <MainLayout>
            <Skills theme={theme} />
            <Resume />
        </MainLayout>
    )
}

export default ResumePage
