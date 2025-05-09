
"use client";

import { useEffect, useState, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Default to dark

  useEffect(() => {
    // This effect runs only on the client side
    const storedTheme = localStorage.getItem('theme');
    const root = window.document.documentElement;

    if (storedTheme === 'light') {
      setTheme('light');
      root.classList.remove('dark');
    } else {
      // This handles storedTheme === 'dark' or storedTheme is null (default to dark)
      setTheme('dark');
      root.classList.add('dark');
      if (!storedTheme) { // If no theme was stored, set it to dark now in localStorage
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []); // Empty dependency array: runs once on mount

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    const root = window.document.documentElement;
    if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [theme]);

  return { theme, toggleTheme };
}
