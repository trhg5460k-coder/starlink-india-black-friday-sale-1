import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { emailTemplates } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    // Read all email templates
    let templatesData;
    if (search) {
      templatesData = await db.select().from(emailTemplates).where(
        or(
          like(emailTemplates.templateName, `%${search}%`),
          like(emailTemplates.templateSubject, `%${search}%`)
        )
      );
    } else {
      templatesData = await db.select().from(emailTemplates);
    }

    // Get total count
    const total = templatesData.length;

    // Apply pagination
    const paginatedTemplates = templatesData.slice(offset, offset + limit);

    return NextResponse.json({
      templates: paginatedTemplates,
      total,
      limit,
      offset
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateName, templateSubject, templateBody, variables } = body;

    if (!templateName || !templateName.trim()) {
      return NextResponse.json({ 
        error: "Template name is required",
        code: "MISSING_TEMPLATE_NAME" 
      }, { status: 400 });
    }

    if (!templateSubject || !templateSubject.trim()) {
      return NextResponse.json({ 
        error: "Template subject is required",
        code: "MISSING_TEMPLATE_SUBJECT" 
      }, { status: 400 });
    }

    if (!templateBody || !templateBody.trim()) {
      return NextResponse.json({ 
        error: "Template content is required",
        code: "MISSING_TEMPLATE_CONTENT" 
      }, { status: 400 });
    }

    // Check if template name already exists
    const existingTemplate = await db.select().from(emailTemplates)
      .where(eq(emailTemplates.templateName, templateName.trim()));

    if (existingTemplate.length > 0) {
      return NextResponse.json({ 
        error: "Template name already exists",
        code: "DUPLICATE_TEMPLATE_NAME" 
      }, { status: 400 });
    }

    const now = new Date().toISOString();

    // Insert new template
    const newTemplate = await db.insert(emailTemplates).values({
      templateName: templateName.trim(),
      templateSubject: templateSubject.trim(),
      templateBody: templateBody,
      variables: variables || [],
      isActive: true,
      createdAt: now,
      updatedAt: now
    }).returning();

    return NextResponse.json(newTemplate[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}