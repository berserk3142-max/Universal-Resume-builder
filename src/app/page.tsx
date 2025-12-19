'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useHeroAnimation, useCardAnimation, useSectionReveal } from '@/hooks/useAnimations';

// Dynamic import for Three.js to avoid SSR issues
const ThreeBackground = dynamic(() => import('@/components/three/ThreeBackground'), {
    ssr: false,
    loading: () => null,
});

export default function Home() {
    const { titleRef, subtitleRef, buttonsRef, badgeRef } = useHeroAnimation();
    const cardsRef = useCardAnimation();
    const featuresRef = useSectionReveal();

    return (
        <main className="min-h-screen relative overflow-hidden bg-dark-950">
            {/* 3D Background */}
            <ThreeBackground />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-dark-950/80 to-dark-950 pointer-events-none" />

            {/* Animated Gradient Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-bharat-saffron/30 to-primary-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-bharat-green/25 to-accent-emerald/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-accent-violet/15 to-accent-pink/10 rounded-full blur-3xl animate-pulse-soft" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <header className="container mx-auto px-6 py-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-11 h-11 bg-gradient-to-br from-bharat-saffron via-primary-500 to-bharat-green rounded-xl flex items-center justify-center shadow-lg shadow-bharat-saffron/20 group-hover:shadow-bharat-saffron/40 transition-all duration-300 group-hover:scale-105">
                                <span className="text-white font-bold text-xl">R</span>
                            </div>
                            <span className="text-2xl font-display font-bold text-white">
                                Resume<span className="bg-gradient-to-r from-bharat-saffron to-primary-400 bg-clip-text text-transparent">Kraft</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                                >
                                    My Resumes
                                </Link>
                                <Link
                                    href="/builder"
                                    className="relative px-6 py-2.5 bg-gradient-to-r from-bharat-saffron to-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-bharat-saffron/25 hover:shadow-bharat-saffron/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
                                >
                                    <span className="relative z-10">Create Resume</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-bharat-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Link>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-10 h-10 ring-2 ring-bharat-saffron/50 hover:ring-bharat-saffron transition-all duration-300',
                                        }
                                    }}
                                />
                            </SignedIn>
                            <SignedOut>
                                <Link
                                    href="/sign-in"
                                    className="text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="relative px-6 py-2.5 bg-gradient-to-r from-bharat-saffron to-primary-500 text-white font-semibold rounded-xl shadow-lg shadow-bharat-saffron/25 hover:shadow-bharat-saffron/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
                                >
                                    <span className="relative z-10">Get Started Free</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-bharat-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Link>
                            </SignedOut>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-6 py-20 text-center">
                    <div className="max-w-5xl mx-auto">
                        <div
                            ref={badgeRef}
                            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 mb-8"
                        >
                            <span className="w-2 h-2 bg-gradient-to-r from-bharat-saffron to-bharat-green rounded-full animate-pulse" />
                            <span className="text-sm font-medium bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                                Voice • Chat • Form • Image Input
                            </span>
                        </div>

                        <h1
                            ref={titleRef}
                            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight"
                        >
                            Build Your{' '}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-bharat-saffron via-primary-400 to-accent-pink bg-clip-text text-transparent">
                                    Professional
                                </span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                    <path d="M2 10C50 2 150 2 298 10" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                                            <stop stopColor="#FF9933" />
                                            <stop offset="0.5" stopColor="#f97316" />
                                            <stop offset="1" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                            <br />
                            Resume in Minutes
                        </h1>

                        <p
                            ref={subtitleRef}
                            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            An inclusive resume builder for every worker in{' '}
                            <span className="font-semibold bg-gradient-to-r from-bharat-saffron to-bharat-green bg-clip-text text-transparent">
                                Bharat
                            </span>
                            . Speak, chat, type, or upload — your way, your resume.
                        </p>

                        <div
                            ref={buttonsRef}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/builder"
                                className="group relative px-8 py-4 bg-gradient-to-r from-bharat-saffron via-primary-500 to-primary-600 text-white text-lg font-semibold rounded-2xl shadow-2xl shadow-bharat-saffron/30 hover:shadow-bharat-saffron/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Start Building
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-bharat-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Link>
                            <Link
                                href="/builder?mode=voice"
                                className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-lg font-medium rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-accent-violet to-accent-pink rounded-xl flex items-center justify-center shadow-lg shadow-accent-violet/30 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                Use Voice
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Input Modes Section */}
                <section className="container mx-auto px-6 py-20">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-4">
                        Choose Your{' '}
                        <span className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
                            Preferred
                        </span>{' '}
                        Input Method
                    </h2>
                    <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                        Multiple ways to build your resume - pick what feels most natural to you
                    </p>

                    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {/* Form Mode */}
                        <Link href="/builder?mode=form" className="group feature-card">
                            <div className="relative bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:border-blue-500/50 hover:bg-dark-800/60 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-blue-500/50 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 text-center">Form</h3>
                                    <p className="text-gray-400 text-sm text-center">
                                        Traditional step-by-step form with guided fields
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Chat Mode */}
                        <Link href="/builder?mode=chat" className="group feature-card">
                            <div className="relative bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:border-purple-500/50 hover:bg-dark-800/60 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:shadow-purple-500/50 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 text-center">Chat</h3>
                                    <p className="text-gray-400 text-sm text-center">
                                        Conversational flow with guided questions
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Voice Mode */}
                        <Link href="/builder?mode=voice" className="group feature-card">
                            <div className="relative bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:border-bharat-saffron/50 hover:bg-dark-800/60 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-bharat-saffron/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-bharat-saffron to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-bharat-saffron/30 group-hover:scale-110 group-hover:shadow-bharat-saffron/50 group-hover:animate-glow transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 text-center">Voice</h3>
                                    <p className="text-gray-400 text-sm text-center">
                                        Speak your details, we&apos;ll transcribe them
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Image Mode */}
                        <Link href="/builder?mode=image" className="group feature-card">
                            <div className="relative bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-500 hover:border-bharat-green/50 hover:bg-dark-800/60 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-bharat-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-bharat-green to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-bharat-green/30 group-hover:scale-110 group-hover:shadow-bharat-green/50 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 text-center">Image</h3>
                                    <p className="text-gray-400 text-sm text-center">
                                        Upload photos & portfolio work samples
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section ref={featuresRef} className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-bharat-saffron/20 to-primary-500/10 rounded-2xl flex items-center justify-center border border-bharat-saffron/20 group-hover:border-bharat-saffron/50 group-hover:scale-110 transition-all duration-300">
                                <svg className="w-8 h-8 text-bharat-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">PDF Export</h3>
                            <p className="text-gray-400 text-sm">
                                Download professional A4 PDF ready for printing or email
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-violet/20 to-accent-pink/10 rounded-2xl flex items-center justify-center border border-accent-violet/20 group-hover:border-accent-violet/50 group-hover:scale-110 transition-all duration-300">
                                <svg className="w-8 h-8 text-accent-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">QR Code Sharing</h3>
                            <p className="text-gray-400 text-sm">
                                Share your profile instantly with a scannable QR code
                            </p>
                        </div>

                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-cyan/20 to-accent-emerald/10 rounded-2xl flex items-center justify-center border border-accent-cyan/20 group-hover:border-accent-cyan/50 group-hover:scale-110 transition-all duration-300">
                                <svg className="w-8 h-8 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Version History</h3>
                            <p className="text-gray-400 text-sm">
                                Keep track of all your resume versions with notes
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="container mx-auto px-6 py-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-bharat-saffron to-bharat-green rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">R</span>
                            </div>
                            <span className="text-lg font-display font-bold text-white">
                                ResumeKraft
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Made with ❤️ for Bharat&apos;s workforce
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
