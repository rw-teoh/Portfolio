import { ArrowDown, ArrowUpRight, Code2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { personalInfo } from '../data/personalInfo'

function useTypingPhrase(phrases: string[]) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [visibleText, setVisibleText] = useState(
    () => phrases[0] ?? '[[TYPING_PHRASE_1]]',
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || phrases.length === 0) return

    const phrase = phrases[phraseIndex % phrases.length]
    const isComplete = visibleText === phrase && !isDeleting
    const delay = isComplete ? 1400 : isDeleting ? 45 : 85

    const timer = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true)
      } else if (isDeleting && visibleText.length > 0) {
        setVisibleText(phrase.slice(0, -1))
      } else if (isDeleting) {
        setPhraseIndex((index) => (index + 1) % phrases.length)
        setIsDeleting(false)
      } else {
        setVisibleText(phrase.slice(0, visibleText.length + 1))
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [isDeleting, phraseIndex, phrases, prefersReducedMotion, visibleText])

  return prefersReducedMotion
    ? phrases[0] ?? '[[TYPING_PHRASE_1]]'
    : visibleText
}

function AbstractAvatar() {
  return (
    <svg
      className="hero-art"
      viewBox="0 0 420 420"
      role="img"
      aria-labelledby="hero-art-title"
    >
      <title id="hero-art-title">Abstract geometric developer illustration</title>
      <defs>
        <linearGradient id="hero-glow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity=".95" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity=".2" />
        </linearGradient>
      </defs>
      <circle className="hero-art-orbit" cx="210" cy="210" r="165" />
      <circle className="hero-art-orbit hero-art-orbit-inner" cx="210" cy="210" r="126" />
      <path
        className="hero-art-shape"
        d="M210 78 326 145v134l-116 67-116-67V145l116-67Z"
        fill="url(#hero-glow)"
      />
      <path
        className="hero-art-cutout"
        d="m187 164-43 46 43 46m46-92 43 46-43 46m-16-107-28 122"
      />
      <circle className="hero-art-star" cx="335" cy="90" r="8" />
      <circle className="hero-art-star hero-art-star-small" cx="82" cy="293" r="5" />
      <rect
        className="hero-art-chip"
        x="284"
        y="298"
        width="66"
        height="34"
        rx="17"
      />
      <text className="hero-art-chip-text" x="317" y="320" textAnchor="middle">
        {'</>'}
      </text>
    </svg>
  )
}

export function Hero() {
  const phrase = useTypingPhrase(personalInfo.typingPhrases)

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="section-eyebrow">
            <Code2 aria-hidden="true" size={16} />
            Software Engineering Student
          </p>
          <h1 id="hero-title">
            Hello, I’m <span>{personalInfo.name}</span>
          </h1>
          <p className="hero-role">
            <span className="hero-role-label">I’m interested in</span>
            <span className="hero-typed" aria-live="polite">
              {phrase}
            </span>
            <span className="hero-caret" aria-hidden="true" />
          </p>
          <p className="hero-intro">
            An aspiring software engineer passionate about building creative
            digital solutions.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my projects <ArrowDown aria-hidden="true" size={17} />
            </a>
            <a className="button button-secondary" href="#contact">
              Contact me <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <AbstractAvatar />
          <span className="hero-visual-label">BUILD · LEARN · CREATE</span>
        </div>
      </div>
    </section>
  )
}
