'use client';

import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
    resumeId: string;
    fullName?: string;
}

export default function QRCodeDisplay({ resumeId, fullName }: QRCodeDisplayProps) {
    const qrRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const profileUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/resume/${resumeId}`
        : `/resume/${resumeId}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const downloadQR = () => {
        if (!qrRef.current) return;

        const svg = qrRef.current.querySelector('svg');
        if (!svg) return;

        try {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            // Set canvas size for high quality
            canvas.width = 360;
            canvas.height = 360;

            img.onload = () => {
                if (ctx) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
                const pngFile = canvas.toDataURL('image/png');

                const downloadLink = document.createElement('a');
                downloadLink.download = `${fullName || 'resume'}_qrcode.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            };

            img.onerror = () => {
                console.error('Failed to load QR code image');
            };

            // Use encodeURIComponent to handle Unicode characters properly
            const encodedSvg = encodeURIComponent(svgData);
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodedSvg;
        } catch (error) {
            console.error('Error downloading QR code:', error);
        }
    };

    return (
        <div className="card bg-slate-800/50 backdrop-blur-sm border-slate-700 text-center">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                <span className="text-xl">📱</span>
                Share Your Resume
            </h3>

            {/* QR Code */}
            <div
                ref={qrRef}
                className="inline-block p-4 bg-white rounded-xl mb-4"
            >
                <QRCodeSVG
                    value={profileUrl}
                    size={180}
                    level="H"
                    includeMargin={false}
                    fgColor="#1e293b"
                    bgColor="#ffffff"
                />
            </div>

            <p className="text-sm text-gray-400 mb-4">
                Scan this QR code to view your resume
            </p>

            {/* URL Display */}
            <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg mb-4">
                <input
                    type="text"
                    value={profileUrl}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-gray-300 outline-none"
                />
                <button
                    onClick={copyToClipboard}
                    className="p-2 text-primary-500 hover:text-primary-400 transition-colors"
                >
                    {copied ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={downloadQR}
                    className="flex-1 btn-outline text-sm py-2"
                >
                    Download QR
                </button>
                <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary text-sm py-2 inline-flex items-center justify-center gap-1"
                >
                    View Profile
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>

            {copied && (
                <div className="mt-3 p-2 bg-green-500/20 text-green-400 text-sm rounded-lg">
                    Link copied to clipboard!
                </div>
            )}
        </div>
    );
}
