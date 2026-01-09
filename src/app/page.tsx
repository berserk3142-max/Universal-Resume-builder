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
        <main className="min-h-screen bg-neo-cream">
            {/* Header */}
            <header className="bg-neo-yellow border-b-3 border-black">
                <div className="container mx-auto px-6 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-12 h-12 bg-neo-cyan border-2 border-black shadow-neo-sm flex items-center justify-center rounded-md group-hover:shadow-neo-md group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                <span className="text-black font-bold text-2xl font-display">R</span>
                            </div>
                            <span className="text-3xl font-display font-bold text-black">
                                Resume<span className="text-bharat-saffron">Kraft</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <SignedIn>
                                <Link
                                    href="/dashboard"
                                    className="text-black font-bold hover:underline underline-offset-4 transition-all"
                                >
                                    My Resumes
                                </Link>
                                <Link
                                    href="/builder"
                                    className="btn-neo-primary"
                                >
                                    Create Resume
                                </Link>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-10 h-10 border-2 border-black shadow-neo-sm',
                                        }
                                    }}
                                />
                            </SignedIn>
                            <SignedOut>
                                <Link
                                    href="/sign-in"
                                    className="text-black font-bold hover:underline underline-offset-4 transition-all"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="btn-neo-primary"
                                >
                                    Get Started Free
                                </Link>
                            </SignedOut>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-neo-cyan border-b-3 border-black">
                <div className="container mx-auto px-6 py-20 text-center">
                    <div className="max-w-5xl mx-auto">
                        <div
                            ref={badgeRef}
                            className="inline-flex items-center gap-2 bg-white border-2 border-black shadow-neo-sm px-5 py-2.5 mb-8 rounded-md"
                        >
                            <span className="w-3 h-3 bg-bharat-saffron border-2 border-black rounded-full" />
                            <span className="text-sm font-bold text-black">
                                Voice • Chat • Form • Image Input
                            </span>
                        </div>

                        <h1
                            ref={titleRef}
                            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-black mb-8 leading-[1.1] tracking-tight"
                        >
                            Build Your{' '}
                            <span className="relative inline-block">
                                <span className="bg-neo-pink px-4 py-1 border-2 border-black shadow-neo-md inline-block -rotate-1">
                                    Professional
                                </span>
                            </span>
                            <br />
                            Resume in Minutes
                        </h1>

                        <p
                            ref={subtitleRef}
                            className="text-xl md:text-2xl text-black mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
                        >
                            An inclusive resume builder for every worker in{' '}
                            <span className="font-bold bg-neo-yellow px-2 border-2 border-black">
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
                                className="btn-neo bg-bharat-saffron text-black flex items-center gap-2 text-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Start Building
                            </Link>
                            <Link
                                href="/builder?mode=voice"
                                className="btn-neo-outline flex items-center gap-3 text-lg"
                            >
                                <div className="w-10 h-10 bg-neo-pink border-2 border-black rounded-md flex items-center justify-center">
                                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                Use Voice
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Input Modes Section */}
            <section className="bg-white border-b-3 border-black">
                <div className="container mx-auto px-6 py-20">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-black text-center mb-4">
                        Choose Your{' '}
                        <span className="bg-neo-purple px-3 border-2 border-black shadow-neo-sm inline-block rotate-1">
                            Preferred
                        </span>{' '}
                        Input Method
                    </h2>
                    <p className="text-black font-medium text-center mb-12 max-w-xl mx-auto text-lg">
                        Multiple ways to build your resume - pick what feels most natural to you
                    </p>

                    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {/* Form Mode */}
                        <Link href="/builder?mode=form" className="group">
                            <div className="card-neo-hover bg-neo-blue h-full">
                                <div className="w-16 h-16 mx-auto mb-6 bg-white border-2 border-black shadow-neo-sm rounded-md flex items-center justify-center group-hover:shadow-neo-md group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2 text-center">Form</h3>
                                <p className="text-black text-sm text-center font-medium">
                                    Traditional step-by-step form with guided fields
                                </p>
                            </div>
                        </Link>

                        {/* Chat Mode */}
                        <Link href="/builder?mode=chat" className="group">
                            <div className="card-neo-hover bg-neo-purple h-full">
                                <div className="w-16 h-16 mx-auto mb-6 bg-white border-2 border-black shadow-neo-sm rounded-md flex items-center justify-center group-hover:shadow-neo-md group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2 text-center">Chat</h3>
                                <p className="text-black text-sm text-center font-medium">
                                    Conversational flow with guided questions
                                </p>
                            </div>
                        </Link>

                        {/* Voice Mode */}
                        <Link href="/builder?mode=voice" className="group">
                            <div className="card-neo-hover bg-neo-orange h-full">
                                <div className="w-16 h-16 mx-auto mb-6 bg-white border-2 border-black shadow-neo-sm rounded-md flex items-center justify-center group-hover:shadow-neo-md group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2 text-center">Voice</h3>
                                <p className="text-black text-sm text-center font-medium">
                                    Speak your details, we&apos;ll transcribe them
                                </p>
                            </div>
                        </Link>

                        {/* Image Mode */}
                        <Link href="/builder?mode=image" className="group">
                            <div className="card-neo-hover bg-neo-green h-full">
                                <div className="w-16 h-16 mx-auto mb-6 bg-white border-2 border-black shadow-neo-sm rounded-md flex items-center justify-center group-hover:shadow-neo-md group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2 text-center">Image</h3>
                                <p className="text-black text-sm text-center font-medium">
                                    Upload photos &amp; portfolio work samples
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="bg-neo-pink border-b-3 border-black">
                <div className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="card-neo bg-white text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-neo-yellow border-2 border-black shadow-neo-sm rounded-md flex items-center justify-center">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">PDF Export</h3>
                            <p className="text-black font-medium text-sm">
                                Download professional A4 PDF ready for printing or email
                            </p>
                        </div>

                        <div className="card-neo bg-white text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-neo-cyan border-2 border-black shadow-neo-sm rounded-md flex items-center justify-center">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">QR Code Sharing</h3>
                            <p className="text-black font-medium text-sm">
                                Share your profile instantly with a scannable QR code
                            </p>
                        </div>

                        <div className="card-neo bg-white text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-neo-green border-2 border-black shadow-neo-sm rounded-md flex items-center justify-center">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Version History</h3>
                            <p className="text-black font-medium text-sm">
                                Keep track of all your resume versions with notes
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t-3 border-black">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-neo-cyan border-2 border-white rounded-md flex items-center justify-center">
                                <span className="text-black font-bold text-lg font-display">R</span>
                            </div>
                            <span className="text-xl font-display font-bold text-white">
                                ResumeKraft
                            </span>
                        </div>
                        <p className="text-white font-medium">
                            Made with ❤️ for Bharat&apos;s workforce
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
