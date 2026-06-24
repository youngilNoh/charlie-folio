'use client'

import { track } from '@/lib/tracking'

interface TrackedLinkProps {
  href: string
  label: string
  external?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * A client leaf that guarantees every link emits a `link_click` event.
 * Keeping this a small island lets the surrounding layout stay server-rendered.
 */
export function TrackedLink({ href, label, external, className, children }: TrackedLinkProps) {
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={() => track('link_click', { label, href })}
    >
      {children}
    </a>
  )
}
