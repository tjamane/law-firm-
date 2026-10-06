'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

// Custom hook for managing dark/light mode
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('lawfirm_theme') as Theme | null;
    
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle between light and dark mode
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('lawfirm_theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  }, []);

  // Set a specific theme
  const setSpecificTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('lawfirm_theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, []);

  return {
    theme,
    mounted,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme: setSpecificTheme,
  };
}
