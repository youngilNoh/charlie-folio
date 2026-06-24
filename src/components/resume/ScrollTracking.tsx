'use client'

import { useScrollDepthTracking } from '@/hooks/useScrollTracking'

/**
 * Render-less client island. Isolates the scroll-depth side effect so the page
 * itself can remain a server component.
 */
export function ScrollTracking() {
  useScrollDepthTracking()
  return null
}
