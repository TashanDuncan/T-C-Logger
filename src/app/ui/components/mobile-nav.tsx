import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/app/ui/components/ui/menubar";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Image from "next/image";
import { ItemCategory } from "@prisma/client";

export function MobileNavigation({
  categories,
}: {
  categories: ItemCategory[] | undefined;
}) {
  return (
    <Menubar>
      <MenubarMenu>
        <Link href="/">
          <Button variant="outline" className="border-none">
            Home
          </Button>
        </Link>
      </MenubarMenu>
      {categories && (
        <MenubarMenu>
          <MenubarTrigger>Categories</MenubarTrigger>
          <MenubarContent>
            {categories.map((category) => (
              <Link href={`/${category.slug}`} key={category.id}>
                <MenubarCheckboxItem>
                  {category.description}
                </MenubarCheckboxItem>
              </Link>
            ))}
          </MenubarContent>
        </MenubarMenu>
      )}
      <MenubarMenu>
        <MenubarTrigger>Links</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Tashan&apos;s Website</MenubarItem>
          <MenubarItem>Christina&apos;s Website</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <a
          href="https://open.spotify.com/playlist/6FsTeuxK1Y3jgAIxyVqtbE?si=98143e7825ed458f"
          target="_blank"
        >
          <Button variant="outline" className="border-none">
            <span className="inline-flex items-center mr-3">Our Playlist</span>
            <Image
              src={"/spotifyicon.png"}
              alt="Spotify Icon"
              width={20}
              height={20}
            />
          </Button>
        </a>
      </MenubarMenu>
      <MenubarMenu>
        <ThemeToggle />
      </MenubarMenu>
    </Menubar>
  );
}
