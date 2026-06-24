'use client'

import { useEffect, useRef } from 'react'
import { track } from '@/lib/tracking'

interface TrackedSectionProps {
  id: string
  /** Accessible label for the section landmark. */
  label: string
  children: React.ReactNode
  className?: string
}

/**
 * Wraps a content section and reports engagement:
 *  - `section_view` once, the first time the section becomes visible
 *  - `time_on_section` (accumulated dwell seconds) on exit / unmount
 *
 * Dwell only accrues while the section is on-screen AND the tab is foregrounded,
 * so background-tab time is not counted. This is the signal that distinguishes
 * where users linger from where they don't.
 */
export function TrackedSection({ id, label, children, className = '' }: TrackedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const viewed = useRef(false)
  const visible = useRef(false)
  const dwellStart = useRef<number | null>(null)
  const dwellTotal = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const startTimer = () => {
      if (dwellStart.current === null) dwellStart.current = Date.now()
    }
    const stopTimer = () => {
      if (dwellStart.current !== null) {
        dwellTotal.current += Date.now() - dwellStart.current
        dwellStart.current = null
      }
    }
    const flush = () => {
      stopTimer()
      const seconds = Math.round(dwellTotal.current / 1000)
      if (seconds > 0) track('time_on_section', { section_id: id, seconds })
      dwellTotal.current = 0
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
        if (entry.isIntersecting) {
          if (!viewed.current) {
            viewed.current = true
            track('section_view', { section_id: id })
          }
          if (!document.hidden) startTimer()
        } else {
          flush()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)

    // Pause/resume the dwell timer with tab visibility.
    const onVisibility = () => {
      if (document.hidden) stopTimer()
      else if (visible.current) startTimer()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      flush()
    }
  }, [id])

  return (
    <section ref={ref} id={id} aria-label={label} className={className}>
      {children}
    </section>
  )
}
