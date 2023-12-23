import { PrismaClient } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

export async function fetchItems() {
  try {
    const items = await prisma.items.findMany();
    console.log(items);
    await prisma.$disconnect();
    return items;
  } catch (error) {
    console.error('Database Error:', error);
    await prisma.$disconnect();
    throw new Error('Failed to fetch item data.');
  }

}
