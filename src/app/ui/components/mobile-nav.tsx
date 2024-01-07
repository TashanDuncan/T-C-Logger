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

export function MobileNavigation() {
  return (
    <Menubar>
      <MenubarMenu>
        <Link href="/">
          <Button variant="outline" className="border-none">
            Home
          </Button>
        </Link>
      </MenubarMenu>
      {/* <MenubarMenu>
        <Link href="/about-us">
          <MenubarTrigger>About Us</MenubarTrigger>
        </Link>
      </MenubarMenu> */}
      <MenubarMenu>
        <MenubarTrigger>Categories</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Books</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Links</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Tashan's Website</MenubarItem>
          <MenubarItem>Christina's Website</MenubarItem>
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
