import { Hero } from './sections/Hero'
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
        </main>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
