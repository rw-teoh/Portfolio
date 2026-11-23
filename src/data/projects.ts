import { LOCK_PROJECTS } from '../lib/config';

export type LocalizedProjectText = {
  en: string
  'zh-Hans'?: string
  de?: string
}

export type Project = {
  id: string
  title: LocalizedProjectText
  description: LocalizedProjectText
  technologies?: string[]
  image?: {
    src: string
    width: number
    height: number
    alt?: LocalizedProjectText
  }
  repositoryUrl?: string
  demoUrl?: string
  locked?: boolean
}

// Add or edit an entry with a stable id, English copy, optional translations,
// optional technologies, an image with intrinsic dimensions, and optional URLs.
// Remove an entry from this array to remove it from the section.
// PREVIEW ONLY: remove these five fixtures separately after feedback.
const realProjects: Project[] = [
  {
    id: 'preview-only-ring-project-1',
    title: {
      en: 'PREVIEW ONLY: Project title one',
      'zh-Hans': 'PREVIEW ONLY: 项目标题一',
      de: 'PREVIEW ONLY: Projekttitel eins',
    },
    description: {
      en: 'PREVIEW ONLY: First ring preview description.',
      'zh-Hans': 'PREVIEW ONLY: 第一张环形卡片预览说明。',
      de: 'PREVIEW ONLY: Erste Ringvorschau-Beschreibung.',
    },
    technologies: ['PREVIEW ONLY: [[TECH_1]]', 'PREVIEW ONLY: [[TECH_2]]'],
    image: {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23EDE8E0'/%3E%3Crect x='24' y='24' width='272' height='132' rx='18' fill='%23FBF8F3' stroke='%23D4CABC' stroke-width='3'/%3E%3Ccircle cx='82' cy='78' r='28' fill='%23FF6A2B'/%3E%3Cpath d='M130 66h132M130 86h98M52 126h216' stroke='%2300716C' stroke-width='10' stroke-linecap='round'/%3E%3C/svg%3E",
      width: 320,
      height: 180,
      alt: {
        en: 'PREVIEW ONLY: Abstract thumbnail one',
        'zh-Hans': 'PREVIEW ONLY: 抽象缩略图一',
        de: 'PREVIEW ONLY: Abstraktes Vorschaubild eins',
      },
    },
    repositoryUrl: '#',
    demoUrl: '#',
  },
  {
    id: 'preview-only-ring-project-2',
    title: {
      en: 'PREVIEW ONLY: Project title two',
      'zh-Hans': 'PREVIEW ONLY: 项目标题二',
      de: 'PREVIEW ONLY: Projekttitel zwei',
    },
    description: {
      en: 'PREVIEW ONLY: Second ring preview description.',
      'zh-Hans': 'PREVIEW ONLY: 第二张环形卡片预览说明。',
      de: 'PREVIEW ONLY: Zweite Ringvorschau-Beschreibung.',
    },
    technologies: ['PREVIEW ONLY: [[TECH_1]]', 'PREVIEW ONLY: [[TECH_2]]'],
    image: {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23EDE8E0'/%3E%3Cpath d='M0 140 90 58l58 48 62-70 110 104v40H0z' fill='%2300716C'/%3E%3Ccircle cx='236' cy='48' r='22' fill='%23FFC72C'/%3E%3Crect x='34' y='28' width='96' height='10' rx='5' fill='%23FF6A2B'/%3E%3C/svg%3E",
      width: 320,
      height: 180,
      alt: {
        en: 'PREVIEW ONLY: Abstract thumbnail two',
        'zh-Hans': 'PREVIEW ONLY: 抽象缩略图二',
        de: 'PREVIEW ONLY: Abstraktes Vorschaubild zwei',
      },
    },
    repositoryUrl: '#',
    demoUrl: '#',
  },
  {
    id: 'preview-only-ring-project-3',
    title: {
      en: 'PREVIEW ONLY: Project title three',
      'zh-Hans': 'PREVIEW ONLY: 项目标题三',
      de: 'PREVIEW ONLY: Projekttitel drei',
    },
    description: {
      en: 'PREVIEW ONLY: Third ring preview description.',
      'zh-Hans': 'PREVIEW ONLY: 第三张环形卡片预览说明。',
      de: 'PREVIEW ONLY: Dritte Ringvorschau-Beschreibung.',
    },
    technologies: ['PREVIEW ONLY: [[TECH_1]]', 'PREVIEW ONLY: [[TECH_2]]'],
    image: {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23EDE8E0'/%3E%3Crect x='38' y='28' width='244' height='124' rx='14' fill='%23FBF8F3' stroke='%23D4CABC' stroke-width='3'/%3E%3Cpath d='M62 126 112 76l40 38 50-54 56 66' fill='none' stroke='%23FF6A2B' stroke-width='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='112' cy='76' r='9' fill='%2300716C'/%3E%3Ccircle cx='202' cy='60' r='9' fill='%2300716C'/%3E%3C/svg%3E",
      width: 320,
      height: 180,
      alt: {
        en: 'PREVIEW ONLY: Abstract thumbnail three',
        'zh-Hans': 'PREVIEW ONLY: 抽象缩略图三',
        de: 'PREVIEW ONLY: Abstraktes Vorschaubild drei',
      },
    },
    repositoryUrl: '#',
    demoUrl: '#',
  },
  {
    id: 'preview-only-ring-project-4',
    title: {
      en: 'PREVIEW ONLY: Project title four',
      'zh-Hans': 'PREVIEW ONLY: 项目标题四',
      de: 'PREVIEW ONLY: Projekttitel vier',
    },
    description: {
      en: 'PREVIEW ONLY: Fourth ring preview description.',
      'zh-Hans': 'PREVIEW ONLY: 第四张环形卡片预览说明。',
      de: 'PREVIEW ONLY: Vierte Ringvorschau-Beschreibung.',
    },
    technologies: ['PREVIEW ONLY: [[TECH_1]]', 'PREVIEW ONLY: [[TECH_2]]'],
    image: {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23EDE8E0'/%3E%3Crect x='28' y='28' width='264' height='124' rx='18' fill='%23FBF8F3' stroke='%23D4CABC' stroke-width='3'/%3E%3Crect x='58' y='54' width='204' height='18' rx='9' fill='%2300716C'/%3E%3Crect x='58' y='86' width='154' height='18' rx='9' fill='%23FF6A2B'/%3E%3Crect x='58' y='118' width='112' height='18' rx='9' fill='%23FFC72C'/%3E%3C/svg%3E",
      width: 320,
      height: 180,
      alt: {
        en: 'PREVIEW ONLY: Abstract thumbnail four',
        'zh-Hans': 'PREVIEW ONLY: 抽象缩略图四',
        de: 'PREVIEW ONLY: Abstraktes Vorschaubild vier',
      },
    },
    repositoryUrl: '#',
    demoUrl: '#',
  },
  {
    id: 'preview-only-ring-project-5',
    title: {
      en: 'PREVIEW ONLY: Project title five',
      'zh-Hans': 'PREVIEW ONLY: 项目标题五',
      de: 'PREVIEW ONLY: Projekttitel fünf',
    },
    description: {
      en: 'PREVIEW ONLY: Fifth ring preview description.',
      'zh-Hans': 'PREVIEW ONLY: 第五张环形卡片预览说明。',
      de: 'PREVIEW ONLY: Fünfte Ringvorschau-Beschreibung.',
    },
    technologies: ['PREVIEW ONLY: [[TECH_1]]', 'PREVIEW ONLY: [[TECH_2]]'],
    image: {
      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23EDE8E0'/%3E%3Ccircle cx='160' cy='90' r='62' fill='%23FBF8F3' stroke='%23D4CABC' stroke-width='3'/%3E%3Ccircle cx='160' cy='90' r='38' fill='%23FF6A2B'/%3E%3Ccircle cx='160' cy='90' r='16' fill='%2300716C'/%3E%3Cpath d='M160 28v124M98 90h124' stroke='%23FFC72C' stroke-width='8'/%3E%3C/svg%3E",
      width: 320,
      height: 180,
      alt: {
        en: 'PREVIEW ONLY: Abstract thumbnail five',
        'zh-Hans': 'PREVIEW ONLY: 抽象缩略图五',
        de: 'PREVIEW ONLY: Abstraktes Vorschaubild fünf',
      },
    },
    repositoryUrl: '#',
    demoUrl: '#',
  },
]

const lockedProjects: Project[] = Array.from({ length: 5 }, (_, i) => ({
  id: `locked-${i + 1}`,
    title: { en: 'Locked', 'zh-Hans': '已锁定', de: 'Gesperrt' },
  description: { en: '' },
  locked: true,
}))

export const projects: Project[] = LOCK_PROJECTS ? lockedProjects : realProjects