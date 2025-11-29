import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { plans } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Filtering
    const isActiveParam = searchParams.get('isActive');
    
    // Sorting
    const sortBy = searchParams.get('sortBy') ?? 'displayOrder';
    const sortOrder = searchParams.get('sortOrder') ?? 'asc';
    
    // Read all plans with filter
    let plansData;
    if (isActiveParam !== null) {
      const isActive = isActiveParam === 'true' || isActiveParam === '1';
      plansData = await db.select().from(plans).where(eq(plans.isActive, isActive));
    } else {
      plansData = await db.select().from(plans);
    }
    
    // Sort plans in memory
    plansData.sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a];
      const bVal = b[sortBy as keyof typeof b];
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    // Get total count
    const total = plansData.length;
    
    // Apply pagination
    const paginatedPlans = plansData.slice(offset, offset + limit);
    
    return NextResponse.json({
      plans: paginatedPlans,
      total,
      limit,
      offset
    }, { status: 200 });
    
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      planId,
      name,
      speed,
      originalPrice,
      discountedPrice,
      discountPercentage,
      features,
      isPopular,
      isActive,
      displayOrder
    } = body;
    
    // Validate required fields
    if (!planId || !name || !speed) {
      return NextResponse.json({
        error: 'Missing required fields',
        code: 'MISSING_FIELDS'
      }, { status: 400 });
    }
    
    const now = new Date().toISOString();
    
    // Insert plan into database
    const newPlan = await db.insert(plans).values({
      planId,
      name,
      speed,
      originalPrice: originalPrice || 0,
      discountedPrice: discountedPrice || 0,
      discountPercentage: discountPercentage || 0,
      features: features || [],
      isPopular: isPopular || false,
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder || 0,
      createdAt: now,
      updatedAt: now
    }).returning();
    
    return NextResponse.json(newPlan[0], { status: 201 });
    
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}