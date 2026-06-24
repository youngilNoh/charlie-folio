"use client"

import { useState } from "react"
import Image from "next/image"

interface LogoMarkProps {
  src?: string
  /** Entity name — used for the alt text and the monogram fallback. */
  name: string
}

/**
 * Square logo badge used next to company names and project titles.
 *
 * The brand monogram is always rendered as the base layer, and the logo image
 * (when configured) is overlaid on top — so there is no empty-box flash while a
 * logo loads, and a missing/failed /public asset cleanly shows the monogram.
 * Drop a logo at the configured path (e.g. /public/images/logos/<slug>.png) and
 * it appears automatically.
 */
export function LogoMark({ src, name }: LogoMarkProps) {
  const [failed, setFailed] = useState(false)
  const initial = name.trim().charAt(0).toUpperCase()
  const showLogo = Boolean(src) && !failed

  return (
    <div className="relative shrink-0 w-10 h-10 rounded-md overflow-hidden border border-border bg-card">
      <span
        {...(showLogo ? { "aria-hidden": true } : { role: "img", "aria-label": `${name} logo` })}
        className="absolute inset-0 flex items-center justify-center bg-brand-subtle text-brand-subtle-foreground text-base font-bold select-none"
      >
        <span aria-hidden="true">{initial}</span>
      </span>
      {showLogo && (
        <Image
          src={src as string}
          alt={`${name} logo`}
          width={40}
          height={40}
          className="absolute inset-0 object-contain w-full h-full"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
