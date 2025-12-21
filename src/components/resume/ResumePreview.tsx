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

    // Group skills by proficiency level
    const proficientSkills = resumeData.skills.filter(s => s.level === 'expert');
    const comfortableSkills = resumeData.skills.filter(s => s.level !== 'expert');

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
                    style={{
                        width: '210mm',
                        minHeight: '297mm',
                        padding: '12mm 15mm',
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: '10pt',
                        lineHeight: '1.3',
                        color: '#000'
                    }}
                >
                    {/* Header */}
                    <div className="mb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 style={{
                                    fontSize: '18pt',
                                    fontWeight: 'bold',
                                    marginBottom: '2px',
                                    color: '#000'
                                }}>
                                    {resumeData.fullName || 'Your Name'}
                                </h1>
                                {resumeData.linkedin && (
                                    <a
                                        href={resumeData.linkedin}
                                        style={{
                                            color: '#008B8B',
                                            textDecoration: 'underline',
                                            fontSize: '9pt'
                                        }}
                                    >
                                        {resumeData.linkedin}
                                    </a>
                                )}
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '9pt' }}>
                                {resumeData.email && (
                                    <div>Email : {resumeData.email}</div>
                                )}
                                {resumeData.phone && (
                                    <div>Mobile : {resumeData.phone}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    {resumeData.education.length > 0 && (
                        <div className="mb-3">
                            <h2 style={{
                                fontVariant: 'small-caps',
                                fontSize: '11pt',
                                fontWeight: 'bold',
                                color: '#008B8B',
                                borderBottom: '1px solid #008B8B',
                                paddingBottom: '1px',
                                marginBottom: '6px'
                            }}>
                                Education
                            </h2>
                            {resumeData.education.map((edu, index) => (
                                <div key={edu.id || index} className="flex justify-between mb-2">
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>{edu.institution}</span>
                                        {edu.location && (
                                            <span style={{ float: 'right' }}>{edu.location}</span>
                                        )}
                                        <div>
                                            <span style={{ fontStyle: 'italic' }}>{edu.degree}</span>
                                            {edu.grade && (
                                                <span>; CGPA: {edu.grade}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap', marginLeft: '20px' }}>
                                        {edu.year}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Experience Section */}
                    {resumeData.experience.length > 0 && (
                        <div className="mb-3">
                            <h2 style={{
                                fontVariant: 'small-caps',
                                fontSize: '11pt',
                                fontWeight: 'bold',
                                color: '#008B8B',
                                borderBottom: '1px solid #008B8B',
                                paddingBottom: '1px',
                                marginBottom: '6px'
                            }}>
                                Experience
                            </h2>
                            {resumeData.experience.map((exp, index) => (
                                <div key={exp.id || index} className="mb-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <span style={{ fontWeight: 'bold' }}>{exp.company}</span>
                                            {exp.location && (
                                                <span style={{ marginLeft: '20px' }}>{exp.location}</span>
                                            )}
                                        </div>
                                        <div style={{ whiteSpace: 'nowrap' }}>
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                                        </div>
                                    </div>
                                    <div style={{ fontStyle: 'italic', marginBottom: '4px' }}>
                                        {exp.title}
                                    </div>
                                    {exp.description && (
                                        <ul style={{ marginLeft: '15px', marginTop: '2px' }}>
                                            {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                                <li key={i} style={{
                                                    listStyleType: 'circle',
                                                    marginBottom: '2px',
                                                    paddingLeft: '5px'
                                                }}>
                                                    {line.replace(/^[-•○]\s*/, '')}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Projects Section */}
                    {resumeData.projects && resumeData.projects.length > 0 && (
                        <div className="mb-3">
                            <h2 style={{
                                fontVariant: 'small-caps',
                                fontSize: '11pt',
                                fontWeight: 'bold',
                                color: '#008B8B',
                                borderBottom: '1px solid #008B8B',
                                paddingBottom: '1px',
                                marginBottom: '6px'
                            }}>
                                Projects
                            </h2>
                            {resumeData.projects.map((project, index) => (
                                <div key={project.id || index} className="mb-3">
                                    <div className="flex justify-between">
                                        <div>
                                            <span style={{ fontWeight: 'bold' }}>{project.title}</span>
                                            {project.startDate && (
                                                <span style={{ marginLeft: '10px' }}>
                                                    ({formatDate(project.startDate)}
                                                    {project.endDate && ` – ${formatDate(project.endDate)}`})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {project.description && (
                                        <ul style={{ marginLeft: '15px', marginTop: '2px' }}>
                                            {project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                                <li key={i} style={{
                                                    listStyleType: 'circle',
                                                    marginBottom: '2px',
                                                    paddingLeft: '5px'
                                                }}>
                                                    {line.replace(/^[-•○]\s*/, '')}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {project.techStack && (
                                        <div style={{ marginLeft: '15px', marginTop: '2px' }}>
                                            <span style={{ fontWeight: 'bold' }}>Tech Stack: </span>
                                            {project.techStack}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Achievements Section */}
                    {resumeData.achievements && resumeData.achievements.length > 0 && (
                        <div className="mb-3">
                            <h2 style={{
                                fontVariant: 'small-caps',
                                fontSize: '11pt',
                                fontWeight: 'bold',
                                color: '#008B8B',
                                borderBottom: '1px solid #008B8B',
                                paddingBottom: '1px',
                                marginBottom: '6px'
                            }}>
                                Achievements and Responsibilities
                            </h2>
                            <ul style={{ marginLeft: '15px' }}>
                                {resumeData.achievements.map((achievement, index) => (
                                    <li key={achievement.id || index} style={{
                                        listStyleType: 'disc',
                                        marginBottom: '3px',
                                        paddingLeft: '5px'
                                    }}>
                                        <span style={{ fontWeight: 'bold' }}>{achievement.title}</span>
                                        {achievement.description && (
                                            <span>: {achievement.description}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Skills Section */}
                    {resumeData.skills.length > 0 && (
                        <div className="mb-3">
                            <h2 style={{
                                fontVariant: 'small-caps',
                                fontSize: '11pt',
                                fontWeight: 'bold',
                                color: '#008B8B',
                                borderBottom: '1px solid #008B8B',
                                paddingBottom: '1px',
                                marginBottom: '6px'
                            }}>
                                Skills
                            </h2>
                            <div>
                                {proficientSkills.length > 0 && (
                                    <div style={{ marginBottom: '4px' }}>
                                        <span style={{ fontWeight: 'bold' }}>• Proficient: </span>
                                        {proficientSkills.map(s => s.name).join(', ')}
                                    </div>
                                )}
                                {comfortableSkills.length > 0 && (
                                    <div style={{ marginBottom: '4px' }}>
                                        <span style={{ fontWeight: 'bold' }}>• Comfortable: </span>
                                        {comfortableSkills.map(s => s.name).join(', ')}
                                    </div>
                                )}
                                {proficientSkills.length === 0 && comfortableSkills.length === 0 && resumeData.skills.length > 0 && (
                                    <div style={{ marginBottom: '4px' }}>
                                        <span style={{ fontWeight: 'bold' }}>• Skills: </span>
                                        {resumeData.skills.map(s => s.name).join(', ')}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Languages Section */}
                    {resumeData.languages.length > 0 && (
                        <div className="mb-3">
                            <h2 style={{
                                fontVariant: 'small-caps',
                                fontSize: '11pt',
                                fontWeight: 'bold',
                                color: '#008B8B',
                                borderBottom: '1px solid #008B8B',
                                paddingBottom: '1px',
                                marginBottom: '6px'
                            }}>
                                Languages
                            </h2>
                            <div>
                                {resumeData.languages.map((lang, index) => (
                                    <span key={lang.id || index}>
                                        {lang.name} ({lang.proficiency})
                                        {index < resumeData.languages.length - 1 && ', '}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Summary/About Section (optional, at end) */}
                    {resumeData.summary && (
                        <div className="mb-3">
                            <h2 style={{
                                fontVariant: 'small-caps',
                                fontSize: '11pt',
                                fontWeight: 'bold',
                                color: '#008B8B',
                                borderBottom: '1px solid #008B8B',
                                paddingBottom: '1px',
                                marginBottom: '6px'
                            }}>
                                Summary
                            </h2>
                            <p style={{ textAlign: 'justify' }}>{resumeData.summary}</p>
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
