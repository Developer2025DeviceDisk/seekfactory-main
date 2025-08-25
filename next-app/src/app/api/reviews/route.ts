import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (user.userType !== 'buyer') {
      return NextResponse.json({ error: 'Only buyers can submit reviews' }, { status: 403 });
    }
    const body = await req.json();
    const { productId, orderId, rating, comment } = body;
    if (!productId || !orderId || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Check if order is delivered and belongs to this buyer
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.buyerId !== user.id || order.status !== 'delivered') {
      return NextResponse.json({ error: 'You can only review delivered orders you placed' }, { status: 403 });
    }
    // Check if review already exists for this order/product/buyer
    const existing = await prisma.review.findFirst({ where: { orderId, productId, buyerId: user.id } });
    if (existing) {
      return NextResponse.json({ error: 'You have already reviewed this order' }, { status: 409 });
    }
    const review = await prisma.review.create({
      data: {
        productId,
        orderId,
        buyerId: user.id,
        rating,
        comment,
      },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: { buyer: { select: { email: true } } },
    });
    const avgRating = reviews.length ? (reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length) : 0;
    return NextResponse.json({ reviews, avgRating }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 