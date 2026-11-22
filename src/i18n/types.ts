export type Language = 'en' | 'zh-Hans' | 'de'

export type Dictionary = {
  languageName: string
  navbar: {
    primaryNavigation: string
    openMenu: string
    closeMenu: string
    switchToLight: string
    switchToDark: string
    languageSwitcher: string
  }
  navigation: {
    home: string
    about: string
    skills: string
    projects: string
    education: string
    contact: string
  }
  shared: {
    certificates: string
    scrollDown: string
    backToPortfolio: string
    viewCertificate: string
    close: string
  }
  hero: {
    greeting: string
    studentLabel: string
    interestLead: string
    staticPhraseLabel: string
    scrollDown: string
    certificates: string
    interestButtons: string
  }
  contactStrip: {
    label: string
    email: string
    github: string
    linkedin: string
  }
  avatar: {
    defaultAlt: string
    interestButton: string
    unavailable: string
    miniAvatarButton: string
  }
}
