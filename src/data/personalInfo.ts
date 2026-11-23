import type { Language } from '../i18n/types'

export const personalInfo = {
  name: 'Rei Wen',
  initials: 'RW',
  professionalTitle: 'Software Engineer',
  email: 'reiwen88@gmail.com',
  githubUrl: 'https://github.com/rw-teoh',
  linkedinUrl: 'https://linkedin.com/in/rei-wen-teoh-63616744a',
  personalWebsiteUrl: '',
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
    careerAspiration: 'AI Engineer / IT Specialist',
    learningFocus: 'Different aspects of the software development life cycle, covering analysis, design, testing, implementation, modification and maintenance of software, in a systematic and quantifiable fashion.',
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
      'AI and Machine Learning',
      'Web Development',
      '',
      '',
      '',
      '',
    ],
  },
  'zh-Hans': {
    name: '瑞文',
    professionalTitle: '软件工程（荣誉）学士学位在读学生',
    introduction: '一个平凡却喜欢探索不平凡的女孩',
    aboutIntro: '一名仍在不断学习、探索软件工程世界的学生。',
    careerAspiration: '人工智能工程师 / 信息技术专家',
    learningFocus: '系统性、可量化地学习软件开发生命周期的各个环节，包括需求分析、设计、测试、实施、修改与维护。',
    typingPhrases: ['学习者', 'ENFP', '充满好奇心'],
    interests: [
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    AreaInterests: [
      '人工智能与机器学习',
  '网页开发',
      '',
      '',
      '',
      '',
    ],
  },
  de: {
    name: 'Rei Wen',
    professionalTitle: 'Studentin im Bachelorstudiengang Software Engineering (mit Auszeichnung)',
introduction: 'Ein gewöhnliches Mädchen, das nach dem Außergewöhnlichen strebt.',
aboutIntro: 'Eine Studentin, die weiterhin lernt und die Welt des Software Engineerings erkundet.',
careerAspiration: 'KI-Ingenieurin / IT-Spezialistin',
learningFocus: 'Systematische und messbare Auseinandersetzung mit den verschiedenen Phasen des Softwareentwicklungslebenszyklus, einschließlich Analyse, Entwurf, Test, Implementierung, Änderung und Wartung von Software.',
typingPhrases: ['Lernende', 'ENFP', 'neugierig'],
interests: [
  '',
  '',
  '',
  '',
  '',
  '',
],
AreaInterests: [
  'Künstliche Intelligenz und maschinelles Lernen',
  'Webentwicklung',
  '',
  '',
  '',
  '',
],
  },
}
