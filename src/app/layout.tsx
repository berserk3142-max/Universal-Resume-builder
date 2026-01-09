import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Big_Shoulders_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})

const bigShoulders = Big_Shoulders_Display({
    subsets: ['latin'],
    variable: '--font-big-shoulders',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'ResumeKraft - Universal Resume Builder for Bharat',
    description: 'Build professional resumes through voice, chat, or form. Perfect for blue-collar, grey-collar, and white-collar workers across India.',
    keywords: ['resume builder', 'CV maker', 'India jobs', 'blue collar', 'grey collar', 'voice resume'],
    authors: [{ name: 'ResumeKraft Team' }],
    openGraph: {
        title: 'ResumeKraft - Universal Resume Builder for Bharat',
        description: 'Create your professional resume in minutes using voice, chat, or form',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${inter.variable} ${outfit.variable} ${bigShoulders.variable}`}>
                <body className="antialiased">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
