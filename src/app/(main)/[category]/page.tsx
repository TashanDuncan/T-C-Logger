import { CreateItem } from "@/app/ui/buttons/create-item";
import ItemsTable from "./item-table";
import { Metadata } from "next";
import {
  MetadataProps,
  capitalizeFirstLetterAndRemoveDashes,
} from "@/app/lib/utils";

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { category } = params;
  return {
    title: capitalizeFirstLetterAndRemoveDashes(category),
  };
}
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
