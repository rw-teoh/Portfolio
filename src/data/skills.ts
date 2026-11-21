export type SkillCategory = {
  name:
    | 'Programming Languages'
    | 'Frontend Development'
    | 'Backend Development'
    | 'Databases'
    | 'Developer Tools'
    | 'Other Technologies'
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  { name: 'Programming Languages', skills: ['[[SKILL_NAME]]'] },
  { name: 'Frontend Development', skills: ['[[SKILL_NAME]]'] },
  { name: 'Backend Development', skills: ['[[SKILL_NAME]]'] },
  { name: 'Databases', skills: ['[[SKILL_NAME]]'] },
  { name: 'Developer Tools', skills: ['[[SKILL_NAME]]'] },
  { name: 'Other Technologies', skills: ['[[SKILL_NAME]]'] },
]
