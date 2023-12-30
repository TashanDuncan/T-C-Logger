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
    <main className="flex min-h-screen justify-center items-center flex-col p-24">
      <div className="flex justify-center items-center">
        <Image src="/wlt.png" height={300} width={400} alt="website logo" />
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
      <div className="mt-auto w-full flex justify-end text-center">
        <span className="inline-flex items-center mr-3">Our Playlist</span>
        <a href="https://open.spotify.com/playlist/6FsTeuxK1Y3jgAIxyVqtbE?si=98143e7825ed458f" target="_blank">
          <Button variant="outline">
            <Image
              src={"/spotifyicon.png"}
              alt="Spotify Icon"
              width={30}
              height={30}
            />
          </Button>
        </a>
      </div>
    </main>
  );
}
