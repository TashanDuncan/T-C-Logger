/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `item_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "item_types_slug_key" ON "item_types"("slug");
