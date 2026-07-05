import React from 'react'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import avatar from '../img/avatar-light3-white.jpeg';
import avatarDark from '../img/avatar-light3-white.jpeg';
import avatarNew from '../img/avatar-new.png';

function Navigation({theme}) {
    const handleHover = () => {
        let nav_image = document.querySelector('.avatar img')
        nav_image.src = avatarNew
    }
    const handleChangeImage = () => {
        let nav_image = document.querySelector('.avatar img')
        nav_image.src = theme === 'light-theme' ? avatarDark : avatar
    }
    return (
        <NavigationStyled>
            <div className="avatar">
                <img src={theme === 'light-theme' ? avatarDark : avatar} alt="light-theme" onMouseOver={handleHover} onMouseOut={handleChangeImage}/>
            </div>
            <ul className="nav-items">
                <li className="nav-item">
                    <NavLink to="/" activeClassName="active-class" exact>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/about" activeClassName="active-class" exact>About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/resume" activeClassName="active-class" exact>Resume</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/portfolios" activeClassName="active-class" exact>Portfolio</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/blogs" activeClassName="active-class" exact>Blogs</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/certification" activeClassName="active-class" exact>Certification</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/contact" activeClassName="active-class" exact>Contact</NavLink>
                </li>
            </ul>
            <footer className="footer">
                <p><b>&copy; 2025 Vaibhav Bansal</b></p>
            </footer>
        </NavigationStyled>
    )
}

const NavigationStyled = styled.nav`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    border-right: 1px solid var(--border-color);
    .avatar{
        width: 100%;
        border-bottom: 1px solid var(--border-color);
        text-align: center;
        padding: 1.5rem 0;
        img{
            width: 60%;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            border: 3px solid var(--primary-color);
            box-shadow: 0 0 0 6px var(--background-light-color-2);
            transition: transform .3s ease-in-out, box-shadow .3s ease-in-out;
            &:hover{
                transform: scale(1.04);
                box-shadow: 0 0 25px var(--primary-glow);
            }
        }
    }

    .nav-items{
        width: 100%;
        text-align: center;
        .active-class,
        a.active{
            background-color: var(--background-light-color-2);
            color: var(--primary-color) !important;
            border-left: 3px solid var(--primary-color) !important;
        }
        li{
            display: block;
            a{
                display: block;
                padding: .55rem 0;
                position: relative;
                z-index: 10;
                text-transform: uppercase;
                transition: color .25s ease-in-out, background-color .25s ease-in-out;
                font-weight: 600;
                font-size: .85rem;
                letter-spacing: 2px;
                border-left: 3px solid transparent;
                &:hover{
                    cursor: pointer;
                    color: var(--primary-color);
                    background-color: var(--background-light-color-2);
                }
            }
        }
    }

    footer{
        border-top: 1px solid var(--border-color);
        width: 100%;
        p{
            padding: 1.3rem 0;
            font-size: .85rem;
            letter-spacing: .5px;
            display: block;
            text-align: center;
        }
    }
`;
export default Navigation;
