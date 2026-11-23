import { Container } from '../components/Container'
import { SectionDecorations, type SectionDecorationPlacement } from '../components/SectionDecorations'
import { personalInfo } from '../data/personalInfo'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'

const contactDecorations: SectionDecorationPlacement[] = [
  { id: 'contact-star', kind: 'star', size: 14, top: 18, left: 24, hideBelow: 769 },
]

function isConfigured(value: string) {
  return value.trim().length > 0 && !value.includes('[[')
}

export function Contact() {
  const revealRef = useReveal<HTMLElement>()
  const { dictionary } = useLanguage()
  const socialLinks = [
    { label: dictionary.contact.github, href: personalInfo.githubUrl },
    { label: dictionary.contact.linkedin, href: personalInfo.linkedinUrl },
    { label: dictionary.contact.website, href: personalInfo.personalWebsiteUrl },
  ].filter(({ href }) => isConfigured(href))

  return (
    <section
      ref={revealRef}
      id="contact"
      className="contact-section contact-reveal"
      aria-labelledby="contact-title"
    >
      <SectionDecorations sectionId="contact" placements={contactDecorations} />
      <Container className="contact-layout">
        <div className="contact-invitation">
          <p className="section-eyebrow">{dictionary.contact.eyebrow}</p>
          <h2 id="contact-title">{dictionary.contact.title}</h2>
          <p>{dictionary.contact.invitation}</p>
        </div>
        <div className="contact-details">
          {isConfigured(personalInfo.email) && (
            <div className="contact-email">
              <h3>{dictionary.contact.emailLabel}</h3>
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </div>
          )}
          {socialLinks.length > 0 && (
            <nav aria-label={dictionary.contact.socialLabel}>
              <h3>{dictionary.contact.socialLabel}</h3>
              <ul>
                {socialLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </Container>
    </section>
  )
}
