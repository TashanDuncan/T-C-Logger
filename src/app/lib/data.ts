import { PrismaClient, Item, Tag, UserItem } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

export interface ItemWithRelationships extends Item {
  userItems: UserItem[];
  tags: Tag[];
}

export interface ItemWithAvgRating extends ItemWithRelationships {
  avgRating: number;
}

function calculateAvgRating(
  items: ItemWithRelationships[]
): ItemWithAvgRating[] {
  return items.map((item) => {
    const ratings = item.userItems
      .filter((user_item: UserItem) => user_item.rating > 0)
      .map((user_item: UserItem) => user_item.rating);
    const avgRating =
      ratings.length === 2 ? Math.round((ratings[0] + ratings[1]) / 2) : 0;
    return { ...item, avgRating };
  });
}

async function handleDatabaseError(error: unknown, dataType?: string) {
  console.error("Database Error:", error);
  await prisma.$disconnect();
  throw new Error(`Failed to fetch ${dataType || ""} data.`);
}

export async function fetchItemCategories() {
  try {
    const itemCategories = await prisma.itemCategory.findMany({
      orderBy: { description: "asc" },
    });
    await prisma.$disconnect();
    return itemCategories;
  } catch (error) {
    await handleDatabaseError(error, "item type");
  }
}

export async function fetchItemsByType(type: string) {
  noStore();
  try {
    const itemCategory = await prisma.itemCategory.findUnique({
      where: { slug: type },
      include: {
        items: {
          include: {
            tags: true,
            userItems: {
              where: { OR: [{ userId: "1" }, { userId: "2" }] },
            },
          },
        },
      },
    });
    let itemsWithAvgRating: ItemWithAvgRating[] = [];
    if (itemCategory) {
      itemsWithAvgRating = calculateAvgRating(itemCategory.items);
      await prisma.$disconnect();

      return itemsWithAvgRating;
    } else {
      await prisma.$disconnect();
      return [];
    }
  } catch (error) {
    await prisma.$disconnect();
    await handleDatabaseError(error, "items");
  }
}

export async function fetchItemById(id: number) {
  try {
    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        tags: true,
        userItems: {
          where: { OR: [{ userId: "1" }, { userId: "2" }] },
        },
      },
    });
    let itemWithAvgRating: ItemWithAvgRating = {} as ItemWithAvgRating;
    if (item) {
      itemWithAvgRating = calculateAvgRating([item])[0];
    }
    await prisma.$disconnect();
    return itemWithAvgRating;
  } catch (error) {
    await prisma.$disconnect();

    await handleDatabaseError(error, "item");
  }
}
