import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (user.userType !== 'buyer') {
      return NextResponse.json({ error: 'Only buyers can create orders' }, { status: 403 });
    }
    const body = await req.json();
    const { supplierId, products, shippingAddress, totalAmount } = body;
    if (!supplierId || !products || !Array.isArray(products) || products.length === 0 || !shippingAddress || !totalAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Create order and order items
    const order = await prisma.order.create({
      data: {
        buyerId: user.id,
        supplierId,
        totalAmount,
        status: 'pending',
        shippingAddress,
        products: {
          create: products.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            specifications: item.specifications || null,
          })),
        },
      },
      include: { products: true },
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    let orders;
    if (user.userType === 'buyer') {
      orders = await prisma.order.findMany({ where: { buyerId: user.id }, include: { products: true, paymentDetails: true } });
    } else if (user.userType === 'supplier') {
      orders = await prisma.order.findMany({ where: { supplierId: user.id }, include: { products: true, paymentDetails: true } });
    } else {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 403 });
    }
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 