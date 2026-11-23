import { useEffect, useRef } from 'react'
import type { Certificate } from '../data/certificates'
import type { Language } from '../i18n/types'

type CertificateViewerProps = {
  certificate: Certificate
  language: Language
  dialogLabel: string
  closeLabel: string
  previousLabel: string
  nextLabel: string
  returnFocusElement: HTMLElement | null
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export function CertificateViewer({
  certificate,
  language,
  dialogLabel,
  closeLabel,
  previousLabel,
  nextLabel,
  returnFocusElement,
  onClose,
  onPrevious,
  onNext,
}: CertificateViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const alt = certificate.alt?.[language] || certificate.alt?.en || certificate.name

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return

      const first = focusable.item(0)
      const last = focusable.item(focusable.length - 1)
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault()
        const destination = event.shiftKey ? last : first
        destination.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      returnFocusElement?.focus()
    }
  }, [onClose, returnFocusElement])

  return (
    <div
      className="certificate-viewer-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="certificate-viewer"
        role="dialog"
        aria-modal="true"
        aria-label={dialogLabel}
      >
        <button
          ref={closeRef}
          className="certificate-viewer-close"
          type="button"
          onClick={onClose}
        >
          {closeLabel}
        </button>
        <button
          className="certificate-viewer-previous"
          type="button"
          onClick={onPrevious}
        >
          {previousLabel}
        </button>
        <figure>
          <img src={certificate.image} width="640" height="440" alt={alt} />
          <figcaption>
            <strong>{certificate.name}</strong>
            <span>{certificate.platform}</span>
            <span>{certificate.date}</span>
          </figcaption>
        </figure>
        <button
          className="certificate-viewer-next"
          type="button"
          onClick={onNext}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
