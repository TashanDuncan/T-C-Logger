import { PrismaClient, items, user_items } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

function calculateAvgRating(items: any[]) {
  return items.map((item) => {
    const ratings = item.user_items.map(
      (user_item: user_items) => user_item.rating
    );
    const avgRating =
      ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length;
    return { ...item, avgRating };
  });
}

async function handleDatabaseError(error: unknown) {
  console.error("Database Error:", error);
  await prisma.$disconnect();
  throw new Error("Failed to fetch item data.");
}

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

    const itemsWithAvgRating = calculateAvgRating(items);

    await prisma.$disconnect();
    return itemsWithAvgRating;
  } catch (error) {
    await handleDatabaseError(error);
  }
}

export async function fetchItemTypes() {
  try {
    const itemTypes = await prisma.item_categories.findMany({
      orderBy: { description: 'asc' },
    });
    await prisma.$disconnect();
    return itemTypes;
  } catch (error) {
    await handleDatabaseError(error);
  }
}

export async function fetchItemsByType(type: string) {
  noStore();
  try {
    const itemTypes = await prisma.item_categories.findUnique({
      where: { slug: type },
      include: {
        items: {
          include: {
            tags: true,
            user_items: {
              where: { OR: [{ user_id: 1 }, { user_id: 2 }] },
            },
          },
        },
      },
    });
    let itemsWithAvgRating;
    if (itemTypes) {
      itemsWithAvgRating = calculateAvgRating(itemTypes.items);
    }
    await prisma.$disconnect();
    return itemsWithAvgRating;
  } catch (error) {
    await handleDatabaseError(error);
  }
}
