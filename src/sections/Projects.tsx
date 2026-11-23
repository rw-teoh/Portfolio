import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from 'react'
import { Container } from '../components/Container'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'
import {
  SectionDecorations,
  type SectionDecorationPlacement,
} from '../components/SectionDecorations'

const projectsDecorations: SectionDecorationPlacement[] = [
  { id: 'projects-star', kind: 'star', size: 14, top: 18, left: 24, hideBelow: 1280 },
  { id: 'projects-plane', kind: 'plane', size: 30, top: 18, left: 64, hideBelow: 1280 },
]

function normalizeDegrees(value: number) {
  return ((value + 540) % 360) - 180
}

export function Projects() {
  const revealRef = useReveal<HTMLElement>()
  const ringRef = useRef<HTMLDivElement>(null)
  const measurementRef = useRef<HTMLSpanElement>(null)
  const liftMeasurementRef = useRef<HTMLSpanElement>(null)
  const hoverTimerRef = useRef<number | null>(null)
  const touchStartRef = useRef<number | null>(null)
  const [ringRotation, setRingRotation] = useState(0)
  const [frontIndex, setFrontIndex] = useState(0)
  const [announcement, setAnnouncement] = useState('')
  const [ringRadius, setRingRadius] = useState(115)
  const [ringLift, setRingLift] = useState(70)
  const { dictionary, language } = useLanguage()
  const projectCount = projects.length
  const usesRing = projectCount >= 4

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }, [])

  useEffect(() => clearHoverTimer, [clearHoverTimer])
  useEffect(() => {
    const measurement = measurementRef.current
    const liftMeasurement = liftMeasurementRef.current
    if (!measurement) {
      setRingRadius(115)
      setRingLift(liftMeasurement ? liftMeasurement.getBoundingClientRect().height : 70)
      return
    }

    const updateRingRadius = () => {
      const measuredRadius = measurement.getBoundingClientRect().width
      const measuredLift = liftMeasurement?.getBoundingClientRect().height
      setRingRadius(measuredRadius > 0 ? measuredRadius : 115)
      setRingLift(measuredLift && measuredLift > 0 ? measuredLift : 70)
    }

    updateRingRadius()
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateRingRadius)
      observer.observe(measurement)
      return () => observer.disconnect()
    }

    window.addEventListener('resize', updateRingRadius)
    return () => window.removeEventListener('resize', updateRingRadius)
  }, [])

  const bringToFront = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= projectCount) return

      if (nextIndex !== frontIndex) {
        setRingRotation((current) =>
          current +
          normalizeDegrees(-nextIndex * 72 - current),
        )

        const project = projects[nextIndex]
        const title = project.title[language] || project.title.en
        setAnnouncement(
          dictionary.projects.currentProjectAnnouncement
            .replace('{title}', title)
            .replace('{current}', String(nextIndex + 1))
            .replace('{total}', String(projectCount)),
        )
        setFrontIndex(nextIndex)
      }

      clearHoverTimer()
    },
    [
      clearHoverTimer,
      dictionary.projects.currentProjectAnnouncement,
      frontIndex,
      language,
      projectCount,
    ],
  )

  const handleCardHover = (index: number) => {
    if (
      index === frontIndex ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return
    }

    clearHoverTimer()
    hoverTimerRef.current = window.setTimeout(
      () => bringToFront(index),
      150,
    )
  }

  const handleRingKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || projectCount < 4) return

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      bringToFront((frontIndex + 1) % projectCount)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      bringToFront((frontIndex - 1 + projectCount) % projectCount)
    } else if (event.key === 'Home') {
      event.preventDefault()
      bringToFront(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      bringToFront(projectCount - 1)
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current === null) return
    const endX = event.changedTouches[0]?.clientX
    if (endX === undefined) return

    const distance = endX - touchStartRef.current
    touchStartRef.current = null
    if (Math.abs(distance) <= 40) return

    if (distance < 0) {
      bringToFront((frontIndex + 1) % projectCount)
    } else {
      bringToFront((frontIndex - 1 + projectCount) % projectCount)
    }
  }

  return (
    <section
      ref={revealRef}
      id="projects"
      className="projects-section projects-reveal"
      aria-labelledby="projects-title"
    >
      <SectionDecorations sectionId="projects" placements={projectsDecorations} />
      <Container className="projects-layout">
        <header className="projects-header">
          <p className="section-eyebrow">{dictionary.projects.eyebrow}</p>
          <h2 id="projects-title">{dictionary.projects.title}</h2>
          <p className="projects-intro">{dictionary.projects.intro}</p>
        </header>

        {projectCount === 0 ? (
          <div className="projects-empty-state">
            <h3>{dictionary.projects.emptyTitle}</h3>
            <p>{dictionary.projects.emptyDescription}</p>
          </div>
        ) : (
          <div className="projects-content">
            {usesRing ? (
              <>
                <div
                  ref={ringRef}
                  className="projects-ring"
                  role="region"
                  aria-roledescription={
                    dictionary.projects.carouselRoleDescription
                  }
                  aria-label={dictionary.projects.carouselLabel}
                  tabIndex={0}
                  onKeyDown={handleRingKeyDown}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <span
                    ref={measurementRef}
                    className="projects-ring-measurement"
                    aria-hidden="true"
                  />
                  <span
                    ref={liftMeasurementRef}
                    className="projects-ring-lift-measurement"
                    aria-hidden="true"
                  />
                  {projects.map((project, index) => {
                    const angle =
                      ((index * 72 + ringRotation + 540) % 360) - 180
                    const angleRadians = (angle * Math.PI) / 180
                    const x = Math.sin(angleRadians) * ringRadius
                    const z = Math.cos(angleRadians)
                    const k = (z + 1) / 2
                    const scale = 0.62 + 0.38 * k
                    const opacity = 0.55 + 0.45 * k
                    const y = -((1 - z) / 2) * ringLift
                    const depth = k
                    const isFront = index === frontIndex

                    return (
                      <div
                        key={project.id}
                        className="projects-ring-slot"
                        style={{
                          transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`,
                          opacity,
                          zIndex: 30 + Math.round(depth * 10),
                        }}
                        onMouseEnter={() => handleCardHover(index)}
                        onMouseLeave={clearHoverTimer}
                        onClick={() => bringToFront(index)}
                      >
                        <ProjectCard
                          project={project}
                          language={language}
                          slideIndex={index}
                          slideLabel={dictionary.projects.slideLabel
                            .replace('{current}', String(index + 1))
                            .replace('{total}', String(projectCount))}
                          slideRoleDescription={
                            dictionary.projects.slideRoleDescription
                          }
                          isFront={isFront}
                          linkLabels={{
                            repository: `PREVIEW ONLY: ${dictionary.projects.repositoryLink}`,
                            demo: `PREVIEW ONLY: ${dictionary.projects.demoLink}`,
                            technologies:
                              `PREVIEW ONLY: ${dictionary.projects.technologiesLabel}`,
                          }}
                        />
                      </div>
                    )
                  })}
                </div>

                <p
                  className="visually-hidden"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {announcement}
                </p>
              </>
            ) : (
              <div className="projects-simple-layout">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    language={language}
                    slideIndex={index}
                    slideLabel={dictionary.projects.slideLabel
                      .replace('{current}', String(index + 1))
                      .replace('{total}', String(projectCount))}
                    slideRoleDescription={
                      dictionary.projects.slideRoleDescription
                    }
                    isFront
                    linkLabels={{
                      repository: `PREVIEW ONLY: ${dictionary.projects.repositoryLink}`,
                      demo: `PREVIEW ONLY: ${dictionary.projects.demoLink}`,
                      technologies:
                        `PREVIEW ONLY: ${dictionary.projects.technologiesLabel}`,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="projects-static-list">
              {projects.map((project, index) => (
                <ProjectCard
                  key={`static-${project.id}`}
                  project={project}
                  language={language}
                  slideIndex={index}
                  slideLabel={dictionary.projects.slideLabel
                    .replace('{current}', String(index + 1))
                    .replace('{total}', String(projectCount))}
                  slideRoleDescription={
                    dictionary.projects.slideRoleDescription
                  }
                  isFront
                  linkLabels={{
                    repository: `PREVIEW ONLY: ${dictionary.projects.repositoryLink}`,
                    demo: `PREVIEW ONLY: ${dictionary.projects.demoLink}`,
                    technologies:
                      `PREVIEW ONLY: ${dictionary.projects.technologiesLabel}`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
