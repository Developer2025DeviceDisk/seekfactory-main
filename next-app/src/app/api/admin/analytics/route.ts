import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const admin = await prisma.user.findUnique({ where: { id: user.id } });
    if (!admin || !admin.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // Metrics
    const totalUsers = await prisma.user.count();
    const activeSuppliers = await prisma.user.count({ where: { userType: 'supplier', verified: true } });
    const totalOrders = await prisma.order.count();
    const orders = await prisma.order.findMany();
    const monthlyGMV = orders.reduce((sum: number, o: { totalAmount: number }) => sum + o.totalAmount, 0); // For demo, sum all
    const averageOrderValue = totalOrders ? monthlyGMV / totalOrders : 0;
    // Conversion rate is mocked for now
    const conversionRate = 0.05;

    return NextResponse.json({
      totalUsers,
      activeSuppliers,
      totalOrders,
      monthlyGMV,
      averageOrderValue,
      conversionRate,
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 