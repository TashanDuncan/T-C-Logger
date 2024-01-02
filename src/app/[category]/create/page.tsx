import { fetchItemCategories } from "@/app/lib/data";
import CreateItemForm from "./form";

export default async function Page() {
  const itemCategories = await fetchItemCategories();

  return <CreateItemForm categories={itemCategories || []} />;
}
