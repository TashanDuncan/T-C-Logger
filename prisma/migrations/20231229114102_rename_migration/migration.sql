/*
  Warnings:

  - You are about to drop the `item_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_type_id_fkey";

-- DropTable
ALTER TABLE "item_types" RENAME TO "item_categories";

-- ALTER TABLE name RENAME CONSTRAINT constraint_name TO new_constraint_name;
ALTER TABLE "item_categories" RENAME CONSTRAINT "item_types_pkey" TO "item_categories_pkey";


-- CreateIndex
CREATE UNIQUE INDEX "item_categories_slug_key" ON "item_categories"("slug");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "item_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
