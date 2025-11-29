import { db } from '@/db';
import { emailTemplates } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface EmailVariables {
  [key: string]: string | number;
}

interface SendEmailParams {
  to: string;
  templateName: string;
  variables: EmailVariables;
}

/**
 * Replace template variables with actual values
 * Example: "Hello {{name}}" with { name: "John" } => "Hello John"
 */
function replaceVariables(template: string, variables: EmailVariables): string {
  let result = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(placeholder, String(value));
  });
  
  return result;
}

/**
 * Send email using a template from the database
 */
export async function sendEmail({ to, templateName, variables }: SendEmailParams): Promise<boolean> {
  try {
    // Fetch email template from database
    const templates = await db.select()
      .from(emailTemplates)
      .where(eq(emailTemplates.templateName, templateName))
      .limit(1);
    
    if (templates.length === 0) {
      console.error(`Email template "${templateName}" not found`);
      return false;
    }
    
    const template = templates[0];
    
    if (!template.isActive) {
      console.error(`Email template "${templateName}" is not active`);
      return false;
    }
    
    // Replace variables in subject and body
    const subject = replaceVariables(template.templateSubject, variables);
    const body = replaceVariables(template.templateBody, variables);
    
    // In production, this would send via an email service (e.g., SendGrid, AWS SES, Resend)
    // For now, we'll log it to console
    console.log('=== EMAIL SENT ===');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('==================');
    
    // TODO: Integrate with actual email service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'orders@starlink-india.com',
    //   to,
    //   subject,
    //   html: body,
    // });
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(orderData: {
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  orderNumber: string;
  planName: string;
  planSpeed: string;
  devicePrice: number;
  planPrice: number;
  totalPaid: number;
  serviceType: string;
  customerAddress: string;
}): Promise<boolean> {
  return sendEmail({
    to: orderData.customerEmail,
    templateName: 'order_confirmation',
    variables: {
      customerName: `${orderData.customerFirstName} ${orderData.customerLastName}`,
      firstName: orderData.customerFirstName,
      orderNumber: orderData.orderNumber,
      planName: orderData.planName,
      planSpeed: orderData.planSpeed,
      devicePrice: `₹${orderData.devicePrice.toLocaleString('en-IN')}`,
      planPrice: `₹${orderData.planPrice.toLocaleString('en-IN')}/month`,
      totalPaid: `₹${orderData.totalPaid.toLocaleString('en-IN')}`,
      serviceType: orderData.serviceType,
      shippingAddress: orderData.customerAddress,
      year: new Date().getFullYear(),
    },
  });
}

/**
 * Send shipping notification email
 */
export async function sendShippingNotificationEmail(orderData: {
  customerEmail: string;
  customerFirstName: string;
  orderNumber: string;
  trackingNumber?: string;
}): Promise<boolean> {
  return sendEmail({
    to: orderData.customerEmail,
    templateName: 'shipping_notification',
    variables: {
      firstName: orderData.customerFirstName,
      orderNumber: orderData.orderNumber,
      trackingNumber: orderData.trackingNumber || 'Will be updated soon',
      year: new Date().getFullYear(),
    },
  });
}

/**
 * Initialize default email templates if they don't exist
 */
export async function initializeDefaultEmailTemplates(): Promise<void> {
  try {
    const now = new Date().toISOString();
    
    // Check if order_confirmation template exists
    const orderConfirmationExists = await db.select()
      .from(emailTemplates)
      .where(eq(emailTemplates.templateName, 'order_confirmation'))
      .limit(1);
    
    if (orderConfirmationExists.length === 0) {
      await db.insert(emailTemplates).values({
        templateName: 'order_confirmation',
        templateSubject: 'Order Confirmation - Starlink India #{{orderNumber}}',
        templateBody: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #000; color: #fff; padding: 20px; text-align: center; }
              .content { padding: 30px 20px; }
              .order-details { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              .btn { display: inline-block; padding: 12px 30px; background: #000; color: #fff; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>STARLINK</h1>
                <p>High-Speed Satellite Internet</p>
              </div>
              <div class="content">
                <h2>Thank you for your pre-booking, {{firstName}}!</h2>
                <p>Your Starlink pre-booking has been confirmed. We're excited to bring high-speed internet to your location.</p>
                
                <div class="order-details">
                  <h3>Order Details</h3>
                  <p><strong>Order Number:</strong> {{orderNumber}}</p>
                  <p><strong>Service Type:</strong> {{serviceType}}</p>
                  <p><strong>Plan:</strong> {{planName}} ({{planSpeed}})</p>
                  <p><strong>Monthly Price:</strong> {{planPrice}}</p>
                  <p><strong>Device Cost:</strong> {{devicePrice}}</p>
                  <p><strong>Total Paid:</strong> {{totalPaid}}</p>
                  <p><strong>Shipping Address:</strong> {{shippingAddress}}</p>
                </div>
                
                <h3>What happens next?</h3>
                <ol>
                  <li>You will receive a confirmation email with your order details</li>
                  <li>Our installation team will contact you within 3-5 business days</li>
                  <li>Device will ship within 2-4 weeks</li>
                  <li>Professional installation will be scheduled at your convenience</li>
                </ol>
                
                <p>If you have any questions, please don't hesitate to contact our support team.</p>
              </div>
              <div class="footer">
                <p>© {{year}} Starlink India. All rights reserved.</p>
                <p>Powered by SpaceX | 30-Day Money Back Guarantee</p>
              </div>
            </div>
          </body>
          </html>
        `,
        variables: ['customerName', 'firstName', 'orderNumber', 'planName', 'planSpeed', 'devicePrice', 'planPrice', 'totalPaid', 'serviceType', 'shippingAddress', 'year'],
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
      
      console.log('Created default order_confirmation email template');
    }
    
    // Check if shipping_notification template exists
    const shippingNotificationExists = await db.select()
      .from(emailTemplates)
      .where(eq(emailTemplates.templateName, 'shipping_notification'))
      .limit(1);
    
    if (shippingNotificationExists.length === 0) {
      await db.insert(emailTemplates).values({
        templateName: 'shipping_notification',
        templateSubject: 'Your Starlink Order Has Shipped! #{{orderNumber}}',
        templateBody: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #000; color: #fff; padding: 20px; text-align: center; }
              .content { padding: 30px 20px; }
              .tracking-box { background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: center; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>STARLINK</h1>
                <p>Your Order is on the Way!</p>
              </div>
              <div class="content">
                <h2>Good news, {{firstName}}!</h2>
                <p>Your Starlink order #{{orderNumber}} has been shipped and is on its way to you.</p>
                
                <div class="tracking-box">
                  <h3>Tracking Number</h3>
                  <p><strong>{{trackingNumber}}</strong></p>
                </div>
                
                <p>You can expect delivery within 3-7 business days. Our installation team will contact you shortly to schedule the setup.</p>
                
                <p>Thank you for choosing Starlink!</p>
              </div>
              <div class="footer">
                <p>© {{year}} Starlink India. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        variables: ['firstName', 'orderNumber', 'trackingNumber', 'year'],
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
      
      console.log('Created default shipping_notification email template');
    }
  } catch (error) {
    console.error('Error initializing email templates:', error);
  }
}
