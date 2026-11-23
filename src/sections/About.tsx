import { Container } from '../components/Container'
import { personalInfo, personalInfoByLanguage } from '../data/personalInfo'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'

export function About() {
  const revealRef = useReveal<HTMLElement>()
  const { language, dictionary } = useLanguage()
  const localized = personalInfoByLanguage[language]
const AreaInterests = localized.AreaInterests
    .filter((interest) => interest !== '')
    .slice(0, 3)

  return (
    <section
      ref={revealRef}
      id="about"
      className="about-section about-reveal"
      aria-labelledby="about-title"
    >
      <Container className="about-layout">
        <div className="about-editorial">
          <p className="section-eyebrow">{dictionary.about.eyebrow}</p>
          <h2 id="about-title">{dictionary.about.title}</h2>
          <p className="about-introduction">
            {localized.aboutIntro}
          </p>
        </div>

        <aside className="about-details" aria-label={dictionary.about.detailsLabel}>
          <dl>
            <div>
              <dt>{dictionary.about.universityLabel}</dt>
              <dd>{personalInfo.university}</dd>
            </div>
            <div>
              <dt>{dictionary.about.programmeLabel}</dt>
              <dd>{personalInfo.programme}</dd>
            </div>
            <div>
              <dt>{dictionary.about.academicYearLabel}</dt>
              <dd>{personalInfo.academicYear}</dd>
            </div>
          </dl>

          <div className="about-detail-group">
            <h3>{dictionary.about.interestsLabel}</h3>
            <p>{localized.AreaInterests}</p>
          </div>

          <div className="about-detail-group">
            <h3>{dictionary.about.careerLabel}</h3>
            <p>{localized.careerAspiration}</p>
          </div>

          <div className="about-detail-group">
            <h3>{dictionary.about.learningLabel}</h3>
            <p>{localized.learningFocus}</p>
          </div>
        </aside>
      </Container>
    </section>
  )
}
