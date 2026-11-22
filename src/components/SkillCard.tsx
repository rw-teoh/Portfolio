import type { Skill } from '../data/skills'
import { GenericSkillIcon } from './CustomIcons'

type SkillCardProps = {
  skill: Skill
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <article className="skill-card">
      <span className="skill-card-icon" aria-hidden="true">
        <GenericSkillIcon size={22} />
      </span>
      <span>{skill.name}</span>
    </article>
  )
}
