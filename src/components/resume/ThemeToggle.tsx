'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { track } from '@/lib/tracking'

/**
 * Light/dark theme toggle. The initial theme is applied before paint by the
 * inline script in layout.tsx; this reflects the current `.dark` class via
 * useSyncExternalStore (no setState-in-effect, no hydration mismatch) and
 * handles user toggles + persistence.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

const getSnapshot = () => document.documentElement.classList.contains('dark')
const getServerSnapshot = () => false

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = () => {
    const next = !isDark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    track('button_click', { label: 'theme_toggle', value: next ? 'dark' : 'light' })
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title="Toggle theme"
    >
      {isDark ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </Button>
  )
}
