import type { Language } from '../i18n/types'

export const personalInfo = {
  name: 'Rei Wen',
  initials: 'RW',
  professionalTitle: 'Software Engineer',
  email: 'reiwen88@gmail.com',
  githubUrl: 'https://github.com/rw-teoh',
  linkedinUrl: 'https://linkedin.com/in/rei-wen-teoh-63616744a',
  university: 'Universiti Tunku Abdul Rahman (UTAR)',
  programme: 'Software Engineering',
  academicYear: 'Year 1',
  aboutIntro: '[[ABOUT_INTRO]]',
  careerAspiration: '[[CAREER_ASPIRATION]]',
  learningFocus: '[[LEARNING_FOCUS]]',
  interests: ['[[INTEREST_1]]', '[[INTEREST_2]]', '[[INTEREST_3]]'],
  AreaInterests: ['[[INTEREST_1]]', '[[INTEREST_2]]', '[[INTEREST_3]]'],
  typingPhrases: ['[[TYPING_PHRASE_1]]', '[[TYPING_PHRASE_2]]'],
}

export type LocalizedPersonalInfo = {
  name: string
  professionalTitle: string
  introduction: string
  aboutIntro: string
  careerAspiration: string
  learningFocus: string
  typingPhrases: [string, string, string]
  interests: [string, string, string, string, string, string]
  AreaInterests: [string, string, string, string, string, string]

}

export const personalInfoByLanguage: Record<Language, LocalizedPersonalInfo> = {
  en: {
    name: 'Rei Wen',
    professionalTitle: 'Bachelor of Software Engineering (Honours) Student',
    introduction: 'An ordinary girl who seeks the extraordinary.',
    aboutIntro: 'A student who are still learning and exploring the world of software engineering.',
    careerAspiration: '[[CAREER_ASPIRATION]]',
    learningFocus: '[[LEARNING_FOCUS]]',
    typingPhrases: ['a learner', 'ENFP', 'curious'],
    interests: [
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    AreaInterests: [
      'abc',
      '',
      '',
      '',
      '',
      '',
    ],
  },
  'zh-Hans': {
    name: '[[YOUR_NAME_ZH]]',
    professionalTitle: '[[YOUR_PROFESSIONAL_TITLE_ZH]]',
    introduction: '[[HERO_INTRO_ZH]]',
    aboutIntro: '[[ABOUT_INTRO_ZH]]',
    careerAspiration: '[[CAREER_ASPIRATION_ZH]]',
    learningFocus: '[[LEARNING_FOCUS_ZH]]',
    typingPhrases: ['a learner', 'ENFP', 'curious'],
    interests: [
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    AreaInterests: [
      'abc',
      '',
      '',
      '',
      '',
      '',
    ],
  },
  de: {
    name: '[[YOUR_NAME_DE]]',
    professionalTitle: '[[YOUR_PROFESSIONAL_TITLE_DE]]',
    introduction: '[[HERO_INTRO_DE]]',
    aboutIntro: '[[ABOUT_INTRO_DE]]',
    careerAspiration: '[[CAREER_ASPIRATION_DE]]',
    learningFocus: '[[LEARNING_FOCUS_DE]]',
    typingPhrases: ['a learner', 'ENFP', 'curious'],
    interests: [
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    AreaInterests: [
      'abc',
      '',
      '',
      '',
      '',
      '',
    ],
  },
}
