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
      { id: 'skill-placeholder-1a', name: 'C++' },
      { id: 'skill-placeholder-1b', name: 'Python' },
      { id: 'skill-placeholder-1c', name: 'Java' },
    ],
  },
  {
    id: 'frontend',
    skills: [
      { id: 'skill-placeholder-2a', name: 'React.js' },
      { id: 'skill-placeholder-2b', name: 'HTML/CSS/JavaScript' },
    ],
  },
  {
    id: 'backend',
    skills: [
      { id: 'skill-placeholder-3a', name: 'Node.js' },
      //{ id: 'skill-placeholder-3b', name: '' },
    ],
  },
  {
    id: 'databases',
    skills: [
      { id: 'skill-placeholder-4a', name: 'MySQL' },
      //{ id: 'skill-placeholder-4b', name: '[[SKILL_NAME_8]]' },
    ],
  },
  {
    id: 'developerTools',
    skills: [
      { id: 'skill-placeholder-9', name: 'VS Code' },
      { id: 'skill-placeholder-10', name: 'GitHub' },
    ],
  },
  // {
  //   id: 'otherTechnologies',
  //   skills: [
  //     { id: 'skill-placeholder-11', name: '[[SKILL_NAME_11]]' },
  //     { id: 'skill-placeholder-12', name: '[[SKILL_NAME_12]]' },
  //   ],
  // },
]
