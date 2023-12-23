import { fetchItems } from "@/app/lib/data";
import { Badge } from "@/app/ui/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/ui/table";

export default async function Page() {
  const items = await fetchItems();
  return (
    <Table>
      <TableCaption>A list of your items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Experienced</TableHead>
          <TableHead>Your Rating</TableHead>
          <TableHead>Partner Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const { tags, user_items } = item;
          const userItem = user_items[0];
          const partnerItem = user_items[1];
          return (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                {tags.map((tag) => (
                  <Badge key={tag.id} className="mx-2">
                    {tag.name}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>{}</TableCell>
              <TableCell>{userItem.rating}</TableCell>
              <TableCell>{partnerItem.rating}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
