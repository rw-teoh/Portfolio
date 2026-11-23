import { Moon, Sun } from 'lucide-react'
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { personalInfo } from '../data/personalInfo'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../i18n/useLanguage'
import { dictionaries, languages } from '../i18n'
import {
  solveHalfCircle,
  solveQuarterCircle,
  type FanPosition,
  type FanPillSize,
} from '../lib/fanLayout'

const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'contact']
const fanGap = 8
const phoneFanGap = 12
type FanItemStyle = CSSProperties & {
  '--fan-x': string
  '--fan-y': string
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isFanOpen, setIsFanOpen] = useState(
    () => window.scrollY <= 40,
  )
  const [fanPositions, setFanPositions] = useState<Record<string, FanPosition>>({})
  const [fanAnchorX, setFanAnchorX] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const fanRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const leaveTimerRef = useRef<number | null>(null)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, dictionary } = useLanguage()

  const navigationLinks = useMemo(
    () => [
      { label: dictionary.navigation.home, id: 'home' },
      { label: dictionary.navigation.about, id: 'about' },
      { label: dictionary.navigation.skills, id: 'skills' },
      { label: dictionary.navigation.projects, id: 'projects' },
      { label: dictionary.navigation.education, id: 'education' },
      { label: dictionary.navigation.contact, id: 'contact' },
    ],
    [dictionary],
  )

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
    const handleScroll = () => {
      if (window.scrollY <= 40) setIsFanOpen(true)
      else if (window.scrollY >= 120) setIsFanOpen(false)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useLayoutEffect(() => {
    const fan = fanRef.current
    const header = headerRef.current
    const actions = actionsRef.current
    if (!fan || !header || !actions) return

    let isActive = true
    const recalculateFan = () => {
      if (!isActive) return
      const activePill = fan.querySelector<HTMLElement>('[data-fan-centre] button')
      if (!activePill) return

      const activeSize: FanPillSize = {
        width: activePill.offsetWidth,
        height: activePill.offsetHeight,
      }
      const otherLinks = navigationLinks.filter(({ id }) => id !== activeSection)
      const otherSizes = otherLinks.map(({ id }) => {
        const pill = fan.querySelector<HTMLElement>(`[data-fan-id="${id}"]`)
        return {
          width: pill?.offsetWidth ?? 0,
          height: pill?.offsetHeight ?? 0,
        }
      })
      const isPhone = window.matchMedia('(max-width: 600px)').matches
      const positions = isPhone
        ? solveQuarterCircle(otherSizes, activeSize, fanGap)
        : solveHalfCircle(otherSizes, activeSize, fanGap)
      const nextPositions: Record<string, FanPosition> = {
        [activeSection]: { x: 0, y: 0 },
      }
      otherLinks.forEach(({ id }, index) => {
        nextPositions[id] = positions[index]
      })

      const allPills = [
        { position: { x: 0, y: 0 }, size: activeSize },
        ...otherLinks.map((_, index) => ({
          position: positions[index],
          size: otherSizes[index],
        })),
      ]
      const leftExtent = Math.min(
        ...allPills.map(({ position, size }) => position.x - size.width / 2),
      )
      const rightExtent = Math.max(
        ...allPills.map(({ position, size }) => position.x + size.width / 2),
      )
      const maxY = Math.max(
        ...allPills.map(({ position, size }) => position.y + size.height),
      )
      const headerRect = header.getBoundingClientRect()
      const actionsRect = actions.getBoundingClientRect()
      const viewportMargin = 16
      const desiredX = actionsRect.left - headerRect.left - 12
      let minX = viewportMargin - leftExtent
      let maxX = window.innerWidth - viewportMargin - rightExtent

      const contactStrip = document.querySelector<HTMLElement>('.contact-strip')
      if (contactStrip) {
        const stripRect = contactStrip.getBoundingClientRect()
        const fanTop = headerRect.bottom + (isPhone ? phoneFanGap : fanGap)
        const fanBottom = fanTop + maxY
        const overlapsVertically =
          fanTop < stripRect.bottom && fanBottom > stripRect.top
        if (overlapsVertically) {
          maxX = Math.min(maxX, stripRect.left - headerRect.left - 8 - rightExtent)
        }
      }

      if (minX > maxX) {
        minX = viewportMargin - leftExtent
        maxX = window.innerWidth - viewportMargin - rightExtent
      }
      setFanPositions(nextPositions)
      setFanAnchorX(Math.min(maxX, Math.max(minX, desiredX)))
    }

    let frame = 0
    const measureFan = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(recalculateFan)
    }

    const pills = fan.querySelectorAll<HTMLElement>(
      '.navbar-fan-pill, .navbar-fan-centre-button',
    )
    const resizeObserver = new ResizeObserver(measureFan)
    pills.forEach((pill) => resizeObserver.observe(pill))

    const fontSet = document.fonts
    void fontSet.ready.then(measureFan)
    fontSet.addEventListener('loadingdone', measureFan)
    window.addEventListener('resize', measureFan)
    recalculateFan()

    return () => {
      window.cancelAnimationFrame(frame)
      isActive = false
      resizeObserver.disconnect()
      fontSet.removeEventListener('loadingdone', measureFan)
      window.removeEventListener('resize', measureFan)
    }
  }, [activeSection, language, navigationLinks])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return
      if (!fanRef.current?.contains(event.target)) setIsFanOpen(false)
    }
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const fan = fanRef.current
      if (event.key === 'Escape' && fan?.classList.contains('is-open')) {
        setIsFanOpen(false)
        fan.querySelector<HTMLButtonElement>('.navbar-fan-centre-button')?.focus()
      }
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
    leaveTimerRef.current = window.setTimeout(() => {
      if (fanRef.current?.contains(document.activeElement)) return
      setIsFanOpen(false)
    }, 400)
  }

  function handleLinkClick(id?: string) {
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

  function renderLanguageSwitcher() {
    return (
      <div
        className="navbar-language-switcher"
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
    <header ref={headerRef} className="navbar">
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
        className={`navbar-fan${isFanOpen ? ' is-open' : ''}`}
        aria-label={dictionary.navbar.primaryNavigation}
        style={{ left: `${fanAnchorX}px` }}
        onMouseEnter={openFanForHover}
        onMouseLeave={scheduleFanClose}
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

            const slot = fanPositions[id] ?? { x: 0, y: 0 }
            const style: FanItemStyle = {
              '--fan-x': `${slot.x}px`,
              '--fan-y': `${slot.y}px`,
            }

            return (
              <li
                key={id}
                className="navbar-fan-item"
                style={style}
                data-fan-index={index}
                data-fan-id={id}
              >
                <a
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
      </nav>

      <div ref={actionsRef} className="navbar-actions">
        {renderLanguageSwitcher()}
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
      </div>
    </header>
  )
}
