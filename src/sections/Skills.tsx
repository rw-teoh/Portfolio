import { Container } from '../components/Container'
import { SkillCard } from '../components/SkillCard'
import { skillCategories, type SkillCategoryId } from '../data/skills'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'

export function Skills() {
  const revealRef = useReveal<HTMLElement>()
  const { dictionary } = useLanguage()

  const categoryLabels: Record<SkillCategoryId, string> =
    dictionary.skills.categories

  return (
    <section
      ref={revealRef}
      id="skills"
      className="skills-section skills-reveal"
      aria-labelledby="skills-title"
    >
      <Container className="skills-layout">
        <header className="skills-header">
          <p className="section-eyebrow">{dictionary.skills.eyebrow}</p>
          <h2 id="skills-title">{dictionary.skills.title}</h2>
        </header>

        <div className="skills-stagger">
          {skillCategories.map((category, categoryIndex) => (
            <section
              key={category.id}
              className={`skills-category skills-category-${categoryIndex + 1}`}
              aria-labelledby={`skills-category-${category.id}`}
            >
              <h3 id={`skills-category-${category.id}`}>
                {categoryLabels[category.id]}
              </h3>
              <div className="skills-list">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  )
}
