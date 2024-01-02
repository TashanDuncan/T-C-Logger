import { PencilLineIcon } from "lucide-react";
import { getRatingValue } from "../lib/utils";
import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { DeleteItem } from "./delete-item";
import { Tag } from "@prisma/client";
import { fetchItemsByType } from "../lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";

export default async function ItemsTable({ query }: { query: string }) {
  const items = await fetchItemsByType(query);

  return (
    <Table className="table-fixed">
      <TableCaption>
        {items && items?.length > 0
          ? `A list of your ${query}.`
          : `No ${query} Found`}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Tags</TableHead>
          <TableHead className="hidden md:table-cell">Experienced</TableHead>
          <TableHead>Your Rating</TableHead>
          <TableHead>Partner Rating</TableHead>
          <TableHead>Average Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item) => {
          const { tags, userItems } = item;
          const userItem = userItems.find((item) => item.userId === 1);
          const partnerItem = userItems.find((item) => item.userId === 2);
          return (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {tags.map((tag: Tag) => (
                  <Badge key={tag.id} className="mx-2">
                    {tag.name}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap">
                  {userItem?.experienced && (
                    <Avatar className="mx-2">
                      <AvatarImage src="/tashan.jpg" />
                      <AvatarFallback>TD</AvatarFallback>
                    </Avatar>
                  )}
                  {partnerItem?.experienced && (
                    <Avatar className="mx-2">
                      <AvatarImage src="/christina.png" />
                      <AvatarFallback>CV</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </TableCell>
              <TableCell>{getRatingValue(userItem?.rating ?? 0)}</TableCell>
              <TableCell>{getRatingValue(partnerItem?.rating ?? 0)}</TableCell>
              <TableCell>{getRatingValue(item.avgRating)}</TableCell>
              <TableCell>
                <Button variant="outline" className="hover:text-blue-600 mx-2">
                  <PencilLineIcon className="shrink-0 w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <DeleteItem item={item} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
