import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');

    if (saved !== null) {
      return JSON.parse(saved);
    }

    return false; // default light theme
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  return {
    isDark,
    toggle: () => setIsDark(prev => !prev),
  };
}