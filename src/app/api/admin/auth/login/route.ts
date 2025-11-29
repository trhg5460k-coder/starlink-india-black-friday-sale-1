import { NextRequest, NextResponse } from 'next/server';
import { readCSV, updateCSV } from '@/lib/file-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        {
          error: 'Username is required',
          code: 'MISSING_USERNAME',
        },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          error: 'Password is required',
          code: 'MISSING_PASSWORD',
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedUsername = username.trim();

    // Find admin user by username
    const adminUsers = readCSV('admin-users.csv');
    const user = adminUsers.find(u => u.username === sanitizedUsername);

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        {
          error: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS',
        },
        { status: 401 }
      );
    }

    // Simple password comparison (in production, use bcrypt)
    if (password !== user.password_hash) {
      return NextResponse.json(
        {
          error: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS',
        },
        { status: 401 }
      );
    }

    // Update last login timestamp
    updateCSV('admin-users.csv', (row) => row.id === user.id, {
      last_login: new Date().toISOString()
    });

    // Generate simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    // Return success response
    return NextResponse.json(
      {
        success: true,
        token,
        admin: {
          id: user.id,
          username: user.username,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      },
      { status: 500 }
    );
  }
}