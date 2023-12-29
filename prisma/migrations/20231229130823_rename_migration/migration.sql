/*
  Warnings:

  - You are about to drop the column `type_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
ALTER TABLE "items" RENAME CONSTRAINT "items_type_id_fkey" TO "items_category_id_fkey";
-- AlterTable
ALTER TABLE "items" RENAME COLUMN "type_id" TO "category_id";

