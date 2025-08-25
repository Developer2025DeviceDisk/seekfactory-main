import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    const { id } = params;
    const inquiry = await prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    if (inquiry.buyerId !== user.id && inquiry.supplierId !== user.id) {
      return NextResponse.json({ error: 'Not authorized to send message in this inquiry' }, { status: 403 });
    }
    const body = await req.json();
    const { content } = body;
    if (!content) {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 });
    }
    const message = await prisma.message.create({
      data: {
        inquiryId: id,
        senderId: user.id,
        content,
      },
    });
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 