import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.makefolders.com'),

    title: {
        default: 'Folder Structure Generator',
        template: '%s | Folder Structure Generator',
    },

    description:
        'Generate clean, scalable, and best-practice folder structures for modern web and backend projects.',

    keywords: [
        'folder structure generator',
        'project structure',
        'next.js folder structure',
        'backend architecture',
        'clean architecture',
        'software engineering tools',
    ],

    authors: [{ name: 'MultiPoth Tech' }],
    creator: 'MultiPoth Tech',

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
        },
    },

    openGraph: {
        type: 'website',
        url: 'https://www.makefolders.com',
        title: 'Folder Structure Generator',
        description:
            'Generate clean, scalable, and production-ready folder structures instantly.',
        siteName: 'Folder Structure Generator',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Folder Structure Generator Preview',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Folder Structure Generator',
        description:
            'Generate clean and scalable folder structures for your projects.',
        images: ['/og-image.png'],
    },

    alternates: {
        canonical: 'https://www.makefolders.com',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}): React.JSX.Element {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
                <Toaster richColors />
            </body>
        </html>
    )
}
