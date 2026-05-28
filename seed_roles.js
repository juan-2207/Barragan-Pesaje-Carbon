import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

(async () => {
  try {
    // Insertar roles básicos
    await prisma.$queryRaw`INSERT INTO "Role" (name, "createdAt", "updatedAt") VALUES
      ('Admin', NOW(), NOW()),
      ('Operador de Báscula', NOW(), NOW()),
      ('Gerente de Minas', NOW(), NOW())
      ON CONFLICT (name) DO NOTHING`;

    console.log('Roles insertados exitosamente');
  } catch (error) {
    console.error('Error insertando roles:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();