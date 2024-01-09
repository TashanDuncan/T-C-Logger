import { fetchItemById, fetchItemCategories } from "@/app/lib/data";
import EditItemForm from "./form";
import { getCurrentUser } from "@/app/lib/session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Item",
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const itemCategories = await fetchItemCategories();
  const user = await getCurrentUser();
  const item = await fetchItemById(parseInt(id));
  const userItem = item?.userItems.find((item) => item.userId === user?.id);

  return (
    user &&
    item && (
      <EditItemForm
        categories={itemCategories || []}
        userId={user.id}
        item={item}
        userItem={userItem}
      />
    )
  );
}
