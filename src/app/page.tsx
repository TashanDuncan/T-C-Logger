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

export default async function Home() {
  const itemTypes = await fetchItemTypes();
  return (
    <main className="flex min-h-screen items-center flex-col p-24">
      <div className="flex justify-center items-center">
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="50" className="text-white text-lg">
            <textPath href="#curve" className="fill-current">
              Tashan&apos;s + Christina&apos;s Favorites
            </textPath>
          </text>
          <path
            id="curve"
            d="M10 80 Q 120 10 240 80"
            className="stroke-current text-black"
          />
        </svg>
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
            <DropdownMenuItem>Add New</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}
