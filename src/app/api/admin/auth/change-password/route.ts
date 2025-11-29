import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    // Extract and verify JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded: any;
    
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = decoded.userId;
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validate required fields
    if (!currentPassword) {
      return NextResponse.json(
        { error: 'Current password is required', code: 'MISSING_CURRENT_PASSWORD' },
        { status: 400 }
      );
    }

    if (!newPassword) {
      return NextResponse.json(
        { error: 'New password is required', code: 'MISSING_NEW_PASSWORD' },
        { status: 400 }
      );
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long', code: 'PASSWORD_TOO_SHORT' },
        { status: 400 }
      );
    }

    // Query admin user by id
    const user = await db.select()
      .from(adminUsers)
      .where(eq(adminUsers.id, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const adminUser = user[0];

    // Verify current password
    const isPasswordCorrect = await bcrypt.compare(currentPassword, adminUser.passwordHash);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: 'Current password is incorrect', code: 'INCORRECT_PASSWORD' },
        { status: 401 }
      );
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update admin user
    await db.update(adminUsers)
      .set({
        passwordHash: newPasswordHash,
        updatedAt: new Date().toISOString()
      })
      .where(eq(adminUsers.id, userId));

    return NextResponse.json(
      { success: true, message: 'Password changed successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}