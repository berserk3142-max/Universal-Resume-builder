'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useResume, generateId } from '@/context/ResumeContext';
import { PortfolioItem } from '@/types/resume';

interface UploadedFile {
    id: string;
    file: File;
    preview: string;
    type: 'image' | 'video';
}

export default function ImageUpload() {
    const { resumeData, updateField } = useResume();
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFiles = useCallback((files: FileList | null) => {
        if (!files) return;

        setIsUploading(true);
        const newFiles: UploadedFile[] = [];

        Array.from(files).forEach((file) => {
            const isImage = file.type.startsWith('image/');
            const isVideo = file.type.startsWith('video/');

            if (!isImage && !isVideo) return;

            const reader = new FileReader();
            reader.onloadend = () => {
                const newFile: UploadedFile = {
                    id: generateId(),
                    file,
                    preview: reader.result as string,
                    type: isImage ? 'image' : 'video',
                };
                newFiles.push(newFile);

                // Add to portfolio
                const portfolioItem: PortfolioItem = {
                    id: newFile.id,
                    type: newFile.type,
                    url: reader.result as string,
                    title: file.name,
                };

                setUploadedFiles((prev) => [...prev, newFile]);
                updateField('portfolio', [...resumeData.portfolio, portfolioItem]);
            };
            reader.readAsDataURL(file);
        });

        setIsUploading(false);
    }, [resumeData.portfolio, updateField]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    }, [processFiles]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
    }, [processFiles]);

    const handleProfilePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateField('photo', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [updateField]);

    const removeFile = useCallback((id: string) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
        updateField('portfolio', resumeData.portfolio.filter((p) => p.id !== id));
    }, [resumeData.portfolio, updateField]);

    const removeProfilePhoto = useCallback(() => {
        updateField('photo', '');
    }, [updateField]);

    return (
        <div className="h-full flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Upload Images & Portfolio
                </h3>
                <p className="text-gray-400">
                    Add your profile photo and work samples to showcase your skills
                </p>
            </div>

            {/* Profile Photo Section */}
            <div className="card bg-slate-800/50 backdrop-blur-sm border-slate-700 mb-6">
                <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">👤</span>
                    Profile Photo
                </h4>

                <div className="flex items-center gap-6">
                    {resumeData.photo ? (
                        <div className="relative">
                            <img
                                src={resumeData.photo}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-primary-500"
                            />
                            <button
                                onClick={removeProfilePhoto}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    )}

                    <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-3">
                            Upload a professional photo for your resume
                        </p>
                        <button
                            onClick={() => profileInputRef.current?.click()}
                            className="btn-outline text-sm py-2"
                        >
                            {resumeData.photo ? 'Change Photo' : 'Upload Photo'}
                        </button>
                        <input
                            ref={profileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePhotoUpload}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>

            {/* Portfolio Upload Section */}
            <div className="card bg-slate-800/50 backdrop-blur-sm border-slate-700 flex-1">
                <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">🖼️</span>
                    Work Portfolio
                    <span className="text-xs text-gray-400 font-normal">(For blue-collar workers: upload photos of your work)</span>
                </h4>

                {/* Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-gray-600 hover:border-gray-500 hover:bg-slate-700/50'
                        }`}
                >
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    <p className="text-white font-medium mb-1">
                        {isDragging ? 'Drop files here' : 'Drag & drop files or click to browse'}
                    </p>
                    <p className="text-gray-400 text-sm">
                        Supports images and videos up to 10MB
                    </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>

                {/* Uploaded Files Grid */}
                {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                        <h5 className="text-sm font-medium text-gray-300 mb-3">
                            Uploaded Files ({uploadedFiles.length})
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {uploadedFiles.map((file) => (
                                <div key={file.id} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden bg-slate-700">
                                        {file.type === 'image' ? (
                                            <img
                                                src={file.preview}
                                                alt={file.file.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <video
                                                src={file.preview}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                        <button
                                            onClick={() => removeFile(file.id)}
                                            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* File type badge */}
                                    <div className="absolute top-2 left-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${file.type === 'image'
                                                ? 'bg-blue-500/80 text-white'
                                                : 'bg-purple-500/80 text-white'
                                            }`}>
                                            {file.type === 'image' ? '📷' : '🎥'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips */}
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-sm text-green-300 font-medium">Portfolio Ideas:</p>
                            <ul className="text-sm text-green-200/80 mt-1 space-y-1">
                                <li>• Photos of completed work (construction, repairs, crafts)</li>
                                <li>• Certificates and training documents</li>
                                <li>• Short videos demonstrating your skills</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {isUploading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white">Uploading files...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
