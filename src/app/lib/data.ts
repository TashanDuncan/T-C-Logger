import { PrismaClient } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

export async function fetchItems() {
  noStore();
  try {
    const items = await prisma.items.findMany({
      include: {
        tags: true,
        user_items: {
         where: { OR: [{ user_id: 1 }, { user_id: 2 }] },
        },
      },
    });

    console.log(items);
    console.log(items[0].user_items);
    await prisma.$disconnect();
    return items;
  } catch (error) {
    console.error("Database Error:", error);
    await prisma.$disconnect();
    throw new Error("Failed to fetch item data.");
  }
}
