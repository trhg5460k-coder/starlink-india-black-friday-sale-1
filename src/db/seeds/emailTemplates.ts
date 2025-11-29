import { db } from '@/db';
import { emailTemplates } from '@/db/schema';

async function main() {
    const sampleEmailTemplates = [
        {
            templateName: 'order_confirmation',
            templateSubject: 'Your Starlink Pre-Booking Confirmed!',
            templateBody: '<html><body><h1>Thank you for your order!</h1><p>Dear {{customer_name}},</p><p>Your Starlink pre-booking has been confirmed. Here are your order details:</p><ul><li>Order Number: {{order_number}}</li><li>Plan: {{plan_name}}</li><li>Device Price: ₹{{device_price}}</li><li>Monthly Price: ₹{{monthly_price}}</li></ul><p>We will notify you once your kit ships.</p><p>Best regards,<br>Starlink Team</p></body></html>',
            variables: ["customer_name", "order_number", "plan_name", "device_price", "monthly_price"],
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            templateName: 'order_shipped',
            templateSubject: 'Your Starlink Kit Has Shipped!',
            templateBody: '<html><body><h1>Your order is on the way!</h1><p>Dear {{customer_name}},</p><p>Great news! Your Starlink kit has been shipped.</p><ul><li>Order Number: {{order_number}}</li><li>Tracking Number: {{tracking_number}}</li><li>Estimated Delivery: {{estimated_delivery}}</li></ul><p>You can track your shipment using the tracking number above.</p><p>Best regards,<br>Starlink Team</p></body></html>',
            variables: ["customer_name", "order_number", "tracking_number", "estimated_delivery"],
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(emailTemplates).values(sampleEmailTemplates);
    
    console.log('✅ Email templates seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});