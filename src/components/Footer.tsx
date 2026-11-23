import { personalInfo } from '../data/personalInfo'
import { useLanguage } from '../i18n/useLanguage'

const copyrightYear = new Date().getFullYear()

function isConfigured(value: string) {
  return value.trim().length > 0 && !value.includes('[[')
}

export function Footer() {
  const { dictionary } = useLanguage()
  const socialLinks = [
    { label: dictionary.contact.github, href: personalInfo.githubUrl },
    { label: dictionary.contact.linkedin, href: personalInfo.linkedinUrl },
    { label: dictionary.contact.website, href: personalInfo.personalWebsiteUrl },
  ].filter(({ href }) => isConfigured(href))
  const copyright = dictionary.footer.copyright
    .replace('{year}', String(copyrightYear))
    .replace('{initials}', personalInfo.initials)

  function handleBackToTop() {
    const heading = document.querySelector<HTMLElement>('#home h1')
    if (!heading) return

    heading.tabIndex = -1
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    heading.focus({ preventScroll: true })
  }

  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <a className="footer-brand" href="#home">
          {personalInfo.initials}
        </a>
        <nav className="footer-navigation" aria-label={dictionary.footer.navigationLabel}>
          <ul>
            <li><a href="#home">{dictionary.navigation.home}</a></li>
            <li><a href="#about">{dictionary.navigation.about}</a></li>
            <li><a href="#skills">{dictionary.navigation.skills}</a></li>
            <li><a href="#projects">{dictionary.navigation.projects}</a></li>
            <li><a href="#education">{dictionary.navigation.education}</a></li>
            <li><a href="#contact">{dictionary.navigation.contact}</a></li>
            <li><a href="#/certificates">{dictionary.shared.certificates}</a></li>
          </ul>
        </nav>
        {socialLinks.length > 0 && (
          <nav className="footer-socials" aria-label={dictionary.footer.socialLabel}>
            <ul>
              {socialLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <p className="footer-copyright">{copyright}</p>
        <button className="footer-back-to-top" type="button" onClick={handleBackToTop}>
          {dictionary.footer.backToTop}
        </button>
      </div>
    </footer>
  )
}
