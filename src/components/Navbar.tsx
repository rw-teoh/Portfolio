import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { personalInfo } from '../data/personalInfo'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../i18n/useLanguage'
import { dictionaries, languages } from '../i18n'

const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'contact']

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFanOpen, setIsFanOpen] = useState(
    () => window.scrollY <= 40,
  )
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const fanRef = useRef<HTMLElement>(null)
  const leaveTimerRef = useRef<number | null>(null)
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 40) setIsFanOpen(true)
      else if (window.scrollY >= 120) setIsFanOpen(false)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return
      if (!fanRef.current?.contains(event.target)) setIsFanOpen(false)
    }
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsFanOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => () => {
    if (leaveTimerRef.current !== null) window.clearTimeout(leaveTimerRef.current)
  }, [])

  function openFanForHover() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (leaveTimerRef.current !== null) {
      window.clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setIsFanOpen(true)
  }

  function scheduleFanClose() {
    if (leaveTimerRef.current !== null) window.clearTimeout(leaveTimerRef.current)
    leaveTimerRef.current = window.setTimeout(() => setIsFanOpen(false), 400)
  }

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
    if (id) {
      setIsFanOpen(false)
      window.requestAnimationFrame(() => {
        const section = document.getElementById(id)
        const heading = section?.querySelector<HTMLElement>('h1, h2')
        if (heading) {
          heading.setAttribute('tabindex', '-1')
          heading.focus({ preventScroll: true })
        }
      })
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
        ref={fanRef}
        id="primary-navigation"
        className={`navbar-fan${isFanOpen ? ' is-open' : ''}${isMenuOpen ? ' is-mobile-open' : ''}`}
        aria-label={dictionary.navbar.primaryNavigation}
        onMouseEnter={openFanForHover}
        onMouseLeave={scheduleFanClose}
        onFocus={() => setIsFanOpen(true)}
      >
        <ol className="navbar-fan-list">
          {navigationLinks.map(({ label, id }, index) => {
            if (activeSection === id) {
              return (
                <li
                  key={id}
                  className="navbar-fan-item navbar-fan-centre"
                  data-fan-centre="true"
                >
                  <button
                    type="button"
                    className="navbar-fan-centre-button"
                    aria-expanded={isFanOpen}
                    aria-controls="primary-navigation"
                    aria-current="location"
                    onClick={() => setIsFanOpen((open) => !open)}
                  >
                    {label}
                  </button>
                </li>
              )
            }

            const otherLinks = navigationLinks.filter(
              ({ id: linkId }) => linkId !== activeSection,
            )
            const otherIndex = otherLinks.findIndex(({ id: linkId }) => linkId === id)
            const slots: Array<{ x: number; y: number }> = [
              { x: -220, y: 0 },
              { x: -110, y: 62 },
              { x: 0, y: 74 },
              { x: 110, y: 62 },
              { x: 220, y: 0 },
            ]
            const slot = slots[otherIndex] || slots[0]
            const style = {
              '--fan-x': `${slot.x}px`,
              '--fan-y': `${slot.y}px`,
            } as CSSProperties

            return (
              <li
                key={id}
                className="navbar-fan-item"
                style={style}
                data-fan-index={index}
              >
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  className="navbar-fan-pill"
                  href={`#${id}`}
                  onClick={() => handleLinkClick(id)}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ol>
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
