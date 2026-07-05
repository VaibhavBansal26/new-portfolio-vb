import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Edith from './Components/Edith';
import ThemeDecor from './Components/ThemeDecor';
import CursorGlow from './Components/CursorGlow';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ResumePage from './Pages/ResumePage';
import PortfolioPage from './Pages/PortfolioPage';
import BlogsPage from './Pages/BlogsPage';
import ContactPage from './Pages/ContactPage';
import CertificationPage from './Pages/CertificationPage';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('vb-theme') || 'dark-theme'
  );
  const location = useLocation();

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('vb-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <div className="aurora" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="grid-overlay" aria-hidden="true"></div>
      <CursorGlow />
      <ThemeDecor theme={theme} />

      <Navbar theme={theme} setTheme={setTheme} />

      <AnimatePresence mode="wait">
        <MainContentStyled
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage theme={theme} />} />
            <Route path="/about" element={<AboutPage theme={theme} />} />
            <Route path="/resume" element={<ResumePage theme={theme} />} />
            <Route path="/portfolios" element={<PortfolioPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/certification" element={<CertificationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </MainContentStyled>
      </AnimatePresence>

      <Edith />
    </div>
  );
}

const MainContentStyled = styled(motion.main)`
  position: relative;
  min-height: 100vh;
`;

export default App;
