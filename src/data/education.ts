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
}

export const educationEntries: EducationEntry[] = [
  {
    id: 'utar-software-engineering-year-1',
    institution: {
      en: 'UTAR',
    },
    period: {
      en: '[[EDU_1_PERIOD]]',
      'zh-Hans': '[[EDU_1_PERIOD_ZH]]',
      de: '[[EDU_1_PERIOD_DE]]',
    },
    programme: {
      en: 'Software Engineering — Year 1',
    },
    achievements: [
      {
        en: '[[EDU_1_ACHIEVEMENT_1]]',
        'zh-Hans': '[[EDU_1_ACHIEVEMENT_1_ZH]]',
        de: '[[EDU_1_ACHIEVEMENT_1_DE]]',
      },
      {
        en: '[[EDU_1_ACHIEVEMENT_2]]',
        'zh-Hans': '[[EDU_1_ACHIEVEMENT_2_ZH]]',
        de: '[[EDU_1_ACHIEVEMENT_2_DE]]',
      },
    ],
  },
  {
    id: 'education-entry-2',
    institution: {
      en: '[[EDU_2_INSTITUTION]]',
      'zh-Hans': '[[EDU_2_INSTITUTION_ZH]]',
      de: '[[EDU_2_INSTITUTION_DE]]',
    },
    period: {
      en: '[[EDU_2_PERIOD]]',
      'zh-Hans': '[[EDU_2_PERIOD_ZH]]',
      de: '[[EDU_2_PERIOD_DE]]',
    },
    programme: {
      en: '[[EDU_2_PROGRAMME]]',
      'zh-Hans': '[[EDU_2_PROGRAMME_ZH]]',
      de: '[[EDU_2_PROGRAMME_DE]]',
    },
    achievements: [
      {
        en: '[[EDU_2_ACHIEVEMENT_1]]',
        'zh-Hans': '[[EDU_2_ACHIEVEMENT_1_ZH]]',
        de: '[[EDU_2_ACHIEVEMENT_1_DE]]',
      },
    ],
  },
  {
    id: 'education-entry-3',
    institution: {
      en: '[[EDU_3_INSTITUTION]]',
      'zh-Hans': '[[EDU_3_INSTITUTION_ZH]]',
      de: '[[EDU_3_INSTITUTION_DE]]',
    },
    period: {
      en: '[[EDU_3_PERIOD]]',
      'zh-Hans': '[[EDU_3_PERIOD_ZH]]',
      de: '[[EDU_3_PERIOD_DE]]',
    },
    programme: {
      en: '[[EDU_3_PROGRAMME]]',
      'zh-Hans': '[[EDU_3_PROGRAMME_ZH]]',
      de: '[[EDU_3_PROGRAMME_DE]]',
    },
    achievements: [
      {
        en: '[[EDU_3_ACHIEVEMENT_1]]',
        'zh-Hans': '[[EDU_3_ACHIEVEMENT_1_ZH]]',
        de: '[[EDU_3_ACHIEVEMENT_1_DE]]',
      },
    ],
  },
]
