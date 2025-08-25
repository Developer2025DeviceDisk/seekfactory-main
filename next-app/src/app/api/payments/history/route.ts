import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    // List payments for orders where user is buyer or supplier
    const payments = await prisma.payment.findMany({
      where: {
        OR: [
          { order: { buyerId: user.id } },
          { order: { supplierId: user.id } },
        ],
      },
      include: { order: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 