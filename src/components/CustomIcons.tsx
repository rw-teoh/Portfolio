import type { ReactNode } from 'react'

type IconProps = {
  size?: number
  className?: string
}

function IconBase({
  children,
  size = 20,
  className,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </IconBase>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
      <path d="M8 11v6M12 17v-6m0 3c1-3 5-3 5 1v2" />
    </IconBase>
  )
}

export function GitHubIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.4c0-1 .1-1.6-.5-2.2 3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 20.3 6C20.7 4.8 20.7 3.7 20 2.6c0 0-1.1-.4-3.7 1.4A12.8 12.8 0 0 0 12 3.5c-1.5 0-3 .3-4.3.8C5.1 2.5 4 2.9 4 2.9A5.2 5.2 0 0 0 3.3 6a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7-.4.4-.6 1-.6 2.1V22" />
    </IconBase>
  )
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4v16m-6-6 6 6 6-6" />
    </IconBase>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </IconBase>
  )
}
