import { useEffect, useState } from 'react'
import {
  avatarAssets,
  type AvatarTheme,
  type InterestId,
} from '../data/avatar'
import { personalInfoByLanguage } from '../data/personalInfo'
import { personalInfo } from '../data/personalInfo'
import { useLanguage } from '../i18n/useLanguage'
import { useTheme } from '../hooks/useTheme'
import { ContactStrip } from '../components/ContactStrip'
import { InterestControls } from '../components/InterestControls'
import { ArrowDownIcon, ArrowRightIcon } from '../components/CustomIcons'
import {
  SectionDecorations,
  type SectionDecorationPlacement,
} from '../components/SectionDecorations'

const heroDecorations: SectionDecorationPlacement[] = [
  { id: 'hero-star', kind: 'star', size: 14, top: 18, left: 24, hideBelow: 769 },
  { id: 'hero-plane', kind: 'plane', size: 30, top: 18, left: 64, hideBelow: 1280 },
]

function useTypingPhrase(
  phrases: [string, string, string],
  prefersReducedMotion: boolean,
) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [visibleText, setVisibleText] = useState(phrases[0])

  useEffect(() => {
    if (prefersReducedMotion) return

    const phrase = phrases[phraseIndex % phrases.length]
    const complete = visibleText === phrase && !isDeleting
    const delay = complete ? 1400 : isDeleting ? 45 : 85

    const timer = window.setTimeout(() => {
      if (complete) {
        setIsDeleting(true)
      } else if (isDeleting && visibleText.length > 0) {
        setVisibleText(visibleText.slice(0, -1))
      } else if (isDeleting) {
        setPhraseIndex((index) => (index + 1) % phrases.length)
        setIsDeleting(false)
      } else {
        setVisibleText(phrase.slice(0, visibleText.length + 1))
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [isDeleting, phraseIndex, phrases, prefersReducedMotion, visibleText])

  return prefersReducedMotion ? phrases[0] : visibleText
}

export function Hero() {
  const { theme } = useTheme()
  const { language, dictionary } = useLanguage()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [activeInterest, setActiveInterest] = useState<InterestId | null>(null)
  const localized = personalInfoByLanguage[language]
  const typedPhrase = useTypingPhrase(
    localized.typingPhrases,
    prefersReducedMotion,
  )
  const avatarTheme: AvatarTheme = theme
  const avatar = avatarAssets[avatarTheme]
  const selectedPose =
    activeInterest && activeInterest !== 'rabbits'
      ? avatar.poses[activeInterest]
      : undefined

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  function changeInterest(interest: InterestId) {
    setActiveInterest((current) => (current === interest ? null : interest))
  }

  const interestLabels: [string, string, string, string, string, string] = [
    localized.interests[0],
    localized.interests[1],
    localized.interests[2],
    localized.interests[3],
    localized.interests[4],
    localized.interests[5],
  ]

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <SectionDecorations sectionId="home" placements={heroDecorations} />
      <ContactStrip
        email={personalInfo.email}
        githubUrl={personalInfo.githubUrl}
        linkedinUrl={personalInfo.linkedinUrl}
        labels={dictionary.contactStrip}
      />

      <div className="container hero-layout">
        <div className="hero-copy hero-enter">
          <p className="hero-kicker">
            <span aria-hidden="true" />
            {localized.professionalTitle}
          </p>
          <h1 id="hero-title">
            {dictionary.hero.greeting}{' '}
            <span>{localized.name}</span>
          </h1>
          <p className="hero-role">
            <span>{dictionary.hero.interestLead}</span>
            <span className="hero-typed" aria-hidden="true">
              {typedPhrase}
              <span className="hero-caret" aria-hidden="true" />
            </span>
            <span className="visually-hidden">
              {dictionary.hero.staticPhraseLabel}: {phrasesLabel(localized.typingPhrases)}
            </span>
          </p>
          <p className="hero-intro">{localized.introduction}</p>

          <nav className="hero-meta-links" aria-label={dictionary.shared.certificates}>
            <a className="hero-certificates-link" href="#/certificates">
              {dictionary.hero.certificates}
              <ArrowRightIcon size={15} />
            </a>
          </nav>
        </div>

        <div className="hero-avatar-column hero-enter">
          <div
            className={`hero-avatar-frame${avatar.frameEnabled ? ' is-framed' : ''}`}
          >
            <img
              className="hero-avatar hero-avatar-default"
              src={avatar.default}
              alt={avatar.altByLanguage[language]}
              width="520"
              height="520"
              fetchPriority="high"
            />
            {selectedPose && (
              <img
                className="hero-avatar hero-avatar-pose"
                src={selectedPose}
                alt=""
                width="520"
                height="520"
                loading="lazy"
              />
            )}
            {activeInterest === 'rabbits' && (
              <div className="hero-rabbits-placeholder" role="status">
                {dictionary.avatar.unavailable}
              </div>
            )}
          </div>

          <InterestControls
            groupLabel={dictionary.hero.interestButtons}
            labels={interestLabels}
            unavailableLabel={dictionary.avatar.unavailable}
            activeInterest={activeInterest}
            onInterestChange={changeInterest}
          />
        </div>
      </div>

      <a className="hero-scroll-link" href="#about">
        <span>{dictionary.hero.scrollDown}</span>
        <ArrowDownIcon size={16} />
      </a>
    </section>
  )
}

function phrasesLabel(phrases: [string, string, string]) {
  return phrases.join(', ')
}
