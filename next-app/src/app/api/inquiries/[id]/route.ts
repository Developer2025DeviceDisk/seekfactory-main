import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    const { id } = params;
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: 'asc' }, include: { sender: { select: { email: true, userType: true } } } } },
    });
    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    if (inquiry.buyerId !== user.id && inquiry.supplierId !== user.id) {
      return NextResponse.json({ error: 'Not authorized to view this inquiry' }, { status: 403 });
    }
    return NextResponse.json({ inquiry }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 