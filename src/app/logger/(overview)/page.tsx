import { fetchItems } from "@/app/lib/data";
import { getRatingValue } from "@/app/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/ui/components/ui/avatar";
import { Badge } from "@/app/ui/components/ui/badge";
import { Checkbox } from "@/app/ui/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/components/ui/select";
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
              <TableCell className="flex space-x-5">
                <Avatar>
                  <AvatarImage src="/tashan.jpg" />
                  <AvatarFallback>TD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="/christina.png" />
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <Select defaultValue={userItem.rating.toString()}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rating</SelectLabel>
                      <SelectItem value="10">(10) Masterpiece</SelectItem>
                      <SelectItem value="9">(9) Great</SelectItem>
                      <SelectItem value="8">(8) Very Good</SelectItem>
                      <SelectItem value="7">(7) Good</SelectItem>
                      <SelectItem value="6">(6) Fine</SelectItem>
                      <SelectItem value="5">(5) Average</SelectItem>
                      <SelectItem value="4">(4) Bad</SelectItem>
                      <SelectItem value="3">(3) Very Bad</SelectItem>
                      <SelectItem value="2">(2) Horrible</SelectItem>
                      <SelectItem value="1">(1) Appalling</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{getRatingValue(partnerItem.rating)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
