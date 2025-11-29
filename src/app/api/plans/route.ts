import { NextRequest, NextResponse } from 'next/server';
import { readCSV } from '@/lib/file-storage';

export async function GET(request: NextRequest) {
  try {
    // Read all plans from CSV
    let plans = readCSV('plans.csv');

    // Filter only active plans
    const activePlans = plans.filter(plan => String(plan.is_active) === 'true');

    // Transform CSV data to match the expected format
    const transformedPlans = activePlans.map(plan => ({
      id: plan.id,
      planId: plan.id,
      name: plan.name,
      speed: plan.speed,
      originalPrice: Number(plan.original_price),
      discountedPrice: Number(plan.price),
      discountPercentage: Number(plan.discount_percentage),
      features: plan.features ? plan.features.split('|') : [],
      isPopular: false,
      displayOrder: 0,
      serviceType: plan.service_type,
      deviceCost: Number(plan.device_cost),
      originalDeviceCost: Number(plan.original_device_cost),
      description: plan.description
    }));

    // Return the plans array directly
    return NextResponse.json(transformedPlans, { status: 200 });

  } catch (error) {
    console.error('GET plans error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}