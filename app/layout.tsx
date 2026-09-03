import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://presupuesto-plataforma-salud.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Propuesta · Plataforma digital para profesionales de la salud | VanzaCode',
  description:
    'Presupuesto de desarrollo web para plataforma digital de nutricionista y psicóloga especialistas en pacientes bariátricos. Landing profesional, sistema de turnos online y portal de pacientes. Por VanzaCode.',
  openGraph: {
    title: 'Plataforma digital para profesionales de la salud — VanzaCode',
    description: 'Landing + sistema de turnos + portal de pacientes para nutricionista y psicóloga. Propuesta de VanzaCode.',
    url: SITE_URL,
    type: 'website',
    locale: 'es_AR',
  },
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0f1e',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
