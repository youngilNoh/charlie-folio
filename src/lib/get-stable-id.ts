import { cookies, headers } from 'next/headers'
import { dedupe } from 'flags/next'

/**
 * Stable anonymous visitor id used for server-side experiment assignment.
 *
 * Prefers the fresh id that middleware sets on the very first request (via the
 * `x-stable-id` request header) so the first server render is already correct;
 * otherwise reads the persisted `stable-id` cookie. The client analytics SDK
 * reads the SAME cookie, so GrowthBook joins assignment ↔ conversion by id.
 *
 * `dedupe` ensures it's computed once per request even if read in several places.
 */
export const getStableId = dedupe(async (): Promise<string> => {
  const fresh = (await headers()).get('x-stable-id')
  if (fresh) return fresh
  return (await cookies()).get('stable-id')?.value ?? 'anon'
})
