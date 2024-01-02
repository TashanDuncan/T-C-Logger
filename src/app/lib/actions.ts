"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateItemSchema } from "./utils";
import { z } from "zod";

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

export async function createItem(data: z.infer<typeof CreateItemSchema>) {
  const validatedData = CreateItemSchema.parse(data);
  const category = await prisma.itemCategory.findUnique({
    where: { slug: validatedData.category },
  });
  if (!category?.id) {
    throw new Error("Invalid category.");
  }
  try {
    await prisma.item.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        categoryId: category.id,
        createdBy: 1,
        userItems: {
          create: [
            {
              userId: 1,
              rating: validatedData.rating || 0,
              experienced: validatedData.experienced,
            },
          ],
        },
      },
    });
    await prisma.$disconnect();
  } catch (error) {
    console.error("Database Error:", error);
    await prisma.$disconnect();
    throw new Error(`Failed to create data.`);
  }
  revalidatePath(`/${category.slug}`);
  redirect(`/${category.slug}`);
}
