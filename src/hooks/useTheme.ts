import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    setTheme((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark'

      try {
        localStorage.setItem('portfolio-theme', nextTheme)
      } catch {
        // The theme still works for this visit when storage is unavailable.
      }

      return nextTheme
    })
  }

  return { theme, toggleTheme }
}
