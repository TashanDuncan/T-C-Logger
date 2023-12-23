-- AlterTable
CREATE SEQUENCE item_types_id_seq;
ALTER TABLE "item_types" ALTER COLUMN "id" SET DEFAULT nextval('item_types_id_seq');
ALTER SEQUENCE item_types_id_seq OWNED BY "item_types"."id";

-- AlterTable
CREATE SEQUENCE items_id_seq;
ALTER TABLE "items" ALTER COLUMN "id" SET DEFAULT nextval('items_id_seq');
ALTER SEQUENCE items_id_seq OWNED BY "items"."id";

-- AlterTable
CREATE SEQUENCE user_items_id_seq;
ALTER TABLE "user_items" ALTER COLUMN "id" SET DEFAULT nextval('user_items_id_seq');
ALTER SEQUENCE user_items_id_seq OWNED BY "user_items"."id";
