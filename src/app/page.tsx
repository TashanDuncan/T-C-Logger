import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/components/ui/dropdown-menu";
import { Button } from "./ui/components/ui/button";
import Link from "next/link";
import { fetchItemTypes } from "./lib/data";
import Image from "next/image";

export default async function Home() {
  const itemTypes = await fetchItemTypes();
  return (
    <main className="flex min-h-screen items-center flex-col p-24">
      <div className="flex justify-center items-center">
   <Link className="my-2 flex h-20 items-end justify-start rounded-md p=4 md:h-40"
   href="/">
    <Image src="/wlt.png"
    height={300}
    width={400}
    alt="logo"
    />
   </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Our Favourites</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {itemTypes &&
              itemTypes.map((item, i) => (
                <Link href={item.slug} key={i}>
                  <DropdownMenuItem>{item.description}</DropdownMenuItem>
                </Link>
              ))}
            <DropdownMenuSeparator />
            <Link href={"/categories/new"}>
              <DropdownMenuItem>Add New</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}
