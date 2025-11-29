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
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const orders = readCSV('orders.csv');
    const order = orders.find(o => o.id === id);

    if (!order) {
      return NextResponse.json(
        {
          error: 'Order not found',
          code: 'ORDER_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
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
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, notes } = body;

    // Validate status if provided
    if (status !== undefined) {
      const validStatuses = [
        'pending',
        'confirmed',
        'shipped',
        'delivered',
        'cancelled',
      ];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          {
            error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
            code: 'INVALID_STATUS',
          },
          { status: 400 }
        );
      }
    }

    // Check if order exists
    const orders = readCSV('orders.csv');
    const existingOrder = orders.find(o => o.id === id);

    if (!existingOrder) {
      return NextResponse.json(
        {
          error: 'Order not found',
          code: 'ORDER_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Build update object
    const updates: any = {};

    if (status !== undefined) {
      updates.status = status;
    }

    if (notes !== undefined) {
      updates.notes = notes;
    }

    // Update order
    updateCSV('orders.csv', (row) => row.id === id, updates);

    // Get updated order
    const updatedOrders = readCSV('orders.csv');
    const updatedOrder = updatedOrders.find(o => o.id === id);

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
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
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    // Check if order exists
    const orders = readCSV('orders.csv');
    const existingOrder = orders.find(o => o.id === id);

    if (!existingOrder) {
      return NextResponse.json(
        {
          error: 'Order not found',
          code: 'ORDER_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Delete order
    deleteCSV('orders.csv', (row) => row.id === id);

    return NextResponse.json(
      {
        message: 'Order deleted successfully',
        deletedOrder: existingOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}