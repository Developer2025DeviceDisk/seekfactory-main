import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateCode(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateToken(length = 32) {
  return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, phone, type } = body; // type: 'email' or 'phone'
    if (!email && !phone) {
      return NextResponse.json({ error: 'Email or phone required' }, { status: 400 });
    }
    const user = await prisma.user.findFirst({ where: { OR: [email ? { email } : undefined, phone ? { phone } : undefined].filter(Boolean) } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (type === 'email') {
      const token = generateToken(32);
      const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min
      await prisma.user.update({ where: { id: user.id }, data: { emailVerificationToken: token, emailVerificationTokenExpires: expires } });
      // In production, send token via email
      return NextResponse.json({ message: 'Verification token generated', token }, { status: 200 });
    } else if (type === 'phone') {
      const code = generateCode();
      const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 min
      await prisma.user.update({ where: { id: user.id }, data: { phoneVerificationCode: code, phoneVerificationCodeExpires: expires } });
      // In production, send code via SMS
      return NextResponse.json({ message: 'Verification code generated', code }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 