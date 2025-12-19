'use client';

import React, { useRef } from 'react';
import { useResume } from '@/context/ResumeContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ResumePreview() {
    const { resumeData, isLoading } = useResume();
    const resumeRef = useRef<HTMLDivElement>(null);

    const downloadPDF = async () => {
        if (!resumeRef.current) return;

        try {
            const canvas = await html2canvas(resumeRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`${resumeData.fullName || 'resume'}_resume.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    };

    const getSkillLevel = (level?: string) => {
        switch (level) {
            case 'beginner': return 33;
            case 'intermediate': return 66;
            case 'expert': return 100;
            default: return 50;
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 p-2 bg-slate-800/50 rounded-lg">
                <span className="text-sm text-gray-400">Live Preview</span>
                <button
                    onClick={downloadPDF}
                    disabled={!resumeData.fullName}
                    className="btn-primary text-sm py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                </button>
            </div>

            {/* Resume Preview */}
            <div className="flex-1 overflow-auto bg-gray-100 rounded-lg p-4">
                <div
                    ref={resumeRef}
                    className="bg-white shadow-lg mx-auto"
                    style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }}
                >
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-6 pb-6 border-b-2 border-gray-200">
                        {resumeData.photo && (
                            <img
                                src={resumeData.photo}
                                alt="Profile"
                                className="w-28 h-28 rounded-full object-cover border-4 border-orange-500"
                            />
                        )}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {resumeData.fullName || 'Your Name'}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                {resumeData.phone && (
                                    <span className="flex items-center gap-1">
                                        <span>📱</span> {resumeData.phone}
                                    </span>
                                )}
                                {resumeData.email && (
                                    <span className="flex items-center gap-1">
                                        <span>✉️</span> {resumeData.email}
                                    </span>
                                )}
                                {resumeData.location && (
                                    <span className="flex items-center gap-1">
                                        <span>📍</span> {resumeData.location}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    {resumeData.summary && (
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-orange-600 mb-2 uppercase tracking-wide border-b border-orange-200 pb-1">
                                About Me
                            </h2>
                            <p className="text-gray-700 text-sm leading-relaxed">{resumeData.summary}</p>
                        </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-orange-600 mb-3 uppercase tracking-wide border-b border-orange-200 pb-1">
                                Work Experience
                            </h2>
                            <div className="space-y-4">
                                {resumeData.experience.map((exp, index) => (
                                    <div key={exp.id || index}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                                                <p className="text-gray-600 text-sm">{exp.company}{exp.location && ` • ${exp.location}`}</p>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                                            </span>
                                        </div>
                                        {exp.description && (
                                            <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-orange-600 mb-3 uppercase tracking-wide border-b border-orange-200 pb-1">
                                Education
                            </h2>
                            <div className="space-y-3">
                                {resumeData.education.map((edu, index) => (
                                    <div key={edu.id || index} className="flex justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                            <p className="text-gray-600 text-sm">{edu.institution}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm text-gray-500">{edu.year}</span>
                                            {edu.grade && <p className="text-sm text-gray-600">{edu.grade}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-orange-600 mb-3 uppercase tracking-wide border-b border-orange-200 pb-1">
                                Skills
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {resumeData.skills.map((skill, index) => (
                                    <div key={skill.id || index}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-700">{skill.name}</span>
                                            <span className="text-gray-500 capitalize">{skill.level}</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                                                style={{ width: `${getSkillLevel(skill.level)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {resumeData.languages.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-orange-600 mb-3 uppercase tracking-wide border-b border-orange-200 pb-1">
                                Languages
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {resumeData.languages.map((lang, index) => (
                                    <span
                                        key={lang.id || index}
                                        className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm"
                                    >
                                        {lang.name} <span className="text-orange-500">({lang.proficiency})</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Portfolio */}
                    {resumeData.portfolio.length > 0 && (
                        <div>
                            <h2 className="text-lg font-bold text-orange-600 mb-3 uppercase tracking-wide border-b border-orange-200 pb-1">
                                Portfolio
                            </h2>
                            <div className="grid grid-cols-4 gap-2">
                                {resumeData.portfolio.slice(0, 4).map((item, index) => (
                                    <div key={item.id || index} className="aspect-square rounded overflow-hidden">
                                        {item.type === 'image' ? (
                                            <img src={item.url} alt={item.title || 'Work sample'} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-2xl">🎥</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {!resumeData.fullName && (
                        <div className="flex items-center justify-center h-64 text-gray-400">
                            <div className="text-center">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-lg font-medium">Start filling your details</p>
                                <p className="text-sm">Your resume will appear here</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
