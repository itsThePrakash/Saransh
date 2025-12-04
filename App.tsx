import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import ArticleDetail from '@/pages/ArticleDetail';
import CategoryPage from '@/pages/CategoryPage';
import Games from '@/pages/Games';
import AISummary from '@/pages/AISummary';
import Finance from '@/pages/Finance';
import Horoscope from '@/pages/Horoscope';
import Translator from '@/pages/Translator';
import { About, Contact, Privacy, Terms, Disclaimer } from '@/pages/StaticPages';
import CookieConsent from '@/components/CookieConsent';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Check system preference if no saved theme
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        <ScrollToTop />
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <main className="flex-grow container mx-auto px-5 py-8 max-w-[1200px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/games" element={<Games />} />
            <Route path="/ai-summary" element={<AISummary />} />
            <Route path="/translator" element={<Translator />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/horoscope" element={<Horoscope />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </main>

        <CookieConsent />
        <Footer />
      </div>
    </Router>
  );
};

export default App;