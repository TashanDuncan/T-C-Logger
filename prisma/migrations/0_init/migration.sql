-- CreateTable
CREATE TABLE "item_types" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "item_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type_id" INTEGER NOT NULL,
    "tags" TEXT[],
    "created_by" INTEGER NOT NULL,
    "created_at" DATE NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_items" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "created_at" DATE NOT NULL,

    CONSTRAINT "user_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "partner_id" INTEGER,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "item_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

