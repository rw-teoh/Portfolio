import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { Container } from '../components/Container'
import { TrophyIcon } from '../components/CustomIcons'
import { educationEntries } from '../data/education'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'
import type { LocalizedEducationText } from '../data/education'

function localizedText(
  text: LocalizedEducationText,
  language: 'en' | 'zh-Hans' | 'de',
) {
  return text[language] || text.en
}

function rng(seed: number) {
  return function () {
    seed |= 0
    seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function cloudPath(
  w: number,
  h: number,
  puff: number,
  irr: number,
  seed: number,
) {
  const m = puff + 2
  const x0 = m
  const y0 = m
  const x1 = w - m
  const y1 = h - m
  const R = Math.max(8, Math.min(30, (x1 - x0) / 4, (y1 - y0) / 4))
  const L1 = Math.max(0, (x1 - x0) - 2 * R)
  const L2 = Math.max(0, (y1 - y0) - 2 * R)
  const A = Math.PI * R / 2
  const pieces = [
    { len: L1, at: (u: number) => [x0 + R + u, y0] },
    { len: A, at: (u: number) => { const a = -Math.PI / 2 + u / R; return [x1-R+R*Math.cos(a), y0+R+R*Math.sin(a)] } },
    { len: L2, at: (u: number) => [x1, y0+R+u] },
    { len: A, at: (u: number) => { const a = u/R; return [x1-R+R*Math.cos(a), y1-R+R*Math.sin(a)] } },
    { len: L1, at: (u: number) => [x1-R-u,y1] },
    { len: A, at: (u: number) => { const a=Math.PI/2+u/R; return [x0+R+R*Math.cos(a),y1-R+R*Math.sin(a)] } },
    { len: L2, at: (u: number) => [x0,y1-R-u] },
    { len: A, at: (u: number) => { const a=Math.PI+u/R; return [x0+R+R*Math.cos(a),y0+R+R*Math.sin(a)] } },
  ]
  let total = 0
  for (let i = 0; i < 8; i += 1) total += pieces[i].len
  const N = Math.max(8, Math.round(total / (2.6 * puff)))
  const rnd = rng(seed)
  const pts: number[][] = []
  for (let i = 0; i < N; i += 1) {
    let s = ((i + (rnd() - 0.5) * irr * 0.7) / N) * total
    s = ((s % total) + total) % total
    let k = 0
    while (k < 7 && s > pieces[k].len) {
      s -= pieces[k].len
      k++
    }
    pts.push(pieces[k].at(Math.max(0, s)))
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i <= N; i += 1) {
    const a = pts[i - 1]
    const b = pts[i % N]
    const c = Math.hypot(b[0] - a[0], b[1] - a[1])
    const hh = Math.max(2, puff * (1 - 0.35 * irr * rnd()))
    const r = (c*c/4 + hh*hh)/(2*hh)
    d += ` A${r.toFixed(1)} ${r.toFixed(1)} 0 ${(hh > r ? 1 : 0)} 1 ${b[0].toFixed(1)} ${b[1].toFixed(1)}`
  }
  return d + 'Z'
}

type CloudMetrics = {
  width: number
  padding: number
  puff: number
  name: number
  text: number
  year: number
  logo: number
  button: number
  centreButton: number
}

const anchors = [
  { w: 200, padding: 28, puff: 12, name: 15, text: 12, year: 12, logo: 40, button: 26, centre: 36 },
  { w: 240, padding: 28, puff: 12, name: 15, text: 12, year: 12, logo: 40, button: 26, centre: 36 },
  { w: 288, padding: 32, puff: 14, name: 15, text: 12, year: 12, logo: 44, button: 32, centre: 42 },
  { w: 420, padding: 39, puff: 18, name: 17.5, text: 13.5, year: 12.5, logo: 52, button: 40, centre: 50 },
  { w: 560, padding: 46, puff: 22, name: 20, text: 15, year: 14, logo: 64, button: 44, centre: 56 },
]

function interpolateMetric(value: number, key: keyof typeof anchors[number]) {
  if (value <= anchors[0].w) return anchors[0][key]
  if (value >= anchors[3].w) return anchors[3][key]
  for (let i = 0; i < anchors.length - 1; i += 1) {
    const low = anchors[i]
    const high = anchors[i + 1]
    if (value >= low.w && value <= high.w) {
      const ratio = (value - low.w) / (high.w - low.w)
      return low[key] + (high[key] - low[key]) * ratio
    }
  }
  return anchors[0][key]
}

export function Education() {
  const revealRef = useReveal<HTMLElement>()
  const timelineRef = useRef<HTMLOListElement>(null)
  const itemRefs = useRef<Array<HTMLLIElement | null>>([])
  const playRefs = useRef<Array<HTMLButtonElement | null>>([])
  const rewindRefs = useRef<Array<HTMLButtonElement | null>>([])
  const forwardRefs = useRef<Array<HTMLButtonElement | null>>([])
  const cloudRefs = useRef<Array<HTMLDivElement | null>>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [barSweep, setBarSweep] = useState(0)
  const [statusAnnouncement, setStatusAnnouncement] = useState('')
  const [cloudSize, setCloudSize] = useState({ width: 360, height: 240 })
  const [availableWidth, setAvailableWidth] = useState(360)
  const { dictionary, language } = useLanguage()

  const closeCloud = useCallback((returnFocus = true) => {
    if (openIndex === null) return
    const buttonIndex = openIndex
    setOpenIndex(null)
    setStatusAnnouncement('')
    if (returnFocus) {
      window.requestAnimationFrame(() => playRefs.current[buttonIndex]?.focus())
    }
  }, [openIndex])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (openIndex === null) return
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest('.education-timeline-item')) closeCloud(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openIndex !== null) {
        event.preventDefault()
        closeCloud(true)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeCloud, openIndex])

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return
    const updateWidth = () => {
      const rect = timeline.getBoundingClientRect()
      setAvailableWidth(Math.max(0, Math.min(560, rect.width)))
    }
    updateWidth()
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateWidth)
      observer.observe(timeline)
      return () => observer.disconnect()
    }
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  useEffect(() => {
    if (openIndex === null) return
    const cloud = cloudRefs.current[openIndex]
    if (!cloud) return
    const measure = () => {
      const rect = cloud.getBoundingClientRect()
      setCloudSize({ width: Math.ceil(rect.width), height: Math.ceil(rect.height) })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(cloud)
    return () => observer.disconnect()
  }, [openIndex, language])

  const cloudWidth = Math.min(560, availableWidth)
  const metrics: CloudMetrics = {
    width: cloudWidth,
    padding: interpolateMetric(cloudWidth, 'padding'),
    puff: interpolateMetric(cloudWidth, 'puff'),
    name: interpolateMetric(cloudWidth, 'name'),
    text: interpolateMetric(cloudWidth, 'text'),
    year: interpolateMetric(cloudWidth, 'year'),
    logo: interpolateMetric(cloudWidth, 'logo'),
    button: interpolateMetric(cloudWidth, 'button'),
    centreButton: interpolateMetric(cloudWidth, 'centre'),
  }
  const cloudCss = {
    '--education-cloud-width': `${metrics.width}px`,
    '--education-cloud-padding': `${metrics.padding}px`,
    '--education-cloud-puff': `${metrics.puff}px`,
    '--education-cloud-name': `${metrics.name}px`,
    '--education-cloud-text': `${metrics.text}px`,
    '--education-cloud-year': `${metrics.year}px`,
    '--education-cloud-logo': `${metrics.logo}px`,
    '--education-cloud-button': `${metrics.button}px`,
    '--education-cloud-centre': `${metrics.centreButton}px`,
  } as CSSProperties

  const moveToEntry = (nextIndex: number, pressed: 'rewind' | 'forward') => {
    setOpenIndex(nextIndex)
    setBarSweep((value) => value + 1)
    const entry = educationEntries[nextIndex]
    const name = localizedText(entry.institution, language)
    setStatusAnnouncement(
      dictionary.education.entryAnnouncement
        .replace('{current}', String(nextIndex + 1))
        .replace('{total}', String(educationEntries.length))
        .replace('{name}', name),
    )
    window.requestAnimationFrame(() => {
      const cloud = cloudRefs.current[nextIndex]
      cloud?.scrollIntoView({ block: 'nearest', behavior: 'auto' })
      if (pressed === 'rewind') rewindRefs.current[nextIndex]?.focus()
      else forwardRefs.current[nextIndex]?.focus()
    })
  }

  const goPrevious = (index: number) => moveToEntry((index - 1 + educationEntries.length) % educationEntries.length, 'rewind')
  const goNext = (index: number) => moveToEntry((index + 1) % educationEntries.length, 'forward')

  return (
    <section
      ref={(element) => { revealRef.current = element }}
      id="education"
      className="education-section education-reveal"
      aria-labelledby="education-title"
    >
      <Container className="education-layout">
        <header className="education-header">
          <p className="section-eyebrow">{dictionary.education.eyebrow}</p>
          <h2 id="education-title">{dictionary.education.title}</h2>
        </header>
        <ol ref={timelineRef} className="education-timeline">
          {educationEntries.map((entry, index) => {
            const isOpen = openIndex === index
            const institution = localizedText(entry.institution, language)
            const programme = localizedText(entry.programme, language)
            return (
              <li ref={(element) => { itemRefs.current[index] = element }} className="education-timeline-item" key={entry.id}>
                <span className="education-timeline-dot" aria-hidden="true" />
                <article className="education-entry">
                  <div className="education-entry-main">
                    <div className="education-logo-box">
                      {entry.logo ? <img src={entry.logo} width="48" height="48" alt="" loading="lazy" /> : <span className="education-logo-placeholder" aria-label={dictionary.education.logoPlaceholder}>{dictionary.education.logoPlaceholder}</span>}
                    </div>
                    <div className="education-entry-copy">
                      <h3 title={institution}>{institution}</h3>
                      <p className="education-programme" title={programme}>{programme}</p>
                    </div>
                    <button
                      ref={(element) => { playRefs.current[index] = element }}
                      className="education-play-button"
                      type="button"
                      aria-label={dictionary.education.showDetails.replace('{name}', institution)}
                      aria-expanded={isOpen}
                      aria-controls={`education-cloud-${entry.id}`}
                      onClick={() => isOpen ? closeCloud(true) : setOpenIndex(index)}
                    >
                      <span className={`education-play-symbol${isOpen ? ' is-open' : ''}`} aria-hidden="true" />
                    </button>
                  </div>
                </article>
                <div className="education-cloud-expander" data-open={isOpen}>
                  <div
                    ref={(element) => { cloudRefs.current[index] = element }}
                    id={`education-cloud-${entry.id}`}
                    className="education-cloud"
                    style={cloudCss}
                  >
                    <svg
                      className="education-cloud-outline"
                      width={cloudSize.width}
                      height={cloudSize.height}
                      viewBox={`0 0 ${cloudSize.width} ${cloudSize.height}`}
                      aria-hidden="true"
                    >
                      <path d={cloudPath(cloudSize.width, cloudSize.height, metrics.puff, 0.5, index + 1)} fill="var(--color-surface-raised)" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div className="education-cloud-content">
                      <div className="education-cloud-header">
                        <div className="education-logo-box education-logo-box-cloud">
                          {entry.logo ? <img src={entry.logo} width="64" height="64" alt="" loading="lazy" /> : <span className="education-logo-placeholder" aria-label={dictionary.education.logoPlaceholder}>{dictionary.education.logoPlaceholder}</span>}
                        </div>
                        <div><h3>{institution}</h3><p>{programme}</p></div>
                      </div>
                      {entry.achievements.length > 0 && (
                        <div className="education-achievement-line">
                          <TrophyIcon size={18} />
                          <p>{entry.achievements.map((achievement) => localizedText(achievement, language)).join(' · ')}</p>
                        </div>
                      )}
                      <div className="education-period-bar" role="img" aria-label={dictionary.education.periodLabel.replace('{start}', entry.startYear).replace('{end}', entry.endYear)}>
                        <span>{entry.startYear}</span>
                        <div className="education-period-track"><span key={barSweep} className="education-period-dot" /></div>
                        <span>{entry.endYear}</span>
                      </div>
                      <div className="education-player-controls">
                        <span className="education-player-decoration" aria-hidden="true">⇆</span>
                        <button ref={(element) => { rewindRefs.current[index] = element }} type="button" className="education-player-button" aria-label={dictionary.education.previousEntry} onClick={() => goPrevious(index)}><span aria-hidden="true">←</span></button>
                        <span className="education-player-decoration education-player-decoration-play" aria-hidden="true">▶</span>
                        <button ref={(element) => { forwardRefs.current[index] = element }} type="button" className="education-player-button" aria-label={dictionary.education.nextEntry} onClick={() => goNext(index)}><span aria-hidden="true">→</span></button>
                        <span className="education-player-decoration" aria-hidden="true">↻</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
        <a className="education-certificates-link" href="#/certificates">
          {dictionary.education.certificatesLink}<span aria-hidden="true">→</span>
        </a>
        <p className="visually-hidden" aria-live="polite" aria-atomic="true">{statusAnnouncement}</p>
      </Container>
    </section>
  )
}
