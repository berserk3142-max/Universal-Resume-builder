import Link from 'next/link';
import prisma from '@/lib/prisma';

interface ResumeWithCounts {
    id: string;
    fullName: string;
    phone: string | null;
    email: string | null;
    location: string | null;
    photo: string | null;
    summary: string | null;
    template: string;
    createdAt: Date;
    updatedAt: Date;
    _count: {
        versions: number;
        comments: number;
    };
}

async function getResumes(): Promise<ResumeWithCounts[]> {
    try {
        const resumes = await prisma.resume.findMany({
            where: { isActive: true },
            orderBy: { updatedAt: 'desc' },
            include: {
                _count: {
                    select: { versions: true, comments: true }
                }
            }
        });
        return resumes as ResumeWithCounts[];
    } catch (error) {
        console.error('Error fetching resumes:', error);
        return [];
    }
}

export default async function DashboardPage() {
    const resumes = await getResumes();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-bharat-saffron to-bharat-green rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="text-2xl font-display font-bold text-white">
                                Resume<span className="text-bharat-saffron">Kraft</span>
                            </span>
                        </Link>
                        <Link href="/builder" className="btn-primary">
                            + New Resume
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-display font-bold text-white mb-8">My Resumes</h1>

                {resumes.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">No Resumes Yet</h2>
                        <p className="text-gray-400 mb-6">Create your first resume to get started</p>
                        <Link href="/builder" className="btn-primary inline-flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Resume
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume: ResumeWithCounts) => (
                            <div
                                key={resume.id}
                                className="card-hover bg-slate-800/50 backdrop-blur-sm border-slate-700"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    {resume.photo ? (
                                        <img
                                            src={resume.photo}
                                            alt={resume.fullName}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-white">
                                                {resume.fullName.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-white truncate">
                                            {resume.fullName}
                                        </h3>
                                        {resume.location && (
                                            <p className="text-sm text-gray-400 truncate">📍 {resume.location}</p>
                                        )}
                                    </div>
                                </div>

                                {resume.summary && (
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">{resume.summary}</p>
                                )}

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {resume._count.versions} versions
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        {resume._count.comments} comments
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/builder?id=${resume.id}`}
                                        className="flex-1 text-center py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/resume/${resume.id}`}
                                        target="_blank"
                                        className="flex-1 text-center py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export const dynamic = 'force-dynamic';
