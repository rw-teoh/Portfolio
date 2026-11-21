import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { personalInfo } from '../data/personalInfo'
import { useTheme } from '../hooks/useTheme'

const navigationLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const sections = navigationLinks
      .map(({ id }) => document.getElementById(id))
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

  function handleLinkClick() {
    closeMenu(window.matchMedia('(max-width: 800px)').matches)
  }

  return (
    <header className="navbar" onKeyDown={handleMenuKeyDown}>
      <a
        className="navbar-brand"
        href="#home"
        aria-label={`${personalInfo.initials}, home`}
        onClick={handleLinkClick}
      >
        {personalInfo.initials}
        <span className="navbar-brand-dot" aria-hidden="true">
          .
        </span>
      </a>

      <nav
        id="primary-navigation"
        className={`navbar-links${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Primary navigation"
      >
        {navigationLinks.map(({ label, id }, index) => (
          <a
            key={id}
            ref={index === 0 ? firstLinkRef : undefined}
            className={activeSection === id ? 'is-active' : undefined}
            href={`#${id}`}
            aria-current={activeSection === id ? 'location' : undefined}
            onClick={handleLinkClick}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="navbar-actions">
        <button
          type="button"
          className="navbar-theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
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
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
