import React, { useState } from 'react';
import {MainLayout, InnerLayout} from '../styles/Layouts';
import Title from '../Components/Title';
import portfolios from '../data/portfolios';
import Menu from '../Components/Menu';
import Button from '../Components/Button';

const allButtons = ['All', ...new Set(portfolios.map(item => item.category))]

function PortfoliosPage() {
    const [menuItem, setMenuItems] = useState(portfolios);
    const [button, setButtons] = useState(allButtons);

    const filter = (button) => {

        if(button === 'All'){
            setMenuItems(portfolios);
            return;
        }
        setButtons(allButtons)

        const filteredData = portfolios.filter(item => item.category === button);
        setMenuItems(filteredData);
    }
    return (
        <MainLayout>
            <Title title={'Portfolio'} span={'portfolio'} />
            <InnerLayout>
                <div className={window.innerWidth <= 768 ? "hide-on-mobile" : ""}>
                    <Button filter={filter} button={button} />
                </div>
                <Menu menuItem={menuItem} />
            </InnerLayout>
        </MainLayout>
    )
}

export default PortfoliosPage
