'use client'

import { useEffect } from 'react'
import { GrowthBook } from '@growthbook/growthbook'
import { growthbookTrackingPlugin } from '@growthbook/growthbook/plugins'
import { registerAnalyticsProvider } from '@/lib/tracking'

const EXPERIMENT_KEY = 'profile_photo'

// Module-level singleton: create exactly one GrowthBook logger per page load.
// This makes the island idempotent under React StrictMode's mount→unmount→remount
// (no second leaked instance, no duplicate exposure) without a destroy/recreate dance.
let gb: GrowthBook | null = null
let exposureLogged = false

function readCookie(name: string): string {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : 'anon'
}

/**
 * Render-less client analytics island.
 *
 * The photo variant is assigned + rendered on the server (see flags.ts), so this
 * does NOT decide UI. It only feeds data to GrowthBook's Managed Warehouse:
 *  - initializes the GrowthBook SDK with the SAME `stable-id` used server-side,
 *  - re-evaluates the experiment once so the tracking plugin logs the exposure
 *    ("Experiment Viewed") for this id,
 *  - routes every app event (project_impression/click, scroll, section) through
 *    the existing `track()` facade to `gb.logEvent`.
 * Assignment ↔ conversion join by the shared id (mapped to `device_id`).
 */
export function Analytics() {
  useEffect(() => {
    if (gb) return // already initialized this page load
    const clientKey = process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY
    if (!clientKey) return

    gb = new GrowthBook({
      apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
      clientKey,
      attributes: { id: readCookie('stable-id') },
      plugins: [growthbookTrackingPlugin()],
    })

    // The tracking plugin installs its event logger in the GrowthBook constructor,
    // so logEvent works (and queues) BEFORE init resolves. Register the provider
    // synchronously so the earliest impressions/clicks aren't dropped while the
    // feature payload is still loading.
    const instance = gb
    registerAnalyticsProvider({ track: (event, props) => void instance.logEvent(event, props) })

    instance
      .init({ streaming: false }) // logging-only client — no live feature updates needed
      .then(() => {
        if (!exposureLogged) {
          exposureLogged = true
          instance.isOn(EXPERIMENT_KEY) // logs the exposure for this id via the plugin
        }
      })
      .catch(() => {
        /* offline / blocked — events fall back to the dev console facade */
      })
  }, [])

  return null
}
