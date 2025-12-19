import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

// GET - Fetch all resumes (for current user if authenticated)
export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

        // If user is authenticated, filter by their resumes
        const whereClause = userId
            ? { isActive: true, userId: userId }
            : { isActive: true };

        const resumes = await prisma.resume.findMany({
            where: whereClause,
            orderBy: { updatedAt: 'desc' },
            include: {
                _count: {
                    select: { versions: true, comments: true }
                }
            }
        });

        return NextResponse.json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch resumes' },
            { status: 500 }
        );
    }
}

// POST - Create new resume
export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        const data = await request.json();

        const resume = await prisma.resume.create({
            data: {
                userId: userId || null, // Associate with user if authenticated
                fullName: data.fullName,
                phone: data.phone || null,
                email: data.email || null,
                location: data.location || null,
                photo: data.photo || null,
                summary: data.summary || null,
                experience: data.experience || [],
                education: data.education || [],
                skills: data.skills || [],
                languages: data.languages || [],
                portfolio: data.portfolio || [],
                template: data.template || 'professional',
            },
        });

        // Create initial version
        await prisma.version.create({
            data: {
                resumeId: resume.id,
                data: data,
                note: 'Initial version',
            },
        });

        return NextResponse.json(resume, { status: 201 });
    } catch (error) {
        console.error('Error creating resume:', error);
        return NextResponse.json(
            { error: 'Failed to create resume' },
            { status: 500 }
        );
    }
}

