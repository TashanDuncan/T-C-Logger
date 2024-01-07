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
import { Menu } from "lucide-react";
import { getCurrentUser } from "@/app/lib/session";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function MobileNavigation({
  categories,
}: {
  categories: ItemCategory[] | undefined;
}) {
  const user = await getCurrentUser();
  return (
    <Menubar className="h-16 w-full flex justify-center">
      <MenubarMenu>
        <MenubarTrigger>
          <Menu />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>
            <span className="text-sm italic">Signed in as {user?.name}</span>
          </MenubarItem>
          <Link href="/">
            <MenubarItem>Home</MenubarItem>
          </Link>
        </MenubarContent>
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
          <a href="https://codingmugen.com" target="_blank">
            <MenubarItem>Tashan&apos;s Website</MenubarItem>
          </a>
          <MenubarItem>Christina&apos;s Website</MenubarItem>
          <MenubarItem>
            <a
              href="https://open.spotify.com/playlist/6FsTeuxK1Y3jgAIxyVqtbE?si=98143e7825ed458f"
              target="_blank"
              className="flex items-center"
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
      <MenubarMenu>
        <ThemeToggle />
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              {user?.name ? user?.name[0].toUpperCase() : "N/A"}
            </AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <SignOutButton variant="outline" className="border-none" />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
