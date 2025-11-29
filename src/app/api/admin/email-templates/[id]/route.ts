import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { emailTemplates } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Query template by ID
    const template = await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.id, parseInt(id)))
      .limit(1);

    if (template.length === 0) {
      return NextResponse.json(
        { error: 'Template not found', code: 'TEMPLATE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(template[0], { status: 200 });
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

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { templateName, templateSubject, templateBody, variables, isActive } = body;

    // Check if template exists
    const existingTemplate = await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.id, parseInt(id)))
      .limit(1);

    if (existingTemplate.length === 0) {
      return NextResponse.json(
        { error: 'Template not found', code: 'TEMPLATE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate variables if provided
    if (variables !== undefined) {
      if (!Array.isArray(variables)) {
        return NextResponse.json(
          { error: 'Variables must be a valid JSON array', code: 'INVALID_VARIABLES' },
          { status: 400 }
        );
      }
    }

    // Build update object with only provided fields
    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (templateName !== undefined) updates.templateName = templateName.trim();
    if (templateSubject !== undefined) updates.templateSubject = templateSubject.trim();
    if (templateBody !== undefined) updates.templateBody = templateBody;
    if (variables !== undefined) updates.variables = variables;
    if (isActive !== undefined) updates.isActive = isActive;

    // Update template
    const updatedTemplate = await db
      .update(emailTemplates)
      .set(updates)
      .where(eq(emailTemplates.id, parseInt(id)))
      .returning();

    if (updatedTemplate.length === 0) {
      return NextResponse.json(
        { error: 'Template not found', code: 'TEMPLATE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTemplate[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    
    // Handle unique constraint violation
    if ((error as Error).message.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: 'Template name already exists', code: 'DUPLICATE_TEMPLATE_NAME' },
        { status: 400 }
      );
    }

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

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if template exists before deletion
    const existingTemplate = await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.id, parseInt(id)))
      .limit(1);

    if (existingTemplate.length === 0) {
      return NextResponse.json(
        { error: 'Template not found', code: 'TEMPLATE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete template
    const deletedTemplate = await db
      .delete(emailTemplates)
      .where(eq(emailTemplates.id, parseInt(id)))
      .returning();

    if (deletedTemplate.length === 0) {
      return NextResponse.json(
        { error: 'Template not found', code: 'TEMPLATE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Template deleted successfully',
        deletedTemplate: deletedTemplate[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}