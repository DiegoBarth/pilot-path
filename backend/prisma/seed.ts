import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { createPrismaAdapter } from '../src/database/prisma-adapter';
import { runSeeds } from './seeds';

const prisma = new PrismaClient({
  adapter: createPrismaAdapter(),
});

async function main() {
  console.log('🌱 Starting database seeding...');

  await runSeeds(prisma);

  console.log('✅ Database seeding completed.');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });