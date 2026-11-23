import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ContactStrip } from './components/ContactStrip'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Education } from './sections/Education'
import { Contact } from './sections/Contact'
import { CertificatesPage } from './pages/CertificatesPage'
import { Navbar } from './components/Navbar'
import { personalInfo } from './data/personalInfo'
import { LanguageProvider } from './i18n/LanguageProvider'
import { ThemeProvider } from './hooks/useTheme'
import { useLanguage } from './i18n/useLanguage'

function AppContent() {
  const { dictionary } = useLanguage()
  const [isCertificatesPage, setIsCertificatesPage] = useState(
    () => window.location.hash === '#/certificates',
  )
  const originalTitleRef = useRef(document.title)
  const wasCertificatesPageRef = useRef(isCertificatesPage)
  const pendingSectionRef = useRef<string | null>(null)

  useEffect(() => {
    function handleHashChange() {
      const isCertificates = window.location.hash === '#/certificates'
      if (wasCertificatesPageRef.current && !isCertificates) {
        const sectionId = window.location.hash.slice(1)
        if (sectionId && !sectionId.startsWith('/')) {
          pendingSectionRef.current = sectionId
        }
      }
      wasCertificatesPageRef.current = isCertificates
      setIsCertificatesPage(isCertificates)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useLayoutEffect(() => {
    document.title = isCertificatesPage
      ? dictionary.certificates.documentTitle
      : originalTitleRef.current
  }, [dictionary.certificates.documentTitle, isCertificatesPage])

  useEffect(() => {
    if (isCertificatesPage || !pendingSectionRef.current) return
    const sectionId = pendingSectionRef.current
    pendingSectionRef.current = null
    window.requestAnimationFrame(() => {
      const section = document.getElementById(sectionId)
      const heading = section?.querySelector<HTMLElement>('h1, h2')
      if (!section || !heading) return
      section.scrollIntoView({ block: 'start', behavior: 'auto' })
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
    })
  }, [isCertificatesPage])

  return (
    <>
      <Navbar isCertificatesPage={isCertificatesPage} />
      {isCertificatesPage ? (
        <>
          <ContactStrip
            email={personalInfo.email}
            githubUrl={personalInfo.githubUrl}
            linkedinUrl={personalInfo.linkedinUrl}
            labels={dictionary.contactStrip}
          />
          <CertificatesPage />
        </>
      ) : (
        <main className="site-shell">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
      )}
      {!isCertificatesPage && <Footer />}
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
