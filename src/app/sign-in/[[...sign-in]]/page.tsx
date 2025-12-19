'use client';

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-bharat-saffron to-bharat-green rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-white">
                            Resume<span className="text-bharat-saffron">Kraft</span>
                        </span>
                    </div>
                    <p className="text-gray-400">Sign in to build your professional resume</p>
                </div>

                {/* Clerk Sign In Component */}
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto',
                            card: 'bg-slate-800/50 border border-slate-700 shadow-xl',
                            headerTitle: 'text-white',
                            headerSubtitle: 'text-gray-400',
                            socialButtonsBlockButton: 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600',
                            socialButtonsBlockButtonText: 'text-white',
                            dividerLine: 'bg-slate-600',
                            dividerText: 'text-gray-400',
                            formFieldLabel: 'text-gray-300',
                            formFieldInput: 'bg-slate-700 border-slate-600 text-white placeholder-gray-400',
                            formButtonPrimary: 'bg-gradient-to-r from-bharat-saffron to-bharat-green hover:opacity-90',
                            footerActionLink: 'text-bharat-saffron hover:text-bharat-green',
                            identityPreviewText: 'text-white',
                            identityPreviewEditButton: 'text-bharat-saffron',
                        },
                    }}
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    forceRedirectUrl="/builder"
                />
            </div>
        </div>
    );
}
