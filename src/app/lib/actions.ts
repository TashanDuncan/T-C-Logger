"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export async function deleteItem(id: number) {
  try {
    const userItems = await prisma.userItem.deleteMany({
      where: { itemId: id },
    });
    const item = await prisma.item.delete({
      where: { id },
    });
    const itemCategory = await prisma.itemCategory.findUnique({
      where: { id: item.categoryId },
    });
    const itemCategorySlug = itemCategory?.slug;
    await prisma.$disconnect();
    revalidatePath(`/${itemCategorySlug || ""}`);

    return { item, userItems };
  } catch (error) {
    console.error("Database Error:", error);
    await prisma.$disconnect();
    throw new Error(`Failed to delete data.`);
  }
}
