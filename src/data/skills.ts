export type SkillCategoryId =
  | 'programmingLanguages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'developerTools'
  | 'otherTechnologies'

export type Skill = {
  id: string
  name: string
  icon?: string
}

export type SkillCategory = {
  id: SkillCategoryId
  skills: Skill[]
}

// Add or remove skills here. Keep a stable id and replace only the placeholder
// name with a real technology name. Add icon only after an icon asset decision.
export const skillCategories: SkillCategory[] = [
  {
    id: 'programmingLanguages',
    skills: [
      { id: 'skill-placeholder-1', name: '[[SKILL_NAME_1]]' },
      { id: 'skill-placeholder-2', name: '[[SKILL_NAME_2]]' },
    ],
  },
  {
    id: 'frontend',
    skills: [
      { id: 'skill-placeholder-3', name: '[[SKILL_NAME_3]]' },
      { id: 'skill-placeholder-4', name: '[[SKILL_NAME_4]]' },
    ],
  },
  {
    id: 'backend',
    skills: [
      { id: 'skill-placeholder-5', name: '[[SKILL_NAME_5]]' },
      { id: 'skill-placeholder-6', name: '[[SKILL_NAME_6]]' },
    ],
  },
  {
    id: 'databases',
    skills: [
      { id: 'skill-placeholder-7', name: '[[SKILL_NAME_7]]' },
      { id: 'skill-placeholder-8', name: '[[SKILL_NAME_8]]' },
    ],
  },
  {
    id: 'developerTools',
    skills: [
      { id: 'skill-placeholder-9', name: '[[SKILL_NAME_9]]' },
      { id: 'skill-placeholder-10', name: '[[SKILL_NAME_10]]' },
    ],
  },
  {
    id: 'otherTechnologies',
    skills: [
      { id: 'skill-placeholder-11', name: '[[SKILL_NAME_11]]' },
      { id: 'skill-placeholder-12', name: '[[SKILL_NAME_12]]' },
    ],
  },
]
