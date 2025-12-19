import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getResume(id: string) {
    try {
        const resume = await prisma.resume.findUnique({
            where: { id, isActive: true },
        });
        return resume;
    } catch (error) {
        return null;
    }
}

export default async function PublicResumePage({ params }: PageProps) {
    const { id } = await params;
    const resume = await getResume(id);

    if (!resume) {
        notFound();
    }

    const experience = (resume.experience as any[]) || [];
    const education = (resume.education as any[]) || [];
    const skills = (resume.skills as any[]) || [];
    const languages = (resume.languages as any[]) || [];
    const portfolio = (resume.portfolio as any[]) || [];

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">R</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                            Resume<span className="text-orange-500">Kraft</span>
                        </span>
                    </Link>
                    <a
                        href="/"
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                    >
                        Create Your Resume →
                    </a>
                </div>
            </header>

            {/* Resume Content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {resume.photo && (
                                <img
                                    src={resume.photo}
                                    alt={resume.fullName}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            )}
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl font-bold mb-2">{resume.fullName}</h1>
                                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm opacity-90">
                                    {resume.phone && (
                                        <a href={`tel:${resume.phone}`} className="flex items-center gap-1 hover:underline">
                                            📱 {resume.phone}
                                        </a>
                                    )}
                                    {resume.email && (
                                        <a href={`mailto:${resume.email}`} className="flex items-center gap-1 hover:underline">
                                            ✉️ {resume.email}
                                        </a>
                                    )}
                                    {resume.location && (
                                        <span className="flex items-center gap-1">📍 {resume.location}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                        {/* Summary */}
                        {resume.summary && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-orange-500">✨</span> About Me
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
                            </section>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-orange-500">💼</span> Work Experience
                                </h2>
                                <div className="space-y-4">
                                    {experience.map((exp: any, index: number) => (
                                        <div key={index} className="border-l-2 border-orange-200 pl-4">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                                                    <p className="text-gray-600">{exp.company}{exp.location && ` • ${exp.location}`}</p>
                                                </div>
                                                <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                                                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                                </span>
                                            </div>
                                            {exp.description && (
                                                <p className="text-gray-600 mt-2 text-sm">{exp.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {education.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-orange-500">🎓</span> Education
                                </h2>
                                <div className="space-y-3">
                                    {education.map((edu: any, index: number) => (
                                        <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                                <p className="text-gray-600">{edu.institution}</p>
                                            </div>
                                            <div className="text-right mt-1 sm:mt-0">
                                                <span className="text-sm text-gray-500">{edu.year}</span>
                                                {edu.grade && <p className="text-sm text-gray-600">{edu.grade}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-orange-500">🛠️</span> Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill: any, index: number) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium"
                                        >
                                            {skill.name}
                                            {skill.level && (
                                                <span className="ml-1 text-orange-400">• {skill.level}</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {languages.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-orange-500">🌐</span> Languages
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {languages.map((lang: any, index: number) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            {lang.name} <span className="text-gray-500">({lang.proficiency})</span>
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Portfolio */}
                        {portfolio.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-orange-500">🖼️</span> Portfolio
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {portfolio.map((item: any, index: number) => (
                                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                            {item.type === 'image' ? (
                                                <img
                                                    src={item.url}
                                                    alt={item.title || 'Work sample'}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <video
                                                    src={item.url}
                                                    className="w-full h-full object-cover"
                                                    controls
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    <p>Created with <span className="text-orange-500">ResumeKraft</span></p>
                </div>
            </main>
        </div>
    );
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const resume = await getResume(id);

    if (!resume) {
        return { title: 'Resume Not Found' };
    }

    return {
        title: `${resume.fullName} - Resume | ResumeKraft`,
        description: resume.summary || `View ${resume.fullName}'s professional resume`,
        openGraph: {
            title: `${resume.fullName}'s Resume`,
            description: resume.summary || 'Professional resume created with ResumeKraft',
        },
    };
}
