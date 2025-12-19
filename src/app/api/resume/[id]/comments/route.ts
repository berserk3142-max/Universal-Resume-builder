import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Fetch comments for a resume
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const comments = await prisma.comment.findMany({
            where: { resumeId: params.id },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

// POST - Add comment to resume
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { content, author } = await request.json();

        if (!content?.trim()) {
            return NextResponse.json(
                { error: 'Comment content is required' },
                { status: 400 }
            );
        }

        const comment = await prisma.comment.create({
            data: {
                resumeId: params.id,
                content: content.trim(),
                author: author || 'Anonymous',
            },
        });

        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
}

// DELETE - Remove a comment
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { searchParams } = new URL(request.url);
        const commentId = searchParams.get('commentId');

        if (!commentId) {
            return NextResponse.json(
                { error: 'Comment ID is required' },
                { status: 400 }
            );
        }

        await prisma.comment.delete({
            where: { id: commentId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return NextResponse.json(
            { error: 'Failed to delete comment' },
            { status: 500 }
        );
    }
}
