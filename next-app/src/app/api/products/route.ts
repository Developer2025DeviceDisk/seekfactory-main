import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuthHeader } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || undefined;
    const user = verifyAuthHeader(authHeader);
    if (user.userType !== 'supplier') {
      return NextResponse.json({ error: 'Only suppliers can create products' }, { status: 403 });
    }
    const body = await req.json();
    const {
      title, category, description, model, capacity, powerRequirement, dimensions, weight, certifications,
      basePrice, currency, moq, priceBreaks, images, inStock, leadTime
    } = body;
    if (!title || !category || !description || !model || !capacity || !powerRequirement || !dimensions || !weight || !certifications || !basePrice || !currency || !moq || !priceBreaks || !images || !leadTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const product = await prisma.product.create({
      data: {
        supplierId: user.id,
        title,
        category,
        description,
        model,
        capacity,
        powerRequirement,
        dimensions,
        weight,
        certifications,
        basePrice,
        currency,
        moq,
        priceBreaks,
        images,
        inStock: inStock ?? true,
        leadTime,
      },
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const inStock = searchParams.get('inStock');
    const query = searchParams.get('query');
    const supplierRating = searchParams.get('supplierRating');
    const location = searchParams.get('location');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const where: Record<string, any> = {};
    if (category) where.category = category;
    if (inStock !== undefined) where.inStock = inStock === 'true';
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }
    // Supplier rating/location filter (join with supplierProfile)
    if (supplierRating || location) {
      where.supplierProfile = {};
      if (supplierRating) where.supplierProfile.rating = { gte: parseFloat(supplierRating) };
      if (location) where.supplierProfile.location = { contains: location, mode: 'insensitive' };
    }
    // Sorting
    let orderBy: Record<string, 'asc' | 'desc'> = { createdAt: 'desc' };
    if (sortBy === 'price_asc') orderBy = { basePrice: 'asc' };
    if (sortBy === 'price_desc') orderBy = { basePrice: 'desc' };
    if (sortBy === 'newest') orderBy = { createdAt: 'desc' };
    // For relevance, keep default (could add more advanced logic)
    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy,
      include: { supplierProfile: true },
    });
    return NextResponse.json({ products, page, limit }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 