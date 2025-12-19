'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useResume, generateId } from '@/context/ResumeContext';

interface VoiceField {
    id: string;
    label: string;
    field: 'fullName' | 'phone' | 'location' | 'summary';
    icon: string;
}

const voiceFields: VoiceField[] = [
    { id: 'name', label: 'Full Name', field: 'fullName', icon: '👤' },
    { id: 'phone', label: 'Phone Number', field: 'phone', icon: '📱' },
    { id: 'location', label: 'Location', field: 'location', icon: '📍' },
    { id: 'summary', label: 'About Yourself', field: 'summary', icon: '✨' },
];

export default function VoiceInput() {
    const { resumeData, updateField } = useResume();
    const [isListening, setIsListening] = useState(false);
    const [activeField, setActiveField] = useState<VoiceField | null>(null);
    const [transcript, setTranscript] = useState('');
    const [isSupported, setIsSupported] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Check for browser support
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (!SpeechRecognition) {
                setIsSupported(false);
                setError('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
            }
        }
    }, []);

    const startListening = useCallback((field: VoiceField) => {
        if (!isSupported) return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-IN'; // Support for Indian English

        recognition.onstart = () => {
            setIsListening(true);
            setActiveField(field);
            setTranscript('');
            setError(null);
        };

        recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            setTranscript(finalTranscript || interimTranscript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setError(`Error: ${event.error}. Please try again.`);
            setIsListening(false);
            setActiveField(null);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    }, [isSupported]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        if (activeField && transcript.trim()) {
            updateField(activeField.field, transcript.trim());
        }

        setIsListening(false);
        setActiveField(null);
    }, [activeField, transcript, updateField]);

    const cancelListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
        setActiveField(null);
        setTranscript('');
    }, []);

    if (!isSupported) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Voice Input Not Available</h3>
                    <p className="text-gray-400">
                        {error || 'Please use Chrome or Edge browser for voice input feature.'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Voice Input
                </h3>
                <p className="text-gray-400">
                    Tap a field and speak your details in Hindi or English
                </p>
            </div>

            {/* Active Recording Overlay */}
            {isListening && activeField && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                    <div className="text-center max-w-lg p-8">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center voice-recording">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping" />
                        </div>

                        <h4 className="text-xl font-semibold text-white mb-2">
                            Listening for {activeField.label}...
                        </h4>

                        {/* Live Transcript */}
                        <div className="bg-slate-800 rounded-xl p-4 mb-6 min-h-[80px]">
                            <p className="text-white">
                                {transcript || <span className="text-gray-500 italic">Start speaking...</span>}
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={cancelListening}
                                className="px-6 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={stopListening}
                                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Voice Fields */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {voiceFields.map((field) => {
                        const currentValue = resumeData[field.field];
                        return (
                            <div
                                key={field.id}
                                className="card bg-slate-800/50 backdrop-blur-sm border-slate-700 p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{field.icon}</span>
                                        <div>
                                            <h4 className="font-medium text-white">{field.label}</h4>
                                            <p className="text-sm text-gray-400">Tap mic to record</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => startListening(field)}
                                        disabled={isListening}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isListening
                                                ? 'bg-gray-600 cursor-not-allowed'
                                                : 'bg-gradient-to-br from-bharat-saffron to-red-500 hover:scale-110'
                                            }`}
                                    >
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Current Value Display */}
                                <div className="bg-slate-900/50 rounded-lg p-3 min-h-[60px]">
                                    {currentValue ? (
                                        <p className="text-white">{currentValue}</p>
                                    ) : (
                                        <p className="text-gray-500 italic">Not recorded yet</p>
                                    )}
                                </div>

                                {currentValue && (
                                    <button
                                        onClick={() => updateField(field.field, '')}
                                        className="mt-2 text-sm text-red-400 hover:text-red-300"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-sm text-blue-300 font-medium">Tips for better recognition:</p>
                        <ul className="text-sm text-blue-200/80 mt-1 space-y-1">
                            <li>• Speak clearly and at a normal pace</li>
                            <li>• You can speak in Hindi or English</li>
                            <li>• Reduce background noise for better accuracy</li>
                        </ul>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}
        </div>
    );
}
