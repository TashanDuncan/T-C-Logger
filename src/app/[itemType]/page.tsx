import { fetchItemsByType } from "@/app/lib/data";
import { RatingValue, getRatingValue } from "@/app/lib/utils";
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
import { PencilLineIcon, Trash2Icon } from "lucide-react";
import { tags, user_items } from "@prisma/client";
import { CreateItem } from "../ui/buttons/create-item";

export default async function Page() {
  const headersList = headers();
  const activePath = await headersList.get("next-url");
  const items = await fetchItemsByType(activePath?.replace("/", "") || "");

  return (
    <>
      <Table className="table-fixed">
        <TableCaption>A list of your items.</TableCaption>
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
            const { tags, user_items } = item;
            const userItem = user_items.find((item) => item.user_id === 1);
            const partnerItem = user_items.find((item) => item.user_id === 2);
            return (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {tags.map((tag: tags) => (
                    <Badge key={tag.id} className="mx-2">
                      {tag.name}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="hidden md:flex space-x-5">
                  {userItem?.experienced && (
                    <div>
                      <Avatar>
                        <AvatarImage src="/tashan.jpg" />
                        <AvatarFallback>TD</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  {partnerItem?.experienced && (
                    <div>
                      <Avatar>
                        <AvatarImage src="/christina.png" />
                        <AvatarFallback>CV</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </TableCell>
                <TableCell>{getRatingValue(userItem?.rating ?? 0)}</TableCell>
                <TableCell>
                  {getRatingValue(partnerItem?.rating ?? 0)}
                </TableCell>
                <TableCell>{getRatingValue(item.avgRating)}</TableCell>
                <TableCell>
                  <div className="flex space-x-4 justify-start align-top">
                    <PencilLineIcon className="hover:text-blue-600 shrink-0 w-4 h-4 md:w-5 md:h-5" />
                    <Trash2Icon className="hover:text-blue-600 shrink-0 w-4 h-4 md:w-5 md:h-5" />
                  </div>
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
