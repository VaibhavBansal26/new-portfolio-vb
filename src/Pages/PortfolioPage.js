import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import usePageTitle from '../hooks/usePageTitle';
import { MainLayout, InnerLayout } from '../styles/Layouts';
import Title from '../Components/Title';
import portfolios from '../data/portfolios';
import Menu from '../Components/Menu';
import Button from '../Components/Button';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const allButtons = ['All', ...new Set(portfolios.map((item) => item.category))];

function PortfoliosPage() {
    usePageTitle('Work');
    const [category, setCategory] = useState('All');
    const [query, setQuery] = useState('');

    const filter = (button) => setCategory(button);

    const menuItem = useMemo(() => {
        let items = portfolios;
        if (category !== 'All') {
            items = items.filter((item) => item.category === category);
        }
        const q = query.trim().toLowerCase();
        if (q) {
            items = items.filter(
                (item) =>
                    item.title?.toLowerCase().includes(q) ||
                    item.text?.toLowerCase().includes(q) ||
                    item.category?.toLowerCase().includes(q)
            );
        }
        return items;
    }, [category, query]);

    return (
        <MainLayout>
            <Title title={'Portfolio'} span={'portfolio'} />
            <PortfolioStyled>
                <InnerLayout>
                    <div className="search-bar">
                        <span className="prompt mono">~ $ grep -i</span>
                        <SearchIcon className="s-icon" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="search projects — title, tech, category…"
                            aria-label="Search projects"
                        />
                        {query && (
                            <button className="clear" onClick={() => setQuery('')} aria-label="Clear search">
                                <CloseIcon />
                            </button>
                        )}
                        <span className="count mono">{menuItem.length} match{menuItem.length === 1 ? '' : 'es'}</span>
                    </div>

                    <div className={'hide-on-mobile'}>
                        <Button filter={filter} button={allButtons} />
                    </div>

                    {menuItem.length > 0 ? (
                        <Menu menuItem={menuItem} />
                    ) : (
                        <p className="no-results mono">
                            <span className="prompt">~ $</span> grep: no matches found — try another keyword
                        </p>
                    )}
                </InnerLayout>
            </PortfolioStyled>
        </MainLayout>
    );
}

const PortfolioStyled = styled.section`
    .search-bar{
        display: flex;
        align-items: center;
        gap: .6rem;
        padding: .35rem .5rem .35rem 1.1rem;
        border: 1px solid var(--glass-border);
        border-radius: 999px;
        background: var(--glass-bg);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        max-width: 40rem;
        margin: 0 auto 1.5rem;
        transition: border-color .2s ease, box-shadow .2s ease;

        &:focus-within{
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px var(--background-light-color-2);
        }

        .prompt{
            font-size: .78rem;
            color: var(--primary-color);
            white-space: nowrap;
            @media screen and (max-width: 560px){
                display: none;
            }
        }

        .s-icon{
            font-size: 1.1rem;
            color: var(--font-light-color);
            flex-shrink: 0;
        }

        input{
            flex: 1;
            min-width: 0;
            border: none;
            outline: none;
            background: transparent;
            color: var(--white-color);
            font-size: .92rem;
            padding: .55rem 0;
            &::placeholder{
                color: var(--font-light-color);
                opacity: .6;
            }
        }

        .clear{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.8rem;
            height: 1.8rem;
            border: none;
            border-radius: 50%;
            background: var(--background-light-color-2);
            color: var(--font-light-color);
            cursor: pointer;
            flex-shrink: 0;
            svg{ font-size: .95rem; }
            &:hover{ color: var(--primary-color); }
        }

        .count{
            font-size: .7rem;
            color: var(--font-light-color);
            white-space: nowrap;
            padding-right: .6rem;
            @media screen and (max-width: 460px){
                display: none;
            }
        }
    }

    .no-results{
        text-align: center;
        padding: 4rem 1rem;
        font-size: .9rem;
        color: var(--font-light-color);
        .prompt{
            color: var(--primary-color);
            font-family: var(--font-mono);
        }
    }
`;

export default PortfoliosPage;
