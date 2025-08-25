import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const admin = await prisma.user.findUnique({ where: { id: user.id } });
    if (!admin || !admin.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const { id } = params;
    const body = await req.json();
    const { emailVerified, phoneVerified, businessVerified } = body;
    const profile = await prisma.supplierProfile.update({
      where: { userId: id },
      data: { verification: { emailVerified, phoneVerified, businessVerified } },
    });
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 