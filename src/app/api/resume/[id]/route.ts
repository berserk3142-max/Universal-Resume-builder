import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch single resume
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const resume = await prisma.resume.findUnique({
            where: { id },
            include: {
                versions: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
                comments: {
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!resume) {
            return NextResponse.json(
                { error: 'Resume not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error('Error fetching resume:', error);
        return NextResponse.json(
            { error: 'Failed to fetch resume' },
            { status: 500 }
        );
    }
}

// PUT - Update resume
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();

        // Update resume
        const resume = await prisma.resume.update({
            where: { id },
            data: {
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

        // Create new version
        await prisma.version.create({
            data: {
                resumeId: resume.id,
                data: data,
                note: data.versionNote || 'Updated resume',
            },
        });

        return NextResponse.json(resume);
    } catch (error) {
        console.error('Error updating resume:', error);
        return NextResponse.json(
            { error: 'Failed to update resume' },
            { status: 500 }
        );
    }
}

// DELETE - Soft delete resume
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.resume.update({
            where: { id },
            data: { isActive: false },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting resume:', error);
        return NextResponse.json(
            { error: 'Failed to delete resume' },
            { status: 500 }
        );
    }
}
