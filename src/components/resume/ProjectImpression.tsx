'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { track } from '@/lib/tracking'

interface ProjectImpressionProps {
  projectId: string
  className?: string
  children: React.ReactNode
}

/**
 * Client wrapper that renders a project card's <article> and logs a CTR
 * impression the first time the card scrolls into view. Visibility is detected
 * with `react-intersection-observer`; the card's text content stays
 * server-rendered.
 *
 * The variant is NOT attached here — GrowthBook joins this conversion to the
 * visitor's assigned variant by the shared stable id. threshold 0 fires as soon
 * as any part is visible (so cards taller than the viewport still count); the
 * `fired` ref makes it once-per-mount.
 */
export function ProjectImpression({ projectId, className, children }: ProjectImpressionProps) {
  const { ref, inView } = useInView({ threshold: 0 })
  const fired = useRef(false)

  useEffect(() => {
    if (!inView || fired.current) return
    fired.current = true
    track('project_impression', { project_id: projectId })
  }, [inView, projectId])

  return (
    <article ref={ref} className={className}>
      {children}
    </article>
  )
}
