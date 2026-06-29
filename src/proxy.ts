import { NextResponse, type NextRequest } from 'next/server'
import { nanoid } from 'nanoid'

/**
 * Ensures every visitor has a stable anonymous `stable-id` BEFORE the first
 * server render, so the server-evaluated photo variant is correct on first
 * paint (this is what eliminates the client-side flash).
 *
 * On a fresh visitor it generates the id, exposes it to THIS request's render
 * via the `x-stable-id` header, and persists it as a (non-httpOnly) cookie the
 * client analytics SDK can read to log events under the same id.
 *
 * Next 16 "proxy" convention (the successor to `middleware`).
 */
export const config = { matcher: '/' }

export function proxy(request: NextRequest) {
  if (request.cookies.get('stable-id')?.value) return NextResponse.next()

  const id = nanoid()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-stable-id', id)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.cookies.set('stable-id', id, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    // intentionally NOT httpOnly — the client analytics SDK reads it
  })
  return response
}
