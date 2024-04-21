import React from 'react';
import styled from 'styled-components';
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
      {menuItem.map((item) => (
        <div className="grid-item" key={item.id}>
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
            <h6>{item.title}</h6>
            <p>{item.text}</p>
          </div>
        </div>
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
    background-color:  var(--background-dark-grey);;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.03);
    }
    &:hover .overlay {
      opacity: 0.8;
      transform: scale(1.03);
    }
    .portfolio-content {
      h6, p {
        padding: 0.5rem;
        font-size: 0.9rem;
      }
      h6 {
        font-weight: bold;
        color: var(--primary-color)
      }
      .portfolio-image {
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
      }
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgb(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      a {
        display: inline-flex;
        margin: 0 10px;
        color: white;
        font-size: 2rem;
        transition: transform 0.3s ease;
        &:hover {
          transform: scale(1.1);
        }
        svg {
          transition: color 0.3s ease;
          &:hover {
            color: #6cc644; /* Or any color you prefer */
            transform: scale(1.03)
          }
        }
      }
    }
  }
`;

export default Menu;
