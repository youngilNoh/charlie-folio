'use client'

import { useEffect, useRef } from 'react'
import { track } from '@/lib/tracking'

/**
 * Scroll-depth instrumentation.
 *
 * ADAPTER BOUNDARY: this lightweight implementation is a placeholder until an
 * external analytics library with built-in scroll/engagement capture is wired
 * in. It feeds the same `track()` facade, so swapping it out later is local.
 *
 * Purpose: tell apart sections users reach from sections they don't — not to
 * compute a bounce rate.
 */
const SCROLL_MILESTONES = [25, 50, 75, 90, 100] as const

export function useScrollDepthTracking() {
  const fired = useRef(new Set<number>())

  useEffect(() => {
    const fire = (depth: number) => {
      if (fired.current.has(depth)) return
      fired.current.add(depth)
      track('scroll_depth', { depth })
    }

    const measure = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      // Page fits in the viewport: the user has effectively seen 100%.
      if (total <= 0) {
        SCROLL_MILESTONES.forEach(fire)
        return
      }
      const percent = Math.round((window.scrollY / total) * 100)
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone) fire(milestone)
      }
    }

    // Capture the initial state (covers load-and-leave / non-scrolling visits).
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    return () => window.removeEventListener('scroll', measure)
  }, [])
}
