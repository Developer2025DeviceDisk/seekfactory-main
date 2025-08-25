import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (user.userType !== 'buyer') {
      return NextResponse.json({ error: 'Only buyers can send inquiries' }, { status: 403 });
    }
    const body = await req.json();
    const { productId, supplierId, inquiryType, message, requirements } = body;
    if (!productId || !supplierId || !inquiryType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const inquiry = await prisma.inquiry.create({
      data: {
        productId,
        buyerId: user.id,
        supplierId,
        inquiryType,
        message,
        requirements,
        status: 'pending',
      },
    });
    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    let inquiries;
    if (user.userType === 'buyer') {
      inquiries = await prisma.inquiry.findMany({ where: { buyerId: user.id }, orderBy: { createdAt: 'desc' } });
    } else if (user.userType === 'supplier') {
      inquiries = await prisma.inquiry.findMany({ where: { supplierId: user.id }, orderBy: { createdAt: 'desc' } });
    } else {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 403 });
    }
    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 