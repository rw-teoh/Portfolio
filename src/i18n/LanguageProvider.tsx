import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { dictionaries, isLanguage } from './index'
import { LanguageContext } from './context'
import type { Language } from './types'

type LanguageProviderProps = {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const documentLanguage = document.documentElement.lang
    return isLanguage(documentLanguage) ? documentLanguage : 'en'
  })

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    document.documentElement.lang = nextLanguage

    try {
      localStorage.setItem('portfolio-language', nextLanguage)
    } catch {
      // Keep the selected language for this visit if storage is unavailable.
    }
  }, [])

  const value = useMemo(
    () => ({
      language,
      dictionary: dictionaries[language],
      setLanguage,
    }),
    [language, setLanguage],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
