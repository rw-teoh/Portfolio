import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Education } from './sections/Education'
import { Navbar } from './components/Navbar'
import { LanguageProvider } from './i18n/LanguageProvider'
import { ThemeProvider } from './hooks/useTheme'

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Navbar />
        <main className="site-shell">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
        </main>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
