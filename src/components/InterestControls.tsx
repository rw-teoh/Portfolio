import { interestIds, type InterestId } from '../data/avatar'

type InterestControlsProps = {
  groupLabel: string
  labels: [string, string, string, string, string, string]
  unavailableLabel: string
  activeInterest: InterestId | null
  onInterestChange: (interest: InterestId) => void
}

const iconPaths: Record<InterestId, string[]> = {
  reading: ['M3 5h6a3 3 0 0 1 3 3v11a4 4 0 0 0-4-2H3Z', 'M21 5h-6a3 3 0 0 0-3 3v11a4 4 0 0 1 4-2h5Z'],
  drums: ['M4 10h16v7H4z', 'M7 10V7m10 3V7M7 7l10 3M17 7 7 10'],
  computer: ['M3 5h18v12H3z', 'M8 21h8m-4-4v4'],
  gym: ['M2 9v6m3-8v10m14-10v10m3-8v6M5 12h14'],
  photography: ['M3 7h4l2-3h6l2 3h4v12H3Z', 'circle:12:13:3'],
  rabbits: ['M7 10V4c0-2 3-2 3 0v6m4 0V4c0-2 3-2 3 0v6', 'M5 20c0-7 3-10 7-10s7 3 7 10'],
}

function InterestIcon({ interest }: { interest: InterestId }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[interest].map((path) =>
        path.startsWith('circle:')
          ? (() => {
              const [, cx, cy, r] = path.split(':')
              return <circle key={path} cx={cx} cy={cy} r={r} />
            })()
          : <path key={path} d={path} />,
      )}
    </svg>
  )
}

export function InterestControls({
  groupLabel,
  labels,
  unavailableLabel,
  activeInterest,
  onInterestChange,
}: InterestControlsProps) {
  return (
    <div className="hero-interest-controls" aria-label={groupLabel}>
      {interestIds.map((interest, index) => (
        <button
          key={interest}
          type="button"
          className={`hero-interest-button hero-interest-${interest}`}
          aria-label={
            interest === 'rabbits'
              ? `${labels[index]} — ${unavailableLabel}`
              : labels[index]
          }
          aria-pressed={activeInterest === interest}
          onClick={() => onInterestChange(interest)}
        >
          <InterestIcon interest={interest} />
          <span>{labels[index]}</span>
          {interest === 'rabbits' && (
            <small>{unavailableLabel}</small>
          )}
        </button>
      ))}
    </div>
  )
}
