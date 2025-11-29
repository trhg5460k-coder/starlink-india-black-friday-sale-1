import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq, like, or, desc, asc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Search
    const search = searchParams.get('search');
    
    // Filters
    const status = searchParams.get('status');
    const serviceType = searchParams.get('serviceType');
    
    // Sorting
    const sortBy = searchParams.get('sortBy') ?? 'createdAt';
    const sortOrder = searchParams.get('sortOrder') ?? 'desc';
    
    // Build query with filters
    let query = db.select().from(orders);
    const conditions = [];
    
    // Apply search filter
    if (search) {
      conditions.push(
        or(
          like(orders.orderNumber, `%${search}%`),
          like(orders.customerEmail, `%${search}%`),
          like(orders.customerFirstName, `%${search}%`),
          like(orders.customerLastName, `%${search}%`)
        )
      );
    }
    
    // Apply status filter
    if (status) {
      conditions.push(eq(orders.status, status));
    }
    
    // Apply service type filter
    if (serviceType) {
      conditions.push(eq(orders.serviceType, serviceType));
    }
    
    // Execute query with conditions
    let ordersData;
    if (conditions.length > 0) {
      ordersData = await db.select().from(orders).where(sql`${conditions.join(' AND ')}`);
    } else {
      ordersData = await db.select().from(orders);
    }
    
    // Get total count
    const total = ordersData.length;
    
    // Sort orders in memory (simple approach)
    ordersData.sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a];
      const bVal = b[sortBy as keyof typeof b];
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    // Apply pagination
    const paginatedOrders = ordersData.slice(offset, offset + limit);
    
    return NextResponse.json({
      orders: paginatedOrders,
      total,
      limit,
      offset
    }, { status: 200 });
    
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}