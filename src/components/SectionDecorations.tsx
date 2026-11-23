import { useEffect } from 'react'

export type SectionDecorationPlacement = {
  id: string
  kind: 'star' | 'plane'
  size: number
  top: number
  left: number
  hideBelow: 769 | 1280
  delay?: number
}

type SectionDecorationsProps = {
  sectionId: string
  placements: readonly SectionDecorationPlacement[]
}

export function SectionDecorations({
  sectionId,
  placements,
}: SectionDecorationsProps) {
  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section) return

    let isIntersecting = typeof IntersectionObserver === 'undefined'
    const updateActiveState = () => {
      section.dataset.decorationsActive =
        isIntersecting && document.visibilityState === 'visible' ? 'true' : 'false'
    }

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (!entry) return
            isIntersecting = entry.isIntersecting
            updateActiveState()
          })

    observer?.observe(section)
    document.addEventListener('visibilitychange', updateActiveState)
    updateActiveState()

    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', updateActiveState)
      delete section.dataset.decorationsActive
    }
  }, [sectionId])

  return (
    <div className="section-decorations" aria-hidden="true">
      {placements.map((placement) => (
        <div
          key={placement.id}
          className="section-decoration"
          data-decoration-kind={placement.kind}
          data-hide-below={placement.hideBelow}
          style={{
            top: `${placement.top}px`,
            left: `${placement.left}px`,
            width: placement.kind === 'plane' ? '112px' : `${placement.size}px`,
            height: placement.kind === 'plane' ? '32px' : `${placement.size}px`,
          }}
        >
          {placement.kind === 'star' ? (
            <svg
              className="section-decoration-star"
              width={placement.size}
              height={placement.size}
              viewBox="0 0 24 24"
              aria-hidden="true"
              tabIndex={-1}
              focusable="false"
              style={{ animationDelay: `${placement.delay ?? 0}s` }}
            >
              <path
                d="M12 1.5 14.7 9.3 22.5 12l-7.8 2.7L12 22.5l-2.7-7.8L1.5 12l7.8-2.7z"
                fill="var(--color-accent)"
              />
            </svg>
          ) : (
            <>
              <svg
                className="section-decoration-route"
                width="112"
                height="32"
                viewBox="0 0 112 32"
                aria-hidden="true"
                tabIndex={-1}
                focusable="false"
                style={{ animationDelay: `${placement.delay ?? 0}s` }}
              >
                <path
                  d="M16 16C34 0 78 32 96 16"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeDasharray="3 5"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </svg>
              <svg
                className="section-decoration-plane"
                width="30"
                height="22"
                viewBox="0 0 30 22"
                aria-hidden="true"
                tabIndex={-1}
                focusable="false"
              >
                <path
                  d="m2 10 25-8-8 18-4-7-7-1 10-5-8 7z"
                  fill="var(--color-accent)"
                />
              </svg>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
