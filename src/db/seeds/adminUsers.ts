import { db } from '@/db';
import { adminUsers } from '@/db/schema';
import bcrypt from 'bcrypt';

async function main() {
    const passwordHash = await bcrypt.hash('admin123', 10);
    
    const sampleAdminUsers = [
        {
            username: 'admin',
            passwordHash: passwordHash,
            email: 'admin@starlink.in',
            fullName: 'Admin User',
            role: 'super_admin',
            isActive: true,
            lastLoginAt: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(adminUsers).values(sampleAdminUsers);
    
    console.log('✅ Admin users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});