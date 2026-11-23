import { useCallback, useEffect, useRef, useState } from 'react'
import { CertificateViewer } from '../components/CertificateViewer'
import { Container } from '../components/Container'
import { certificates } from '../data/certificates'
import { useLanguage } from '../i18n/useLanguage'

export function CertificatesPage() {
  const { language, dictionary } = useLanguage()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [returnFocusElement, setReturnFocusElement] = useState<HTMLElement | null>(
    null,
  )
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeViewer = useCallback(() => setActiveIndex(null), [])
  const activeCertificate =
    activeIndex === null ? undefined : certificates[activeIndex]

  useEffect(() => {
    window.scrollTo(0, 0)
    headingRef.current?.focus()
  }, [])

  const openViewer = (index: number, trigger: HTMLElement) => {
    setReturnFocusElement(trigger)
    setActiveIndex(index)
  }

  const moveViewer = (offset: number) => {
    setActiveIndex((index) => {
      if (index === null || certificates.length === 0) return index
      return (index + offset + certificates.length) % certificates.length
    })
  }

  return (
    <main className="certificates-page">
      <Container className="certificates-layout">
        <a className="certificates-back-link" href="#home">
          {dictionary.shared.backToPortfolio}
        </a>
        <header className="certificates-header">
          <p className="section-eyebrow">{dictionary.certificates.eyebrow}</p>
          <h1 id="certificates-title" ref={headingRef} tabIndex={-1}>
            {dictionary.certificates.title}
          </h1>
        </header>
        {certificates.length === 0 ? (
          <div className="certificates-empty-state">
            <h2>{dictionary.certificates.emptyTitle}</h2>
            <p>{dictionary.certificates.emptyDescription}</p>
          </div>
        ) : (
          <section
            className="certificates-grid"
            aria-label={dictionary.certificates.collectionLabel}
          >
            {certificates.map((certificate, index) => {
              const alt =
                certificate.alt?.[language] ||
                certificate.alt?.en ||
                certificate.name
              return (
                <article className="certificate-card" key={certificate.id}>
                  <img
                    src={certificate.image}
                    width="320"
                    height="220"
                    alt={alt}
                    loading="lazy"
                  />
                  <div className="certificate-card-content">
                    <h2>{certificate.name}</h2>
                    <p>{certificate.platform}</p>
                    <p>{certificate.date}</p>
                    <button
                      type="button"
                      onClick={(event) => openViewer(index, event.currentTarget)}
                    >
                      {dictionary.shared.viewCertificate}
                    </button>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </Container>
      {activeCertificate && (
        <CertificateViewer
          certificate={activeCertificate}
          language={language}
          dialogLabel={dictionary.certificates.viewerLabel}
          closeLabel={dictionary.shared.close}
          previousLabel={dictionary.certificates.previous}
          nextLabel={dictionary.certificates.next}
          returnFocusElement={returnFocusElement}
          onClose={closeViewer}
          onPrevious={() => moveViewer(-1)}
          onNext={() => moveViewer(1)}
        />
      )}
    </main>
  )
}
