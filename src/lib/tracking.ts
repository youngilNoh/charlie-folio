/**
 * Analytics adapter boundary.
 *
 * This file is intentionally a THIN facade. A third-party analytics library
 * (e.g. GA4 / GTM, Mixpanel, Amplitude) will be plugged in later — only this
 * file changes, never the call sites. Components always call `track(...)`.
 *
 * NOTE: We intentionally do NOT compute a bounce rate. The goal of the
 * engagement events below (scroll depth + per-section dwell time) is only to
 * distinguish *where users linger* from *where they don't* — not to aggregate
 * a single bounce metric.
 */

export type TrackEventName =
  | 'button_click'
  | 'link_click'
  | 'scroll_depth'
  | 'section_view'
  | 'time_on_section'
  | 'ab_test_exposure'

export interface TrackProperties {
  [key: string]: string | number | boolean | null | undefined
}

/** Shape every provider adapter must implement. Swap the implementation, keep the seam. */
export interface AnalyticsProvider {
  track: (event: TrackEventName, properties: TrackProperties) => void
}

let provider: AnalyticsProvider | null = null

/**
 * Register the external analytics provider once on app start (e.g. in a client
 * bootstrap). Until this is called, events are no-ops in production and logged
 * in development.
 *
 * Example (later):
 *   registerAnalyticsProvider({ track: (e, p) => window.gtag('event', e, p) })
 */
export function registerAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next
}

export function track(event: TrackEventName, properties: TrackProperties = {}): void {
  if (typeof window === 'undefined') return

  const enriched: TrackProperties = {
    ...properties,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
  }

  if (provider) {
    provider.track(event, enriched)
    return
  }

  if (process.env.NODE_ENV === 'development') {
    // No provider wired yet — surface the event so instrumentation is verifiable.
    console.log('[track]', event, enriched)
  }
}
