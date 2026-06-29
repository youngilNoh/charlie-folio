import { flag } from 'flags/next'
import { growthbookAdapter, type Attributes } from '@flags-sdk/growthbook'
import { identify } from '@/lib/identify'

/**
 * `profile_photo` experiment — evaluated SERVER-SIDE via the GrowthBook Flags
 * adapter so the SSR HTML is already correct per visitor (no client-side photo
 * flash / layout shift).
 *
 * Boolean GrowthBook feature `profile_photo`:
 *   true  = show the profile photo (control, variant A)
 *   false = hide it (treatment, variant B)
 *
 * Dashboard setup: create the boolean feature `profile_photo`, add an Experiment
 * rule splitting 50/50 on the `id` attribute, and START it. Reads
 * GROWTHBOOK_CLIENT_KEY / GROWTHBOOK_API_HOST from the environment.
 */
export const showProfilePhotoFlag = flag<boolean, Attributes>({
  key: 'profile_photo',
  defaultValue: true, // control: show the photo if the flag can't be resolved
  adapter: growthbookAdapter.feature<boolean>(),
  identify,
})
