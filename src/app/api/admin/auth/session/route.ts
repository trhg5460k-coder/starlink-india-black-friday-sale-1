import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { adminUsers } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json({ 
        error: 'No token provided',
        code: 'NO_TOKEN' 
      }, { status: 401 });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ 
        error: 'No token provided',
        code: 'NO_TOKEN' 
      }, { status: 401 });
    }

    // Verify JWT token
    let decoded;
    try {
      const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      decoded = jwt.verify(token, secret) as { userId: number };
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return NextResponse.json({ 
          error: 'Invalid or expired token',
          code: 'INVALID_TOKEN' 
        }, { status: 401 });
      }
      if (error.name === 'JsonWebTokenError') {
        return NextResponse.json({ 
          error: 'Invalid or expired token',
          code: 'INVALID_TOKEN' 
        }, { status: 401 });
      }
      throw error;
    }

    // Extract userId from token payload
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ 
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN' 
      }, { status: 401 });
    }

    // Query admin user by id and isActive status
    const adminUser = await db.select({
      id: adminUsers.id,
      username: adminUsers.username,
      email: adminUsers.email,
      fullName: adminUsers.fullName,
      role: adminUsers.role,
      isActive: adminUsers.isActive
    })
      .from(adminUsers)
      .where(and(
        eq(adminUsers.id, userId),
        eq(adminUsers.isActive, true)
      ))
      .limit(1);

    if (adminUser.length === 0) {
      return NextResponse.json({ 
        error: 'User not found or inactive',
        code: 'USER_NOT_FOUND' 
      }, { status: 401 });
    }

    // Return admin data without password hash
    return NextResponse.json({
      admin: {
        id: adminUser[0].id,
        username: adminUser[0].username,
        email: adminUser[0].email,
        fullName: adminUser[0].fullName,
        role: adminUser[0].role
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('GET /api/admin/auth/session error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}