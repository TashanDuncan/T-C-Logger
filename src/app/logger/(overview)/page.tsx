import { fetchItems } from "@/app/lib/data";
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
          <TableHead>Consumed</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.tags}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{}</TableCell>
            <TableCell>{}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
