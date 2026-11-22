import { createContext } from 'react'
import type { Dictionary, Language } from './types'

export type LanguageContextValue = {
  language: Language
  dictionary: Dictionary
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
