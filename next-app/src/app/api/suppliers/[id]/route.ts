import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const profile = await prisma.supplierProfile.findUnique({ where: { userId: id } });
    if (!profile) {
      return NextResponse.json({ error: 'Supplier profile not found' }, { status: 404 });
    }
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 