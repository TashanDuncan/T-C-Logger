import { EyeIcon, PencilLineIcon } from "lucide-react";

import { Tag } from "@prisma/client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/ui/table";
import { fetchItemsByType, fetchUser } from "@/app/lib/data";
import { getCurrentUser } from "@/app/lib/session";
import { Badge } from "@/app/ui/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/ui/components/ui/avatar";
import { getRatingValue } from "@/app/lib/utils";
import { DeleteItem } from "@/app/ui/buttons/delete-item";
import { Button } from "@/app/ui/components/ui/button";

export default async function ItemsTable({ query }: { query: string }) {
  const items = await fetchItemsByType(query);
  const user = await getCurrentUser();
  const partner = await fetchUser(user?.partnerId || "");
  const category = query.replace(/-/g, " ");
  return (
    <Table className="table-fixed w-full">
      {items?.length === 0 && (
        <TableCaption className="mb-3">No {category} Found</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Tags</TableHead>
          <TableHead className="hidden md:table-cell">Experienced</TableHead>
          <TableHead>Tashan Rating</TableHead>
          <TableHead>Christina Rating</TableHead>
          <TableHead>Average Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item) => {
          const { tags, userItems } = item;
          const tashan = userItems.find((item) => item.userId === "1");
          const christina = userItems.find((item) => item.userId === "2");
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
                  {tashan?.experienced && (
                    <Avatar className="mx-2">
                      <AvatarImage src="tashan.jpg" alt="tashan" />
                      <AvatarFallback>
                        {user?.name ? user?.name[0].toUpperCase() : "N/A"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {christina?.experienced && (
                    <Avatar className="mx-2">
                      <AvatarImage src="christina.png" alt="christina" />
                      <AvatarFallback>
                        {partner?.name[0].toUpperCase() ?? "N/A"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </TableCell>
              <TableCell>{getRatingValue(tashan?.rating ?? 0)}</TableCell>
              <TableCell>{getRatingValue(christina?.rating ?? 0)}</TableCell>
              <TableCell>{getRatingValue(item.avgRating)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap">
                  <Link href={`/${query}/${item.id.toString()}`}>
                    <Button variant="outline" className="hover:text-blue-600">
                      <EyeIcon className=" w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </Link>
                  {!!user && (
                    <>
                      <Link href={`/${query}/${item.id.toString()}/edit`}>
                        <Button
                          variant="outline"
                          className="hover:text-blue-600"
                        >
                          <PencilLineIcon className="shrink-0 w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                      </Link>
                      <DeleteItem item={item} />
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
