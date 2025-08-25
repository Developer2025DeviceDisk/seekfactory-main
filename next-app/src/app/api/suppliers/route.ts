import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (user.userType !== 'supplier') {
      return NextResponse.json({ error: 'Only suppliers can update profile' }, { status: 403 });
    }
    const body = await req.json();
    const {
      companyName, description, establishedYear, city, province, country, certifications, businessLicense, contactInfo
    } = body;
    if (!companyName || !description || !establishedYear || !city || !country || !businessLicense) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const profile = await prisma.supplierProfile.upsert({
      where: { userId: user.id },
      update: {
        companyName, description, establishedYear, city, province, country, certifications, businessLicense, contactInfo
      },
      create: {
        userId: user.id, companyName, description, establishedYear, city, province, country, certifications, businessLicense, contactInfo
      },
    });
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 