export type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  githubUrl: string
  liveDemoUrl: string
}

export const projects: Project[] = []

// Example structure:
// {
//   id: "",
//   title: "",
//   description: "",
//   technologies: [],
//   image: "",
//   githubUrl: "",
//   liveDemoUrl: "",
// }
