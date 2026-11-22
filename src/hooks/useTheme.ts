import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  createElement,
  type ReactNode,
} from 'react'

export type Theme = 'dark' | 'light'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)

    try {
      localStorage.setItem('portfolio-theme', nextTheme)
    } catch {
      // Keep the selected theme for this visit if storage is unavailable.
    }
  }, [theme])

  return createElement(
    ThemeContext.Provider,
    { value: { theme, toggleTheme } },
    children,
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
