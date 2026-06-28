'use client'

import { Button } from '@/components/ui/button'
import { Globe, FileText } from 'lucide-react'
import { track } from '@/lib/tracking'
import { RESUME } from '@/lib/resume-data'
import { ThemeToggle } from './ThemeToggle'

export function ResumeHeader() {
  const handleWebpageClick = () => {
    track('button_click', { label: 'Webpage', href: RESUME.links.webpage })
    window.open(RESUME.links.webpage, '_blank', 'noopener,noreferrer')
  }

  // Native print → "Save as PDF". The print stylesheet (globals.css) restyles
  // the page into the dense 2-page résumé layout for printing.
  const handlePrintClick = () => {
    track('button_click', { label: 'Print to PDF' })
    window.print()
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
          className="gap-1.5"
          onClick={handlePrintClick}
        >
          <FileText aria-hidden="true" />
          PDF
        </Button>

        <ThemeToggle />
      </nav>
    </header>
  )
}
