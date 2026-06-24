import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { RESUME } from '@/lib/resume-data'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = RESUME.links.webpage
const description = `${RESUME.personal.title} based in ${RESUME.personal.location}. ${RESUME.summary}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${RESUME.personal.name} — ${RESUME.personal.title}`,
    template: `%s · ${RESUME.personal.name}`,
  },
  description,
  applicationName: `${RESUME.personal.name} Portfolio`,
  authors: [{ name: RESUME.personal.name, url: RESUME.links.github }],
  keywords: [
    'Frontend Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Vue',
    'Nuxt',
    RESUME.personal.name,
    'Melbourne',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: siteUrl,
    siteName: `${RESUME.personal.name} — Portfolio`,
    title: `${RESUME.personal.name} — ${RESUME.personal.title}`,
    description,
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${RESUME.personal.name} — ${RESUME.personal.title}`,
    description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1b2b5a' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1830' },
  ],
}

// Applies the persisted/system theme before first paint to avoid a flash of the wrong theme.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark')}}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
