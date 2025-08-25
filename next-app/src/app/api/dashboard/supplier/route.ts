import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthHeader } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (user.userType !== 'supplier') {
      return NextResponse.json({ error: 'Only suppliers can access this dashboard' }, { status: 403 });
    }
    // Placeholder data
    return NextResponse.json({
      products: [],
      inquiriesReceived: [],
      ordersToFulfill: [],
      performanceMetrics: { totalOrders: 0, rating: 0, responseTime: 'N/A' }
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 