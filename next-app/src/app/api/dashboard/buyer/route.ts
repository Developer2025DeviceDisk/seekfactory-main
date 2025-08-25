import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthHeader } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (user.userType !== 'buyer') {
      return NextResponse.json({ error: 'Only buyers can access this dashboard' }, { status: 403 });
    }
    // Placeholder data
    return NextResponse.json({
      orders: [],
      activeInquiries: [],
      savedProducts: [],
      accountSettings: { email: user.email, phone: user.phone }
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 