import { de } from './de'
import { en } from './en'
import { zh } from './zh'
import type { Dictionary, Language } from './types'

export type { Dictionary, Language } from './types'

export const languages: Language[] = ['en', 'zh-Hans', 'de']

export const dictionaries: Record<Language, Dictionary> = {
  en,
  'zh-Hans': zh,
  de,
}

export function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'zh-Hans' || value === 'de'
}
