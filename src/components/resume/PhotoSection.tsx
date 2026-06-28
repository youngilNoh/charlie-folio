"use client"

import { useState } from "react"
import Image from "next/image"

interface PhotoSectionProps {
  src?: string
  name: string
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
  return (
    <div
      role="img"
      aria-label={`${name} avatar`}
      className="flex items-center justify-center w-full h-full bg-brand text-brand-foreground text-4xl font-bold"
    >
      <span aria-hidden="true" className="select-none">
        {initials}
      </span>
    </div>
  )
}

export function PhotoSection({ src, name }: PhotoSectionProps) {
  // Falls back to the initials avatar if the photo is absent or fails to load,
  // so a missing /public asset never renders a broken image.
  const [imgFailed, setImgFailed] = useState(false)
  const showPhoto = Boolean(src) && !imgFailed

  return (
    <div
      data-identity-photo
      className="mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden border-4 border-sidebar-border shadow-lg"
    >
      {showPhoto ? (
        <Image
          src={src as string}
          alt={`${name} profile photo`}
          width={128}
          height={128}
          className="object-cover w-full h-full"
          onError={() => setImgFailed(true)}
          priority
        />
      ) : (
        <InitialsAvatar name={name} />
      )}
    </div>
  )
}
