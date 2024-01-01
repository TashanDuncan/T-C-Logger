"use server"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function deleteItem(id: number) {
  try {
    const item = await prisma.item.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return item;
  } catch (error) {
    console.error("Database Error:", error);
    await prisma.$disconnect();
    throw new Error(`Failed to delete data.`);
  }
}
