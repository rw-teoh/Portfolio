import { Container } from '../components/Container'
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

export function Education() {
  const revealRef = useReveal<HTMLElement>()
  const { dictionary, language } = useLanguage()

  return (
    <section
      ref={revealRef}
      id="education"
      className="education-section education-reveal"
      aria-labelledby="education-title"
    >
      <Container className="education-layout">
        <header className="education-header">
          <p className="section-eyebrow">{dictionary.education.eyebrow}</p>
          <h2 id="education-title">{dictionary.education.title}</h2>
        </header>

        <ol className="education-timeline">
          {educationEntries.map((entry) => (
            <li className="education-timeline-item" key={entry.id}>
              <span className="education-timeline-dot" aria-hidden="true" />
              <article className="education-entry">
                <p className="education-period">
                  {localizedText(entry.period, language)}
                </p>
                <h3>{localizedText(entry.institution, language)}</h3>
                <p className="education-programme">
                  {localizedText(entry.programme, language)}
                </p>
                {entry.achievements.length > 0 && (
                  <ul className="education-achievements">
                    {entry.achievements.map((achievement, index) => (
                      <li
                        key={`${entry.id}-achievement-${index}`}
                      >
                        {localizedText(achievement, language)}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>

        <a className="education-certificates-link" href="#/certificates">
          {dictionary.education.certificatesLink}
          <span aria-hidden="true">→</span>
        </a>
      </Container>
    </section>
  )
}
