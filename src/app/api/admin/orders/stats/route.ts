import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { sql, gte, lte, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build query conditions
    const conditions = [];
    if (startDate) {
      conditions.push(gte(orders.createdAt, startDate));
    }
    if (endDate) {
      conditions.push(lte(orders.createdAt, endDate));
    }

    // Read all orders with filters
    let ordersData;
    if (conditions.length > 0) {
      ordersData = await db.select().from(orders).where(and(...conditions));
    } else {
      ordersData = await db.select().from(orders);
    }

    // Calculate total orders
    const totalOrders = ordersData.length;

    // Calculate total revenue
    const totalRevenue = ordersData.reduce((sum, order) => {
      return sum + Number(order.totalPaid || 0);
    }, 0);

    // Calculate current month's start date
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    
    // Calculate monthly revenue (current month)
    const monthlyRevenue = ordersData
      .filter(order => order.createdAt >= currentMonthStart)
      .reduce((sum, order) => sum + Number(order.totalPaid || 0), 0);

    // Calculate average order value
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate orders by status
    const ordersByStatus = {
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    ordersData.forEach(order => {
      const status = order.status as keyof typeof ordersByStatus;
      if (status in ordersByStatus) {
        ordersByStatus[status]++;
      }
    });

    // Calculate revenue by plan
    const revenueByPlanMap: { [key: string]: { planName: string, orderCount: number, revenue: number } } = {};
    
    ordersData.forEach(order => {
      const planId = String(order.planId);
      if (!revenueByPlanMap[planId]) {
        revenueByPlanMap[planId] = {
          planName: String(order.planName),
          orderCount: 0,
          revenue: 0
        };
      }
      revenueByPlanMap[planId].orderCount++;
      revenueByPlanMap[planId].revenue += Number(order.totalPaid || 0);
    });

    const revenueByPlan = Object.entries(revenueByPlanMap).map(([planId, data]) => ({
      planId,
      ...data
    }));

    return NextResponse.json({
      totalOrders,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      ordersByStatus,
      ordersByPaymentStatus: {
        pending: ordersByStatus.pending,
        completed: ordersByStatus.confirmed + ordersByStatus.shipped + ordersByStatus.delivered,
        failed: ordersByStatus.cancelled
      },
      revenueByPlan
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}