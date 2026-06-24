import { PhotoSection } from "./PhotoSection"

interface PhotoExperimentProps {
  src?: string
  name: string
}

/**
 * Photo area — the single swap point for the photo A/B test.
 *
 * The A/B test is currently DISABLED: the photo is always shown to everyone.
 *
 * Planned next experiment: variant B will REMOVE the photo area entirely.
 * To re-enable, make this a client component and drive it from usePhotoABTest()
 * (see hooks/useABTest.ts):
 *
 *   "use client"
 *   const { variant, ready } = usePhotoABTest()
 *   if (!ready) return null            // (or a skeleton) until resolved client-side
 *   if (variant === "B") return null   // photo area removed
 *   return <PhotoSection src={src} name={name} />
 */
export function PhotoExperiment({ src, name }: PhotoExperimentProps) {
  return <PhotoSection src={src} name={name} />
}
