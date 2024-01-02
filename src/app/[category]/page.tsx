import { fetchItemsByType } from "@/app/lib/data";
import { getRatingValue } from "@/app/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/ui/components/ui/avatar";
import { Badge } from "@/app/ui/components/ui/badge";
import { headers } from "next/headers";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/ui/table";
import { PencilLineIcon } from "lucide-react";
import { Tag } from "@prisma/client";
import { CreateItem } from "../ui/buttons/create-item";
import { DeleteItem } from "../ui/delete-item";
import { Button } from "../ui/components/ui/button";

export default async function Page() {
  const headersList = headers();
  const activePath = await headersList.get("next-url");
  const itemCategory = activePath?.replace("/", "");
  const items = await fetchItemsByType(itemCategory || "");

  return (
    <>
      <Table className="table-fixed">
        <TableCaption>
          {items && items?.length > 0
            ? "A list of your items."
            : `No ${itemCategory} Found`}
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
                <TableCell>
                  {getRatingValue(partnerItem?.rating ?? 0)}
                </TableCell>
                <TableCell>{getRatingValue(item.avgRating)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="hover:text-blue-600 mx-2"
                  >
                    <PencilLineIcon className="shrink-0 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                  <DeleteItem item={item} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center md:block">
        <CreateItem slug={activePath || ""} />
      </div>
    </>
  );
}
