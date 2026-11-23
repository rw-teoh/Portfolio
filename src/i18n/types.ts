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
  about: {
    eyebrow: string
    title: string
    introductionLabel: string
    detailsLabel: string
    universityLabel: string
    programmeLabel: string
    academicYearLabel: string
    interestsLabel: string
    careerLabel: string
    learningLabel: string
  }
  skills: {
    eyebrow: string
    title: string
    categories: {
      programmingLanguages: string
      frontend: string
      backend: string
      databases: string
      developerTools: string
      otherTechnologies: string
    }
  }
  projects: {
    eyebrow: string
    title: string
    intro: string
    emptyTitle: string
    emptyDescription: string
    carouselLabel: string
    carouselRoleDescription: string
    slideRoleDescription: string
    slideLabel: string
    currentProjectAnnouncement: string
    repositoryLink: string
    demoLink: string
    technologiesLabel: string
  }
  education: {
    eyebrow: string
    title: string
    certificatesLink: string
    showDetails: string
    logoPlaceholder: string
    periodLabel: string
    previousEntry: string
    nextEntry: string
    entryAnnouncement: string
  }
}
