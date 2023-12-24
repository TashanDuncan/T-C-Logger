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

    const itemsWithAvgRating = items.map((item) => {
      const ratings = item.user_items.map((user_item) => user_item.rating);
      const avgRating =
        ratings.reduce((a, b) => a + b, 0) / ratings.length;
      return { ...item, avgRating };
    });

    console.log(itemsWithAvgRating);
    await prisma.$disconnect();
    return itemsWithAvgRating;
  } catch (error) {
    console.error("Database Error:", error);
    await prisma.$disconnect();
    throw new Error("Failed to fetch item data.");
  }
}

export async function fetchItemTypes() {
  noStore();
  try {
    const itemTypes = await prisma.item_types.findMany();
    await prisma.$disconnect();
    return itemTypes;
  } catch (error) {
    console.error("Database Error:", error);
    await prisma.$disconnect();
    throw new Error("Failed to fetch item type data.");
  }
}