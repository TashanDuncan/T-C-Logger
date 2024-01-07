import { CreateItem } from "@/app/ui/buttons/create-item";
import ItemsTable from "./item-table";

export default async function Page({
  params: { category },
}: {
  params: { category: string };
}) {
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white text-center">
        {category.replace(/-/g, " ").toUpperCase()}
      </h1>
      <ItemsTable query={category} />
      <div className="flex justify-center items-center md:block">
        <CreateItem slug={`/${category}`} />
      </div>
    </>
  );
}
