import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('meridian-theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('meridian-theme', theme);
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-card border border-border-warm shadow-soft hover:border-border-hover transition-all duration-300 group cursor-pointer"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 360 : 0, scale: theme === 'dark' ? 1 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-text-main group-hover:text-accent-teal transition-colors" />
        ) : (
          <Sun className="w-5 h-5 text-text-main group-hover:text-accent-teal transition-colors" />
        )}
      </motion.div>
    </button>
  );
};
