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
 * Shows the logo image when configured; falls back to a brand monogram only
 * when there is no logo or it fails to load — so a missing /public asset never
 * renders a broken image, and a transparent/wide logo never lets the monogram
 * bleed through (the image sits on an opaque chip, not over the monogram).
 */
export function LogoMark({ src, name }: LogoMarkProps) {
  const [failed, setFailed] = useState(false)
  const initial = name.trim().charAt(0).toUpperCase()
  const showLogo = Boolean(src) && !failed

  if (!showLogo) {
    return (
      <div
        role="img"
        aria-label={`${name} logo`}
        className="shrink-0 w-10 h-10 rounded-md overflow-hidden border border-border bg-brand-subtle text-brand-subtle-foreground flex items-center justify-center text-base font-bold select-none"
      >
        <span aria-hidden="true">{initial}</span>
      </div>
    )
  }

  return (
    <div className="shrink-0 w-10 h-10 rounded-md overflow-hidden border border-border bg-white flex items-center justify-center">
      <Image
        src={src as string}
        alt={`${name} logo`}
        width={40}
        height={40}
        className="object-contain w-full h-full p-1"
        onError={() => setFailed(true)}
      />
    </div>
  )
}
