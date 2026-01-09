'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { ResumeProvider, useResume } from '@/context/ResumeContext';
import FormInput from '@/components/input/FormInput';
import ChatInput from '@/components/input/ChatInput';
import VoiceInput from '@/components/input/VoiceInput';
import ImageUpload from '@/components/input/ImageUpload';
import ResumePreview from '@/components/resume/ResumePreview';
import QRCodeDisplay from '@/components/share/QRCodeDisplay';
import { InputMode } from '@/types/resume';

function BuilderContent() {
    const searchParams = useSearchParams();
    const { inputMode, setInputMode, saveResume, currentResumeId, resumeData, isLoading } = useResume();
    const [showQR, setShowQR] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

    useEffect(() => {
        const mode = searchParams.get('mode') as InputMode | null;
        if (mode && ['form', 'chat', 'voice', 'image'].includes(mode)) {
            setInputMode(mode);
        }
    }, [searchParams, setInputMode]);

    const handleSave = async () => {
        setSaveStatus('saving');
        const id = await saveResume();
        if (id) {
            setSaveStatus('saved');
            setShowQR(true);
            setTimeout(() => setSaveStatus('idle'), 3000);
        } else {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
    };

    const inputModes = [
        { id: 'form', label: 'Form', icon: '📝', color: 'bg-neo-blue' },
        { id: 'chat', label: 'Chat', icon: '💬', color: 'bg-neo-purple' },
        { id: 'voice', label: 'Voice', icon: '🎙️', color: 'bg-neo-orange' },
        { id: 'image', label: 'Upload', icon: '📷', color: 'bg-neo-green' },
    ];

    return (
        <div className="min-h-screen bg-neo-cream">
            {/* Header */}
            <header className="bg-neo-yellow border-b-3 border-black sticky top-0 z-40">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-neo-cyan border-2 border-black shadow-neo-sm flex items-center justify-center rounded-md">
                                <span className="text-black font-bold text-lg font-display">R</span>
                            </div>
                            <span className="text-xl font-display font-bold text-black">
                                Resume<span className="text-bharat-saffron">Kraft</span>
                            </span>
                        </Link>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleSave}
                                disabled={!resumeData.fullName || isLoading}
                                className="btn-neo-primary text-sm py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saveStatus === 'saving' ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : saveStatus === 'saved' ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Saved!
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                        </svg>
                                        Save Resume
                                    </>
                                )}
                            </button>

                            {currentResumeId && (
                                <button
                                    onClick={() => setShowQR(true)}
                                    className="btn-neo-outline text-sm py-2 flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    QR Code
                                </button>
                            )}

                            {/* User Profile Button */}
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: 'w-9 h-9 border-2 border-black shadow-neo-sm',
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
                    {/* Left Panel - Input */}
                    <div className="flex flex-col overflow-hidden">
                        {/* Mode Tabs */}
                        <div className="flex gap-2 mb-4 p-2 bg-white border-2 border-black rounded-md">
                            {inputModes.map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => setInputMode(mode.id as InputMode)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-bold transition-all border-2 border-black ${inputMode === mode.id
                                            ? `${mode.color} shadow-neo-md -translate-x-0.5 -translate-y-0.5`
                                            : 'bg-white hover:bg-neo-cream'
                                        }`}
                                >
                                    <span>{mode.icon}</span>
                                    <span className="hidden sm:inline">{mode.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Input Component */}
                        <div className="flex-1 overflow-hidden card-neo p-0">
                            {inputMode === 'form' && <FormInput />}
                            {inputMode === 'chat' && <ChatInput />}
                            {inputMode === 'voice' && <VoiceInput />}
                            {inputMode === 'image' && <ImageUpload />}
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="hidden lg:flex flex-col overflow-hidden">
                        <ResumePreview />
                    </div>
                </div>
            </div>

            {/* Mobile Preview Button */}
            <div className="lg:hidden fixed bottom-6 right-6">
                <button className="w-14 h-14 bg-neo-cyan border-2 border-black shadow-neo-md rounded-md flex items-center justify-center hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>
            </div>

            {/* QR Code Modal */}
            {showQR && currentResumeId && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowQR(false)}>
                    <div onClick={(e) => e.stopPropagation()} className="max-w-md w-full">
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={() => setShowQR(false)}
                                className="w-10 h-10 bg-white border-2 border-black shadow-neo-sm rounded-md flex items-center justify-center hover:bg-neo-pink transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="bg-white border-3 border-black shadow-neo-xl rounded-md p-6">
                            <QRCodeDisplay resumeId={currentResumeId} fullName={resumeData.fullName} />
                        </div>
                    </div>
                </div>
            )}

            {/* Error Toast */}
            {saveStatus === 'error' && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neo-red border-2 border-black shadow-neo-md text-black font-bold px-6 py-3 rounded-md z-50">
                    Failed to save resume. Please try again.
                </div>
            )}
        </div>
    );
}

function BuilderLoading() {
    return (
        <div className="min-h-screen bg-neo-cream flex items-center justify-center">
            <div className="card-neo text-center">
                <div className="w-12 h-12 border-4 border-black border-t-neo-cyan rounded-full animate-spin mx-auto mb-4" />
                <p className="text-black font-bold">Loading builder...</p>
            </div>
        </div>
    );
}

export default function BuilderPage() {
    return (
        <ResumeProvider>
            <Suspense fallback={<BuilderLoading />}>
                <BuilderContent />
            </Suspense>
        </ResumeProvider>
    );
}
