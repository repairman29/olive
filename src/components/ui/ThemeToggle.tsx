'use client'

import { useState, useEffect } from 'react'
import OliveIcon from './OliveIcon'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('olive_theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('olive_theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center bg-[var(--input)] dark:bg-[var(--surface-elevated)] border-2 border-[var(--sage-advice)] text-[var(--sage-advice)] hover:bg-[var(--sage-advice)] hover:text-[var(--parchment)] dark:hover:text-[var(--cast-iron)] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <OliveIcon name="moon" size={24} />
      ) : (
        <OliveIcon name="sun" size={24} />
      )}
    </button>
  )
}
