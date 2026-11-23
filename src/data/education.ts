export type LocalizedEducationText = {
  en: string
  'zh-Hans'?: string
  de?: string
}

export type EducationEntry = {
  id: string
  institution: LocalizedEducationText
  period: LocalizedEducationText
  programme: LocalizedEducationText
  achievements: LocalizedEducationText[]
  startYear: string
  endYear: string
  logo?: string
}

export const educationEntries: EducationEntry[] = [
  {
    id: 'utar-software-engineering-year-1',
    institution: {
      en: 'UTAR',
    },
    period: {
      en: '3 Years',
      'zh-Hans': '3 Years',
      de: '3 Years',
    },
    programme: {
      en: 'Bachelor of Science in Software Engineering (Honours)',
      'zh-Hans': '软件工程学士学位（荣誉）',
      de: 'Bachelor of Science in Software Engineering (Honours)',
    },
    startYear: '2026',
    endYear: '2029',
    achievements: [
      {
        en: 'CGPA: 3.75 / 4.0',
        'zh-Hans': 'CGPA: 3.75 / 4.0',
        de: 'CGPA: 3.75 / 4.0',
      },
      // {
      //   en: '[[EDU_1_ACHIEVEMENT_2]]',
      //   'zh-Hans': '[[EDU_1_ACHIEVEMENT_2_ZH]]',
      //   de: '[[EDU_1_ACHIEVEMENT_2_DE]]',
      // },
    ],
  },
  {
    id: 'IICP',
    institution: {
      en: 'INTI INTERNATIONAL COLLEGE PENANG',
    },
    period: {
      en: '1 Year',
      'zh-Hans': '1 Year',
      de: '1 Year',
    },
    programme: {
      en: 'Foundation in Information Technology',
      'zh-Hans': 'Foundation in Information Technology',
      de: 'Foundation in Information Technology',
    },
    startYear: '2025',
    endYear: '2026',
    achievements: [
      {
        en: 'CGPA: 3.67 / 4.0',
        'zh-Hans': 'CGPA: 3.67 / 4.0',
        de: 'CGPA: 3.67 / 4.0',
      },
    ],
  },
  {
    id: 'PCGHS',
    institution: {
      en: 'PENANG CHINESE GIRLS HIGH SCHOOL',
    },
    period: {
      en: '5 Years',
      'zh-Hans': '5 Years',
      de: '5 Years',
    },
    programme: {
      en: 'Secondary School',
      'zh-Hans': 'Secondary School',
      de: 'Secondary School',
    },
    startYear: '2020',
    endYear: '2024',
    achievements: [
      // {
      //   en: '[[EDU_3_ACHIEVEMENT_1]]',
      //   'zh-Hans': '[[EDU_3_ACHIEVEMENT_1_ZH]]',
      //   de: '[[EDU_3_ACHIEVEMENT_1_DE]]',
      // },
    ],
  },
]
