import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sendOrderConfirmationEmail, initializeDefaultEmailTemplates } from '@/lib/email-service';

// Initialize email templates on first load
initializeDefaultEmailTemplates().catch(console.error);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity,
      customerState,
      customerPincode,
      serviceType,
      planId,
      planName,
      planSpeed,
      planPrice,
      devicePrice,
      totalPaid,
      notes
    } = body;

    // Validate required fields
    if (!customerFirstName || !customerLastName || !customerEmail || !customerPhone ||
        !customerAddress || !customerCity || !customerPincode ||
        !serviceType || !planId || !planName || !planSpeed ||
        planPrice === undefined || devicePrice === undefined || totalPaid === undefined) {
      return NextResponse.json({
        error: 'Missing required fields',
        code: 'MISSING_FIELDS'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({
        error: 'Invalid email format',
        code: 'INVALID_EMAIL'
      }, { status: 400 });
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(customerPhone)) {
      return NextResponse.json({
        error: 'Phone number must be 10 digits',
        code: 'INVALID_PHONE'
      }, { status: 400 });
    }

    // Validate serviceType
    if (serviceType !== 'residential' && serviceType !== 'roam') {
      return NextResponse.json({
        error: 'Service type must be either "residential" or "roam"',
        code: 'INVALID_SERVICE_TYPE'
      }, { status: 400 });
    }

    // Validate customerState for residential service
    if (serviceType === 'residential' && !customerState) {
      return NextResponse.json({
        error: 'State is required for residential service',
        code: 'STATE_REQUIRED'
      }, { status: 400 });
    }

    // Generate unique order number
    const orderNumber = `SL-IN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const now = new Date().toISOString();

    // Create order in database
    const newOrder = await db.insert(orders).values({
      orderNumber,
      customerFirstName: customerFirstName.trim(),
      customerLastName: customerLastName.trim(),
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      customerCity: customerCity.trim(),
      customerState: customerState?.trim() || null,
      customerPincode: customerPincode.trim(),
      serviceType,
      planId,
      planName,
      planSpeed,
      planPrice,
      devicePrice,
      totalPaid,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: now,
      updatedAt: now,
      notes: notes?.trim() || null,
    }).returning();

    // Send order confirmation email
    const emailSent = await sendOrderConfirmationEmail({
      customerEmail: customerEmail.toLowerCase().trim(),
      customerFirstName: customerFirstName.trim(),
      customerLastName: customerLastName.trim(),
      orderNumber,
      planName,
      planSpeed,
      devicePrice,
      planPrice,
      totalPaid,
      serviceType,
      customerAddress: `${customerAddress}, ${customerCity}, ${customerState || ''}, ${customerPincode}`.trim(),
    });

    console.log(`Order ${orderNumber} created. Email sent: ${emailSent}`);

    return NextResponse.json({
      success: true,
      order: newOrder[0],
      emailSent,
      message: 'Order created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error as Error).message
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const orderNumber = searchParams.get('orderNumber');
    
    if (!email && !orderNumber) {
      return NextResponse.json({
        error: 'Email or order number is required',
        code: 'MISSING_PARAMS'
      }, { status: 400 });
    }
    
    if (orderNumber) {
      const orderData = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
      return NextResponse.json({ orders: orderData }, { status: 200 });
    }
    
    if (email) {
      const orderData = await db.select().from(orders).where(eq(orders.customerEmail, email.toLowerCase()));
      return NextResponse.json({ orders: orderData }, { status: 200 });
    }
    
    return NextResponse.json({ orders: [] }, { status: 200 });
    
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error as Error).message
    }, { status: 500 });
  }
}