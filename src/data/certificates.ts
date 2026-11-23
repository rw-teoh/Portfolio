import type { Language } from '../i18n/types'

export type Certificate = {
  id: string
  name: string
  platform: string
  date: string
  image: string
  alt?: Partial<Record<Language, string>> & { en: string }
}

// Edit this array and add or remove images under public/certificates/.
// Certificate images are public after deployment; blur names and ID numbers.
const previewImage = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440"><rect width="640" height="440" fill="#FBF8F3"/><rect x="22" y="22" width="596" height="396" rx="18" fill="none" stroke="#D4CABC" stroke-width="4"/><path d="M88 118h464M112 170h416M156 222h328" stroke="#00716C" stroke-width="8" stroke-linecap="round"/><text x="320" y="320" text-anchor="middle" fill="#1F1A17" font-family="sans-serif" font-size="30">PREVIEW ONLY</text></svg>',
)}`

export const certificates: Certificate[] = [
  {
    id: 'preview-certificate-1',
    name: 'PREVIEW ONLY — Certificate One',
    platform: 'PREVIEW ONLY — Platform',
    date: 'PREVIEW ONLY — Date',
    image: previewImage,
    alt: {
      en: 'PREVIEW ONLY — Decorative certificate sample',
      'zh-Hans': 'PREVIEW ONLY — 装饰性证书示例',
      de: 'PREVIEW ONLY — Dekoratives Zertifikatsbeispiel',
    },
  },
  {
    id: 'preview-certificate-2',
    name: 'PREVIEW ONLY — Certificate Two',
    platform: 'PREVIEW ONLY — Platform',
    date: 'PREVIEW ONLY — Date',
    image: previewImage,
    alt: {
      en: 'PREVIEW ONLY — Decorative certificate sample',
      'zh-Hans': 'PREVIEW ONLY — 装饰性证书示例',
      de: 'PREVIEW ONLY — Dekoratives Zertifikatsbeispiel',
    },
  },
  {
    id: 'preview-certificate-3',
    name: 'PREVIEW ONLY — Certificate Three',
    platform: 'PREVIEW ONLY — Platform',
    date: 'PREVIEW ONLY — Date',
    image: previewImage,
    alt: {
      en: 'PREVIEW ONLY — Decorative certificate sample',
      'zh-Hans': 'PREVIEW ONLY — 装饰性证书示例',
      de: 'PREVIEW ONLY — Dekoratives Zertifikatsbeispiel',
    },
  },
]
