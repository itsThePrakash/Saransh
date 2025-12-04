import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '@/constants';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Split navigation items for scalable desktop header
  const primaryNavItems = NAV_ITEMS.slice(0, 5);
  const moreNavItems = NAV_ITEMS.slice(5);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled || isMenuOpen 
            ? 'glass border-zinc-200 dark:border-zinc-800' 
            : 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-transparent py-2'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Area */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-110">
                  S
                </div>
                <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  Saransh
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {primaryNavItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 relative group ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                  )}
                </Link>
              ))}
               {moreNavItems.length > 0 && (
                 <div className="relative group">
                    <button className="px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        <span>More</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-dark-card border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-10">
                        {moreNavItems.map((item) => (
                           <Link
                             key={item.path}
                             to={item.path}
                             className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                               isActive(item.path)
                                 ? 'bg-primary/10 text-primary'
                                 : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                             }`}
                           >
                             {item.label}
                           </Link>
                        ))}
                    </div>
                 </div>
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              
              {/* Google Translate - Styled to look like a button */}
              <div className="hidden md:block relative bg-zinc-100 dark:bg-zinc-800 rounded-full px-2 py-1 border border-zinc-200 dark:border-zinc-700">
                  <div id="google_translate_element" className="scale-90 origin-center"></div>
              </div>

              {/* Search Bar (Desktop) */}
              <div className="hidden md:block relative group">
                <form onSubmit={handleSearch}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-zinc-400 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>
                  <input 
                    type="search" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-32 focus:w-48 transition-all duration-300 pl-9 pr-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-full text-sm bg-transparent text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </form>
              </div>

              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden md:block"></div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-600 fill-current" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="xl:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                  <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div 
          className={`xl:hidden absolute top-full left-0 w-full glass border-t border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-[85vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 space-y-4">
             {/* Mobile Google Translate Note */}
             <div className="flex justify-center bg-zinc-50 dark:bg-zinc-900 rounded-lg p-2">
                 <p className="text-xs text-zinc-500">Translation available in Header</p>
            </div>

            <form onSubmit={handleSearch} className="flex">
              <input 
                   type="search" 
                   placeholder="Search..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="flex-grow min-w-0 rounded-l-lg border-y border-l border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-4 py-3 text-sm focus:outline-none text-zinc-900 dark:text-white"
                />
                <button type="submit" className="bg-primary text-white px-4 py-3 rounded-r-lg font-bold text-sm">Search</button>
            </form>
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`block px-4 py-3 rounded-xl text-center text-sm font-semibold transition-colors ${
                    isActive(item.path) 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      <div className="h-20"></div>
    </>
  );
};

export default Header;