/*
  Warnings:

  - The primary key for the `user_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_items" DROP CONSTRAINT "user_items_pkey",
DROP COLUMN "id";
