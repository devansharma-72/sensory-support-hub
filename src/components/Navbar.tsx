
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    // Check if user prefers dark mode from localStorage
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Focus Timer', path: '/focus-timer' },
    { name: 'Journal', path: '/journal' },
    { name: 'Scenario Talks', path: '/scenario-talks' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo',
        scrolled 
          ? 'py-3 shadow-sm backdrop-blur-lg dark:shadow-slate-800/10' 
          : 'py-5',
        isDarkMode 
          ? 'bg-slate-900/90 text-white' 
          : 'bg-white/90 text-foreground'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
          >
            <span className="text-white font-bold">S</span>
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="font-semibold text-xl"
          >
            Sensory
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    'relative px-2 py-1 font-medium transition-colors duration-200 hover:text-primary',
                    isActive(link.path) ? 'text-primary' : isDarkMode ? 'text-white/80' : 'text-foreground/80'
                  )}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleDarkMode}
            className={cn(
              "p-2 rounded-full transition-colors",
              isDarkMode 
                ? "bg-slate-800 hover:bg-slate-700" 
                : "bg-secondary hover:bg-secondary/80"
            )}
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait">
              {isDarkMode ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile Nav Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleDarkMode}
            className={cn(
              "p-2 mr-2 rounded-full transition-colors",
              isDarkMode 
                ? "bg-slate-800 hover:bg-slate-700" 
                : "bg-secondary hover:bg-secondary/80"
            )}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDarkMode 
                ? "hover:bg-slate-800" 
                : "hover:bg-secondary"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className={cn(
              "md:hidden border-t overflow-hidden",
              isDarkMode 
                ? "bg-slate-900 border-slate-800" 
                : "bg-background border-slate-200"
            )}
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={link.path}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        "block py-2 px-4 rounded-lg transition-colors",
                        isActive(link.path) 
                          ? "bg-primary/10 text-primary font-medium" 
                          : isDarkMode 
                            ? "hover:bg-slate-800" 
                            : "hover:bg-secondary"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
