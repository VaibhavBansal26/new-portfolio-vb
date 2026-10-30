import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';

const AboutPage = React.lazy(() => import('./Pages/AboutPage'));
const ResumePage = React.lazy(() => import('./Pages/ResumePage'));
const PortfolioPage = React.lazy(() => import('./Pages/PortfolioPage'));
const BlogsPage = React.lazy(() => import('./Pages/BlogsPage'));
const ContactPage = React.lazy(() => import('./Pages/ContactPage'));
const CertificationPage = React.lazy(() => import('./Pages/CertificationPage'));
const NotFoundPage = React.lazy(() => import('./Pages/NotFoundPage'));

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('vb-theme') || 'porcelain');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('vb-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="site-app">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="app-main">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .28, ease: 'easeOut' }}
          >
            <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Loading page…</div>}>
              <Routes location={location}>
                <Route path="/" element={<HomePage theme={theme} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/portfolios" element={<PortfolioPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/certification" element={<CertificationPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}

export default App;
