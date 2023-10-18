const { PrismaClient } = require("@prisma/client");

const insertProducts = require("./seedData.ts");

const prisma = new PrismaClient();

async function seedData() {
  try {
    for (const productData of insertProducts) {
      await prisma.product.create({ data: productData });
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
