import { GitHubIcon, LinkedInIcon, MailIcon } from './CustomIcons'

type ContactStripProps = {
  email: string
  githubUrl: string
  linkedinUrl: string
  labels: {
    label: string
    email: string
    github: string
    linkedin: string
  }
}

function isConfigured(value: string) {
  return !value.startsWith('[[') && value.trim().length > 0
}

export function ContactStrip({
  email,
  githubUrl,
  linkedinUrl,
  labels,
}: ContactStripProps) {
  return (
    <aside className="contact-strip" aria-label={labels.label}>
      {isConfigured(email) && (
        <a href={`mailto:${email}`} aria-label={labels.email} title={labels.email}>
          <MailIcon size={20} />
        </a>
      )}
      {isConfigured(githubUrl) && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.github}
          title={labels.github}
        >
          <GitHubIcon size={20} />
        </a>
      )}
      {isConfigured(linkedinUrl) && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.linkedin}
          title={labels.linkedin}
        >
          <LinkedInIcon size={20} />
        </a>
      )}
    </aside>
  )
}
