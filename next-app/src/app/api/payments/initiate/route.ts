import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    verifyAuthHeader(authHeader); // Any authenticated user can initiate payment
    const body = await req.json();
    const { orderId, amount, currency } = body;
    if (!orderId || !amount || !currency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Create payment record (mock)
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount,
        currency,
        status: 'initiated',
        provider: 'mock',
      },
    });
    // In a real implementation, you would now create a payment order with Razorpay/Stripe/etc.
    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 