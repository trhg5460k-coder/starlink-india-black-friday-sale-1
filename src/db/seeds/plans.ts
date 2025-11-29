import { db } from '@/db';
import { plans } from '@/db/schema';

async function main() {
    const samplePlans = [
        {
            planId: 'basic',
            name: 'Basic',
            speed: '25 Mbps',
            originalPrice: 3000,
            discountedPrice: 2250,
            discountPercentage: 25,
            features: ["Unlimited Data", "Basic Support", "Standard Latency"],
            isPopular: false,
            isActive: true,
            displayOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            planId: 'standard',
            name: 'Standard',
            speed: '50 Mbps',
            originalPrice: 5000,
            discountedPrice: 3750,
            discountPercentage: 25,
            features: ["Unlimited Data", "Priority Support", "Low Latency", "Static IP Option"],
            isPopular: true,
            isActive: true,
            displayOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            planId: 'premium',
            name: 'Premium',
            speed: '100 Mbps',
            originalPrice: 8000,
            discountedPrice: 6000,
            discountPercentage: 25,
            features: ["Unlimited Data", "24/7 Priority Support", "Ultra-Low Latency", "Static IP Included"],
            isPopular: false,
            isActive: true,
            displayOrder: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(plans).values(samplePlans);
    
    console.log('✅ Plans seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});