'use client';
import {useEffect} from "react";

export default function ThemeObserver() {
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    const html = document.querySelector('html');
    if (html) {
      html.dataset.theme = theme;
      html.classList.toggle('dark', theme === 'dark');
    }
  }, []);
  
  return null;
}