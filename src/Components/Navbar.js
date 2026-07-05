import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PaletteIcon from '@mui/icons-material/Palette';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const themes = [
    { id: 'dark-theme', label: 'dark', dot: '#2DE0A5' },
    { id: 'light-theme', label: 'light', dot: '#059669' },
    { id: 'hp-theme', label: 'harry potter', dot: '#D3A625' },
    { id: 'ironman-theme', label: 'iron man', dot: '#E23636' },
    { id: 'netflix-theme', label: 'netflix', dot: '#E50914' },
    { id: 'got-theme', label: 'game of thrones', dot: '#A8D7E8' },
];

const links = [
    { to: '/', label: 'home' },
    { to: '/about', label: 'about' },
    { to: '/resume', label: 'resume' },
    { to: '/portfolios', label: 'work' },
    { to: '/blogs', label: 'blogs' },
    { to: '/certification', label: 'certs' },
    { to: '/contact', label: 'contact' },
];

function Navbar({ theme, setTheme }) {
    const [open, setOpen] = useState(false);
    const [themeMenu, setThemeMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <NavbarStyled className={scrolled ? 'scrolled' : ''}>
                <div className="inner">
                    <NavLink to="/" className="logo" aria-label="Home">
                        <span className="tag">&lt;</span>vb<span className="tag">&nbsp;/&gt;</span>
                    </NavLink>

                    <ul className="links">
                        {links.map((l, i) => (
                            <li key={l.to}>
                                <NavLink to={l.to} end={l.to === '/'}>
                                    <span className="num">0{i + 1}.</span>
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="availability mono">
                        <span className="signal" />
                        <div>
                            <strong>available for work</strong>
                            <p>AI engineering · full-stack</p>
                        </div>
                    </div>

                    <div className="actions">
                        <div className="theme-picker">
                            <button
                                className="icon-btn"
                                onClick={() => setThemeMenu(!themeMenu)}
                                aria-label="Choose theme"
                                aria-expanded={themeMenu}
                            >
                                <PaletteIcon />
                            </button>
                            {themeMenu && (
                                <>
                                    <div className="backdrop" onClick={() => setThemeMenu(false)} />
                                    <ul className="theme-menu">
                                        {themes.map((t) => (
                                            <li key={t.id}>
                                                <button
                                                    className={`mono ${theme === t.id ? 'current' : ''}`}
                                                    onClick={() => { setTheme(t.id); setThemeMenu(false); }}
                                                >
                                                    <span className="dot" style={{ background: t.dot }} />
                                                    {t.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                        <span className="theme-label mono">theme</span>
                        <div className="theme-swatches" aria-label="Quick theme selection">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    className={theme === t.id ? 'selected' : ''}
                                    style={{ '--swatch': t.dot }}
                                    onClick={() => setTheme(t.id)}
                                    aria-label={`Use ${t.label} theme`}
                                    title={t.label}
                                />
                            ))}
                        </div>
                        <button
                            className="icon-btn menu-btn"
                            onClick={() => setOpen(true)}
                            aria-label="Open menu"
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </NavbarStyled>

            <MobileMenuStyled className={open ? 'open' : ''}>
                <button
                    className="close-btn"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                >
                    <CloseIcon />
                </button>
                <ul>
                    {links.map((l, i) => (
                        <li key={l.to} style={{ transitionDelay: `${0.05 * i + 0.1}s` }}>
                            <NavLink to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}>
                                <span className="num">0{i + 1}.</span>
                                {l.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </MobileMenuStyled>
        </>
    );
}

const NavbarStyled = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: transparent;
    border-bottom: 1px solid transparent;
    backdrop-filter: blur(18px) saturate(1.4);
    -webkit-backdrop-filter: blur(18px) saturate(1.4);
    transition: background-color .3s ease, border-color .3s ease, box-shadow .3s ease;

    &.scrolled{
        background: var(--nav-bg);
        border-bottom: 1px solid var(--glass-border);
        box-shadow: 0 8px 30px rgba(0, 0, 0, .15);
    }

    .inner{
        max-width: 76rem;
        margin: 0 auto;
        height: 4.2rem;
        padding: 0 clamp(1.2rem, 4vw, 3rem);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .logo{
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: 1.05rem;
        color: var(--white-color);
        letter-spacing: -0.03em;
        white-space: nowrap;
        .tag{
            color: var(--primary-color);
            font-family: var(--font-mono);
            font-weight: 500;
        }
        &:hover .tag{
            text-shadow: 0 0 12px var(--primary-glow);
        }
    }

    .links{
        display: flex;
        align-items: center;
        gap: clamp(.6rem, 1.8vw, 1.7rem);
        li a{
            display: inline-flex;
            align-items: baseline;
            gap: .35rem;
            font-family: var(--font-mono);
            font-size: .8rem;
            font-weight: 500;
            color: var(--font-light-color);
            padding: .35rem 0;
            position: relative;
            transition: color .2s ease;
            .num{
                font-family: var(--font-mono);
                font-size: .68rem;
                color: var(--primary-color);
                opacity: .85;
            }
            &::after{
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0;
                height: 1.5px;
                background: var(--primary-color);
                transition: width .25s ease;
            }
            &:hover{
                color: var(--white-color);
            }
            &.active{
                color: var(--white-color);
                &::after{
                    width: 100%;
                }
            }
        }
    }

    .actions{
        display: flex;
        align-items: center;
        gap: .3rem;
    }

    .availability{
        display: none;
    }

    .theme-label{
        margin-left: .45rem;
        color: var(--font-light-color);
        font-size: .62rem;
        letter-spacing: .08em;
        text-transform: uppercase;
    }

    .theme-swatches{
        display: flex;
        align-items: center;
        gap: .55rem;

        button{
            width: .68rem;
            height: .68rem;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: var(--swatch);
            box-shadow: 0 0 0 1px var(--glass-border);
            cursor: pointer;
            transition: transform .2s ease, box-shadow .2s ease;

            &:hover{
                transform: scale(1.2);
            }

            &.selected{
                box-shadow:
                    0 0 0 2px var(--background-dark-color),
                    0 0 0 3px var(--swatch),
                    0 0 12px var(--swatch);
            }
        }
    }

    .icon-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 8px;
        border: 1px solid var(--glass-border);
        background: transparent;
        color: var(--font-light-color);
        cursor: pointer;
        transition: color .2s ease, border-color .2s ease, background-color .2s ease;
        svg{
            font-size: 1.1rem;
        }
        &:hover{
            color: var(--primary-color);
            border-color: var(--primary-color);
            background: var(--background-light-color-2);
        }
    }

    .menu-btn{
        display: none;
    }

    .theme-picker{
        position: relative;
        .backdrop{
            position: fixed;
            inset: 0;
            z-index: 1;
        }
        .theme-menu{
            position: absolute;
            top: calc(100% + .6rem);
            right: 0;
            z-index: 2;
            min-width: 11rem;
            padding: .4rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            background: var(--nav-bg);
            backdrop-filter: blur(20px) saturate(1.4);
            -webkit-backdrop-filter: blur(20px) saturate(1.4);
            box-shadow: 0 16px 44px rgba(0, 0, 0, .35);
            li button{
                display: flex;
                align-items: center;
                gap: .6rem;
                width: 100%;
                padding: .5rem .7rem;
                border: none;
                border-radius: 8px;
                background: transparent;
                color: var(--font-light-color);
                font-size: .8rem;
                cursor: pointer;
                transition: background-color .15s ease, color .15s ease;
                .dot{
                    width: .6rem;
                    height: .6rem;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                &:hover{
                    background: var(--background-light-color-2);
                    color: var(--white-color);
                }
                &.current{
                    color: var(--primary-color);
                    background: var(--background-light-color-2);
                }
            }
        }
    }

    @media screen and (max-width: 900px){
        .links{
            display: none;
        }
        .menu-btn{
            display: flex;
        }
        .theme-label,
        .theme-swatches{
            display: none;
        }
    }

    @media screen and (max-width: 1100px){
        .theme-label,
        .theme-swatches{
            display: none;
        }
    }

`;

const MobileMenuStyled = styled.div`
    position: fixed;
    inset: 0;
    z-index: 60;
    background: var(--nav-bg);
    backdrop-filter: blur(24px) saturate(1.4);
    -webkit-backdrop-filter: blur(24px) saturate(1.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s ease, visibility .3s ease;

    &.open{
        opacity: 1;
        visibility: visible;
        li{
            opacity: 1;
            transform: translateY(0);
        }
    }

    .close-btn{
        position: absolute;
        top: 1.3rem;
        right: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 10px;
        border: 1px solid var(--glass-border);
        background: var(--glass-bg);
        color: var(--white-color);
        cursor: pointer;
    }

    ul{
        text-align: left;
        li{
            opacity: 0;
            transform: translateY(14px);
            transition: opacity .35s ease, transform .35s ease;
            a{
                display: flex;
                align-items: baseline;
                gap: .8rem;
                font-family: var(--font-mono);
                font-size: 1.7rem;
                font-weight: 600;
                padding: .6rem 2rem;
                color: var(--white-color);
                .num{
                    font-family: var(--font-mono);
                    font-size: .95rem;
                    color: var(--primary-color);
                }
                &.active,
                &:hover{
                    color: var(--primary-color);
                }
            }
        }
    }
`;

export default Navbar;
