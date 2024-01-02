import { headers } from "next/headers";

import { CreateItem } from "../ui/buttons/create-item";
import ItemsTable from "../ui/item-table";

export default async function Page({
  params: { category },
}: {
  params: { category: string };
}) {
  return (
    <>
      <ItemsTable query={category} />
      <div className="flex justify-center items-center md:block">
        <CreateItem slug={`/${category}`} />
      </div>
    </>
  );
}
