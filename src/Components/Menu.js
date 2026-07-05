import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GitHub from '@mui/icons-material/GitHub';
import YouTube from '@mui/icons-material/YouTube';
import Play from '@mui/icons-material/PlayArrowOutlined';

// const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

const Menu = ({ menuItem }) => {
  return (
    <MenuItemStyled>
      {menuItem.map((item, i) => (
        <motion.div
          className="grid-item"
          key={item.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: (i % 3) * 0.07, ease: 'easeOut' }}
        >
          <div className="portfolio-content">
            <div className="portfolio-image">
              <img src={item.image} alt={item.title} />
              <div className="overlay">
                {item.link1 && (
                  <a href={item.link1} target="_blank" rel="noreferrer">
                    <GitHub />
                  </a>
                )}
                {item.link2 && (
                  <a href={item.link2} target="_blank" rel="noreferrer">
                    <YouTube />
                  </a>
                )}
                {item.link3 && (
                  <a href={item.link3} target="_blank" rel="noreferrer">
                    <Play />
                  </a>
                )}
              </div>
            </div>
            <h3 className="portfolio-title">{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </motion.div>
      ))}
    </MenuItemStyled>
  );
};

const MenuItemStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  padding: 2rem;
  @media screen and (max-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .grid-item {
    background-color: var(--background-dark-grey);
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    &:hover {
        transform: translateY(-6px);
        border-color: var(--primary-color);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), 0 0 20px var(--primary-glow);
    }
    &:hover .overlay {
      opacity: 1;
    }
    &:hover .portfolio-image img {
      transform: scale(1.05);
    }
    .portfolio-content {
      .portfolio-title, p {
        padding: 0.35rem 0.9rem;
        font-size: 0.9rem;
      }
      .portfolio-title {
        padding-top: 0.9rem;
        font-weight: 700;
        font-size: 1rem;
        color: var(--white-color);
      }
      p {
        padding-bottom: 1rem;
        color: var(--font-light-color);
      }
      .portfolio-image {
        overflow: hidden;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
      }
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to top, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.55));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.25s ease;
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 1px solid rgba(248, 250, 252, 0.3);
        background: rgba(248, 250, 252, 0.08);
        margin: 0 10px;
        color: white;
        font-size: 2rem;
        transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        &:hover {
          transform: scale(1.12);
          border-color: var(--primary-color);
          color: var(--primary-color);
          svg {
            color: var(--primary-color);
          }
        }
      }
    }
  }
`;

export default Menu;
