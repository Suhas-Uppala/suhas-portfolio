export const metadata = {
  title: 'Suhas Portfolio - Interactive Terminal',
  description: 'Experience my portfolio through an interactive terminal interface. Explore my skills, projects, and professional journey in a unique way.',
  keywords: 'portfolio, developer, terminal, interactive, Next.js, React, TypeScript, Suhas',
  authors: [{ name: 'Suhas', url: 'https://github.com/suhas-dev' }],
  creator: 'Suhas',
  openGraph: {
    title: 'Suhas Portfolio - Interactive Terminal',
    description: 'Experience my portfolio through an interactive terminal interface.',
    url: 'https://suhas-portfolio-terminal.dev',
    siteName: 'Suhas Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Suhas Portfolio Terminal Interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suhas Portfolio - Interactive Terminal',
    description: 'Experience my portfolio through an interactive terminal interface.',
    creator: '@suhas_dev',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};