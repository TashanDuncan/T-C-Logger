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
import SignOutButton from "../buttons/sign-out";

export function MobileNavigation({
  categories,
}: {
  categories: ItemCategory[] | undefined;
}) {
  return (
    <Menubar className="h-16 w-full flex justify-center">
      <MenubarMenu>
        <Link href="/">
          <Button variant="outline" className="border-none">
            Home
          </Button>
        </Link>
      </MenubarMenu>
      {categories && (
        <MenubarMenu>
          <MenubarTrigger>
            <Button variant="outline" className="border-none">
              Categories
            </Button>
          </MenubarTrigger>
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
        <MenubarTrigger>
          <Button variant="outline" className="border-none">
            Links
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          <a href="https://codingmugen.com" target="_blank">
            <MenubarItem>Tashan&apos;s Website</MenubarItem>
          </a>
          <MenubarItem>Christina&apos;s Website</MenubarItem>
          <MenubarItem>
            <a
              href="https://open.spotify.com/playlist/6FsTeuxK1Y3jgAIxyVqtbE?si=98143e7825ed458f"
              target="_blank"
            >
              <span className="inline-flex items-center mr-3">
                Our Playlist
              </span>
              <Image
                src={"/spotifyicon.png"}
                alt="Spotify Icon"
                width={20}
                height={20}
              />
            </a>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu></MenubarMenu>
      <MenubarMenu>
        <SignOutButton />
      </MenubarMenu>
      <MenubarMenu>
        <ThemeToggle />
      </MenubarMenu>
    </Menubar>
  );
}
