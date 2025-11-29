import { NextRequest, NextResponse } from 'next/server';
import { readCSV, updateCSV, deleteCSV } from '@/lib/file-storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const plans = readCSV('plans.csv');
    const plan = plans.find(p => p.id === id);

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found', code: 'PLAN_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const plans = readCSV('plans.csv');
    const existingPlan = plans.find(p => p.id === id);

    if (!existingPlan) {
      return NextResponse.json(
        { error: 'Plan not found', code: 'PLAN_NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      name,
      speed,
      price,
      original_price,
      discount_percentage,
      device_cost,
      original_device_cost,
      description,
      features,
      is_active,
    } = body;

    // Build update object with only provided fields
    const updates: any = {};

    if (name !== undefined) updates.name = name;
    if (speed !== undefined) updates.speed = speed;
    if (price !== undefined) updates.price = price;
    if (original_price !== undefined) updates.original_price = original_price;
    if (discount_percentage !== undefined) updates.discount_percentage = discount_percentage;
    if (device_cost !== undefined) updates.device_cost = device_cost;
    if (original_device_cost !== undefined) updates.original_device_cost = original_device_cost;
    if (description !== undefined) updates.description = description;
    if (features !== undefined) updates.features = features;
    if (is_active !== undefined) updates.is_active = String(is_active);

    // Update plan
    updateCSV('plans.csv', (row) => row.id === id, updates);

    // Get updated plan
    const updatedPlans = readCSV('plans.csv');
    const updatedPlan = updatedPlans.find(p => p.id === id);

    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const plans = readCSV('plans.csv');
    const existingPlan = plans.find(p => p.id === id);

    if (!existingPlan) {
      return NextResponse.json(
        { error: 'Plan not found', code: 'PLAN_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check for hard delete query parameter
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get('hard') === 'true';

    if (hardDelete) {
      // Hard delete: permanently remove from CSV
      deleteCSV('plans.csv', (row) => row.id === id);

      return NextResponse.json(
        { message: 'Plan deleted permanently', plan: existingPlan },
        { status: 200 }
      );
    } else {
      // Soft delete: set is_active to false
      updateCSV('plans.csv', (row) => row.id === id, { is_active: 'false' });

      // Get updated plan
      const updatedPlans = readCSV('plans.csv');
      const deactivatedPlan = updatedPlans.find(p => p.id === id);

      return NextResponse.json(
        { message: 'Plan deactivated successfully', plan: deactivatedPlan },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}