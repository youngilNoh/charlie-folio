import { dedupe } from 'flags/next'
import type { Identify } from 'flags'
import type { Attributes } from '@flags-sdk/growthbook'
import { getStableId } from './get-stable-id'

/**
 * Supplies the attributes GrowthBook buckets on for server-side flag
 * evaluation. Buckets on `id` (GrowthBook's default hash attribute).
 */
export const identify = dedupe(async (): Promise<Attributes> => {
  return { id: await getStableId() }
}) satisfies Identify<Attributes>
