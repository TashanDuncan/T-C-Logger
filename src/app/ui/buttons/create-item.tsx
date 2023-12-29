import Link from "next/link";
import { Button } from "../components/ui/button";

export function CreateItem(itemType: { slug: string }) {
  const { slug } = itemType;
  return (
    <Link href={`${slug}/create`}>
      <Button>Add New</Button>
    </Link>
  );
}
