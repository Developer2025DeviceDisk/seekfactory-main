import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, phone, token, code } = body;
    if (!email && !phone) {
      return NextResponse.json({ error: 'Email or phone required' }, { status: 400 });
    }
    const user = await prisma.user.findFirst({ where: { OR: [email ? { email } : undefined, phone ? { phone } : undefined].filter(Boolean) } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // Email verification
    if (token) {
      if (!user.emailVerificationToken || user.emailVerificationToken !== token) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
      }
      if (!user.emailVerificationTokenExpires || user.emailVerificationTokenExpires < new Date()) {
        return NextResponse.json({ error: 'Token expired' }, { status: 400 });
      }
      await prisma.user.update({ where: { id: user.id }, data: { verified: true, emailVerificationToken: null, emailVerificationTokenExpires: null } });
      return NextResponse.json({ message: 'Email verified' }, { status: 200 });
    }
    // Phone verification
    if (code) {
      if (!user.phoneVerificationCode || user.phoneVerificationCode !== code) {
        return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
      }
      if (!user.phoneVerificationCodeExpires || user.phoneVerificationCodeExpires < new Date()) {
        return NextResponse.json({ error: 'Code expired' }, { status: 400 });
      }
      await prisma.user.update({ where: { id: user.id }, data: { verified: true, phoneVerificationCode: null, phoneVerificationCodeExpires: null } });
      return NextResponse.json({ message: 'Phone verified' }, { status: 200 });
    }
    return NextResponse.json({ error: 'Token or code required' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 