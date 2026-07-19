import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Fresh Fruits', slug: 'fresh-fruits', description: 'Fresh and organic fruits', color: '#ef4444', icon: '🍎' } }),
    prisma.category.create({ data: { name: 'Vegetables', slug: 'vegetables', description: 'Farm fresh vegetables', color: '#22c55e', icon: '🥬' } }),
    prisma.category.create({ data: { name: 'Dairy & Eggs', slug: 'dairy-eggs', description: 'Fresh dairy products', color: '#3b82f6', icon: '🥛' } }),
    prisma.category.create({ data: { name: 'Bakery', slug: 'bakery', description: 'Fresh baked goods', color: '#f59e0b', icon: '🍞' } }),
    prisma.category.create({ data: { name: 'Beverages', slug: 'beverages', description: 'Drinks and beverages', color: '#8b5cf6', icon: '🥤' } }),
    prisma.category.create({ data: { name: 'Snacks', slug: 'snacks', description: 'Chips and munchies', color: '#f97316', icon: '🍿' } }),
    prisma.category.create({ data: { name: 'Household', slug: 'household', description: 'Home essentials', color: '#14b8a6', icon: '🧼' } }),
    prisma.category.create({ data: { name: 'Personal Care', slug: 'personal-care', description: 'Beauty and hygiene', color: '#ec4899', icon: '🧴' } }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create products
  const products = await Promise.all([
    prisma.product.create({ data: { name: 'Fresh Avocado', slug: 'fresh-avocado', sku: 'FRU-001', mrp: 65, price: 49, unit: 'pc', quantity: 1, stock: 100, categoryId: categories[0].id, isOrganic: true, tags: ['organic', 'fresh'], images: ['https://images.unsplash.com/photo-1523049673856-6491cda41ac9?w=400'] } }),
    prisma.product.create({ data: { name: 'Organic Bananas', slug: 'organic-bananas', sku: 'FRU-002', mrp: 55, price: 39, unit: 'dozen', quantity: 12, stock: 150, categoryId: categories[0].id, isOrganic: true, tags: ['organic', 'fresh'], images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'] } }),
    prisma.product.create({ data: { name: 'Fresh Milk', slug: 'fresh-milk', sku: 'DAI-001', mrp: 38, price: 32, unit: 'ml', quantity: 500, stock: 200, categoryId: categories[2].id, tags: ['dairy', 'fresh'], images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400'] } }),
    prisma.product.create({ data: { name: 'Brown Bread', slug: 'brown-bread', sku: 'BAK-001', mrp: 35, price: 25, unit: 'g', quantity: 400, stock: 80, categoryId: categories[3].id, tags: ['bakery', 'fresh'], images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'] } }),
    prisma.product.create({ data: { name: 'Fresh Tomatoes', slug: 'fresh-tomatoes', sku: 'VEG-001', mrp: 40, price: 28, unit: 'g', quantity: 500, stock: 120, categoryId: categories[1].id, isOrganic: true, tags: ['organic', 'fresh'], images: ['https://images.unsplash.com/photo-1546470427-0d4db154ceb7?w=400'] } }),
    prisma.product.create({ data: { name: 'Potatoes', slug: 'potatoes', sku: 'VEG-002', mrp: 30, price: 22, unit: 'kg', quantity: 1, stock: 200, categoryId: categories[1].id, tags: ['vegetable', 'staple'], images: ['https://images.unsplash.com/photo-1518977676601-b53f82ber40d?w=400'] } }),
    prisma.product.create({ data: { name: 'Onions', slug: 'onions', sku: 'VEG-003', mrp: 25, price: 18, unit: 'g', quantity: 500, stock: 180, categoryId: categories[1].id, tags: ['vegetable', 'staple'], images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400'] } }),
    prisma.product.create({ data: { name: 'Fresh Carrots', slug: 'fresh-carrots', sku: 'VEG-004', mrp: 48, price: 35, unit: 'g', quantity: 500, stock: 90, categoryId: categories[1].id, isOrganic: true, tags: ['organic', 'fresh'], images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400'] } }),
    prisma.product.create({ data: { name: 'Orange Juice', slug: 'orange-juice', sku: 'BEV-001', mrp: 110, price: 85, unit: 'ml', quantity: 1000, stock: 60, categoryId: categories[4].id, tags: ['beverage', 'juice'], images: ['https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400'] } }),
    prisma.product.create({ data: { name: 'Potato Chips', slug: 'potato-chips', sku: 'SNK-001', mrp: 30, price: 20, unit: 'g', quantity: 100, stock: 300, categoryId: categories[5].id, tags: ['snacks', 'chips'], images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400'] } }),
    prisma.product.create({ data: { name: 'Detergent Powder', slug: 'detergent-powder', sku: 'HOU-001', mrp: 180, price: 145, unit: 'kg', quantity: 1, stock: 75, categoryId: categories[6].id, tags: ['household', 'cleaning'], images: ['https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400'] } }),
    prisma.product.create({ data: { name: 'Red Apples', slug: 'red-apples', sku: 'FRU-003', mrp: 150, price: 120, unit: 'kg', quantity: 1, stock: 100, categoryId: categories[0].id, isOrganic: true, tags: ['organic', 'fresh'], images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400'] } }),
  ]);

  console.log(`✅ Created ${products.length} products`);

  // Create coupons
  const coupons = await Promise.all([
    prisma.coupon.create({ data: { code: 'WELCOME50', description: '50% off on first order', type: 'PERCENTAGE', value: 50, minOrderAmount: 200, maxDiscount: 100, usageLimit: 1000, startDate: new Date(), endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } }),
    prisma.coupon.create({ data: { code: 'FREEDEL', description: 'Free delivery', type: 'FREE_DELIVERY', value: 40, minOrderAmount: 300, usageLimit: 500, startDate: new Date(), endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) } }),
    prisma.coupon.create({ data: { code: 'SAVE100', description: 'Flat ₹100 off', type: 'FIXED_AMOUNT', value: 100, minOrderAmount: 500, maxDiscount: 100, usageLimit: 200, startDate: new Date(), endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) } }),
  ]);

  console.log(`✅ Created ${coupons.length} coupons`);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@quickmart.com',
      phone: '+919876543210',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYA.qGZvKG6G', // admin123
      name: 'Admin User',
      role: 'SUPER_ADMIN',
      emailVerified: true,
      phoneVerified: true,
    },
  });

  await prisma.wallet.create({ data: { userId: admin.id, balance: 0 } });

  console.log('✅ Created admin user: admin@quickmart.com / admin123');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
