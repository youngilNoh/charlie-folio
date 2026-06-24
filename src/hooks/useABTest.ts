'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { track } from '@/lib/tracking'

export type PhotoVariant = 'A' | 'B'

/**
 * Photo-area A/B test adapter.
 *
 * STATUS: currently DISABLED — PhotoExperiment shows the photo unconditionally,
 * so this hook is not called right now. It is kept as the ready-to-use seam.
 *
 * PLANNED next experiment: variant 'B' will REMOVE the photo area entirely
 * (PhotoExperiment returns null for 'B'), not swap to an initials avatar.
 *
 * ADAPTER BOUNDARY: variant assignment will be driven by an external
 * experimentation library (e.g. GrowthBook / Hackle) later. When that lands,
 * replace the body of `resolveVariant()` with `gb.getFeatureValue(...)` etc.;
 * the hook's public contract (returns 'A' | 'B', logs exposure once) stays the
 * same so PhotoExperiment only needs to branch on the variant.
 *
 * Implemented with useSyncExternalStore so the server/first paint renders a
 * neutral placeholder (no flash of the wrong variant) and there is no
 * setState-in-effect / hydration mismatch.
 */
const STORAGE_KEY = 'ab_photo_variant'

let cachedVariant: PhotoVariant | null = null

function resolveVariant(): PhotoVariant {
  if (cachedVariant) return cachedVariant
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as PhotoVariant | null
    if (stored === 'A' || stored === 'B') {
      cachedVariant = stored
    } else {
      cachedVariant = Math.random() < 0.5 ? 'A' : 'B'
      localStorage.setItem(STORAGE_KEY, cachedVariant)
    }
  } catch {
    cachedVariant = 'A'
  }
  return cachedVariant
}

const subscribe = () => () => {}
const getServerSnapshot = (): PhotoVariant | null => null

export interface PhotoABTest {
  variant: PhotoVariant
  /** False until the variant is resolved on the client — render a neutral placeholder while pending. */
  ready: boolean
}

export function usePhotoABTest(): PhotoABTest {
  const resolved = useSyncExternalStore(subscribe, resolveVariant, getServerSnapshot)
  const exposed = useRef(false)

  useEffect(() => {
    if (resolved && !exposed.current) {
      exposed.current = true
      track('ab_test_exposure', { test_name: 'photo_section', variant: resolved })
    }
  }, [resolved])

  return { variant: resolved ?? 'A', ready: resolved !== null }
}
