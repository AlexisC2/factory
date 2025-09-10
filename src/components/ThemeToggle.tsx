import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-18 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    >
      <span className="sr-only">Toggle theme</span>
      <motion.span
        className="inline-block h-8 w-8 transform rounded-full bg-white dark:bg-gray-200 shadow transition-transform duration-300"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          transform: theme === 'dark' ? 'translateX(34px)' : 'translateX(2px)',
        }}
      />
      <span className="absolute left-1 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-900 dark:text-gray-100">
        {theme === 'light' ? '☀️' : '🌙'}
      </span>
    </button>
  );
};

export default ThemeToggle;