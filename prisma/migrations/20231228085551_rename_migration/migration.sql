/*
  Warnings:

  - You are about to drop the column `name` on the `item_types` table. All the data in the column will be lost.
  - Added the required column `slug` to the `item_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_types"
RENAME COLUMN "name" TO "slug";