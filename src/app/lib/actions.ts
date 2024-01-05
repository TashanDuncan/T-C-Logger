"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateItemSchema, UserItemSchema } from "./utils";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
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
        createdBy: validatedData.userId,
        userItems: {
          create: [
            {
              userId: validatedData.userId,
              rating: validatedData.rating || 0,
              experienced: validatedData.experienced,
              review: validatedData.review,
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

export async function createOrUpdateUserItem(
  data: z.infer<typeof UserItemSchema>
) {
  const validatedData = UserItemSchema.parse(data);
  const item = await prisma.item.findUnique({
    where: { id: validatedData.id },
  });
  const category = await prisma.itemCategory.findUnique({
    where: { id: item?.categoryId },
  });
  if (!category?.id) {
    throw new Error("Invalid category.");
  }
  try {
    await prisma.item.update({
      where: {
        id: validatedData.id,
      },
      data: {
        userItems: {
          upsert: {
            where: {
              userId_itemId: {
                userId: validatedData.userId,
                itemId: validatedData.id,
              },
            },
            create: {
              rating: validatedData.rating || 0,
              experienced: validatedData.experienced,
              review: validatedData.review,
              users: {
                connect: {
                  id: validatedData.userId,
                },
              },
            },
            update: {
              rating: validatedData.rating || 0,
              experienced: validatedData.experienced,
              review: validatedData.review,
            },
          },
        },
      },
    });
    await prisma.$disconnect();
  } catch (error) {
    console.error("Database Error:", error);
    await prisma.$disconnect();
    throw new Error(`Failed to create data.`);
  }

  revalidatePath(`/${category?.slug ?? "category"}/${validatedData.id}`);
  redirect(`/${category?.slug ?? "category"}/${validatedData.id}`);
}

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
