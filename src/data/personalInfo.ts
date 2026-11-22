import type { Language } from '../i18n/types'

export const personalInfo = {
  name: '[[YOUR_NAME]]',
  initials: '[[YOUR_INITIALS]]',
  professionalTitle: '[[YOUR_PROFESSIONAL_TITLE]]',
  email: '[[YOUR_EMAIL]]',
  githubUrl: '[[YOUR_GITHUB_URL]]',
  linkedinUrl: '[[YOUR_LINKEDIN_URL]]',
  university: 'Universiti Tunku Abdul Rahman (UTAR)',
  programme: 'Software Engineering',
  academicYear: 'Year 1',
  aboutIntro: '[[ABOUT_INTRO]]',
  careerAspiration: '[[CAREER_ASPIRATION]]',
  learningFocus: '[[LEARNING_FOCUS]]',
  interests: ['[[INTEREST_1]]', '[[INTEREST_2]]', '[[INTEREST_3]]'],
  typingPhrases: ['[[TYPING_PHRASE_1]]', '[[TYPING_PHRASE_2]]'],
}

export type LocalizedPersonalInfo = {
  name: string
  professionalTitle: string
  introduction: string
  typingPhrases: [string, string]
  interests: [string, string, string, string, string, string]
}

export const personalInfoByLanguage: Record<Language, LocalizedPersonalInfo> = {
  en: {
    name: '[[YOUR_NAME]]',
    professionalTitle: '[[YOUR_PROFESSIONAL_TITLE]]',
    introduction: '[[HERO_INTRO_EN]]',
    typingPhrases: ['[[TYPING_PHRASE_1]]', '[[TYPING_PHRASE_2]]'],
    interests: [
      '[[INTEREST_1]]',
      '[[INTEREST_2]]',
      '[[INTEREST_3]]',
      '[[INTEREST_4]]',
      '[[INTEREST_5]]',
      '[[INTEREST_6]]',
    ],
  },
  'zh-Hans': {
    name: '[[YOUR_NAME_ZH]]',
    professionalTitle: '[[YOUR_PROFESSIONAL_TITLE_ZH]]',
    introduction: '[[HERO_INTRO_ZH]]',
    typingPhrases: ['[[TYPING_PHRASE_1_ZH]]', '[[TYPING_PHRASE_2_ZH]]'],
    interests: [
      '[[INTEREST_1_ZH]]',
      '[[INTEREST_2_ZH]]',
      '[[INTEREST_3_ZH]]',
      '[[INTEREST_4_ZH]]',
      '[[INTEREST_5_ZH]]',
      '[[INTEREST_6_ZH]]',
    ],
  },
  de: {
    name: '[[YOUR_NAME_DE]]',
    professionalTitle: '[[YOUR_PROFESSIONAL_TITLE_DE]]',
    introduction: '[[HERO_INTRO_DE]]',
    typingPhrases: ['[[TYPING_PHRASE_1_DE]]', '[[TYPING_PHRASE_2_DE]]'],
    interests: [
      '[[INTEREST_1_DE]]',
      '[[INTEREST_2_DE]]',
      '[[INTEREST_3_DE]]',
      '[[INTEREST_4_DE]]',
      '[[INTEREST_5_DE]]',
      '[[INTEREST_6_DE]]',
    ],
  },
}
