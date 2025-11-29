import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Add orders table
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderNumber: text('order_number').notNull().unique(),
  customerFirstName: text('customer_first_name').notNull(),
  customerLastName: text('customer_last_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerAddress: text('customer_address').notNull(),
  customerCity: text('customer_city').notNull(),
  customerState: text('customer_state'),
  customerPincode: text('customer_pincode').notNull(),
  serviceType: text('service_type').notNull(),
  planId: text('plan_id').notNull(),
  planName: text('plan_name').notNull(),
  planSpeed: text('plan_speed').notNull(),
  planPrice: integer('plan_price').notNull(),
  devicePrice: integer('device_price').notNull(),
  totalPaid: integer('total_paid').notNull(),
  status: text('status').notNull().default('pending'),
  paymentStatus: text('payment_status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  shippedAt: text('shipped_at'),
  deliveredAt: text('delivered_at'),
  notes: text('notes'),
});

// Add plans table
export const plans = sqliteTable('plans', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  planId: text('plan_id').notNull().unique(),
  name: text('name').notNull(),
  speed: text('speed').notNull(),
  originalPrice: integer('original_price').notNull(),
  discountedPrice: integer('discounted_price').notNull(),
  discountPercentage: integer('discount_percentage').notNull(),
  features: text('features', { mode: 'json' }).notNull(),
  isPopular: integer('is_popular', { mode: 'boolean' }).default(false),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  displayOrder: integer('display_order').default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Add email_templates table
export const emailTemplates = sqliteTable('email_templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  templateName: text('template_name').notNull().unique(),
  templateSubject: text('template_subject').notNull(),
  templateBody: text('template_body').notNull(),
  variables: text('variables', { mode: 'json' }).notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Add admin_users table
export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  email: text('email').notNull().unique(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull().default('admin'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  lastLoginAt: text('last_login_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});