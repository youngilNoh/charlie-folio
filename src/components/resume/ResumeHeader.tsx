'use client'

import { Button } from '@/components/ui/button'
import { Globe, FileText } from 'lucide-react'
import { track } from '@/lib/tracking'
import { RESUME } from '@/lib/resume-data'
import { ThemeToggle } from './ThemeToggle'

export function ResumeHeader() {
  const hasPdf = Boolean(RESUME.links.pdf)

  const handleWebpageClick = () => {
    track('button_click', { label: 'Webpage', href: RESUME.links.webpage })
    window.open(RESUME.links.webpage, '_blank', 'noopener,noreferrer')
  }

  const handlePdfClick = () => {
    if (!hasPdf) return
    track('button_click', { label: 'PDF', href: RESUME.links.pdf })
    window.open(RESUME.links.pdf, '_blank', 'noopener,noreferrer')
  }

  return (
    <header className="print-hidden flex items-center justify-center gap-3 py-5">
      <nav aria-label="Resume actions" className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={handleWebpageClick}
        >
          <Globe aria-hidden="true" />
          Webpage
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
          onClick={handlePdfClick}
          aria-disabled={!hasPdf}
          aria-describedby={!hasPdf ? 'pdf-pending' : undefined}
          data-disabled={!hasPdf ? '' : undefined}
        >
          <FileText aria-hidden="true" />
          PDF
        </Button>
        {!hasPdf && (
          <span id="pdf-pending" className="sr-only">
            PDF link coming soon
          </span>
        )}

        <ThemeToggle />
      </nav>
    </header>
  )
}
