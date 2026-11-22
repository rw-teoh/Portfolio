import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { personalInfo } from '../data/personalInfo'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../i18n/useLanguage'
import { dictionaries, languages } from '../i18n'

const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'contact']

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, dictionary } = useLanguage()

  const navigationLinks = [
    { label: dictionary.navigation.home, id: 'home' },
    { label: dictionary.navigation.about, id: 'about' },
    { label: dictionary.navigation.skills, id: 'skills' },
    { label: dictionary.navigation.projects, id: 'projects' },
    { label: dictionary.navigation.education, id: 'education' },
    { label: dictionary.navigation.contact, id: 'contact' },
  ]

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0 || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) setActiveSection(visibleEntry.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.1, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isMenuOpen) firstLinkRef.current?.focus()
  }, [isMenuOpen])

  function closeMenu(restoreFocus = false) {
    setIsMenuOpen(false)
    if (restoreFocus) menuButtonRef.current?.focus()
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && isMenuOpen) closeMenu(true)
  }

  function handleLinkClick(id?: string) {
    closeMenu(window.matchMedia('(max-width: 800px)').matches)

    if (id && window.location.hash.startsWith('#/certificates')) {
      window.location.hash = `#${id}`
    }
  }

  function renderLanguageSwitcher(mobile = false) {
    return (
      <div
        className={
          mobile
            ? 'navbar-language-switcher navbar-language-mobile'
            : 'navbar-language-switcher'
        }
        role="group"
        aria-label={dictionary.navbar.languageSwitcher}
      >
        {languages.map((languageCode) => (
          <button
            key={languageCode}
            type="button"
            lang={languageCode}
            className="navbar-language-button"
            aria-label={dictionaries[languageCode].languageName}
            aria-pressed={language === languageCode}
            onClick={() => setLanguage(languageCode)}
          >
            {dictionaries[languageCode].languageName}
          </button>
        ))}
      </div>
    )
  }

  return (
    <header className="navbar" onKeyDown={handleMenuKeyDown}>
      <a
        className="navbar-brand"
        href="#home"
        aria-label={`${personalInfo.initials}, ${dictionary.navigation.home}`}
        onClick={() => handleLinkClick('home')}
      >
        {personalInfo.initials}
        <span className="navbar-brand-dot" aria-hidden="true">
          .
        </span>
      </a>

      <nav
        id="primary-navigation"
        className={`navbar-links${isMenuOpen ? ' is-open' : ''}`}
        aria-label={dictionary.navbar.primaryNavigation}
      >
        {navigationLinks.map(({ label, id }, index) => (
          <a
            key={id}
            ref={index === 0 ? firstLinkRef : undefined}
            className={activeSection === id ? 'is-active' : undefined}
            href={`#${id}`}
            aria-current={activeSection === id ? 'location' : undefined}
            onClick={() => handleLinkClick(id)}
          >
            {label}
          </a>
        ))}
        {renderLanguageSwitcher(true)}
      </nav>

      <div className="navbar-actions">
        {renderLanguageSwitcher(false)}
        <button
          type="button"
          className="navbar-theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark'
              ? dictionary.navbar.switchToLight
              : dictionary.navbar.switchToDark
          }
          title={
            theme === 'dark'
              ? dictionary.navbar.switchToLight
              : dictionary.navbar.switchToDark
          }
        >
          {theme === 'dark' ? (
            <Sun aria-hidden="true" size={19} />
          ) : (
            <Moon aria-hidden="true" size={19} />
          )}
        </button>
        <button
          ref={menuButtonRef}
          type="button"
          className="navbar-menu-toggle"
          aria-label={
            isMenuOpen
              ? dictionary.navbar.closeMenu
              : dictionary.navbar.openMenu
          }
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={22} />
          ) : (
            <Menu aria-hidden="true" size={22} />
          )}
        </button>
      </div>
    </header>
  )
}
