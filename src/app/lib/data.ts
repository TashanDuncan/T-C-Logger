import { PrismaClient, Item, Tag, UserItem } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

interface ItemWithRelationships extends Item {
  userItems: UserItem[];
  tags: Tag[];
}

interface ItemWithAvgRating extends ItemWithRelationships {
  avgRating: number;
}

function calculateAvgRating(
  items: ItemWithRelationships[]
): ItemWithAvgRating[] {
  return items.map((item) => {
    const ratings = item.userItems.map(
      (user_item: UserItem) => user_item.rating
    );
    const avgRating = ratings.length === 2 ? ratings[0] + ratings[1] / 2 : 0;
    return { ...item, avgRating };
  });
}

async function handleDatabaseError(error: unknown) {
  console.error("Database Error:", error);
  await prisma.$disconnect();
  throw new Error("Failed to fetch item data.");
}

// export async function fetchItems() {
//   noStore();
//   try {
//     const items = await prisma.items.findMany({
//       include: {
//         tags: true,
//         user_items: {
//           where: { OR: [{ user_id: 1 }, { user_id: 2 }] },
//         },
//       },
//     });

//     const itemsWithAvgRating = calculateAvgRating(items);

//     await prisma.$disconnect();
//     return itemsWithAvgRating;
//   } catch (error) {
//     await handleDatabaseError(error);
//   }
// }

export async function fetchItemTypes() {
  try {
    const itemTypes = await prisma.itemCategory.findMany({
      orderBy: { description: "asc" },
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
    const itemTypes = await prisma.itemCategory.findUnique({
      where: { slug: type },
      include: {
        items: {
          include: {
            tags: true,
            userItems: {
              where: { OR: [{ userId: 1 }, { userId: 2 }] },
            },
          },
        },
      },
    });
    let itemsWithAvgRating: ItemWithAvgRating[] = [];
    if (itemTypes) {
      itemsWithAvgRating = calculateAvgRating(itemTypes.items);
      await prisma.$disconnect();
      return itemsWithAvgRating;
    } else {
      return [];
    }
  } catch (error) {
    await handleDatabaseError(error);
  }
}
