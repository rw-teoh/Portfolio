import type { Language } from '../i18n/types'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
  language: Language
  slideIndex: number
  slideLabel: string
  slideRoleDescription: string
  isFront: boolean
  linkLabels: {
    repository: string
    demo: string
    technologies: string
  }
}

export function ProjectCard({
  project,
  language,
  slideLabel,
  slideRoleDescription,
  isFront,
  linkLabels,
}: ProjectCardProps) {
  const title = project.title[language] || project.title.en
  const description = project.description[language] || project.description.en
  const imageAlt =
    project.image?.alt?.[language] ||
    project.image?.alt?.en ||
    title
  const technologies =
    project.technologies?.filter((technology) => technology.trim().length > 0) ??
    []
  const imageSrc = project.image?.src.trim()
  const repositoryUrl = project.repositoryUrl?.trim()
  const demoUrl = project.demoUrl?.trim()

    if (project.locked) {
    return (
      <article
        role="group"
        aria-roledescription={slideRoleDescription}
        aria-label={slideLabel}
        className="project-card project-card-locked"
        data-front={isFront}
      >
        <div className="project-card-content">
          <span className="locked-icon" aria-hidden="true">🔒</span>
          <h3 className="project-card-title">{title}</h3>
        </div>
      </article>
    )
  }

  return (
    <article
      role="group"
      aria-roledescription={slideRoleDescription}
      aria-label={slideLabel}
      className="project-card"
      data-front={isFront}
    >
      {project.image && imageSrc && (
        <div className="project-card-image-frame">
          <img
            className="project-card-image"
            src={imageSrc}
            alt={imageAlt}
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        {isFront && (
          <div className="project-card-front-details">
            <p className="project-card-description">{description}</p>

            {technologies.length > 0 && (
              <ul
                className="project-card-technologies"
                aria-label={linkLabels.technologies}
              >
                {technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            )}

            {(repositoryUrl || demoUrl) && (
              <div className="project-card-links">
                {repositoryUrl && (
                  <a
                    className="project-card-link"
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${linkLabels.repository}: ${title}`}
                  >
                    {linkLabels.repository}
                    <span
                      className="project-card-link-indicator"
                      aria-hidden="true"
                    />
                  </a>
                )}
                {demoUrl && (
                  <a
                    className="project-card-link"
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${linkLabels.demo}: ${title}`}
                  >
                    {linkLabels.demo}
                    <span
                      className="project-card-link-indicator"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
