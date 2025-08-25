import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    const { id } = params;
    const body = await req.json();
    const { status } = body;
    if (!status) {
      return NextResponse.json({ error: 'Missing status' }, { status: 400 });
    }
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    if (order.supplierId !== user.id) {
      return NextResponse.json({ error: 'Only the supplier can update order status' }, { status: 403 });
    }
    const updatedOrder = await prisma.order.update({ where: { id }, data: { status } });
    return NextResponse.json({ order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 