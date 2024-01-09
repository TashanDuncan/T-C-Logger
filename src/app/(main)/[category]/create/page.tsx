import { fetchItemCategories } from "@/app/lib/data";
import CreateItemForm from "./form";
import { getCurrentUser } from "@/app/lib/session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Item",
};

export default async function Page() {
  const itemCategories = await fetchItemCategories();
  const user = await getCurrentUser();

  return (user && <CreateItemForm categories={itemCategories || []} userId={user.id}/>)
}
